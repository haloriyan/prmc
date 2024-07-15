import React, { useRef } from "react";
import config from "../../config";
import { BiSolidComment, BiSolidHeart, BiSolidShare, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const VideoContent = ({cont}) => {
    const videoRef = useRef();

    return (
        <div className="flex mobile:flex-col gap-8 mobile:relative">
            <div className="bg-slate-400 rounded-xl relative" style={{
                height: (75 / 100 * window.screen.height),
                aspectRatio: 9/16,
            }}>
                <video ref={videoRef} src={`${config.baseUrl}/api/content/${cont.id}/stream`} className="rounded-xl h-full"></video>
                <div className="absolute top-0 left-0 right-0 bottom-0 p-6 mobile:pe-20 flex flex-col gap-2 justify-end text-white rounded-xl" style={{
                    background: 'linear-gradient(to bottom, transparent 10%, #00000090 90%)',
                }}>
                    <div className="text-lg font-bold">{cont.user.name}</div>
                    <div className="text-sm">{cont.caption}</div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mobile:absolute mobile:bottom-10 mobile:right-5">
                <Link to={`/@${cont.user.username}`} className="aspect-square h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    {
                        cont.user.photo === null ?
                        <BiUser /> :
                        <img src={`${config.baseUrl}/storage/user_photos/${cont.user.photo}`} alt={cont.user.name} className="h-12 aspect-square rounded-full object-cover" />
                    }
                </Link>
                <button className="aspect-square h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <BiSolidHeart />
                </button>
                <button className="aspect-square h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <BiSolidComment />
                </button>
                <button className="aspect-square h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <BiSolidShare />
                </button>
            </div>
        </div>
    )
}

export default VideoContent