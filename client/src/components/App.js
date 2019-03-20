import React from 'react';
import './App.css';

import {Query} from 'react-apollo';
import {GET_ALL_KIDS} from '../queries';
import KidItem from './Kid/KidItem';

const App = ()=>(
  <div className="App">
    <h1>Our Children</h1>
    <Query query={GET_ALL_KIDS}>
      {({data, loading, error})=>{
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        // console.log(data);
        return(
        <ul>
          {data.getAllKids.map(kid => (
            <KidItem key={kid._id} {...kid} />
          ))}
        </ul> 
        ) 
      }}
    </Query>
  </div>
)

export default App;
