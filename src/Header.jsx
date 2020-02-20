import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseContext } from './Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 'auto'
  },
  menuItem: {
    marginRight: theme.spacing(2)
  }
}));

function Header() {
  const classes = useStyles();
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" edge="start" className={classes.menuItem}>
            WIRE
          </Typography>
          <Divider orientation="vertical" flexItem />
          <MenuList>
            <MenuItem
              color="primary"
              variant="contained"
              component={Link}
              to={'/'}
            >
              New
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem
              color="primary"
              variant="contained"
              component={Link}
              to={'/top'}
            >
              Top
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem
              color="primary"
              variant="contained"
              component={Link}
              to={'/search'}
            >
              Search
            </MenuItem>
          </MenuList>
          {user && (
            <>
              <MenuList>
                <MenuItem
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={'/create'}
                >
                  Create
                </MenuItem>
              </MenuList>
            </>
          )}

          {user ? (
            <>
              <MenuList className={classes.menuButton}>
                <MenuItem color="primary" variant="contained">
                  {user.displayName}
                </MenuItem>
              </MenuList>
              <Divider orientation="vertical" flexItem />
              <MenuList>
                <MenuItem
                  color="primary"
                  variant="contained"
                  onClick={() => firebase.logout()}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </>
          ) : (
            <MenuList>
              <MenuItem
                color="primary"
                variant="contained"
                component={Link}
                to={'/login'}
              >
                Login
              </MenuItem>
            </MenuList>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
