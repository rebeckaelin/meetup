const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 1;
};

export const validateEmailAndPassword = async (email, password) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }

  if (!isValidPassword(password)) {
    throw new Error("Password must be at least 1 characters long.");
  }
};

export const parseAndValidateBody = async (event) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    throw new Error("Invalid JSON format.");
  }
  const { email, password } = parsedBody;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    throw new Error("Email and password is required.");
  }

  return { email, password };
};