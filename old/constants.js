export const DEMO_USER = {
  email: 'demo@email.com',
  password: 'demoaccount',
};

export const ERROR_MESSAGE = {
  emptyInput: 'This field is required',
  incorrectEmailFormat: 'Please enter the correct email format',
  userDoesNotExist: `The email or password you entered doesn't match our records. Please try again.`,
  passwordTooShort: 'Your password should be at least 8 characters long',
  incorrectNameFormat: 'Please enter the correct name format',
  firstNameTooLong: 'First name must not exceed 32 characters',
  lastNameTooLong: 'Last name must not exceed 64 characters',
};

//
export const EMAIL_REGEX =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

// validates various forms of names including:
// spaces, periods, hyphens, commas, accents, umlauts, and apostrophes.
export const NAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/i;
