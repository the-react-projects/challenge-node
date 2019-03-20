import React from 'react'
import {withRouter} from 'react-router-dom';

import {Query} from 'react-apollo';
import {GET_KID} from '../../queries';

const KidPage = ({match}) =>{
  const {_id} = match.params;
  // console.log(_id);
  return (
    <Query query = {GET_KID} variables = {{_id}}>
      {({data, loading, error})=>{
        if(loading) return <div>Loading</div>
        if(error) return <div>Erro</div>
        // console.log(data);
        return (
          <div className="App">
            <p>First name: {data.getKid.firstName}</p>
            <p>Last Name: {data.getKid.lastName}</p>
            <p>Age: {data.getKid.age} years old</p>
            <p>Kid care for: {data.getKid.username}</p>
          </div>
        )
      }}
    </Query>

  );

}

export default withRouter(KidPage);