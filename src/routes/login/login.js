import { EMAIL_REGEX, ERROR_MESSAGE, DEMO_USER } from '../../../old/constants';

const form = document.querySelector('form');
const email = form.querySelector("input[name='email']");
const password = form.querySelector("input[name='password']");
const formError = form.querySelector('.form__message');

const checkIfValidUser = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const isValidEmail = EMAIL_REGEX.test(emailValue);
  const isPasswordTooShort =
    passwordValue.length < password.getAttribute('minlength');

  const removeAllError = () => {
    email.classList.remove('error');
    password.classList.remove('error');
    formError.classList.remove('error');
    formError.textContent = '';
  };

  // check if input is empty
  if (emailValue === '' || passwordValue === '') {
    email.classList.add('error');
    password.classList.add('error');
    formError.classList.add('error');
    formError.textContent = ERROR_MESSAGE.emptyInput;
  } else {
    removeAllError();
  }

  if (emailValue !== '') {
    if (!isValidEmail) {
      email.classList.add('error');
      formError.classList.add('error');
      formError.textContent = ERROR_MESSAGE.incorrectEmailFormat;
      password.classList.add('error');
    }

    if (isValidEmail && passwordValue === '') {
      email.classList.add('error');
      password.classList.add('error');
      formError.classList.add('error');
      formError.textContent = ERROR_MESSAGE.emptyInput;
    }

    // if both inputs are not empty, check whether whether user exist and log in
    if (isValidEmail && passwordValue !== '') {
      // simulate successful log in on correct credentials
      if (
        emailValue === DEMO_USER.email &&
        passwordValue === DEMO_USER.password
      ) {
        removeAllError();
        email.value = '';
        password.value = '';
        setTimeout(() => {
          alert('Logged in successfully!');
        }, 250);
      } else if (isPasswordTooShort) {
        password.classList.add('error');
        formError.classList.add('error');
        formError.textContent = ERROR_MESSAGE.passwordTooShort;
      } else {
        email.classList.add('error');
        password.classList.add('error');
        formError.classList.add('error');
        formError.textContent = ERROR_MESSAGE.userDoesNotExist;
      }
    }
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkIfValidUser();
});
