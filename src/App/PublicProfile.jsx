import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { BiCheck, BiListCheck, BiPlay, BiShoppingBag, BiUser } from "react-icons/bi";
import RenderProfileContent from "./Profile/RenderProfileContent";
import RenderProfileInfo from "./Profile/RenderProfileInfo";
import useLang from "../hooks/useLang";
import translation from "../translation.json";
import RenderProfileGigs from "./Profile/RenderProfileGigs";

const PublicProfile = () => {
    const { username } = useParams();
    const [lang, setLang] = useLang();
    const [profile, setProfile] = useState(null);
    const [contents, setContents] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [viewing, setViewing] = useState('content');
    
    const [isFollowed, setFollowed] = useState(false);
    const [isBlocked, setBlocked] = useState(false);

    useEffect(() => {
        if (user === null) {
            let u = JSON.parse(window.localStorage.getItem('user_data'));
            setUser(u);
        }
    }, [user]);

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${btoa(username.slice(1))}/profile`, {
                with: 'following_status,follower_status,experiences,skills,certificates.skill,educations,services.packages',
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setProfile(res.user);
                setContents(res.contents);
                setFollowed(res.user.following_status !== null);
            })
        }
    }, [isLoading, user]);

    const blockUser = () => {
        axios.post(`${config.baseUrl}/api/user/block`, {
            blocked_id: profile.id,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            setBlocked(true);
        })
    }

    const follow = () => {
        axios.post(`${config.baseUrl}/api/user/${profile.username}/follow`, {
            token: user.token
        })
        .then(response => {
            let res = response.data;
            let theProfile = {...profile};
            
            if (res.action === "follow") {
                setFollowed(true);
                theProfile['followers_count'] += 1;
            } else {
                setFollowed(false);
                theProfile['followers_count'] -= 1;
            }
            setProfile(theProfile)
        })
    }

    return (
        <>
            <Header />
            <Sidebar />
            {
                profile !== null &&
                <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-12 mobile:p-8 flex flex-col">
                    <div className="flex flex-wrap gap-6">
                        {
                            profile.photo === null ?
                            <div className="h-36 mobile:h-28 aspect-square flex items-center justify-center rounded-full bg-slate-200">
                                <BiUser color={config.primaryColor} size={24} />
                            </div>
                            :
                            <img 
                                src={`${config.baseUrl}/storage/user_photos/${profile.photo}`} 
                                alt={`foto ${profile.name}`} 
                                className="h-36 mobile:h-24 aspect-square flex items-center justify-center rounded-full bg-slate-200"
                            />
                        }
                        <div className="flex flex-col gap-2 mobile:gap-0">
                            <div className="text-3xl mobile:text-lg font-black text-slate-700">{profile.name}</div>
                            <div className="mobile:text-sm text-slate-500">@{profile.username}</div>
                            <div className="flex items-center gap-4">
                                {
                                    isFollowed ?
                                    <button className="p-2 px-8 bg-white border border-primary text-primary mt-4 mobile:text-sm flex gap-4 items-center" onClick={follow}>
                                        <BiCheck />
                                        Followed
                                    </button>
                                    :
                                    <button className="p-2 px-8 bg-primary text-white mt-4 mobile:text-sm" onClick={follow}>
                                        Follow
                                    </button>
                                }
                                <button className="p-2 px-8 bg-red-500 text-white mt-4" onClick={blockUser}>
                                    Block
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-end grow pe-8 mobile:pe-4 gap-4 mobile:gap-2">
                            {
                                profile.work_preference !== null &&
                                <div className="border border-primary p-2 mobile:p-1 px-4 mobile:px-3 text-primary text-xs">
                                    {profile.work_preference}
                                </div>
                            }
                            {
                                profile.industry !== null &&
                                <div className="border border-primary p-2 mobile:p-1 px-4 mobile:px-3 text-primary text-xs">
                                    {profile.industry}
                                </div>
                            }
                            {
                                profile.job_type !== null &&
                                <div className="border border-primary p-2 mobile:p-1 px-4 mobile:px-3 text-primary text-xs">
                                    {profile.job_type}
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex gap-6 mt-6">
                        <div className="flex gap-2 items-center mobile:grow">
                            <div className="font-bold text-lg">{profile.followers_count}</div>
                            <div className="text-slate-500">{translation.profile.followers[lang]}</div>
                        </div>
                        <div className="flex gap-2 items-center mobile:grow">
                            <div className="font-bold text-lg">{profile.following_count}</div>
                            <div className="text-slate-500">{translation.profile.following[lang]}</div>
                        </div>
                        <div className="flex gap-2 items-center mobile:grow">
                            <div className="font-bold text-lg">{profile.likes_count}</div>
                            <div className="text-slate-500">{translation.profile.likes[lang]}</div>
                        </div>
                    </div>
                    <div className="mt-2 mobile:text-sm">
                        {profile.about}
                    </div>

                    <div className="flex items-center gap-4 mt-8 ">
                        <div className={`flex items-center cursor-pointer gap-2 p-3 px-8 ${viewing === "content" ? "text-primary shadow-lg" : ""}`} onClick={() => setViewing('content')}>
                            <BiPlay />
                            <div>Contents</div>
                        </div>
                        <div className={`flex items-center cursor-pointer gap-2 p-3 px-8 ${viewing === "info" ? "text-primary shadow-lg" : ""}`} onClick={() => setViewing('info')}>
                            <BiListCheck />
                            <div>Info</div>
                        </div>
                        <div className={`flex items-center cursor-pointer gap-2 p-3 px-8 ${viewing === "gigs" ? "text-primary shadow-lg" : ""}`} onClick={() => setViewing('gigs')}>
                            <BiShoppingBag />
                            <div>Gigs</div>
                        </div>
                    </div>

                    {
                        viewing === "content" &&
                        <RenderProfileContent contents={contents} profile={profile} />
                    }
                    {
                        viewing === "info" &&
                        <RenderProfileInfo profile={profile} />
                    }
                    {
                        viewing === "gigs" &&
                        <RenderProfileGigs profile={profile} />
                    }
                </div>
            }
        </>
    )
}

export default PublicProfile