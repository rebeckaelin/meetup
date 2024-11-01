export const sendResponse = (statusCode, data = null) => {
  const body = data ? { success: true, data: data } : { success: true };
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
