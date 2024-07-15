import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import { Link, useSearchParams } from "react-router-dom";
import Substring from "../../components/Substring";
import { BiUser } from "react-icons/bi";

const RenderVideos = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [videos, setVideos] = useState([]);

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
                setVideos(res.contents);
            })
        }
    }, [isLoading, triggerLoading]);

    return (
        <>
            <div className="flex flex-wrap gap-4">
                {
                    videos.map((vid, v) => (
                        <Link to={`/video/${vid.id}`} key={v} className="flex flex-col gap-2 grow w-2/12">
                            <img src={`${config.baseUrl}/storage/video_thumbs/${vid.thumbnail}`} alt={vid.caption} className="w-full rounded-lg object-cover" style={{
                                aspectRatio: 9/16,
                            }} />
                            <div className="text-slate-500 text-sm">{Substring(vid.caption + " semuanya apakabar semoga sehat selalu ya guys", 50)}</div>
                            <div className="flex gap-2 items-center">
                                {
                                    vid.user.photo === null ?
                                    <div className="h-8 aspect-square rounded-full flex items-center justify-center bg-slate-100">
                                        <BiUser color={config.primaryColor} />
                                    </div>
                                    :
                                    <img src={`${config.baseUrl}/storage/user_photos/${vid.user.photo}`} alt={vid.user.name} className="h-8 aspect-square rounded-full object-cover" />
                                }
                                <div className="text-slate-700 text-xs">{vid.user.name}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default RenderVideos;