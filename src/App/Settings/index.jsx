import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BiCertification, BiCog, BiSolidGraduation } from "react-icons/bi";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import GeneralSettings from "./General";
import EducationSettings from "./Education";
import BlockList from "./Block";
import { MdHandyman, MdWest } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SkillSettings from "./Skill";
import CertificateSettings from "./Certificate";

const Settings = () => {
    const [lang, setLang] = useLang();
    const isMobile = window.screen.width <= 480;
    const [active, setActive] = useState('general');
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (message !== null) {
            let to = setTimeout(() => {
                setMessage(null);
            }, 5540);
            return () => clearTimeout(to);
        }
    }, [message]);
    
    return (
        <>
            <Header />
            <div className={`fixed left-0 bottom-0 flex z-40 bg-white ${isMobile ? 'w-full right-0 flex-row border-t p-2' : 'w-3/12 p-4 top-16 flex-col'}`}>
                <div className="flex items-center gap-8 mb-6 mt-2">
                    <div className="cursor-pointer text-primary text-2xl" onClick={() => navigate(-1)}>
                        <MdWest />
                    </div>
                    <h2 className="text-2xl font-black text-slate-700">{translation.profile.settings[lang]}</h2>
                </div>
                <div className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg text-slate-700 ${(active === 'general' || active === "block") ? 'text-white bg-primary font-bold' : ''} ${isMobile ? 'grow' : ''}`} onClick={() => setActive('general')}>
                    <BiCog size={20} />
                    {!isMobile && <div>General</div>}
                </div>
                <div className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg text-slate-700 ${active === 'education' ? 'text-white bg-primary font-bold' : ''} ${isMobile ? 'grow' : ''}`} onClick={() => setActive('education')}>
                    <BiSolidGraduation size={20} />
                    {!isMobile && <div>{translation.profile.education[lang]}</div>}
                </div>
                <div className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg text-slate-700 ${active === 'certification' ? 'text-white bg-primary font-bold' : ''} ${isMobile ? 'grow' : ''}`} onClick={() => setActive('certification')}>
                    <BiCertification size={20} />
                    {!isMobile && <div>{translation.profile.certification[lang]}</div>}
                </div>
                <div className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg text-slate-700 ${active === 'skill' ? 'text-white bg-primary font-bold' : ''} ${isMobile ? 'grow' : ''}`} onClick={() => setActive('skill')}>
                    <MdHandyman size={20} />
                    {!isMobile && <div>{translation.profile.skills[lang]}</div>}
                </div>
            </div>
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full p-8 mobile:p-8 flex flex-col">
                {
                    active === "general" &&
                    <GeneralSettings lang={lang} user={user} setMessage={setMessage} setLang={setLang} setActive={setActive} />
                }
                {
                    active === "education" &&
                    <EducationSettings lang={lang} user={user} setMessage={setMessage} />
                }
                {
                    active === "block" &&
                    <BlockList lang={lang} user={user} setMessage={setMessage} setActive={setActive} />
                }
                {
                    active === "skill" &&
                    <SkillSettings lang={lang} user={user} setMessage={setMessage} setActive={setActive} />
                }
                {
                    active === "certification" &&
                    <CertificateSettings lang={lang} user={user} setMessage={setMessage} setActive={setActive} />
                }
            </div>

            {
                message !== null &&
                <div className="fixed bottom-10 right-10">
                    <div className={`text-white p-4 rounded ${message.status === 200 ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message.body}
                    </div>
                </div>
            }
        </>
    )
}

export default Settings