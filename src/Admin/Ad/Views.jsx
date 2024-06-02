import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import Button from "../../components/Button";
import { MdWest } from "react-icons/md";
import axios from "axios";
import config from "../../config";

const CampaignViews = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [ad, setAd] = useState(null);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/ad/${id}/views`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setAd(res.ad);
            })
        }
    }, [isLoading, triggerLoading])

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin />
            {
                !isLoading &&
                <div className="content user">
                    <TitleAdmin 
                        title="Tayangan Kampanye"
                        description={`Seberapa banyak kampanye ${ad?.title} ditampilkan`}
                        left={
                            <Button circle accent="secondary" color="muted" onClick={() => navigate(`/admin/ad/campaign/${id}/detail`)}>
                                <MdWest />
                            </Button>
                        }
                        right={
                            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'flex-end',gap: 5}}>
                                <div style={{fontSize: 26,fontWeight: '700',color: '#222'}}>329</div>
                                <div style={{fontSize: 12,color: '#666'}}>bulan ini</div>
                            </div>
                        }
                    />
                </div>
            }
        </>
    )
}

export default CampaignViews;