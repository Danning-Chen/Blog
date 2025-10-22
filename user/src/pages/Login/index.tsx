
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from "../../store";
import "./index.scss"
import { sendVerificationCodeAPI, registerAPI, loginAPI } from '../../apis/user'
import { fetchLogin } from '../../store/modules/user'

const login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

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
        setMessage("");
    }

    const handleLogin = async () => {

        if (email.trim() === '' || password.trim() === '') {
            setMessage('All fields are required.');
            return;
        }

        try {
            const res = await dispatch(fetchLogin({ email, password }));

            // ✅ Handle Redux Toolkit fulfilled action
            if (res.data.status === 'success') {
                setMessage('Login successful!');
                navigate('/');
            } else {
                // If backend returns an error response (200 OK but failure)
                setMessage(res.data.message || 'Login failed.');
            }
        } catch (err: any) {
            console.error(err);
        }

    }

    const handleRegister = async () => {
        if (password.trim() === '' || email.trim() === '') {
            setMessage('All fields are required.');
            return;
        }

        if (password.length < 8) {
            setMessage('Password must be at least 8 characters.');
            return;
        }

        try {
            const res = await registerAPI({ password: password, email: email, code: code });
            console.log(res)
            if (res.data.status === 'success') {
                setMessage(res.data.message);
                //navigate('/login');
            } else {
                setMessage(res.data.message);
            }
        }
        catch (err: any) {
            console.log(err)
        }

    }

    const handleSend = async () => {
        setError("")

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

        try {
            const res = await sendVerificationCodeAPI({ email: email });
            console.log(res);
            setError("Verification code sent successfully!!")
        } catch (error: any) {
            console.error("error", error);
        }

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
                        id="username" type="text" placeholder="Email" />
                </div>

                {mode === 1 && <div className="form-group">

                    <div>
                        <button onClick={handleSend} className={`send-btn ${isSending ? "sending" : ""}`}>
                            Send Verification Code</button>
                        {secondsLeft > 0 &&
                            <span style={{ marginLeft: "10px" }}>Resend after: {secondsLeft}</span>}

                    </div>
                    <span>{error}</span>
                    <input onChange={(e) => setCode(e.target.value)}
                        id="code" type="text" placeholder="Please enter your code here" />
                </div>}

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }}
                        id="password" type="password" placeholder="Password" />
                </div>

                <div>
                    {message}
                </div>

                {mode === 0 ?
                    <button onClick={handleLogin} className="login-btn">Login</button>
                    : <button onClick={handleRegister} className="login-btn">Register</button>}

            </div>
        </div>
    );
}

export default login;