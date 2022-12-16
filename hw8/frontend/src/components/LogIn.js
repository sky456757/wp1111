import {UserOutlined} from '@ant-design/icons'
import {Input} from "antd"

const LogIn = ({me,setName,onLogin}) =>
{
    return(
        <Input.Search
                size = "large"
                value={me}
                style = {{width: 300, margin: 50}}
                prefix = {<UserOutlined />}
				onChange = {(e) => {setName(e.target.value);}}
				enterButton ="Sign In"
				placeholder = "Enter your name"
				onSearch = {() => {onLogin(me)}}
				
		/>
    )
}

export default LogIn;