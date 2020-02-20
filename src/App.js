import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import CreateLink from './Link/CreateLink';
import LinkDetail from './Link/LinkDetail';
import LinkList from './Link/LinkList';
import SearchLinks from './Link/SearchLinks';
import Header from './Header';
import useAuth from './Auth/UseAuth';
import firebase, { FirebaseContext } from './Firebase';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#434e52'
    },
    secondary: {
      main: '#fd5e53'
    }
  }
});

function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div>
          <ThemeProvider theme={theme}>
            <Header />
            <Container fixed>
              <div>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/new/1" />}
                  />
                  <Route path="/create" component={CreateLink} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot" component={ForgotPassword} />
                  <Route path="/search" component={SearchLinks} />
                  <Route path="/top" component={LinkList} />
                  <Route path="/new/:page" component={LinkList} />
                  <Route path="/link/:linkId" component={LinkDetail} />
                </Switch>
              </div>
            </Container>
          </ThemeProvider>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
