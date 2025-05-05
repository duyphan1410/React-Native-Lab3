export default (url) => {
    const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
    const params = {};
  
    paramString.forEach(param => {
      const paramSplit = param.split('=');
      if (paramSplit.length === 2) {
        params[paramSplit[0]] = decodeURIComponent(paramSplit[1].replace(/\+/g, ' '));
      }
    });
  
    return params;
  };