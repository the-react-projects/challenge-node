import {gql} from 'apollo-boost';

/* Kids Queries */
export const GET_ALL_KIDS = gql `
query {
  getAllKids{
    _id
    firstName
    lastName
    age
    registerDate
    username
  }
}
`;

export const GET_KID = gql `
query($_id: ID!){
  getKid(_id:$_id){
    _id
    firstName
    lastName
    age
    username
  }
}
`;

/* Kids Mutations */
export const ADD_KID = gql `
  mutation(
    $firstName: String!, 
    $lastName: String!, 
    $age: String, 
    $registerDate: String, 
    $username: String
    ){
    addKid(
      firstName: $firstName, 
      lastName: $lastName, 
      age: $age,
      registerDate: $registerDate, 
      username:$username
      ){
      _id
      firstName
      lastName
      age
    }
  }
`;

export const DELETE_USER_KID = gql`
  mutation($_id: ID!){
    deleteUserKid(_id: $_id){
      _id
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql `
  query{
    getCurrentUser{
      username
      email
      joinDate
    }
  }
`;

export const GET_USER_KIDS = gql `
  query($username: String!){
    getUserKids(username: $username){
      _id
      firstName
      lastName
      age
    }
  }

`;

/* User Mutations */
export const SIGNIN_USER = gql`
mutation($username:String!, $password:String!){
  signinUser(username:$username, password:$password){
    token
  }
}
`;

export const SIGNUP_USER = gql `
mutation($username:String!, $email:String!, $password:String!){
  signupUser(username:$username, email:$email, password:$password){
    token
  }
}
`;