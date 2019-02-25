export default (error) => {
    let errorInfo="";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorInfo.concat(error.response.data,",",error.response.status,",",error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorInfo = error.request;
      errorInfo.concat(",", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      errorInfo.concat(",",error.message);
    }
    errorInfo.concat(",",error.config);
    return errorInfo;
  }