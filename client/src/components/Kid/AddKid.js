import React from 'react';
import {withRouter} from 'react-router-dom';

import {Mutation} from 'react-apollo';
import { ADD_KID, GET_ALL_KIDS } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
  firstName:'',
  lastName:'',
  age:'',
  username:''
};
class AddKid extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount(){
    this.setState({
      username: this.props.session.getCurrentUser.username
    })
  };

  handleChange = event => {
    const {name,value} = event.target
    this.setState({[name]:value});
  }

  handleSubmit = (event, addKid) => {
    event.preventDefault();
    addKid().then(async ({data}) => {
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  }

  validateForm = () => {
    const {firstName, lastName, age} = this.state;
    const isInvalid = !firstName || !lastName || !age;
    return isInvalid;
  }

  updateCache = (cache, { data:{addKid} }) => {
    const {getAllKids} = cache.readQuery({ query: GET_ALL_KIDS})
    
    cache.writeQuery({
      query: GET_ALL_KIDS, 
      data: {
        getAllKids: [addKid, ...getAllKids]
      }
    })
  }

  render (){
    const {firstName, lastName, age, username} = this.state;
    return (
     <Mutation 
        mutation = {ADD_KID} 
        variables={{firstName, lastName, age, username}}
        update={this.updateCache}>
        {(addKid,{data, loading, error}) =>  
        {
          return (
            <div className="App">
              <h2 className="App">Add Kid</h2>
              <form className="form" onSubmit = { event => this.handleSubmit(event, addKid)}>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="First Name" 
                  onChange={this.handleChange}
                  value = {firstName}
                />
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Last Name" 
                  onChange={this.handleChange}
                  value = {lastName}
                />
                <input 
                  type="text" 
                  name="age" 
                  placeholder="Input Age" 
                  onChange={this.handleChange}
                  value = {age}
                />
                <button disabled = {loading || this.validateForm()} className="button-primary" type="submit">Submit</button>
                {error && <Error error={error}/>}
              </form>
            </div>
          )
        }}
      </Mutation>
    );
  }
};

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddKid)
);