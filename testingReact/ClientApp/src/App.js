import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Test } from './components/Test';
import { TestHooks } from './components/TestHooks';
import { ShowAllUsers } from './components/ShowAllUsers';
import { AddNewUser } from './components/AddNewUser';
import { CreateTweet } from './components/CreateTweet';
import { ShowFeed } from './components/ShowFeed';
import ShowProfile from './components/ShowProfile';
import { Toaster } from 'react-hot-toast'

import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/test' component={Test} />
        <Route path='/test-hooks' component={TestHooks} />
        <Route path='/show-all-users' component={ShowAllUsers} />
        <Route path='/add-new-user' component={AddNewUser} />
        <Route path='/create-tweet' component={CreateTweet} />
        <Route path='/show-feed' component={ShowFeed} />
        <Route path='/user/:userId' component={ShowProfile} />
      </Layout>
    );
  }
}
