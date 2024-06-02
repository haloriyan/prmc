import React, { useState } from "react";
import styles from "./styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/admin/login`, {
            username, password,
        })
        .then(response => {
            let res = response.data;
            setMessage({
                body: res.message,
                status: res.status
            });
            if (res.status === 200) {
                window.localStorage.setItem('prmc_admin_data', JSON.stringify(res.user));
                navigate('/admin/dashboard');
            }
        })
        e.preventDefault();
    }

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.LeftArea}>
                    <img src="/images/Icon-Play.png" alt="Icon Play" style={{height: 400,width: 400}} />
                </div>
                <form className={styles.Content} onSubmit={submit}>
                    <Input label="Username" value={username} onInput={e => setUsername(e.currentTarget.value)} required />
                    <Input label="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} required type="password" />

                    <Button>Login</Button>

                    {
                        message !== null &&
                        <Alert message={message.body} setMessage={setMessage} status={message.status} />
                    }
                </form>
            </div>
        </>
    )
}

export default Login;