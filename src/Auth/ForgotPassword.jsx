import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../Firebase';

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

function ForgotPassword() {
  const classes = useStyles();
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error('Error sending email', err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(event) => setResetPasswordEmail(event.target.value)}
          />
        </form>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          className={classes.submit}
          onClick={handleResetPassword}
        >
          Submit
        </Button>
        <br />
        <div>
        </div>
        {isPasswordReset && <p>Check Email to reset password</p>}
        {passwordResetError && <p>{passwordResetError}</p>}
      </div>
    </Container>
  );
}

export default ForgotPassword;
