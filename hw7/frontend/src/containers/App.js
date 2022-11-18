import { useState, useEffect ,useRef} from 'react'
import { Button, Input, message, Tag} from 'antd'
import styled from 'styled-components'
import {useChat} from './hook/useChat'
import SignIn from './SignIn'
import ChatRoom from './ChatRoom'

const Wrapper = styled.div
`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;
const App = () =>
{
	const { status, me, signedIn ,setMe, setSignedIn,sendMessage,messages,displayStatus} = useChat();

    /*
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
	}*/
	
	useEffect(() => {displayStatus(status)}, [status])
	return (
		<Wrapper>{signedIn ?<ChatRoom me={me} messages={messages} sendMessage={sendMessage} displayStatus={displayStatus}/> :<SignIn me = {me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>}</Wrapper>
	)
}

export default App
