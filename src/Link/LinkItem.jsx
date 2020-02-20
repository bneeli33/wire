import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../utils';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import FirebaseContext from '../Firebase/context';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Chip,
  Avatar,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('links').doc(link.id);
      voteRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { voteBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }
  function handleDeleteLink() {
    const linkRef = firebase.db.collection('links').doc(link.id);
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`);
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;
  return (
    <div>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemText>
            {showCount && <span>{index}. </span>}
            {link.description}{' '}
            <span>
              <a href={link.url} style={{ textDecoration: 'none' }}>
                ({getDomain(link.url)})
              </a>
            </span>
            <Typography>
              <Chip
                avatar={<Avatar>{link.votes.length}</Avatar>}
                label="votes"
                size="small"
                variant="outlined"
                color="primary"
              />
              <Chip
                label={link.postedBy.name}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={distanceInWordsToNow(link.created)}
                size="small"
                variant="outlined"
                color="primary"
              />
              <Chip
                label="Comment"
                size="small"
                color="secondary"
                component={Link}
                to={`/link/${link.id}`}
                clickable
              >
                {link.comments.length > 0
                  ? `${link.comments.length} comments`
                  : 'Comment'}
              </Chip>
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={handleVote}>
              <ThumbUpIcon color="primary" />
            </IconButton>
            {postedByAuthUser && (
              <>
                <IconButton onClick={handleDeleteLink}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

export default withRouter(LinkItem);
