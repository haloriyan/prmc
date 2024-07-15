import axios from "axios";
import React, { useState } from "react";
import config from "../../config";
import Input from "../../components/Input";
import { BiHide, BiShow } from "react-icons/bi";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import { Link, useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

const Register = () => {
    const [lang, setLang] = useLang();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const dict = translation.register;

    const [buttonText, setButtonText] = useState(dict[lang]);

    const submit = e => {
        setButtonText(dict.processing[lang]);
        axios.post(`${config.baseUrl}/api/user/login`, {
            email, password
        })
        .then(response => {
            let res = response.data;
            console.log(res);
        })
        e.preventDefault();
    }
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center index-10">
                <div className="w-4/12 mobile:w-10/12 flex flex-col items-center">
                    <img src="/images/icon.png" alt="icon" className="rounded-lg h-36 aspect-square" />
                    <h2 className="text-3xl font-black text-slate-800 mt-8">{dict.title[lang]}</h2>

                    <form onSubmit={submit} className="w-full mt-12">
                        <Input label="Email" value={email} onInput={e => setEmail(e.currentTarget.value)} required />
                        <Input label="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} required type={hidePassword ? 'password' : 'text'} right={
                            <div className="cursor-pointer" onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <BiShow /> : <BiHide />}
                            </div>
                        } />

                        <div className="flex gap-8 items-center">
                            <button className="font-bold rounded-full flex grow basis-6/12 items-center justify-center h-14 bg-primary text-white">
                                {dict[lang]}
                            </button>
                            <button className="font-bold rounded-full flex grow basis-6/12 items-center justify-center h-14 text-primary" type="button">
                                {translation.login.forget_password[lang]}
                            </button>
                        </div>

                        <div className="flex items-center justify-center mt-8 gap-2">
                            <div>{translation.register.already_have_account[lang]}</div>
                            <Link to={'/login'} className="font-bold text-primary">Login</Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="fixed top-0 left-0 right-0 flex justify-center items-center index-20 h-20 mt-2">
                <div className="w-4/12 mobile:w-10/12 flex items-center justify-center gap-4">
                    <div className="basis-4/12 flex grow">{translation.login.choose_language[lang]}</div>
                    <div className={`h-12 aspect-square flex items-center justify-center cursor-pointer ${lang === 'en' ? 'bg-primary' : 'bg-slate-100'}`} onClick={() => {
                        setLang('en')
                    }}>
                        <ReactCountryFlag countryCode="US" />
                    </div>
                    <div className={`h-12 aspect-square flex items-center justify-center cursor-pointer ${lang === 'id' ? 'bg-primary' : 'bg-slate-100'}`} onClick={() => {
                        setLang('id')
                    }}>
                        <ReactCountryFlag countryCode="ID" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register