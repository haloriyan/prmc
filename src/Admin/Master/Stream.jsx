import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import axios from "axios";
import config from "../../config";

const Stream = () => {
    const [isLoading, setLoading] = useState(true);
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/stream/list`)
            .then(response => {
                let res = response.data;
                setStreams(res.streams);
            })
        }
    }, [isLoading]);

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'stream'} />
            <div className="content user">
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            streams.map((str, s) => (
                                <tr key={s}>
                                    <td>{str.stream_key}</td>
                                    <td>{str.created_at}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Stream