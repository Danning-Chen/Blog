
import { useRef, useState } from 'react'





const login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async() => {
        if (username.trim() === '' || password.trim() === '') {
            setMessage('All fields are required.');
            return;
        }

    
    } 
 
    return (
        <div>Login</div>
    )

}

export default login;