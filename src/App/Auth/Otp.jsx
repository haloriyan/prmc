import React, { useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import Input from "../../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const Otp = () => {
    const [lang, setLang] = useLang();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user_data')));
    const [code, setCode] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [counter, setCounter] = useState(10);
    const [canResend, setCanResend] = useState(false);

    const navigate = useNavigate();
    
    const submit = () => {
        setLoading(true);
    }

    useEffect(() => {
        if (code.toString().length === 4) {
            console.log(code);
            authenticate();
        }
    }, [code])

    useEffect(() => {
        if (canResend === false) {
            setCanResend(null);
        }
        if (counter === 0) {
            setCanResend(true);
        }
        let intervalId = setInterval(() => {
            setCounter(counter - 1);
        }, 1000)
        return () => clearInterval(intervalId);
        
    }, [canResend, counter])

    const authenticate = () => {
        axios.post(`${config.baseUrl}/api/user/otp-auth`, {
            code: code,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            console.log(code);
            if (res.status === 200) {
                let otp = res.otp;
                console.log(otp);
                if (otp === 'special_access' || otp.purpose === 'register' || otp.purpose === 'login') {
                    navigate('/home');
                } else if (otp.purpose === 'reset_password') {
                    navigate('reset-password');
                }
            } else {
                console.log(res);
                // otpRef.current.clear();
                // setErrorMessage(res.message);
            }
        })
    }

    const resend = () => {
        axios.post(`${config.baseUrl}/api/user/otp-resend`, {
            user_id: user.id
        })
        .then(response => {
            let res = response.data;
            setCounter(10);
            setCanResend(false);
        })
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center index-10">
                <div className="w-4/12 mobile:w-10/12 flex flex-col">
                    <h2 className="text-3xl font-black text-slate-800 mt-8">{translation.otp.title[lang]}</h2>
                    <div className="mt-4 mb-8 text-slate-700">{translation.otp.description[lang]}</div>

                    {
                        isLoading ?
                        <div className="w-full mt-12 text-center text-slate-700 text-sm">
                            {translation.otp.processing[lang]}
                        </div>
                        :
                        <form onSubmit={submit} className="w-full mt-12">
                            <Input label="" value={code} inputStyle={{textAlign: 'center'}} onInput={e => {
                                let val = parseInt(e.currentTarget.value);
                                if (!isNaN(val)) {
                                    setCode(val);
                                }
                            }} required />
                        </form>
                    }

                    <div className="text-sm text-slate-500 mt-8 flex gap-2 justify-center">
                        <div>{translation.otp.not_receiving[lang]}</div>
                        {
                            canResend ?
                            <div className="text-primary cursor-pointer">{translation.otp.resend[lang]}</div>
                            :
                            <div>{translation.otp.wait[lang]} {counter} {translation.otp.second[lang]}</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otp;