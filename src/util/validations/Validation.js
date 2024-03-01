export function validateEmail(email) {
    if (!email) return 'Please enter your email.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format.';
    return '';
  }
  
  export function validatePassword(password) {
    if (!password) return 'Please enter your password.';
    return '';
  }
  