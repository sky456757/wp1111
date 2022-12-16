import mongoose from 'mongoose';
const {Schema} = mongoose
// Creating a schema, sort of like working with an ORM
// Creating a table within database with the defined schema
//const Message = mongoose.model('message', MessageSchema)
// Exporting table for querying and mutating
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
  });
const UserModel = mongoose.model('User', UserSchema);
/******* Message Schema *******/
const MessageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: [true, 'Body field is required.'] },
  });
const MessageModel = mongoose.model('Message', MessageSchema);
  /******* ChatBox Schema *******/
//export default UserModel
const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required:
    [true, 'Name field is required.']
  },
  messages: [{
    sender: { type: String },
    body  : { type: String }, }],
});
const ChatBoxModel =
mongoose.model('ChatBox',
ChatBoxSchema);
export {UserModel,MessageModel,ChatBoxModel};