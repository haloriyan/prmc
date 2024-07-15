import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import Currency from "../../components/Currency";

const RenderGigs = () => {
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [items, setItems] = useState([]);
    
    const [page, setPage] = useState(1);
    const [raw, setRaw] = useState(null);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/service?page=${page}`)
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
            <div className="flex flex-row flex-wrap mobile:flex-col gap-4 justify-start mobile:ps-4">
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
        </>
    )
}

export default RenderGigs