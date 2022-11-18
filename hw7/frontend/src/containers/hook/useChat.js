import { useState ,useRef ,useEffect,createContext,useContext} from "react";
import { Button, Input, message, Tag} from 'antd'
//const client = new WebSocket ('ws://localhost:4000')
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    startChat: () =>{},
    clearMessages: () => {},
});
const ChatProvider = (props) => 
{
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] =  useState(false);
    //const client = null;
    //const client = useRef(null);
    const client = useRef(null);
    useEffect(() => 
    {
        client.current = new WebSocket ('ws://localhost:4000');
        
        return () =>{ client.current.close();}
    }, [])
    useEffect(() => {
        if (signedIn) {
          localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
      }, [me, signedIn]);
    useEffect(() => 
    {
        client.current.onmessage = (byteString) => 
        {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            //alert(payload)
            switch (task) 
            {
                case "CHAT": 
                {
                    setMessages(payload);
                    //alert(messages)
                    break;
                }
                case "MESSAGE": 
                {
                    setMessages(() => [...messages, payload]); 
                    //alert(messages)
                    //alert(payload.body)
                    break; 
                }
                case "status": 
                {
                    setStatus(payload); 
                    break;
                }
                case "cleared": 
                {
                    setMessages([]);
                    break;
                }
                default: break;
            }
        }
    }, [messages])
    const displayStatus = (s) => 
	{
		if (s.msg) 
		{
			const { type, msg } = s;
			const content = {content: msg, duration: 0.5 }
			switch (type) 
			{
				case 'success':
					message.success(content);
					break;
				case 'error':
					message.error(content);
					break;
				default:
					message.success(content);
					break;
			}
		}
	}
    const sendData = async (data) => 
    {
        await client.current.send(JSON.stringify(data));
        //await client.current.send("123");
        //alert(JSON.stringify(data))
        //const [task, payload] = JSON.parse(JSON.stringify(data))
        //alert(task)
    };
    const startChat = (name,to) => 
    {
        if(! name || !to) throw new Error('Name or to required')
        //setMessages([...messages,payload]);
        //setStatus({type: "success", msg: "Message sent." });
        sendData(["CHAT",{name,to}]);
        //alert(payload.body)
    }
    const sendMessage = (name,to,body) => 
    {
        //alert(name)
        //alert(to)
        //alert(body)
        if(! name || !to || !body) throw new Error('Name or to or body,required')
        //setMessages([...messages,payload]);
        //setStatus({type: "success", msg: "Message sent." });
        //alert("1")
        sendData(["MESSAGE",{name,to,body}]);
    }
    const clearMessages = () => 
    {
        sendData(["clear"]);
    };
   
    return (
        <ChatContext.Provider
          value={{
            status, me, signedIn, messages, setMe, setSignedIn,
            sendMessage, clearMessages, displayStatus,startChat
  }}
          {...props}
        />
  );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };