import { Tabs} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Tag} from 'antd'
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import {useChat} from './hook/useChat'
import styled from 'styled-components'
import { useQuery, useMutation,useLazyQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import { CHATBOX_QUERY , CREATE_CHATBOX_MUTATION,MESSAGE_SUBSCRIPTION,CREATE_MESSAGE_MUTATION} from "../graqhql";
const ChatBoxesWrapper = styled(Tabs)
`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;
const ChatBoxWrapper = styled.div
`
    width: 100%;
    height:204px;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const FootRef = styled.div
`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, messages, sendMessage ,displayStatus,startChat,setMessages} = useChat();
    const [subcriptTrigger, setSubcriptTrigger] = useState(false);
    const [chatBoxes,setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('');
    const [msg,setMsg] = useState('');
    const [msgSent,setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const[tempKey,setTempKey] = useState('');
    //const msgRef = useRef(null)
    const msgFooter = useRef(null)
    const tk = useRef(null)
    const makeName = (name,to) =>{return[name,to].sort().join('_');}
    const scrollToBottom = () =>
    {
        msgFooter.current?.scrollIntoView
        ({behavior: 'smooth', block: 'start'})
    };
    let [getData,{ data, loading, subscribeToMore }]
    = useLazyQuery(CHATBOX_QUERY);
    //alert(subscribeToMore)
    const loadData = async () =>{
        let te = await getData({
            variables: {
                name1: me,
                name2: activeKey,
            },
        })
        //alert(data)
        //subscribeToMore = te.subscribeToMore
        data = te.data
        //alert(data)
        loading = te.loading
    }
    useEffect(() => {
        //alert(activeKey)
        if(activeKey != '' && subcriptTrigger === true)
        {
            //alert("sub")
            try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: activeKey},
                updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) 
                {
                    //alert('!')
                    //prev = null
                    return prev;
                }
                //alert(Object.keys(subscriptionData.data))
                //alert(subscriptionData.data.message)
                //alert(Object.keys(prev))
                //alert(prev.chatBox)
                const newMessage = {sender:subscriptionData.data.message.sender,body:subscriptionData.data.message.body}
                //alert(newMessage)
                //alert(data)
                //alert(messages.length)
                
                let ms = [...messages, newMessage]
                //alert(tempKey)
                //alert(tk.current)
                if(prev.chatBox && tk.current === activeKey )
                {
                    //alert('p')
                    setMessages([...prev.chatBox.messages, newMessage])
                    ms = [...prev.chatBox.messages, newMessage]
                }
                else
                    setMessages([...messages, newMessage])
                tk.current = activeKey
                return {
                    chatBox: {
                    name: makeName(me,activeKey),
                    messages: ms,
                }, };
            }, });
            } catch (e) {}
            //setTempKey(activeKey)
        }
        //setMessages(data.chatBox.messages)
     }, [subscribeToMore,subcriptTrigger]);
    //alert(me)
    const createChatBox = (friend) => 
    {
        if (chatBoxes.some
           (({key}) => key === friend)) {
             throw new Error(friend +
        "'s chat box has already opened.");
        }
        //alert(friend)
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,
          { label: friend, children: chat,
            key: friend }]);
            setMsgSent(true);
  return friend;
    };
    const removeChatBox =(targetKey, activeKey) => 
    {
         const index = chatBoxes.findIndex(({key}) => key === activeKey);
         const newChatBoxes = chatBoxes
           .filter(({key}) =>  key !== targetKey);
         setChatBoxes(newChatBoxes);
        return activeKey ? activeKey === targetKey ? index === 0 ? '' : chatBoxes[index - 1].key : activeKey : ''; 
    };
    const displayChat = (m) =>
    (
        m.length === 0 ? 
		( <p style={{ color: '#ccc' }}> No messages... </p> ) :
		(
            <ChatBoxWrapper>
            {
                m.map
                (
                    ({ sender, body }, i) => 
                    (
                        <Message name ={sender} isMe = {sender === me} message = {body} key = {i}/>
                    )
                )
            }
                <FootRef ref = {msgFooter}></FootRef>
            </ChatBoxWrapper>
        )
    )

    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])
    useEffect(() => {
        //const te = await startChat({variables: { name1: me, name2: activeKey },});
        //setMessages(te.data.createChatBox.messages)
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        //alert(index)
        if(index != -1)
        {
            var thisBox = chatBoxes[index]
            const chat = extractChat(activeKey);
            thisBox.children = chat
            let newChatBoxes = [];
            for(var i = 0;i < chatBoxes.length;i++)
            {
                if(i === index)
                    newChatBoxes.push(thisBox)
                else
                    newChatBoxes.push(chatBoxes[i])
            } 
            //newChatBoxes.push(thisBox)
            setChatBoxes(newChatBoxes);
        }
        scrollToBottom()
    }, [messages])
    useEffect(() => {
        scrollToBottom()
    }, [chatBoxes])
    const extractChat = (friend) => 
    {
        //alert(friend)
        //alert(me)
        //alert(1)
        //alert(messages[0].sender)
        return displayChat(messages.filter(({sender, body}) => ((sender === friend) || (sender === me))));
    }
    
    return (
        <>
            <Title name = {me}/>
            <ChatBoxesWrapper
                tabBarStyle={{height: '36px'}}
                type = "editable-card"
                activeKey ={activeKey} 
                onChange={async (key) => {
                    setActiveKey(key);
                    const te = await startChat({variables: { name1: me, name2: key },});
                    setMessages(te.data.createChatBox.messages)
                    await subscribeToMore()
                    setSubcriptTrigger(true)
                    await loadData()
                    setSubcriptTrigger(false)
                    extractChat(key);
                    //alert(1)
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                      setActiveKey(removeChatBox(targetKey, activeKey));
                } }}
                items={chatBoxes}
            >
            </ChatBoxesWrapper>
            <ChatModal
                    open={modalOpen}
                    onCreate={async ({ name }) => 
                    {
                        setActiveKey(createChatBox(name));
                        const te = await startChat({variables: { name1: me, name2: name },});
                        setMessages(te.data.createChatBox.messages)
                        //alert(data)
                        //await subscribeToMore()
                        setSubcriptTrigger(true)
                        await loadData()
                        setSubcriptTrigger(false)
                        //alert(Object.keys(data.chatbox))
                        //alert(data)
                        extractChat(name);
                        setModalOpen(false);
                    }}
                    onCancel={() => { setModalOpen(false);}}
                />
			<Input.Search
				value = {msg}
				onChange = {(e) => {setMsg(e.target.value);}}
				enterButton =" Send"
				placeholder = "Type a message here..."
				onSearch =
				{
					async (msg) => 
					{
						if (!msg) 
						{
							displayStatus({ type: 'error', msg: 'Please enter a username and a message body.'});
							return;
						}
                        //alert(activeKey)
                        //alert(msg)
						//sendMessage(me, activeKey ,msg)
                        let ms = await sendMessage({ variables: { name:me, to:activeKey ,body:msg } });

                        //await loadData()
                        //alert(Object.keys(data))
                        //const nmsg = {sender:ms.data.createMessage.sender,body:ms.data.createMessage.body}
                        //alert("sent")
                        //alert(Object.keys(ms.data.createMessage))
                        //alert(ms.data.createMessage.sender)
                        //alert(ms.data.createMessage.body)
                        //const nmsg = {sender:ms.data.createMessage.sender,body:ms.data.createMessage.body}
                        //setMessages([...messages,nmsg])
                        //alert(data)

                        //alert(activeKey)
						setMsg('')
                        setMsgSent(true)
					}
				}
			></Input.Search>
        </>
    );
};
export default ChatRoom;