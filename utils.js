export const ismacos= function(){
  return /macintosh|mac os x|/i.test(navigator.userAgent); 
};

export const isWindows = function() { 
  return /windows|win32|win64/i.test(navigator.userAgent);
}; 

export const currentOs = function(){
   return ismacos()?"mac":(isWindows()?"win":"defalut");
};