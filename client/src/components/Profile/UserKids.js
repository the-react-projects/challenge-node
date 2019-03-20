import React from 'react';

import {Link} from 'react-router-dom';

import {Query, Mutation} from 'react-apollo';

import {GET_USER_KIDS, DELETE_USER_KID, GET_ALL_KIDS, GET_CURRENT_USER} from '../../queries';

const handleDelete = deleteUserKid => {
  const confirmDelete = window.confirm('Are you sure?');
  if(confirmDelete){
    deleteUserKid().then(({data}) => {
      // console.log(data);
    });

  }
}

const UserKids = ({username}) => (

  <Query query = {GET_USER_KIDS} variables={{username}}>
    {({data, loading, error}) => { 
      if(loading) return <div>Loading</div>
      if(error) return <div>Error</div>
      // console.log(data);
      return (
        <ul>
          {!data.getUserKids.length && (<p><strong>You have not added kids yet</strong></p>)}
          {data.getUserKids.map(kid => (
            <li key={kid._id}>
              <Link to = {`/kids/${kid._id}`} >
              <p style={{marginBottom:'0'}}>{kid.firstName} {kid.lastName}</p></Link>
              <p style={{marginBottom:'0'}}>Age: {kid.age} years</p>
              <Mutation 
                mutation={DELETE_USER_KID} 
                variables={{ _id: kid._id }}
                refetchQueries={()=>[
                  { query: GET_ALL_KIDS},
                  { query: GET_CURRENT_USER},
                ]}
                update={(cache,{data:{deleteUserKid}})=>{
                  const{getUserKids}=cache.readQuery({
                    query: GET_USER_KIDS,
                    variables: { username }
                  });
                  cache.writeQuery({
                    query: GET_USER_KIDS,
                    variables: {username},
                    data:{
                      getUserKids: getUserKids.filter( 
                        kid => kid._id !== deleteUserKid._id
                      )
                    }
                  });
                }}
                >
                {(deleteUserKid, attrs={}) => 
                  (
                    <p 
                    className="delete-button" 
                    onClick={()=> handleDelete(deleteUserKid)}
                    >
                    {attrs.loading?'Deleting..':'X'}
                    </p>
                  )
                }
              </Mutation>
            </li>)
          )}
        </ul>
    )}}
  </Query>
);

export default UserKids;