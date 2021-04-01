const withReg = (reg:RegExp) => (str:string):boolean => reg.test(str);

export const isMobilePhone = withReg(/^1[3|4|5|7|8][0-9]{9}$/);
