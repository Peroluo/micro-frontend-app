export function loadScript<T>(url:string):Promise<T> {
  return new Promise((resolve, reject) => {
    const script:HTMLScriptElement = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      resolve();
    };
    script.onerror = (err) => {
      reject(err);
    };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

