import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {checkUserSession} from './redux/User/user.actions'

import AdminToolbar from './components/AdminToolbar'

import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth'

import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Recovery from './pages/Recovery'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

import './default.scss';


const App = props => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  },[]);

    return (
      <div className="App">
        <AdminToolbar/>
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
                  <DashboardLayout>
                    <Dashboard/>
                  </DashboardLayout>
                </WithAuth>
              )}
              />
              <Route path="/admin" render = {() => (
                <WithAdminAuth>
                    <AdminLayout>
                      <Admin/>
                    </AdminLayout>
                </WithAdminAuth>
              )}
              />
          </Switch>
      </div>
    );
}

export default (App);
