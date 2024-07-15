import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { BiFilter, BiX } from "react-icons/bi";
import TitleAdmin from "../../Partials/TitleAdmin";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import config from "../../config";
import Industries from "../../Industries";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import { Link } from "react-router-dom";
import Currency from "../../components/Currency";
import axios from "axios";

const Gigs = () => {
    const [lang, setLang] = useLang();
    const [type, setType] = useState('');
    const [industry, setIndustry] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [raw, setRaw] = useState(null);
    const [page, setPage] = useState(1);

    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/service?page=${page}`, {
                industry,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.datas);
                let ggs = [...items];
                res.datas.data.map(item => ggs.push(item));
                setItems(ggs);
            })
        }
    }, [isLoading, triggerLoading]);

    return (
        <>
            <Header />
            <Sidebar active={'gigs'} />
            <div className="absolute top-16 right-0 w-9/12 py-8 pe-8 mobile:w-full">
                <div className="flex items-center gap-4 p-4 pe-8 mobile:pe-4">
                    <div className="flex items-center mobile:overflow-x-scroll gap-4 grow">
                        {
                            industry !== "" &&
                            <div className="p-2 px-4 rounded-full bg-slate-100 text-slate-700 text-sm mobile:text-xs flex items-center gap-2">
                                {industry}
                                <div className="cursor-pointer" onClick={() => {
                                    setIndustry('');
                                    setItems([]);
                                    setLoading(true);
                                    setTriggerLoading(true);
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
                            <Link to={`/gigs/${item.id}`} key={i} className="p-4 border rounded-lg flex flex-col gap-2 basis-56 max-w-lg mobile:w-full grow">
                                <img src={`${config.baseUrl}/storage/service_images/${item.cover}`} alt={item.title} className="w-full aspect-video rounded-lg object-cover" />
                                <div className="text-slate-700 font-bold mt-4">{item.title}</div>
                                <div className="text-slate-500 text-sm">{Currency(item.price).encode()}</div>
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
                            setTriggerLoading(true);
                            setShowFilter(false);
                        }}>
                            {translation.job_match.apply_filters[lang]}
                        </button>
                    </div>
                </Popup>
            }
        </>
    )
}

export default Gigs