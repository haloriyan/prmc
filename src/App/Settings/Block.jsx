import React, { useEffect, useState } from "react";
import translation from "../../translation.json";
import axios from "axios";
import config from "../../config";
import { BiUser } from "react-icons/bi";
import { MdWest } from "react-icons/md";

const BlockList = ({lang, user, setActive}) => {
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        if (user !== null && isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/user/block/list`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setBlocks(res.blocks);
                setLoading(false);
            });
        }
    }, []);

    const unblock = (blockedID) => {
        axios.post(`${config.baseUrl}/api/user/block/unblock`, {
            token: user.token,
            blocked_id: blockedID,
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            setLoading(true);
            setTriggerLoading(true);
        })
    }

    return (
        <>
            <div className="flex items-center gap-8">
                <div className="cursor-pointer text-primary text-xl" onClick={() => setActive('general')}>
                    <MdWest />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-slate-700">{translation.profile.block_list[lang]}</h2>
                    <div className="text-sm text-slate-500 mt-2">{translation.profile.block_list_description[lang]}</div>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                {
                    blocks.map((blo, b) => (
                        <div className="flex items-center gap-4">
                            {
                                blo.user.photo === null ?
                                <div className="h-12 aspect-square bg-slate-200 rounded-full flex items-center justify-center">
                                    <BiUser />
                                </div>
                                :
                                <img 
                                    src={`${config.baseUrl}/storage/user_photos/${blo.user.photo}`} 
                                    alt={blo.user.username} 
                                    className="h-12 aspect-square bg-slate-200 rounded-full"
                                />
                            }
                            <div className="flex flex-col grow">
                                <div>{blo.user.name}</div>
                            </div>
                            <button className="border border-primary text-primary text-sm p-2 px-4" onClick={() => unblock(blo.id)}>Unblock</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BlockList