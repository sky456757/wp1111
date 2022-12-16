import Title from "../components/Title";
import LogIn from "../components/LogIn"
import { useState, useEffect ,useRef} from 'react'
import {useChat} from "./hook/useChat";
const SignIn = ({me}) =>
{
    //const [name,setName] = useEffect('')
    //const [onLogin,setLogin] = useEffect(0)
    const {setMe, setSignedIn,displayStatus} = useChat();
    const onLogin = (name) =>
    {
        //alert(me)
        if(!name)
        {
            displayStatus({type:'error' ,msg: "Missing user name"})
        }
        else
        {
            setSignedIn(1);
        }

    }
    return(
        <>
            <Title name ={""}/>
            <LogIn me = {me} setName ={setMe} onLogin = {onLogin}/>
        </>
    )
}

export default SignIn;