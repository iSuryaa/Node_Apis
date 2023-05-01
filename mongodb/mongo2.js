const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/Surya', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB users'))
  .catch(err => console.error(err));

const newSchema = new mongoose.Schema({
    email:String,
    password:String
  });

  const users = mongoose.model('users',newSchema);

  module.exports=users;