import React from 'react';
import {Link} from 'react-router-dom'

const KidItem = ({_id, firstName, lastName, age }) => (
  <li>
    <Link to = {`/kids/${_id}`}><h4><strong>{firstName} {lastName}</strong></h4></Link>
    <p>Age: <strong>{age}</strong> years old</p>
  </li>
)

export default KidItem;