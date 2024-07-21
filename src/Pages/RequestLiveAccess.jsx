import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import config from "../config";
import { BiCheck, BiUser } from "react-icons/bi";
import useLang from "../hooks/useLang";
import translation from "../translation.json";
import Input from "../components/Input";

const RequestLiveAccess = () => {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') ? searchParams.get('lang') : 'id';
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);

    const [purpose, setPurpose] = useState('');

    useEffect(() => {
        if (isLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/user/auth`, {
                token: token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setUser(res.user);
            })
        }
    }, [isLoading]);

    const submit = () => {
        if (purpose !== "") {
            axios.post(`${config.baseUrl}/api/user/request-live-access`, {
                token: token,
            })
            .then(response => {
                setSuccess(true);
            })
        }
    }

    return (
        <>
            <div className="p-4 flex items-center gap-4">
                {
                    isLoading ?
                    <>
                        <div className="h-14 aspect-square bg-slate-200 rounded-full"></div>
                        <div className="w-5/12 bg-slate-200 h-4"></div>
                    </>
                    :
                    <>
                    {
                        user.photo === null ?
                        <div className="h-14 aspect-square bg-slate-200 rounded-full flex items-center justify-center">
                            <BiUser color={config.primaryColor} />
                        </div>
                        :
                        <img 
                            src={`${config.baseUrl}/storage/user_photos/${user.photo}`} 
                            alt={user.name} 
                            className="h-14 aspect-square rounded-full object-cover" 
                        />
                    }
                    <div className="text-slate-700 font-bold">{user.name}</div>
                    </>
                }
            </div>
            {
                isLoading ?
                <>
                    <div className="flex justify-center mt-8">
                        <div className="w-5/12 bg-slate-200 h-12"></div>
                    </div>
                    <div className="p-4 mt-8 flex flex-col gap-4">
                        <div className="w-10/12 h-4 bg-slate-200"></div>
                        <div className="w-6/12 h-4 bg-slate-200"></div>
                    </div>
                </>
                :
                <>
                {
                    !isSuccess ?
                    <div className="flex justify-center flex-wrap mt-8">
                        <div className="w-full lfex grow p-4">
                            <Input label={translation.live_auth.purpose_label[lang]} value={purpose} onInput={e => setPurpose(e.currentTarget.value)} multiline />
                        </div>
                        <button className="bg-primary text-white p-3 px-6 text-sm" onClick={() => {
                            submit();
                        }}>
                            {translation.live_auth.request_access[lang]}
                        </button>
                    </div>
                    :
                    <div className="flex flex-col items-center mt-8">
                        <div className="h-12 aspect-square rounded-full bg-green-500 text-white flex items-center justify-center">
                            <BiCheck size={20} />
                        </div>
                        <div className="mt-2">{translation.live_auth.request_access_success[lang]}</div>
                    </div>

                }
                <div className="text-slate-500 text-sm p-4 mt-8">{translation.live_auth.request_access_description[lang]}</div>
                </>
            }
        </>
    )
}

export default RequestLiveAccess