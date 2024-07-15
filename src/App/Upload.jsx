import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { BiUpload } from "react-icons/bi";
import useLang from "../hooks/useLang";
import translation from "../translation.json";
import Switch from "../components/Switch";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const [lang, setLang] = useLang();
    const [user, setUser] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [canShare, setCanShare] = useState(true);
    const [canComment, setCanComment] = useState(true);
    const [buttonText, setButtonText] = useState(translation.compose.publish[lang]);
    const [isUploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user_data')))
        }
    }, [user]);

    const inputRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (file !== null && caption !== "") {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [file, caption])

    const submit = () => {
        if (!isUploading && canSubmit) {
            setButtonText(translation.compose.publishing[lang]);
            setUploading(true);

            let formData = new FormData();
            formData.append('token', user.token);
            formData.append('caption', caption);
            formData.append('video', file);
            formData.append('can_be_commented', canComment);
            formData.append('can_be_shared', canShare);

            axios.post(`${config.baseUrl}/api/content/store`, formData)
            .then(response => {
                setUploading(false);
                setButtonText(translation.compose.publish[lang]);
                navigate('/profile')
            })
            .catch(err => {
                console.error(err);
                setButtonText(translation.compose.publish[lang]);
            })
        }
    }

    return (
        <>
            <Header />
            <div className="absolute top-16 left-0 right-0 bottom-0 flex justify-center items-center">
                {
                    file === null ?
                    <div className="h-full w-8/12 flex flex-col gap-4 items-center justify-center relative">
                        <BiUpload size={48} />
                        <div className={'text-slate-500 text-lg'}>Drop your video here</div>
                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{
                            opacity: 0.01
                        }} onChange={e => {
                            let f = e.currentTarget.files[0];
                            let reader = new FileReader();

                            reader.onload = e => {
                                videoRef.current.src = e.target.result;
                            }

                            reader.readAsDataURL(f);
                            setFile(f);
                        }} />
                    </div>
                    :
                    <div className="h-full w-8/12 flex flex-col gap-4 items-center justify-center relative">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-800 z-10">
                            <video ref={videoRef} className="w-full h-full" controls></video>
                        </div>
                        <button className="bg-red-600 text-white p-2 px-6 absolute top-6 right-10 z-20" onClick={() => setFile(null)}>
                            {translation.general.cancel[lang]}
                        </button>
                    </div>
                }
                <div className="h-full flex flex-col p-4 grow border-s">
                    <div className="bg-slate-100 p-2 rounded-lg">
                        <div className="text-sm">Caption</div>
                        <textarea className="w-full h-24 mt-2 text-sm bg-slate-100 outline-0" onInput={e => setCaption(e.currentTarget.value)}></textarea>
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex gap-4 items-center">
                            <div className="flex grow">{translation.compose.allow_sharing[lang]}</div>
                            <Switch active={canShare} setActive={setCanShare} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex grow">{translation.compose.allow_comments[lang]}</div>
                            <Switch active={canComment} setActive={setCanComment} />
                        </div>
                    </div>

                    <button className={`bg-primary w-full h-12 mt-8 text-white ${canSubmit ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={submit}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Upload