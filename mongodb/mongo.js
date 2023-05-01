const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/Surya', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Item'))
  .catch(err => console.error(err));

 const itemSchema = new mongoose.Schema({
   name: String,
   type: String,
   code: String,
   description: String,
   checked: Boolean
 });



const Item = mongoose.model('Item', itemSchema);

 module.exports=Item;

