
import { useRef, useState } from 'react'
import "./index.scss"
import { sendVerificationCode } from '../../apis/user'

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState(0)

    const handleMode = (mode: number) => {
        setMode(mode);
    }

    const handleLogin = async () => {

        if (email.trim() === '' || password.trim() === '') {
            setMessage('All fields are required.');
            return;
        }

    }

    const handleRegister = async () => {

    }

    const handleSend = async () => {
        if (email.trim() === '') {
            setError('Please enter a valid email.');
            return;
        }

        setIsSending(true);
        setSecondsLeft(60);
        const timer = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsSending(false);
                    return 0;
                }
                console.log(secondsLeft)
                return prev - 1;
            });
        }, 1000);

        await sendVerificationCode({ email: email });
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <div className='login-options'>
                    <button className={`login-title ${mode === 0 ? "active" : ""}`}
                        onClick={() => handleMode(0)} >Login</button>
                    <h2 >|</h2>
                    <button className={`login-title ${mode === 0 ? "" : "active"}`}
                        onClick={() => handleMode(1)}>Register</button>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => { setEmail(e.target.value) }}
                        id="username" type="text" placeholder="Username or email" />
                </div>

                {mode === 1 && <div className="form-group">
                    <button onClick={handleSend} className='send-btn'>Send Verification Code</button>
                    <input onChange={(e) => setCode(e.target.value)}
                        id="code" type="text" placeholder="Please enter your code here" />
                </div>}

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }}
                        id="password" type="password" placeholder="Password" />
                </div>

                {mode === 0 ?
                    <button className="login-btn">Login</button>
                    : <button className="login-btn">Register</button>}

            </div>
        </div>
    );
}

export default login;