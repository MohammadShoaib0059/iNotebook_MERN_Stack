import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
 title:{
    type:string,
    required:true
 },
 description:{
    type:string,
    required:true,
 },
 tag:{
    type:string,
    default:"General"
 },
 date:{
    type:Date,
    default:date.now
 }
});

module.exports = mongoose.model('notes',NoteSchema)