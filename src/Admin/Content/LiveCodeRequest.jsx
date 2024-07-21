import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import { MdWest } from "react-icons/md";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const LiveCodeRequest = () => {
    const [datas, setDatas] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/stream/code/access-request`)
            .then(response => {
                let res = response.data;
                console.log(res);
                setDatas(res.datas);
            })
        }
    }, [isLoading]);

    const allowAccess = (id) => {
        axios.post(`${config.baseUrl}/api/stream/code/access-request-allow`, {
            id: id,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            console.log('success');
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'live_code'} />
            <div className="content user">
                <div className="flex items-center gap-4">
                    <div className="h-12 aspect-square flex items-center justify-center text-primary cursor-pointer" onClick={() => navigate(-1)}>
                        <MdWest />
                    </div>
                    <div className="text-slate-700 font-bold text-lg">Permintaan Live Streaming</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Tujuan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.map((data, d) => (
                                <tr key={d}>
                                    <td>{data.user.name}</td>
                                    <td>{data.purpose}</td>
                                    <td>
                                        <button className="bg-green-500 text-white text-sm p-2 px-4" onClick={() => allowAccess(data.id)}>
                                            Izinkan
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LiveCodeRequest