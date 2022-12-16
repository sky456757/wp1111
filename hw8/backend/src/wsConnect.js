import Message from './models/message.js';
import {UserModel,MessageModel,ChatBoxModel} from './models/chatbox.js';
//import UserModel from './models/chatbox.js';
const makeName = (name,to) =>{return[name,to].sort().join('_');}
const validateUser = async (name) =>
{
    const existing = await UserModel.findOne({name: name});
    if(!existing) 
        return 0
    else
    {
        //console.log(1)
        return existing;
    }

}
const validateBox = async (name) =>
{
    const existing = await ChatBoxModel.findOne({name: name});
    if(!existing) 
        return 0
    else
    {
        console.log(1)
        return existing;
    }

}
const chatBoxes = {};

const sendData = (data, ws) => 
{
    ws.send(JSON.stringify(data)); 
    //console.log(JSON.stringify(data))
    
}
const sendStatus = (payload, ws) => 
{
    sendData(["status", payload], ws); 
}
const broadcastMessage = (wss, data, status) => 
{
    wss.clients.forEach((client) => 
    {
        sendData(data, client);
        sendStatus(status, client);
        //console.log(client)
    });
};

export default 
{
    initData: (ws) => 
    {
        Message.find().sort({ created_at: -1 }).limit(100)
        .exec((err, res) => 
        {
            if (err) throw err;
            // initialize app with existing messages
            //console.log(res)
            sendData(["init", res], ws);
        }); 
    },
    onMessage: (wss,ws) => 
    (
        async (byteString) => 
        {
            const { data } = byteString
            console.log(data)
            const [task, payload] = JSON.parse(data)
            console.log(task)
            switch (task) 
            {
                case 'input': 
                {
                    const { name, body } = payload
                    const message = new Message({ name, body })
                    try 
                    { 
                        await message.save();
                        console.log('save success')
                    } 
                    catch (e) 
                    { 
                      throw new Error
                      ("Message DB save error: " + e); 
                    }
                    broadcastMessage(wss,['output', [payload]],
                    {
                        type: 'success',
                        msg: 'Message sent.',
                    })
                    break;
                }
                case 'CHAT': 
                {
                    const { name, to } = payload
                    const chatBoxName = makeName(name,to)
                    if (!chatBoxes[chatBoxName])
                        chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
                    chatBoxes[chatBoxName].add(ws);
                    let cBox= await validateBox(chatBoxName);
                    if(cBox === 0)
                    {
                        cBox = new ChatBoxModel({
                            name: chatBoxName,
                            messages: [],
                            users: []
                        })
                    }
                   // console.log(cBox)
                    let a = await validateUser(name)
                    let b = await validateUser(to)
                    if(a === 0)
                    {
                        a = new UserModel({
                            name: name,
                            chatboxes: cBox._id,
                        });
                        try 
                        { 
                            await a.save();
                            console.log('save success')
                        } 
                        catch (e) 
                        { 
                            throw new Error
                            ("DB save error: " + e); 
                        }
                    }
                    if(b === 0)
                    {
                        b = new UserModel({
                            name: to,
                            chatboxes: cBox._id,
                        });
                        try 
                        { 
                            await b.save();
                            console.log('save success')
                        } 
                        catch (e) 
                        { 
                            throw new Error
                            ("DB save error: " + e); 
                        }
                    }
                    cBox.users = [a._id,b._id]
                    try 
                    { 
                        await cBox.save();
                        console.log('save success')
                    } 
                    catch (e) 
                    { 
                      throw new Error
                      ("DB save error: " + e); 
                    }
                    await cBox.populate('messages')
                    cBox.populated('messages')
                    await cBox.populate('messages.sender')
                    cBox.populated('messages.sender')
                    console.log(cBox)
                    var mes = []
                    for(var i = 0;i< cBox.messages.length;i++)
                    {
                        cBox.messages[i].populate('sender')
                        mes.push({name:cBox.messages[i].sender.name ,body:cBox.messages[i].body})
                    }
                    console.log(mes)
                    sendData(["CHAT", mes], ws);
                    break;
                }
                case 'MESSAGE': 
                {
                    console.log('test')
                    const { name, to, body } = payload
                    const chatBoxName = makeName(name,to)
                    let cBox = await validateBox(chatBoxName);
                    let a = await validateUser(name)
                    const message = new MessageModel({
                        chatBox: cBox._id,
                        sender: a._id,
                        body: body,
                      });
                    cBox.messages.push(message._id)
                    try 
                    { 
                        await message.save();
                        console.log('save success')
                    } 
                    catch (e) 
                    { 
                      throw new Error
                      ("Message DB save error: " + e); 
                    }
                    try 
                    { 
                        await cBox.save();
                        console.log('save success')
                    } 
                    catch (e) 
                    { 
                      throw new Error
                      ("Message DB save error: " + e); 
                    }
                    /*
                    broadcastMessage(wss,['output', [payload]],
                    {
                        type: 'success',
                        msg: 'Message sent.',
                    })*/
                    chatBoxes[chatBoxName].forEach((client) => 
                    {
                        sendData(['MESSAGE', {name:name,body:body}], client);
                        sendStatus({type: 'success',msg: 'Message sent.',}, client);
                        //console.log(client)
                    });
                    break;
                }
                case 'clear': 
                {
                    Message.deleteMany({}, () => 
                    {
                        broadcastMessage(wss,['cleared'],{ type: 'info', msg: 'Message cache cleared.'})
                    })
                    break;
                }
                default: break
            }
        }
    )
}