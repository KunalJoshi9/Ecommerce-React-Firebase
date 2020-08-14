import React, { Component, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {auth, handleUserProfile} from './firebase/utils'
import {useDispatch} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions'

import WithAuth from './hoc/withAuth'

import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Recovery from './pages/Recovery'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import './default.scss';
import userTypes from './redux/User/user.types';


const App = props => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userReft = await handleUserProfile(userAuth);
        userReft.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          }))
        })
      } ;
      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  },[]);

    return (
      <div className="App">
         <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout>
                <Homepage/>
              </HomepageLayout>
            )} />
            <Route path="/registration" render={() => (
              <MainLayout>
                <Registration/>
              </MainLayout>
            )}/>
            <Route path="/login" 
              render={() => (
                <MainLayout>
                  <Login/>
                </MainLayout>
              )}/>
              <Route path="/recovery" render = {() => (
                <MainLayout>
                  <Recovery/>
                </MainLayout>
              )}
              />
              <Route path="/dashboard" render = {() => (
                <WithAuth>
                  <MainLayout>
                    <Dashboard/>
                  </MainLayout>
                </WithAuth>
              )}
              />
          </Switch>
      </div>
    );
}

export default (App);
