export const sendResponse = (statusCode, message, data) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: true,
      // message: message,
      data: data,
    }),
  };
};

export const sendError = (statusCode, message) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: false,
      message: message,
    }),
  };
};
