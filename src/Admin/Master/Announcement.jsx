import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import axios from "axios";
import config from "../../config";
import Popup from "../../components/Popup";
import TitleAdmin from "../../Partials/TitleAdmin";
import InputFile from "../../components/InputFile";
import { BiX } from "react-icons/bi";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Announcement = () => {
    const [isLoading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    
    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delButton, setDelButton] = useState('Ya, Hapus Pengumuman');
    const [addButton, setAddButton] = useState('Tambahkan');
    const [editButton, setEditButton] = useState('Simpan Perubahan');
    

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/announcement`)
            .then(response => {
                let res = response.data
            })
        }
    }, [isLoading]);

    const resetForm = (closePopup) => {
        setLoading(true);
        setTitle('');
        setBody('');
        setImage(null);
    }

    const submit = e => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);
        
        axios.post(`${config.baseUrl}/api/announcement/store`, formData)
        .then(response => {
            let res = response.data;
            resetForm();
        })
        e.preventDefault();
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'announcement'} />
            <div className="content user">
                <TitleAdmin
                    title="Pengumuman"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            Tambahkan
                        </Button>
                    }
                />
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)} width="35%">
                    <TitleAdmin
                        title="Buat Pengumuman Baru"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form action="#" onSubmit={submit}>
                        <InputFile label="Gambar" aspectRatio="16/9" size={null} width={'100%'} labelStyle={{fontSize: 10}} onChange={(input, e) => {
                            setImage(input.files[0]);
                        }} />
                        <Input label="Judul" value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                        <Input label="Isi Pengumuman" value={body} onInput={e => setBody(e.currentTarget.value)} required multiline />

                        <Button>{addButton}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Announcement;