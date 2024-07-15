import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import config from "../../config";
import Currency from "../../components/Currency";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import { BiMapPin, BiMoney, BiUser } from "react-icons/bi";
import { MdCategory, MdSchedule } from "react-icons/md";

const RenderVacancies = () => {
    const [lang, setLang] = useLang();
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [items, setItems] = useState([]);

    const [q, setQ] = useState(searchParams.get('q'));
    const [page, setPage] = useState(1);

    useEffect(() => {
        setQ(searchParams.get('q'));
        setItems([]);
        setLoading(true);
        setTriggerLoading(true);
    }, [searchParams]);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/vacancy?page=${page}`, {
                q
            })
            .then(response => {
                let res = response.data;
                setLoading(false);

                let ites = [...items];
                res.datas.data.map(item => ites.push(item));
                setItems(ites);
            })
        }
    }, [isLoading, triggerLoading]);

    return (
        <div className="flex flex-row mobile:flex-col gap-4 justify-start mobile:ps-4">
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
    )
}

export default RenderVacancies