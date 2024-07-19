import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MdWest } from "react-icons/md";
import config from "../../config";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { BiCheck, BiEdit, BiMapPin, BiTrash, BiUser, BiX } from "react-icons/bi";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import Currency from "../../components/Currency";
import Popup from "../../components/Popup";

const GigsDetail = () => {
    const { id } = useParams();
    const [lang, setLang] = useLang();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [gig, setGig] = useState(null);
    const navigate = useNavigate();
    const [isDeleting, setDeleting] = useState(false);

    const user = JSON.parse(window.localStorage.getItem('user_data'));

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/service/${id}/detail`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setGig(res.gig);
            })
        }
    }, [isLoading, triggerLoading]);

    const del = () => {
        axios.post(`${config.baseUrl}/api/service/delete`, {
            id: gig.id,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            navigate(-1);
        });
    }

    return (
        <>
            <Header />
            <Sidebar active={'gigs'} />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-12 pe-8 mobile:p-8 flex flex-col">
                <div className="text-sm text-slate-700 flex items-center gap-4 cursor-pointer" onClick={() => navigate(-1)}>
                    <MdWest />
                    <div>kembali</div>
                </div>
                <div className="flex mobile:flex-col gap-8 mt-4">
                    <div className="w-6/12 mobile:w-full">
                        {
                            isLoading ?
                            <div className="bg-slate-200 w-full aspect-video rounded-lg"></div>
                            :
                            <img 
                                src={`${config.baseUrl}/storage/service_images/${gig.cover}`} 
                                alt={gig.title} 
                                className="w-full aspect-video rounded-lg object-cover"
                            />
                        }
                        {
                            isLoading ?
                            <div className="flex flex-col gap-4">
                                <div className="h-4"></div>
                                <div className="bg-slate-200 w-10/12 h-10"></div>
                                <div className="h-4"></div>
                                <div className="bg-slate-200 h-6 w-6/12"></div>
                                <div className="bg-slate-200 h-6 w-11/12"></div>
                                <div className="bg-slate-200 h-6 w-7/12"></div>
                            </div>
                            :
                            <div className="flex flex-col gap-4">
                                <div className="h-4"></div>
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-700 text-3xl font-black flex-grow">{gig.title}</div>
                                    {
                                        gig.location &&
                                        <div className="flex gap-2 items-center text-sm text-slate-500">
                                            <BiMapPin />
                                            {gig.location}
                                        </div>
                                    }
                                </div>
                                <div className="text-slate-600">{gig.description}</div>
                                <Link to={`/@${gig.user.username}`} className="flex gap-4 items-center">
                                    {
                                        gig.user.photo === null ?
                                        <div className="bg-slate-200 h-12 aspect-square rounded-full flex items-center justify-center">
                                            <BiUser color={config.primaryColor} />
                                        </div>
                                        :
                                        <img 
                                            src={`${config.baseUrl}/storage/user_photos/${gig.user.photo}`}
                                            alt={gig.user.name}
                                            className="h-12 aspect-square rounded-full object-cover"
                                        />
                                    }
                                    <div className="flex flex-col grow">
                                        <div className="text-slate-700 font-bold">{gig.user.name}</div>
                                        <div className="text-slate-500 text-xs">{gig.user.followers_count} {translation.profile.followers[lang]}</div>
                                    </div>
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-4 w-6/12 mobile:w-full">
                        {
                            isLoading ?
                            <div className="bg-slate-200 w-full aspect-video"></div>
                            :
                            gig.packages.map((pak, p) => (
                                <div key={p} className="cursor-pointer p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="text-slate-700 font-bold text-xl flex grow">{pak.name}</div>
                                        <div className="text-slate-500 text-sm">{Currency(pak.price).encode()}</div>
                                    </div>
                                    <div className="text-slate-600 mt-4">{pak.description}</div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        {
                                            JSON.parse(pak.benefits).map((ben, b) => (
                                                <div key={b} className="flex items-center gap-2 text-slate-700">
                                                    <BiCheck color="#2ecc71" />
                                                    {ben}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 justify-end">
                                        {
                                            gig.phone &&
                                            <button className="p-2 px-4 text-primary border-primary border text-sm" onClick={() => {
                                                window.open(`https://wa.me/${gig.phone}?text=${translation.services.template[lang]} ${pak.name} ${translation.services.from[lang]} ${gig.title}`, '_blank')
                                            }}>
                                                Whatsapp
                                            </button>
                                        }
                                        <button className="p-2 px-4 text-white bg-primary border border-primary text-sm" onClick={() => {
                                            navigate(`/inbox?newChat=${btoa(gig.user.username)}&message=${translation.services.template[lang]} ${pak.name} ${translation.services.from[lang]} ${gig.title}`)
                                        }}>
                                            {translation.general.contact[lang]}
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {
                user?.id === gig?.user_id &&
                <div className="fixed bottom-10 right-10 flex items-center gap-4">
                    <button className="p-3 px-6 text-white font-bold bg-green-500 flex items-center gap-4" onClick={() => navigate(`/gigs/${gig?.id}/edit`)}>
                        <BiEdit />
                        {translation.general.edit[lang]}
                    </button>
                    <button className="p-3 px-6 text-white font-bold bg-red-500 flex items-center gap-4" onClick={() => {
                        setDeleting(true);
                    }}>
                        <BiTrash />
                        {translation.general.delete[lang]}
                    </button>
                </div>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 text-lg font-bold flex grow">
                            {translation.general.delete[lang]} Gig?
                        </div>
                        <div className="h-8 aspect-square border rounded-full flex items-center justify-center cursor-pointer hover:text-primary" onClick={() => setDeleting(false)}>
                            <BiX />
                        </div>
                    </div>
                    
                    <div className="text-slate-600">{translation.general.delete_confirmation[lang]}</div>

                    <div className="flex items-center justify-end pt-4 mt-4 border-t gap-4">
                        <div className="text-slate-500 cursor-pointer" onClick={() => setDeleting(false)}>{translation.general.cancel[lang]}</div>
                        <div className="text-red-500 cursor-pointer font-bold" onClick={del}>{translation.general.delete[lang]}</div>
                    </div>
                </Popup>
            }
        </>
    )
}

export default GigsDetail