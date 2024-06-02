import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import TitleAdmin from "../../Partials/TitleAdmin";
import Button from "../../components/Button";
import { MdWest } from "react-icons/md";
import { Card, CardContainer } from "../../components/Card";
import { BiPointer, BiX } from "react-icons/bi";
import Popup from "../../components/Popup";

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [ad, setAd] = useState(null);

    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/ad/${id}`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setAd(res.ad);
            })
        }
    }, [isLoading, triggerLoading]);

    const del = () => {
        axios.post(`${config.baseUrl}/api/admin/ad/${id}/delete`)
        .then(response => {
            navigate('/admin/ad/campaign');
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin />
            {
                !isLoading &&
                <div className="content user">
                    <TitleAdmin
                        title="Detail Kampanye"
                        description={`Data performa kampanye ${ad?.title}`}
                        left={
                            <Button accent="secondary" color="muted" circle onClick={() => navigate('/admin/ad/campaign')}>
                                <MdWest />
                            </Button>
                        }
                        right={
                            <Button accent="secondary" color="red" onClick={() => setDeleting(true)}>
                                Hapus Kampanye
                            </Button>
                        }
                    />

                    <div style={{height: 20}}></div>
                    <CardContainer>
                        <Card number={ad.clicks_hit} label={'Klik'} icon={<BiPointer />} />
                        <Card number={ad.views_hit} label={'Tayangan'} icon={<BiPointer />} link={`/admin/ad/campaign/${id}/views`} />
                        <Card number={323} label={'Klik'} icon={<BiPointer />} />
                    </CardContainer>
                </div>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Kampanye"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>
                        Yakin ingin menghapus kampanye {ad.title}? Tindakan ini akan menghapus semua data terkait termasuk laporan penayangan dan data tidak dapat dipulihkan
                    </div>

                    <Button style={{width: '100%',marginTop: 20}} color="red" onClick={del}>Ya, Hapus kampanye ini</Button>
                    <Button style={{width: '100%',marginTop: 20}} color="muted" accent="secondary" onClick={() => setDeleting(false)}>Jangan Hapus kampanye</Button>                    
                </Popup>
            }
        </>
    )
}

export default CampaignDetail;