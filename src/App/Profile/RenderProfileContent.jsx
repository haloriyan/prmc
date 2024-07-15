import React from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";

const RenderProfileContent = ({contents, profile}) => {
    return (
        <div className="mt-8 flex flex-row flex-wrap gap-8 mobile:gap-4 desktop:pe-8">
            {
                contents.map((cont, c) => (
                    <Link to={`/video/${cont.id}`} key={c} className="flex flex-col basis-3/12 mobile:grow rounded-lg relative bg-slate-300" style={{
                        aspectRatio: 9/16
                    }}>
                        <img 
                            src={`${config.baseUrl}/storage/video_thumbs/${cont.thumbnail}`} 
                            className="absolute top-0 left-0 right-0 bottom-0 rounded-lg z-10"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg z-20 flex flex-col justify-end p-4 text-white" style={{
                            background: 'linear-gradient(to bottom, transparent 10%, #00000090 90%)',
                        }}>
                            <div>{cont.caption}</div>
                            <div className="flex gap-2 mt-2">
                                <BiShow />
                                <div className="text-xs">{cont.views_count}</div>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default RenderProfileContent