import React, { useEffect, useState } from "react";
import MenuAdmin from "../../Partials/MenuAdmin";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { BiImage } from "react-icons/bi";

const TrainingCenter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [q, setQ] = useState(searchParams.get('q'));
    const [isLoading, setLoading] = useState(true);
    const [raw, setRaw] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/training-center/list`)
            .then(response => {
                let res = response.data;
                setItems(res.items);
            })
        }
    }, [isLoading])
    
    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'training_center'} />
            <div className="content user">
                <TitleAdmin 
                    title="Training Center"
                    description="Data Training Center"
                />

                <table>
                    <thead>
                        <tr>
                            <th><BiImage /></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <img src={`${config.baseUrl}/storage/tc_icons/${item.icon}`} alt={item.name} className="h-20" />
                                    </td>
                                    <td>{item.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TrainingCenter;