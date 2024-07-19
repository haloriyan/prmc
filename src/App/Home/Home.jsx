import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import config from "../../config";
import VideoContent from "./VideoContent";
import useLang from "../../hooks/useLang";
import translation from "../../translation.json";
import { BiLogoFacebook, BiLogoWhatsapp, BiUser, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup";

const Home = () => {
    const [lang, setLang] = useLang();
    // const [user, setUser] = useState(null);
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(0);
    const containerRef = useRef(null);

    const [commentPage, setCommentPage] = useState(1);
    const [comments, setComments] = useState([]);
    const [commentsRaw, setCommentsRaw] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [commentBody, setCommentBody] = useState('');

    const [isSharing, setSharing] = useState(false);
    const copyLinkRef = useRef(null);
    const shareLinkRef = useRef(null);
    
    const copyShareLink = () => {
        navigator.clipboard.writeText(`https://promociin.com/share/${content.id}`);
        copyLinkRef.current.innerHTML = translation.general.copied[lang];
        setTimeout(() => {
            copyLinkRef.current.innerHTML = translation.general.copy[lang];
        }, 3000);
    }

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, clientHeight } = containerRef.current;
            const newVideoIndex = Math.round(scrollTop / clientHeight);
            setCurrentVideo(newVideoIndex);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/page/home`)
                .then(response => {
                    let res = response.data;
                    setLoading(false);
                    setContents(res.contents);
                });
        }
    }, [isLoading, triggerLoading]);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollTo({
                top: (currentVideo * container.clientHeight) - 30,
                behavior: "smooth",
            });
            setContent(null);
        }
    }, [currentVideo]);

    useEffect(() => {
        if (isLoadingComments) {
            setLoadingComments(false);
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
    }, [isLoadingComments]);

    const postComment = () => {
        axios.post(`${config.baseUrl}/api/comment/${content.id}/store`, {
            body: commentBody,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            setCommentPage(1);
            setComments([]);
            setLoadingComments(true);
            setCommentBody('');
        })
    }

    return (
        <>
            <Header />
            <Sidebar active={'home'} />
            <div
                className="absolute top-16 right-0 w-full py-4 flex flex-col gap-8 items-center overflow-y-scroll"
                ref={containerRef}
                style={{ height: "calc(100vh - 4rem)" }}
            >
                {
                    contents.map((cont, index) => (
                        <VideoContent
                            cont={cont} setContent={setContent}
                            setShowComment={setShowComment} setLoadingComments={setLoadingComments} setComments={setComments} setCommentPage={setCommentPage}
                            setSharing={setSharing}
                            key={index}
                            isActive={index === currentVideo}
                        />
                    ))
                }
            </div>
            {
                (content !== null && showComment) &&
                <div className="fixed top-16 right-0 w-4/12 p-4">
                    <div className="shadow-lg bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="text-xl font-black text-slate-700">{translation.general.comment[lang]}</div>
                            <div className="flex grow text-sm text-slate-500">({content.comments_count})</div>
                            <div className="h-8 aspect-square border rounded-full flex items-center justify-center text-slate-700 cursor-pointer" onClick={() => setShowComment(false)}>
                                <BiX />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 h-96 overflow-y-scroll mt-6 mb-6">
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
                                <div className="cursor-pointer text-sm text-slate-500" onClick={() => {
                                    setCommentPage(commentPage + 1);
                                    setLoadingComments(true);
                                }}>{translation.general.more[lang]}</div>
                            }
                        </div>

                        <div className="bg-slate-200 rounded-lg p-2 flex flex-col">
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
    );
};

export default Home;
