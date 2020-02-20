function ValidateLogin(values) {
  let errors = {};
  //Email Errors
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email address is invalid!';
  }
  //Password Errors
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be atlease 6 characters';
  }

  return errors;
}

export default ValidateLogin;
