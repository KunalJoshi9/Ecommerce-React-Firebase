import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {auth, handleUserProfile} from './firebase/utils'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/User/user.actions'

import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Recovery from './pages/Recovery'
import Login from './pages/Login'


import './default.scss';
import userTypes from './redux/User/user.types';

class App extends Component{

  constructor(props){
    super(props);
  }

  authListener = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userReft = await handleUserProfile(userAuth);
        userReft.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        })
      } ;
      setCurrentUser(userAuth)
    });
  }

  componentWillUnmount(){
    this.authListener();
  }

  render(){
    const { currentUser } = this.props;

    return (
      <div className="App">
         <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout>
                <Homepage/>
              </HomepageLayout>
            )} />
            <Route path="/registration" render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Registration/>
              </MainLayout>
            )}/>
            <Route path="/login" 
              render={() => currentUser ? <Redirect to="/" /> : (
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
          </Switch>
      </div>
    );
  }
}

export const mapStateToProps = ({user}) =>  ({
  currentUser: user.currentUser
});

export const mapDispatchToProps = dispatch => (({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}));

export default connect(mapStateToProps, mapDispatchToProps)(App);
