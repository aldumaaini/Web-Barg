const ResponseHandler = (code, data, msg) => {
  let res;
  switch (code) {
    case 200:
      res = {
        success: true,
        message: msg,
        data: data,
      };

      break;

    case 400:
      res = {
        success: false,
        message: msg || "Bad request",
        data: data,
      };

      break;
    case 401:
      res = {
        success: false,
        message: msg || "Unauthorized",
        data: data,
      };

      break;
    case 403:
      res = {
        success: false,
        message: msg || "Forbidden",
        data: data,
      };

      break;
    case 404:
      res = {
        success: false,
        message: msg || "Not Found",
        data: data,
      };

      break;
    case 500:
      res = {
        success: false,
        message: "Internal Server Error",
        data: data,
      };

      break;
    case 502:
      res = {
        success: false,
        message: "Bad Gateway",
        data: data,
      };

      break;
    case 503:
      res = {
        success: false,
        message: "Service Unavailable",
        data: data,
      };

      break;
    default:
      res = {
        success: false,
        message: "Unknown Error.",
        data: data,
      };
  }

  return res;
};
module.exports = {
  ResponseHandler,
};
