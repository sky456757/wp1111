import { useState ,useRef ,useEffect} from "react";
//const client = new WebSocket ('ws://localhost:4000')
const useChat = () => 
{
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    //const client = null;
    //const client = useRef(null);
    const client = useRef(null);
    useEffect(() => 
    {
        client.current = new WebSocket ('ws://localhost:4000');
        
        return () =>{ client.current.close();}
    }, [])
    useEffect(() => 
    {
        client.current.onmessage = (byteString) => 
        {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) 
            {
                case "init": 
                {
                    setMessages(payload);
                    break;
                }
                case "output": 
                {
                    setMessages(() => [...messages, ...payload]); 
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
    const sendData = async (data) => 
    {await client.current.send(JSON.stringify(data));};
    const sendMessage = (payload) => 
    {
        //setMessages([...messages,payload]);
        //setStatus({type: "success", msg: "Message sent." });
        sendData(["input", payload]);
        //alert(msg.body)
        console.log(payload);
    }
    const clearMessages = () => 
    {
        sendData(["clear"]);
    };
   
    return {status, messages, sendMessage,clearMessages};
};
export default useChat;