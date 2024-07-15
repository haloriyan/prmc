import React, { useState } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import Currency from "../../components/Currency";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";

const RenderProfileGigs = ({profile}) => {
    const [lang, setLang] = useLang();
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    
    return (
        <div className="mt-8 pe-8 mobile:pe-0">
            {
                user?.id === profile.id &&
                <div className="flex justify-end">
                    <Link to={'/gigs/add'} className="p-2 px-6 bg-primary text-white">
                        {translation.general.add[lang]}
                    </Link>
                </div>
            }
            <div className="flex gap-4 flex-wrap">
            {
                profile.services.map((gig, g) => (
                    <Link to={`/gigs/${gig.id}`} key={g} className="border p-4 rounded-lg max-w-72">
                        <img 
                            src={`${config.baseUrl}/storage/service_images/${gig.cover}`} 
                            alt={gig.title} 
                            className="w-full rounded-lg object-cover aspect-video" 
                        />
                        <div className="text-slate-600 mt-4">{gig.title}</div>
                        <div className="text-slate-500 text-xs">{Currency(gig.price).encode()}</div>
                    </Link>
                ))
            }
            </div>
        </div>
    )
}

export default RenderProfileGigs