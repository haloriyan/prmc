import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import config from "../../config";
import { BiComment, BiUser, BiX } from "react-icons/bi";
import moment from "moment";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import { useSearchParams } from "react-router-dom";
import Popup from "../../components/Popup";
import Input from "../../components/Input";
import InArray from "../../components/InArray";

const Inbox = () => {
    const [lang, setLang] = useLang();
    const [rooms, setRooms] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [newChat, setNewChat] = useState(searchParams.get('newChat'));
    const [isLoadingUser, setLoadingUser] = useState(
        newChat ? true : false
    );
    const [isComposing, setComposing] = useState(false);

    const [raw, setRaw] = useState(null);
    const [chats, setChats] = useState([]);
    const [body, setBody] = useState(searchParams.get('message'));

    useEffect(() => {
        if (isLoadingUser) {
            setLoadingUser(false);
            axios.post(`${config.baseUrl}/api/user/${newChat}/profile`)
            .then(response => {
                let res = response.data;
                setNewChat(res.user);
                searchParams.delete('newChat');
                setSearchParams(searchParams);
                setComposing(true);
                setRoom({
                    user: res.user,
                });
            })
        }
    }, [isLoadingUser, newChat]);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user_data')));
        }
    }, [user]);

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (user !== null) {
                axios.post(`${config.baseUrl}/api/chat/room`, {
                    token: user.token,
                })
                .then(response => {
                    let res = response.data;
                    setRooms(res.rooms);
                    setLoading(false);
                })
            }
        }, 1500);

        return () => clearInterval(intervalId);
    }, [user]);

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (room !== null) {
                axios.post(`${config.baseUrl}/api/chat/load`, {
                    token: user.token,
                    target_id: room.user.id,
                })
                .then(response => {
                    let res = response.data;
                    setRaw(res.chats);
                    let theChats = res.chats.data.reverse();
                    let realChats = [];
                    let d = [];
                    let today = moment();

                    theChats.map((ch, c) => {
                        let thisYear = moment().format('Y') === moment(ch.created_at).format('Y');
                        let chDt = moment(ch.created_at);
                        let dateFormat = thisYear ? 'DD MMM' : 'DD MMM Y';
                        let chDate = today.isSame(chDt, 'day') ?
                            translation.general.today[lang]
                        : today.isSame(chDt, 'day', 'subtract') ?
                            translation.general.yesterday[lang]
                        :   chDt.format(dateFormat);
                        
                        if (InArray(chDate, d)) {
                            let dateIndex = d.indexOf(chDate);
                            realChats[dateIndex].items.push(ch)
                        } else {
                            realChats.push({
                                the_date: chDate,
                                items: [ch]
                            })
                            d.push(chDate)
                        }
                    });

                    setChats(realChats);
                })
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [room]);

    const send = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('receiver_username', room.user.username)
        formData.append('type', 'text');
        formData.append('body', body);

        axios.post(`${config.baseUrl}/api/chat/send`, formData)
        .then(response => {
            let res = response.data;
            setBody('');
            setComposing(false);
        })
    }

    return (
        <>
            <Header />
            {
                room === null &&
                <div className="fixed right-0 bottom-0 top-16 w-8/12 mobile:w-full flex flex-col items-center justify-center gap-4">
                    <BiComment size={128} color={`${config.primaryColor}80`} />
                    <div className="text-slate-600 text-xl">{translation.inbox.initial_message[lang]}</div>
                </div>
            }
            {
                (room !== null && !isComposing) &&
                <div className="fixed right-0 bottom-0 h-16 w-8/12 mobile:w-full flex items-center gap-4 border-t">
                    <form className="m-0 p-0 flex grow" onSubmit={send}>
                        <input type="text" value={body} className="flex grow h-16 px-8 outline-0" placeholder="Ketik pesan..." onInput={e => setBody(e.currentTarget.value)} />
                    </form>
                </div>
            }
            <div className="fixed right-0 bottom-16 top-16 w-8/12 mobile:w-full overflow-y-scroll p-8 flex flex-col gap-4">
                {
                    chats.map((ch, i) => (
                        <>
                            <div key={i} className="flex items-center justify-center">
                                <div className="p-2 px-4 bg-slate-200 rounded-full text-xs">
                                    {ch.the_date}
                                </div>
                            </div>
                            {
                                ch.items.map((chat, c) => (
                                    <div key={c} className={`flex ${chat.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`rounded-lg p-6 mobile:p-4 w-8/12 ${chat.sender_id === user.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                                            <div className="mobile:text-sm">{chat.body}</div>
                                            <div className="flex justify-end text-xs">
                                                {moment(chat.created_at).format('HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ))
                }
            </div>
            {
                (window.screen.width < 480 && room !== null) &&
                <div className="fixed top-0 left-0 right-0 h-16 bg-white z-50 border-b flex items-center gap-4 px-4">
                    {
                        room.user.photo === null ?
                        <div className="h-12 aspect-square rounded-full bg-slate-100 flex items-center justify-center">
                            <BiUser />
                        </div>
                        :
                        <img 
                            src={`${config.baseUrl}/storage/user_photos/${room.user.photo}`} 
                            alt={room.user.name} 
                            className="h-12 aspect-square rounded-full"
                        />
                    }
                    <div className="flex gap-2 grow">
                        <div className="text-slate-700 font-bold">{room.user.name}</div>
                    </div>
                    <div className="h-12 aspect-square text-slate-700 flex items-center justify-center" onClick={() => setRoom(null)}>
                        <BiX size={22} />
                    </div>
                </div>
            }
            {
                (
                    (window.screen.width > 480) ||
                    (window.screen.width < 480 && room === null)
                )
                &&
                <div className={`fixed left-0 bottom-0 top-16 w-4/12 mobile:w-full bg-white border-e`}>
                    {
                        rooms.map((roo, r) => (
                            <div key={r} className={`p-4 px-8 mobile:p-4 flex items-center gap-4 cursor-pointer ${room?.id === roo.id ? 'bg-primary text-white' : ''}`} onClick={() => setRoom(roo)}>
                                {
                                    roo.user.photo === null ?
                                    <div className="h-14 aspect-square rounded-full bg-slate-300 object-cover flex items-center justify-center">
                                        <BiUser size={24} color={config.primaryColor} />
                                    </div>
                                    :
                                    <img 
                                        src={`${config.baseUrl}/storage/user_photos/${roo.user.photo}`} 
                                        alt={roo.user.name} 
                                        className="h-14 aspect-square rounded-full bg-slate-300 object-cover" 
                                    />
                                }
                                <div className="flex flex-col grow gap-2">
                                    <div className={`${room?.id === roo.id ? 'text-white' : 'text-slate-700'} font-black`}>{roo.user.name}</div>
                                    <div className={`${room?.id === roo.id ? 'text-white' : 'text-slate-500'} text-sm`}>{roo.body}</div>
                                </div>
                                <div className="text-xs text-slate-400">
                                    {moment(roo.created_at).format('HH:mm')}
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            {
                isComposing &&
                <Popup onDismiss={() => setComposing(false)}>
                    <div className="flex items-center gap-4 flex-wrap">
                    {/* http://localhost:3000/inbox?newChat=Z2Qua3Jvbmlr */}
                        {
                            newChat.photo === null ?
                            <div className="h-14 aspect-square rounded-full bg-slate-300 object-cover flex items-center justify-center">
                                <BiUser size={24} color={config.primaryColor} />
                            </div>
                            :
                            <img 
                                src={`${config.baseUrl}/storage/user_photos/${newChat.photo}`} 
                                alt={newChat.name} 
                                className="h-14 aspect-square rounded-full bg-slate-300 object-cover" 
                            />
                        }
                        <div className="flex flex-col grow">
                            <div className="text-slate-500 text-sm">{translation.inbox.send_to[lang]}</div>
                            <div className="text-slate-700 font-bold text-lg">{newChat.name}</div>
                        </div>
                        <div className="h-12 border text-slate-700 flex items-center justify-center aspect-square rounded-full cursor-pointer" onClick={() => setComposing(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form className="mt-4" onSubmit={send}>
                        <Input label={translation.inbox.message[lang]} value={body} onInput={e => setBody(e.currentTarget.value)} required multiline />
                        <div className="flex items-center justify-end mt-4">
                            <button className="bg-primary text-white p-2 px-4">
                                {translation.general.send[lang]}
                            </button>
                        </div>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Inbox;