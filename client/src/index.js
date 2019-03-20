import './index.css';

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import App from './components/App';
import Navbar from './components/Navbar';
import withSession from './components/withSession';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

import AddKid from './components/Kid/AddKid';
import KidPage from './components/Kid/KidPage';
import Profile from './components/Profile/Profile';

const client = new ApolloClient({
  //uri: 'http://localhost:4000/graphql',
  uri: 'https://challenge-carelulu.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers:{
        authorization: token
      }
    });
  },
  onError: ({networkError}) => {
    if (networkError){
      console.log('NetWork Error', networkError);
    }
  }
});

const Root = ({refetch, session}) => (
  <Router>
    <Fragment>
      <Navbar session = {session} />
        <Switch>
          <Route path = '/' exact component = {App} />
          <Route path = '/signin' render={() => <SignIn refetch = {refetch}/>} />
          <Route path = '/signup' render={() => <SignUp refetch = {refetch}/>} />
          <Route path = '/kid/add' render = {() => <AddKid session = {session} />} />
          <Route path = '/kids/:_id' component = {KidPage} />
          <Route path = '/profile' render = {() => <Profile session = {session}/>} />
          <Redirect to ='/'/>
        </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client = {client}>
    <RootWithSession />
  </ApolloProvider>, 
  document.getElementById('root'));
