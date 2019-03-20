import React from 'react';

import UserInfo from './UserInfo';
import UserKids from './UserKids';
import withAuth from '../withAuth';

const Profile = ({session})=>(
  <div className="App">
    <UserInfo session = {session}/>
    <UserKids username={session.getCurrentUser.username}/>
  </div>
)

export default withAuth(session => session && session.getCurrentUser)(Profile);