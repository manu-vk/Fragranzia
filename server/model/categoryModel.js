const mongoose= require('mongoose');
const categorySchema= new mongoose.Schema({
    categoryname:{type:String,required:true},
    categorydescription:{type:String,required:false},
},{timestamp:true});
module.exports =mongoose.model('CategoryModel',categorySchema)