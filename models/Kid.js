const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KidSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age:{
    type: String,
  },
  registerDate: {
    type: Date,
    default: Date.now()
  },
  username:{
    type: String,
  }
});
module.exports = mongoose.model('Kid', KidSchema);
