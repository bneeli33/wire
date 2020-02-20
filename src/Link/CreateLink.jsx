import React, { useContext } from 'react';
import useFormValidation from '../Auth/UseFormValidation';
import ValidateCreateLink from '../Auth/ValidateCreateLink';
import FirebaseContext from '../Firebase/context';
import {
  Button,
  TextField,
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
  description: '',
  url: ''
};

function CreateLink(props) {
  const classes = useStyles();
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    ValidateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now()
      };
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              label="Description"
              type="text"
              autoComplete="off"
              name="description"
              fullWidth
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && (
              <Typography color="error">{errors.description}</Typography>
            )}
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              label="URL for the Link"
              type="url"
              autoComplete="off"
              name="url"
              fullWidth
              onChange={handleChange}
              value={values.url}
            />
            {errors.url && <Typography color="error">{errors.url}</Typography>}
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CreateLink;
