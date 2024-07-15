import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useLang from "../../hooks/useLang";
import { BiFilter, BiMapPin, BiMoney, BiPlus, BiUser, BiX } from "react-icons/bi";
import translation from "../../translation.json";
import Popup from "../../components/Popup";
import TitleAdmin from "../../Partials/TitleAdmin";
import Button from "../../components/Button";
import config from "../../config";
import Industries from "../../Industries";
import axios from "axios";
import Currency from "../../components/Currency";
import { MdCategory, MdSchedule } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const JobFair = () => {
    const [lang, setLang] = useLang();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [industry, setIndustry] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [raw, setRaw] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/vacancy?page=${page}`, {
                industry, type,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.datas);

                let ites = [...items];
                res.datas.data.map(item => ites.push(item));
                setItems(ites);
            })
        }
    }, [isLoading]);

    return (
        <>
            <Header />
            <Sidebar active="job-fair" />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full">
                <div className="flex items-center gap-4 p-4 pe-8 mobile:pe-4">
                    <div className="flex items-center mobile:overflow-x-scroll gap-4 grow">
                        {
                            type !== "" &&
                            <div className="p-2 px-4 rounded-full bg-slate-100 text-slate-700 text-sm mobile:text-xs flex items-center gap-2">
                                {type}
                                <div className="cursor-pointer" onClick={() => {
                                    setType('');
                                    setItems([]);
                                    setLoading(true);
                                }}>
                                    <BiX />
                                </div>
                            </div>
                        }
                        {
                            industry !== "" &&
                            <div className="p-2 px-4 rounded-full bg-slate-100 text-slate-700 text-sm mobile:text-xs flex items-center gap-2">
                                {industry}
                                <div className="cursor-pointer" onClick={() => {
                                    setIndustry('');
                                    setItems([]);
                                    setLoading(true);
                                }}>
                                    <BiX />
                                </div>
                            </div>
                        }
                    </div>
                    <button className="bg-white text-slate-700 hover:text-primary border p-2 px-4 flex items-center gap-4" onClick={() => setShowFilter(true)}>
                        <BiFilter />
                        Filter
                    </button>
                </div>
                <div className="flex flex-row mobile:flex-col gap-4 justify-start pe-8 mobile:pe-4 mobile:ps-4">
                    {
                        items.map((item, i) => (
                            <Link to={`/vacancy/${item.id}`} key={i} className="p-4 border rounded-lg flex flex-col w-3/12 mobile:w-full grow">
                                <div className="text-slate-700 font-black text-lg">{item.title}</div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <BiMapPin />
                                        <div>{item.location}</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <BiMoney />
                                        <div>{Currency(item.salary).encode()}</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MdSchedule />
                                        <div>{item.type}</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MdCategory />
                                        <div>{item.industry}</div>
                                    </div>
                                </div>
                                <div className="border-t mt-6 pt-4 flex gap-4 items-center">
                                    {
                                        item.user.photo === null ?
                                        <div className="h-10 aspect-square bg-slate-100 rounded-full flex items-center justify-center">
                                            <BiUser />
                                        </div>
                                        :
                                        <img 
                                            src={`${config.baseUrl}/storage/user_photos/${item.user.photo}`}
                                            alt={item.user.name}
                                            className="h-10 aspect-square rounded-full object-cover"
                                        />
                                    }
                                    <div className="flex flex-col">
                                        <div className="text-slate-700 font-bold">{item.user.name}</div>
                                        <div className="text-slate-500 text-xs">
                                            {item.user.followers_count} {translation.profile.followers[lang]}
                                        </div>
                                    </div>
                                </div>
                                {/* <div>{JSON.stringify(item)}</div> */}
                            </Link>
                        ))
                    }
                </div>
            </div>

            {
                showFilter &&
                <Popup onDismiss={() => setShowFilter(false)}>
                    <TitleAdmin
                        title="Filter"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setShowFilter(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div className="text-slate-700 mb-2 mt-4">Job Type</div>
                    <div className="flex flex-wrap gap-4 items-center">
                        {
                            config.job_types.map((ty, t) => (
                                <div key={t} className={`cursor-pointer text-sm border p-2 px-4 ${ty === type ? 'border-primary text-primary' : 'text-slate-700'}`} onClick={() => setType(ty)}>
                                    {ty}
                                </div>
                            ))
                        }
                    </div>

                    <div className="text-slate-700 mb-2 mt-8">Industry Sector</div>
                    <div className="flex flex-wrap gap-4 items-center">
                        {
                            Industries.map((ind, i) => (
                                <div key={i} className={`cursor-pointer flex items-center gap-2 text-sm border p-2 px-4 ${ind.name === industry ? 'border-primary text-primary' : 'text-slate-700'}`} onClick={() => setIndustry(ind.name)}>
                                    <img src={ind.image} alt={ind.name} className="h-6 aspect-square" />
                                    {ind.name}
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex justify-center mt-8">
                        <button className="bg-primary p-2 px-4 text-white w-full h-14" onClick={() => {
                            setItems([]);
                            setLoading(true);
                            setShowFilter(false);
                        }}>
                            {translation.job_match.apply_filters[lang]}
                        </button>
                    </div>
                </Popup>
            }

            <button onClick={() => navigate(`/vacancy/add`)} className="bg-primary text-white fixed bottom-10 right-10 h-14 aspect-square rounded-full flex items-center justify-center">
                <BiPlus />
            </button>
        </>
    )
}

export default JobFair