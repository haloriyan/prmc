import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import axios from "axios";
import config from "../../config";
import Button from "../../components/Button";
import { BiImage, BiPlus, BiX } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import Popup from "../../components/Popup";
import Input from "../../components/Input";
import InputFile from "../../components/InputFile";
import { useNavigate } from "react-router-dom";

const Campaign = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [ad, setAd] = useState(null);

    const [icon, setIcon] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delButton, setDelButton] = useState('Ya, Hapus Tag');
    const [addButton, setAddButton] = useState('Tambahkan');
    const [editButton, setEditButton] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/admin/ad`)
            .then(response => {
                let res = response.data;
                setAds(res.ads);
            })
        }
    }, [isLoading]);

    const submit = e => {
        setAddButton('Menambahkan...');
        let formData = new FormData();
        formData.append('icon', icon);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('url', url);

        axios.post(`${config.baseUrl}/api/admin/ad/create`, formData)
        .then(response => {
            let res = response.data;
            setLoading(true);
            setAdding(false);
            setTitle('');
            setDescription('');
            setUrl('');
            setAddButton('Tambahkan');
        })
        e.preventDefault();
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'campaign'} />
            <div className="content user">
                <TitleAdmin
                    title="Kampanye Iklan"
                    description="Iklan yang tampil pada halaman utama aplikasi"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            <BiPlus />
                            Iklan Baru
                        </Button>
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th><BiImage /></th>
                            <th>Klik</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ads.map((ad, a) => (
                                <tr key={a}>
                                    <td className="inline">
                                        {
                                            ad.icon !== null &&
                                            <img src={`${config.baseUrl}/storage/ad_icons/${ad.icon}`} alt={ad.title} style={{
                                                height: 60,
                                                aspectRatio: 1,
                                                borderRadius: 5,
                                            }} />
                                        }
                                        <div>{ad.title}</div>
                                    </td>
                                    <td>0 klik</td>
                                    <td>
                                        <Button accent="secondary" height={36} onClick={() => {
                                            navigate(`${ad.id}/detail`)
                                        }}>
                                            <MdMoreHoriz />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Buat Iklan Baru"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form action="#" onSubmit={submit}>
                        <div className="inline">
                            <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1}}>
                                <div>Gambar</div>
                                <div style={{fontSize: 12,color: '#666'}}>Rasio 1:1, PNG/JPG</div>
                            </div>
                            <InputFile size={100} labelStyle={{fontSize: 12}} onChange={(input, e) => {
                                setIcon(input.files[0]);
                            }} />
                        </div>
                        <Input label="Judul Iklan" value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                        <Input label="Deskripsi Iklan" value={description} onInput={e => setDescription(e.currentTarget.value)} required multiline />
                        <Input label="URL Target" value={url} onInput={e => setUrl(e.currentTarget.value)} required />

                        <Button>{addButton}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Campaign;