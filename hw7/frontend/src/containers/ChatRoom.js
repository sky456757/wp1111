import { Tabs} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Tag} from 'antd'
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import {useChat} from './hook/useChat'
import styled from 'styled-components'
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
    const { me, messages, sendMessage ,displayStatus,startChat} = useChat();

    //alert(me)
    const [chatBoxes,setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('');
    const [msg,setMsg] = useState('');
    const [msgSent,setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    //const msgRef = useRef(null)
    const msgFooter = useRef(null)
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
                    ({ name, body }, i) => 
                    (
                        <Message name ={name} isMe = {name === me} message = {body} key = {i}/>
                    )
                )
            }
                <FootRef ref = {msgFooter}></FootRef>
            </ChatBoxWrapper>
        )
    )
    const scrollToBottom = () =>
    {
        msgFooter.current?.scrollIntoView
        ({behavior: 'smooth', block: 'start'})
    };
    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])
    useEffect(() => {
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
    }, [messages])
    useEffect(() => {
        scrollToBottom()
    }, [chatBoxes])
    const extractChat = (friend) => 
    {
        //alert(friend)
        //alert(me)
        //alert(1)
        return displayChat(messages.filter(({name, body}) => ((name === friend) || (name === me))));
    }
    
    return (
        <>
            <Title name = {me}/>
            <ChatBoxesWrapper
                tabBarStyle={{height: '36px'}}
                type = "editable-card"
                activeKey ={activeKey} 
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                    //alert(1)
                    startChat(me,key);
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
                    onCreate={({ name }) => 
                    {
                        //alert(name)
                        setActiveKey(createChatBox(name));
                        extractChat(name);
                        setModalOpen(false);
                        startChat(me,name);
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
					(msg) => 
					{
						if (!msg) 
						{
							displayStatus({ type: 'error', msg: 'Please enter a username and a message body.'});
							return;
						}
                        //alert(activeKey)
                        //alert(msg)
						sendMessage(me, activeKey ,msg)
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