import React from 'react';

const UserInfo = ({session})=>(
  <div>
   <h3>Child Care Profile</h3>
   <p>Username: {session.getCurrentUser.username}</p>
   <p>Email Address: {session.getCurrentUser.email}</p>
   <p>Care kids since: {session.getCurrentUser.joinDate}</p>
   <h3>Kids care for {session.getCurrentUser.username}</h3>
  </div>
)

export default UserInfo;