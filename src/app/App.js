import React, { Component } from 'react';
import { HashRouter, Route, Switch , Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { checkTokenValidity } from 'helpers';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('pages/DefaultLayout'));

// Pages
const Login    = React.lazy(() => import('pages/Login'));
const Page404  = React.lazy(() => import('pages/Page404'));
const Page500  = React.lazy(() => import('pages/Page500'));

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const isTokenValid = checkTokenValidity()

      if(isTokenValid){

        return (
          <DefaultLayout {...props} />
        )

      } else {
          localStorage.clear('token')
          toastr.error('', 'Token has expired, please re-login again')

          return (
            <Redirect to='/login' />
          )
      }

    }
  } />
)

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <AuthenticatedRoute render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
