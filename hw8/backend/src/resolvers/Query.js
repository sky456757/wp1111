const makeName = (name,to) =>{return[name,to].sort().join('_');}
const Query = {
  chatbox: async (parent, { name1 , name2 }, { ChatBoxModel }) => {
    let name = makeName(name1,name2)
    console.log(name1)
    console.log(name2)
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name }).save();
    console.log("Q success")
    return box;
}, };
export default Query;