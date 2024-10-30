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

export const parseAndValidateUserData = async (event) => {
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

export const parseReviewBody = async (event) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    throw new Error("Invalid JSON format.");
  }

  const { comment, rating, meetupId } = parsedBody;

  const numericRating = Number(rating);
  if (isNaN(numericRating)) {
    throw new Error("Rating must be a valid number.");
  }
  if (numericRating < 1 || numericRating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  if (!comment || comment.trim() === "") {
    throw new Error("Comment is required.");
  }

  return { comment, rating, meetupId };
};

export const simpleParse = async (event) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    throw new Error("Invalid JSON format.");
  }
  return parsedBody;
};
