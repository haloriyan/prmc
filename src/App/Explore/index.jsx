import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import RenderVideos from "./RenderVideos";
import RenderAccounts from "./RenderAccounts";
import RenderVacancies from "./RenderVacancies";
import RenderGigs from "./RenderGigs";

const Explore = () => {
    const [lang, setLang] = useLang();
    const [viewing, setViewing] = useState('video');
    
    return (
        <>
            <Header />
            <Sidebar />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-8 pe-8">
                <div className="flex items-center border-b">
                    <div className={`cursor-pointer p-2 px-6 ${viewing === "video" ? "text-slate-700 font-black border-b-2 border-slate-700" : "text-slate-400"}`} onClick={() => setViewing('video')}>
                        {translation.explore.videos[lang]}
                    </div>
                    <div className={`cursor-pointer p-2 px-6 ${viewing === "account" ? "text-slate-700 font-black border-b-2 border-slate-700" : "text-slate-400"}`} onClick={() => setViewing('account')}>
                        {translation.explore.acccounts[lang]}
                    </div>
                    <div className={`cursor-pointer p-2 px-6 ${viewing === "vacancy" ? "text-slate-700 font-black border-b-2 border-slate-700" : "text-slate-400"}`} onClick={() => setViewing('vacancy')}>
                        {translation.explore.vacancy[lang]}
                    </div>
                    <div className={`cursor-pointer p-2 px-6 ${viewing === "gigs" ? "text-slate-700 font-black border-b-2 border-slate-700" : "text-slate-400"}`} onClick={() => setViewing('gigs')}>
                        Gigs
                    </div>
                </div>

                <div className="h-8"></div>

                {
                    viewing === "video" &&
                    <RenderVideos />
                }
                {
                    viewing === "account" &&
                    <RenderAccounts />
                }
                {
                    viewing === "vacancy" &&
                    <RenderVacancies />
                }
                {
                    viewing === "gigs" &&
                    <RenderGigs />
                }
            </div>
        </>
    )
}

export default Explore