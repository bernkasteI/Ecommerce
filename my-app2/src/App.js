import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';

//hoc 
import WithAuth from './hoc/withAuth';

//layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout'

//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';

import './default.scss';

const App = props => {
 
  const dispatch = useDispatch();

  useEffect(() => {

    // user has logged in
    //subscribe to an event with an event listener. It tells us to subscribe to an event from firebase
      //when the user logs in, to update the app
     const authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            //dispatch action to redux store to update it with user info
            dispatch(setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            }));
          })
        }
        // will return default if user not logged in
        dispatch(setCurrentUser(userAuth));
      });

    return () => {
      
        //unsubscribe. ensures no memory leaks.
        authListener();
    };

  }, []);


    return (
      <div className = "App">
          <Switch>
          <Route exact path = "/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path ="/registration" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
  
          <Route path ="/login" 
            render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

          <Route path ="/recovery" 
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
          )} />

          <Route path ="/dashboard" 
            render={() => (
              <WithAuth> {/* will redirect to homepage if not logged in */  } 
              <MainLayout>
                <Dashboard />
              </MainLayout>
              </WithAuth>
          )} />

          </Switch>
         
      </div>
    );
  }

export default App;