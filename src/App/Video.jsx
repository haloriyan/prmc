import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { BiLogoFacebook, BiLogoTwitter, BiLogoWhatsapp, BiPlay, BiShare, BiShareAlt, BiSolidComment, BiSolidHeart, BiSolidShare, BiUser, BiX } from "react-icons/bi";
import moment from "moment";
import useLang from "../hooks/useLang";
import translation from "..//translation.json";
import Popup from "../components/Popup";

const Video = () => {
    const { id } = useParams();
    const [lang, setLang] = useLang();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingComment, setLoadingComment] = useState(false);
    const [content, setContent] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsRaw, setCommentsRaw] = useState(null);
    const [commentPage, setCommentPage] = useState(1);
    const [isSharing, setSharing] = useState(false);

    const shareLinkRef = useRef(null);
    const copyLinkRef = useRef(null);
    const videoRef = useRef(null);
    const [isPaused, setPaused] = useState(false);

    const [commentBody, setCommentBody] = useState('');

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user_data')));
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/content/${id}`)
            .then(response => {
                let res = response.data;
                setContent(res.content);
                setLoadingComment(true);
            })
        }
    }, [isLoading]);

    useEffect(() => {
        if (isLoadingComment && content !== null) {
            setLoadingComment(false);
            axios.post(`${config.baseUrl}/api/comment/${content.id}?page=${commentPage}`)
            .then(response => {
                let res = response.data;
                let theComments = [...comments];
                res.comments.data.map(com => {
                    theComments.push(com);
                })
                setComments(theComments);
                setCommentsRaw(res.comments);

                let cont = {...content};
                cont['comments_count'] = res.comment_count;
                setContent(cont);
            })
        }
    }, [isLoadingComment, content]);

    const postComment = () => {
        axios.post(`${config.baseUrl}/api/comment/${content.id}/store`, {
            body: commentBody,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            setLoadingComment(true);
            setCommentBody('');
        })
    }

    const copyShareLink = () => {
        navigator.clipboard.writeText(`https://promociin.com/share/${content.id}`);
        copyLinkRef.current.innerHTML = translation.general.copied[lang];
        setTimeout(() => {
            copyLinkRef.current.innerHTML = translation.general.copy[lang];
        }, 3000);
    }

    return (
        <>
            <Header />
            {
                content !== null &&
                <div className="absolute top-16 left-0 right-0 bottom-0 flex mobile:flex-col ">
                    <div className="flex flex-col items-center basis-8/12 bg-slate-800 relative">
                        <video src={`${config.baseUrl}/api/content/${id}/stream`} className="h-full bg-red-500" style={{
                            aspectRatio: 9/16,
                            objectFit: 'cover'
                        }} autoPlay ref={videoRef}></video>
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer" onClick={() => {
                            if (videoRef.current.paused) {
                                videoRef.current.play();
                                setPaused(false);
                            } else {
                                videoRef.current.pause();
                                setPaused(true);
                            }
                        }}>
                            {
                                (isPaused) &&
                                <BiPlay color="#fff" size={50} />
                            }
                        </div>
                    </div>
                    <div className="flex flex-col basis-4/12 gap-4 p-4 overflow-y-auto">
                        <Link to={`/@${content.user.username}`} className="flex gap-4 items-center">
                            {
                                content.user.photo === null ?
                                <div className="h-14 aspect-square rounded-full flex items-center justify-center">
                                    <BiUser />
                                </div>
                                :
                                <img 
                                    src={`${config.baseUrl}/storage/user_photos/${content.user.photo}`} 
                                    alt={content.user.name} 
                                    className="h-14 aspect-square rounded-full object-cover"
                                />
                            }
                            <div className="flex flex-col grow">
                                <div className="text-slate-700 font-black">{content.user.name}</div>
                                <div className="text-slate-500 text-sm">@{content.user.username}</div>
                            </div>
                            <div className="text-slate-500 text-sm">{moment(content.created_at).format('DD MMM')}</div>
                        </Link>

                        <div>{content.caption}</div>

                        <div className="flex gap-4 items-center">
                            <div className="flex gap-2 items-center justify-center h-10 rounded-lg grow bg-slate-200 text-sm cursor-pointer">
                                <BiSolidHeart />
                                <div>{content.likes_count}</div>
                            </div>
                            <div className="flex gap-2 items-center justify-center h-10 rounded-lg grow bg-slate-200 text-sm cursor-pointer">
                                <BiSolidComment />
                                <div>{content.comments_count}</div>
                            </div>
                            <div className="flex gap-2 items-center justify-center h-10 rounded-lg grow bg-slate-200 text-sm cursor-pointer" onClick={() => setSharing(true)}>
                                <BiShareAlt />
                                <div>{translation.general.share[lang]}</div>
                            </div>
                        </div>

                        <div className="flex flex-col grow gap-4 overflow-y-auto">
                            {
                                comments.map((comm, c) => (
                                    <div key={c} className="flex gap-2 items-start">
                                        {
                                            comm.user.photo === null ?
                                            <div className="h-8 aspect-square rounded-full flex items-center justify-center">
                                                <BiUser />
                                            </div>
                                            :
                                            <img 
                                                src={`${config.baseUrl}/storage/user_photos/${comm.user.photo}`} 
                                                alt={comm.user.name} 
                                                className="h-8 aspect-square rounded-full bg-slate-200"
                                            />
                                        }
                                        <div className="bg-slate-200 rounded-lg p-2">
                                            <div className="text-sm font-bold">{comm.user.name}</div>
                                            <div className="text-sm text-slate-700">{comm.body}</div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                commentsRaw?.next_page_url !== null &&
                                <div className="cursor-pointer text-slate-500 text-right text-sm" onClick={() => {
                                    setCommentPage(commentPage + 1);
                                    setLoadingComment(true);
                                }}>
                                    {translation.general.more[lang]}
                                </div>
                            }
                        </div>

                        <div>
                            <div className="bg-slate-200 rounded-lg p-2 flex flex-col">
                                {/* <input type="text" className="flex grow bg-slate-200 outline-0" placeholder="Comment" /> */}
                                <textarea className="flex grow bg-slate-200 outline-0" value={commentBody} placeholder={translation.video.type_comment[lang]} onInput={e => {
                                    setCommentBody(e.currentTarget.value);
                                }}></textarea>
                                <div className="flex justify-end">
                                    <div 
                                        className={`font-bold ${commentBody !== "" ? "text-primary cursor-pointer" : "text-primary opacity-50 cursor-not-allowed"}`}
                                        onClick={() => {
                                            if (commentBody !== "") {
                                                postComment();
                                            }
                                        }}
                                    >{translation.general.send[lang]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                isSharing &&
                <Popup onDismiss={() => setSharing(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-lg flex grow">
                            {translation.video.share_this_video[lang]}
                        </div>
                        <div className="h-12 rounded-full aspect-square border flex items-center justify-center cursor-pointer" onClick={() => setSharing(false)}>
                            <BiX />
                        </div>
                    </div>

                    <div className="mt-4 bg-slate-200 p-3 rounded-lg text-slate-700 flex items-center gap-4">
                        <div className="flex grow" ref={shareLinkRef}>https://promociin.com/share/{content.id}</div>
                        <button className="p-2 px-4 rounded-lg text-white bg-primary text-sm" ref={copyLinkRef} onClick={copyShareLink}>
                            {translation.general.copy[lang]}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mt-8">
                        <Link target="_blank" to={`https://www.facebook.com/sharer/sharer.php?u=https://promociin.com/share/${content.id}`} className="h-12 aspect-square rounded-full flex items-center justify-center text-white text-lg" style={{
                            backgroundColor: '#1877F2'
                        }}>
                            <BiLogoFacebook />
                        </Link>
                        <Link target="_blank" to={`https://wa.me/?text=https://promociin.com/share/${content.id}`} className="h-12 aspect-square rounded-full flex items-center justify-center text-white text-lg" style={{
                            backgroundColor: '#25D366'
                        }}>
                            <BiLogoWhatsapp />
                        </Link>
                        <Link target="_blank" to={`https://x.com/intent/post?url=https://promociin.com/share/${content.id}&text=`} className="h-12 aspect-square rounded-full flex items-center justify-center bg-white border text-lg" style={{
                            backgroundColor: '#000'
                        }}>
                            <img src={'/images/x-white.png'} className="h-4" />
                        </Link>
                    </div>
                </Popup>
            }
        </>
    )
}

export default Video;