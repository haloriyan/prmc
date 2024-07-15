import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import config from "../../config";
import { MdEast, MdWest } from "react-icons/md";
import { BiComment, BiHeart, BiUser } from "react-icons/bi";

const Connect = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [index, setIndex] = useState(0);

    const [page, setPage] = useState(1);
    const [raw, setRaw] = useState(null);

    const next = () => {
        if (index !== users.length - 1) {
            setIndex(index + 1);
        }
    }
    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }
    useEffect(() => {
        if (users.length > 0 && (users.length - index) < 2 && raw?.next_page_url !== null) {
            console.log('next to page : ', page + 1);
            setPage(page + 1);
            setTriggerLoading(true);
            setLoading(true);
        }
    }, [users, raw, index]);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user_data')));
        }
    }, [user]);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/match?page=${page}`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setRaw(res.users);
                console.log(res.users.data.length);
                setUsers(val => [...val, ...res.users.data]);
                setLoading(false);
            })
        }
    }, [triggerLoading, isLoading, user]);

    useEffect(() => {
        const handleKeydown = e => {
            if (e.key === "ArrowRight") {
                next();
                console.log('next from ', index);
            } 
            if (e.key === "ArrowLeft") {
                prev();
                console.log('prev from ', index);
            }
        }

        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown)
    }, [index]);

    useEffect(() => {
        if (users.length > 0 && (users.length - index) < 1 && raw?.next_page_url !== null) {
            console.log('next to page : ', page + 1);
            setPage(page + 1);
            setTriggerLoading(true);
            setLoading(true);
        }
    }, [users, raw, index]);

    return (
        <>
            <Header />
            <Sidebar active={'connect'} />
            <div className="absolute top-16 right-0 w-9/12 py-8 pe-8 mobile:w-full">
                <div className="flex gap-8">
                    {
                        users[index]?.photo === null ?
                        <div className="w-7/12 aspect-square bg-slate-200 rounded-xl flex items-center justify-center">
                            <BiUser size={48} color={config.primaryColor} />
                        </div>
                        :
                        <img 
                            src={`${config.baseUrl}/storage/user_photos/${users[index]?.photo}`}
                            className="w-7/12 aspect-square rounded-xl object-cover" 
                            alt={users[index]?.name} 
                        />
                    }
                    {
                        isLoading ?
                        <div className="flex flex-col w-5/12 gap-2">
                            <div className="w-8/12 h-8 bg-slate-200"></div>
                        </div>
                        :
                        <div className="flex flex-col w-5/12 gap-2">
                            <div className="text-slate-700 font-black text-3xl">{users[index].name}</div>
                            <div className="text-slate-500">{users[index].about}</div>

                            <div className="mt-8 flex justify-center gap-8">
                                <button className="h-20 aspect-square rounded-full flex items-center justify-center bg-slate-200" onClick={prev} style={{
                                    opacity: index > 0 ? 1 : 0.01
                                }}>
                                    <MdWest size={24} />
                                </button>
                                <div className="flex grow"></div>
                                <button className="h-20 aspect-square rounded-full flex items-center justify-center bg-primary text-white">
                                    <BiComment size={24} />
                                </button>
                                <div className="flex grow"></div>
                                <button className="h-20 aspect-square rounded-full flex items-center justify-center bg-slate-200" onClick={next} style={{
                                    opacity: index !== users.length - 1 ? 1 : 0.01
                                }}>
                                    <MdEast size={24} />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Connect