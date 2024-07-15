import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { MdCategory, MdSchedule, MdWest } from "react-icons/md";
import axios from "axios";
import config from "../config";
import { BiCheck, BiMapPin, BiMoney, BiUser } from "react-icons/bi";
import Currency from "../components/Currency";
import useLang from "../hooks/useLang";
import translation from "../translation.json";

const Vacancy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lang, setLang] = useLang();
    const [vacancy, setVacancy] = useState(null);
    const [user, setUser] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [hasApplied, setHasApplied] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user_data')));
        }
    }, [user]);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            console.log('loading');
            axios.post(`${config.baseUrl}/api/vacancy/${id}/detail`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setVacancy(res.vacancy);
                setApplicants(res.applicants);
                setHasApplied(res.has_applied);
            })
        }
    }, [triggerLoading, isLoading, user]);

    const applyJob = () => {
        axios.post(`${config.baseUrl}/api/vacancy/${vacancy.id}/apply`, {
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setTriggerLoading(true);
        })
    }

    return (
        <>
            <Header />
            <Sidebar active={'job-fair'} />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-8 pe-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="cursor-pointer" onClick={() => navigate(-1)}>
                        <MdWest size={24} />
                    </div>
                    {
                        isLoading ?
                        <div className="flex grow bg-slate-200 h-8"></div>
                        :
                        <div className="text-slate-700 text-3xl font-black flex grow">{vacancy.title}</div>
                    }
                    {
                        isLoading ?
                        <div className="flex grow bg-slate-200 h-8"></div>
                        :
                        <>
                            {
                                vacancy.user_id === user.id ?
                                <>
                                {/* is mine */}
                                {
                                    applicants.length === 0 &&
                                    <div className="flex gap-4">
                                        <button className="p-2 px-6 bg-green-500 text-white">
                                            Edit
                                        </button>
                                    </div>
                                }
                                </>
                                :
                                <>
                                {/* not mine */}
                                {
                                    hasApplied ?
                                    <div className="flex gap-4 items-center">
                                        <BiCheck color="#2ecc71" size={32} />
                                        <div className="text-slate-700">{translation.job_match.applied[lang]}</div>
                                    </div>
                                    :
                                    <button className="p-2 px-6 text-white bg-primary" onClick={applyJob}>
                                        {translation.job_match.apply[lang]}
                                    </button>
                                }
                                </>
                            }
                        </>
                    }
                </div>

                {
                    isLoading ?
                    <div className="flex items-center gap-8">
                        <div className="flex grow h-24 bg-slate-200"></div>
                        <div className="flex grow h-24 bg-slate-200"></div>
                        <div className="flex grow h-24 bg-slate-200"></div>
                        <div className="flex grow h-24 bg-slate-200"></div>
                    </div>
                    :
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col grow gap-4 p-6 rounded-lg border justify-center">
                            <div className="flex items-center gap-2">
                                <BiMapPin size={14} />
                                <div className="text-slate-500 text-xs">{translation.general.location[lang]}</div>
                            </div>
                            <div className="text-slate-700">{vacancy.location}</div>
                        </div>
                        <div className="flex flex-col grow gap-4 p-6 rounded-lg border justify-center">
                            <div className="flex items-center gap-2">
                                <BiMoney size={14} />
                                <div className="text-slate-500 text-xs">{translation.job_match.salary[lang]}</div>
                            </div>
                            <div className="text-slate-700">{Currency(vacancy.salary).encode()}</div>
                        </div>
                        <div className="flex flex-col grow gap-4 p-6 rounded-lg border justify-center">
                            <div className="flex items-center gap-2">
                                <MdSchedule size={14} />
                                <div className="text-slate-500 text-xs">{translation.job_match.work_type[lang]}</div>
                            </div>
                            <div className="text-slate-700">{vacancy.type}</div>
                        </div>
                        <div className="flex flex-col grow gap-4 p-6 rounded-lg border justify-center">
                            <div className="flex items-center gap-2">
                                <MdCategory size={14} />
                                <div className="text-slate-500 text-xs">{translation.job_match.industry_sector[lang]}</div>
                            </div>
                            <div className="text-slate-700">{vacancy.industry}</div>
                        </div>
                    </div>
                }

                <div className="h-12"></div>

                {
                    isLoading ?
                    <div className="flex flex-col gap-4">
                        <div className="w-5/12 h-8 bg-slate-200"></div>
                        <div className="w-8/12 h-8 bg-slate-200"></div>
                        <div className="w-5/12 h-8 bg-slate-200"></div>
                        <div className="w-7/12 h-8 bg-slate-200"></div>
                        <div className="w-9/12 h-8 bg-slate-200"></div>
                    </div>
                    :
                    <>
                        <div className="text-slate-500 text-xs">{translation.general.description[lang]}</div>
                        <pre className="mt-4">{vacancy.description}</pre>
                    </>
                }

                <div className="h-12"></div>

                {
                    !isLoading &&
                    <>
                    {
                        vacancy.user_id === user.id ?
                        <>
                            <div className="text-slate-500 text-xs">{translation.job_match.applicants[lang]}</div>
                            <div className="flex mobile:flex-col gap-4 mt-4 flex-wrap">
                                {
                                    applicants.map((app, a) => (
                                        <Link to={`/@${app.user.username}`} className="flex gap-4 grow items-center w-2/12" key={a}>
                                            {
                                                app.user.photo === null ?
                                                <div className="h-12 aspect-square rounded-full flex items-center justify-center bg-slate-200">
                                                    <BiUser color={config.primaryColor} />
                                                </div>
                                                :
                                                <img 
                                                    src={`${config.baseUrl}/storage/user_photos/${app.user.photo}`}
                                                    alt={app.user.name} 
                                                    className="h-12 aspect-square rounded-full object-cover"
                                                />
                                            }
                                            <div className="flex flex-col grow">
                                                <div className="text-slate-700 font-bold">{app.user.name}</div>
                                                <div className="text-slate-500 text-xs">{app.user.followers_count} {translation.profile.followers[lang]}</div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </>
                    :
                    <div className="flex items-center gap-4">
                        {
                            vacancy.user.photo === null ?
                            <div className="h-12 aspect-square rounded-full flex items-center justify-center bg-slate-200">
                                <BiUser color={config.primaryColor} />
                            </div>
                            :
                            <img 
                                src={`${config.baseUrl}/storage/user_photos/${vacancy.user.photo}`}
                                alt={vacancy.user.name} 
                                className="h-12 aspect-square rounded-full object-cover"
                            />
                        }
                        <div className="flex flex-col grow">
                            <div className="text-slate-700 font-bold">{vacancy.user.name}</div>
                            <div className="text-slate-500 text-xs">{vacancy.user.followers_count} {translation.profile.followers[lang]}</div>
                        </div>
                    </div>
                    }
                    </>
                }
            </div>
        </>
    )
}

export default Vacancy