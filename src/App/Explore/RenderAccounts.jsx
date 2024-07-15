import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import config from "../../config";
import { BiUser } from "react-icons/bi";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import Substring from "../../components/Substring";

const RenderAccounts = () => {
    const [lang, setLang] = useLang();
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);

    const [q, setQ] = useState(searchParams.get('q'));

    useEffect(() => {
        setQ(searchParams.get('q'));
        setLoading(true);
        setTriggerLoading(true);
    }, [searchParams]);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/page/explore`, {
                q: q,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setAccounts(res.accounts);
            })
        }
    }, [isLoading, triggerLoading]);

    return (
        <div className="flex flex-col">
            {
                accounts.map((acc, a) => (
                    <Link to={`/@${acc.username}`} key={a} className="flex items-center gap-4 p-4">
                        {
                            acc.photo === null ?
                            <div className="h-16 aspect-square rounded-full flex items-center justify-center bg-slate-100">
                                <BiUser color={config.primaryColor} />
                            </div>
                            :
                            <img src={`${config.baseUrl}/storage/user_photos/${acc.photo}`} alt={acc.name} className="h-16 aspect-square rounded-full object-cover" />
                        }
                        <div className="flex flex-col grow gap-2">
                            <div className="flex items-center gap-4">
                                <div className="text-slate-700 font-bold">{acc.name}</div>
                                <div className="text-slate-500 text-xs">{acc.followers_count} {translation.profile.followers[lang]}</div>
                            </div>
                            {
                                acc.about &&
                                <div className="text-slate-700 text-sm">{Substring(acc.about, 45)}</div>
                            }
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default RenderAccounts;