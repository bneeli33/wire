import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../Firebase/context';
import LinkItem from './LinkItem';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import {
  CircularProgress,
  TextareaAutosize,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

function LinkDetail(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState('');
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection('links').doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push('/');
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          };
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments });
          setLink((prevState) => ({
            ...prevState,
            comments: updatedComments
          }));
          setCommentText('');
        }
      });
    }
  }

  return !link ? (
    <div>
      <CircularProgress color="secondary" />
    </div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <TextareaAutosize
        onChange={(event) => setCommentText(event.target.value)}
        value={commentText}
        rows="6"
        cols="60"
      />
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </div>
      <br />
      <div>
        {link.comments.map((comment, index) => (
          <div key={index}>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <Typography component="span" variant="h6" color="primary">
                        {comment.postedBy.name}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {comment.text}
                      </Typography>
                      <br />
                      <span> {distanceInWordsToNow(comment.created)}</span>
                    </>
                  }
                />
              </ListItem>
            </List>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkDetail;
