import React, { useState } from 'react';
import useFormValidation from './UseFormValidation';
import ValidateLogin from './ValidateLogin';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

function Login(props) {
  const classes = useStyles();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, ValidateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;

    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push('/');
    } catch (err) {
      console.error('Authentication Error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {login ? 'Login' : 'Create Account'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {!login && (
            <TextField
              variant="outlined"
              margin="normal"
              label="Name"
              type="text"
              fullWidth
              onChange={handleChange}
              name="name"
              value={values.name}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            value={values.email}
            autoComplete="off"
            autoFocus
          />
          {errors.email && (
            <Typography color="error">{errors.email}</Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            value={values.password}
            autoComplete="off"
          />

          {errors.password && (
            <Typography color="error">{errors.password}</Typography>
          )}
          {firebaseError && (
            <Typography color="error">{firebaseError}</Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className={classes.submit}
            style={{ background: isSubmitting ? 'primary' : 'secondary' }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            onClick={() => setLogin((prevLogin) => !prevLogin)}
            className={classes.submit}
            style={{ background: isSubmitting ? 'primary' : 'secondary' }}
          >
            {login ? 'Create an account?' : 'Already have an account?'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/forgot"
                variant="body2"
                style={{ textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
