const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // Password must have at least 8 characters, including one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validateUsername = (username) => {
    // Username must be between 3 to 20 characters
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    return usernameRegex.test(username);
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
    validateUsername,
  };
  