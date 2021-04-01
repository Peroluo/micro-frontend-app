const path = require('path');
const fs = require('fs-extra');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Fontmin = require('fontmin');
const package = require('./package.json');
const config = require('./config');

/**
 * 结合webpack编译钩子的相关操作
 */
class DispatchWebpackCompilerHooks {
  apply(compiler) {
    // afterEmit - 静态资源导出成功
    compiler.hooks.afterEmit.tap('afterAssetsOutPut', () => {
      // 字体压缩处理过程
      let set = new Set();
      // 扫描构建目录下的所有用到的中文字集合
      const scanFolder = (dir, done) => {
        let results = [];
        fs.readdir(dir, (err, list) => {
          if (err) {
            return done(err);
          }
          let i = 0;
          (function iter() {
            let file = list[i++];
            if (!file) {
              return done(null, results);
            }
            file = `${dir}/${file}`;
            fs.stat(file, (err, stat) => {
              if (stat && stat.isDirectory()) {
                scanFolder(file, (err, res) => {
                  results = results.concat(res);
                  iter();
                });
              } else {
                results.push(file);
                iter();
              }
            });
          })();
        });
      };
      // 结合fontmin的具体处理配置
      const fontTransform = (finalString) => {
        const fontmin = new Fontmin()
          .src('build/assets/*.ttf')
          .dest('build/assets/')
          .use(
            Fontmin.glyph({
              text: finalString,
              hinting: false,
            }),
          )
          .use(
            Fontmin.ttf2woff({
              deflate: true,
            }),
          );
        fontmin.run((err) => {
          if (err) {
            throw err;
          }
        });
      };
      scanFolder(path.join(__dirname, 'build/js'), (n, results) => {
        if (!results) {
          return;
        }
        // 只扫描业务js
        const filter = (str) => {
          try {
            const target = str.split('/');
            const targetName = target[target.length - 1].split('.')[0];
            const flag = new RegExp('^[0-9]*[1-9][0-9]*$');
            return flag.test(targetName);
          } catch (error) {
            return null;
          }
        };
        results.forEach((file) => {
          if (!filter(file)) {
            return;
          }
          const result = fs.readFileSync(file, 'utf8');
          const currentSet = new Set(result);
          set = new Set([...set, ...currentSet]);
        });
        const texts = Array.from(set).join('');
        fontTransform(texts);
      });
    });
  }
}

const packageName = package.name;

module.exports = {
  webpack: {
    // 资源路径
    publicPath: config.buildtime.cdn_path || config.buildtime.publicPath,
    // 图片资源路径
    assetsPublicPath: config.buildtime.cdn_path || config.buildtime.assetsPublicPath,
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
    rootPath: __dirname,
    entryPath: [path.join(__dirname, './src/index.tsx')],
    pxtorem: {
      rootValue: 100,
      propList: [
        '*',
        '!min-width',
        '!border',
        '!border-left',
        '!border-right',
        '!border-top',
        '!border-bottom',
      ],
      selectorBlackList: ['no_rem'],
    },
    libs: {
      vender: ['react', 'react-dom', 'react-router', 'react-router-dom'],
      html2canvas: ['html2canvas'],
    },
    htmlPlugin: {
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.ejs'),
      favicon: path.join(__dirname, '/favicon.ico'),
      front_config: `<script>window.CODEMAOCONFIG = ${JSON.stringify(config.runtime)}</script>`,
    },
    definePlugin: {
      Debug: false,
    },
    dropConsole: config.runtime.env === 'prod',
    analyzePlugin: config.buildtime.analyze,
    devServer: {
      port: config.buildtime.originServer.port,
      https: config.buildtime.https,
      hot: config.buildtime.hot,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    pluginOptions: [
      // 按需加载lodash
      new LodashModuleReplacementPlugin(),
      // 编译钩子
      new DispatchWebpackCompilerHooks(),
    ],
    babel: {
      // 按需加载Loadsh
      plugins: [['lodash']],
    },
    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM'
    },
  },
};
