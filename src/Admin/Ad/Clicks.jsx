import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import Button from "../../components/Button";
import { MdWest } from "react-icons/md";

const CampaignClicks = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [ad, setAd] = useState(null);

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin />
            {
                !isLoading &&
                <div className="content user">
                    <TitleAdmin 
                        title="Klik Kampanye"
                        description={`Seberapa banyak kampanye ${ad?.title} diklik pengguna`}
                        left={
                            <Button circle accent="secondary" color="muted" onClick={() => navigate(`/admin/ad/campaign/${id}/detail`)}>
                                <MdWest />
                            </Button>
                        }
                    />
                </div>
            }
        </>
    )
}

export default CampaignClicks;