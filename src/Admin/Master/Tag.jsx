import React, { useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import axios from "axios";
import config from "../../config";
import { BiImage, BiPlus, BiTag, BiTrash, BiX } from "react-icons/bi";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import InputFile from "../../components/InputFile";
import Input from "../../components/Input";
import styles from "../styles/Master.module.css";

const Tag = () => {
    const [isLoading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState(null);

    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delButton, setDelButton] = useState('Ya, Hapus Tag');
    const [addButton, setAddButton] = useState('Tambahkan');
    const [editButton, setEditButton] = useState('Simpan Perubahan');
    const ogIconRemoved = useRef(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/admin/tag`)
            .then(response => {
                let res = response.data;
                setTags(res.tags);
            })
        }
    }, [isLoading]);

    const resetForm = (closePopup) => {
        setLoading(true);
        setName('');
        setIcon(null);
        closePopup(false);
    }

    const submit = e => {
        setAddButton('Menambahkan...');
        let formData = new FormData();
        formData.append('name', name);
        formData.append('icon', icon);

        axios.post(`${config.baseUrl}/api/admin/tag/create`, formData)
        .then(response => {
            resetForm(setAdding);
            setAddButton('Tambahkan');
        })
        e.preventDefault();
    }
    const update = e => {
        setAddButton('Mengubah tag...');
        let formData = new FormData();
        formData.append('id', tag.id);
        formData.append('name', name);
        formData.append('icon', icon);

        axios.post(`${config.baseUrl}/api/admin/tag/update`, formData)
        .then(response => {
            resetForm(setEditing);
            setEditButton('Simpan Perubahan');
        })
        e.preventDefault();
    }

    const del = () => {
        setDelButton('Menghapus tag...');
        axios.post(`${config.baseUrl}/api/admin/tag/delete`, {
            id: tag.id,
        })
        .then(response => {
            resetForm(setDeleting);
            setDelButton('Ya, Hapus Tag');
        });
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'hometag'} />
            <div className="content user">
                <TitleAdmin
                    title="Home Tag"
                    description="Tag kategori pada halaman utama aplikasi"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            <BiPlus />
                            Tag Baru
                        </Button>
                    }
                />
                
                <table>
                    <thead>
                        <tr>
                            <th style={{width: 100}}><BiImage /></th>
                            <th>Tag</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tags.map((tg, t) => (
                                <tr key={t}>
                                    <td>
                                        {
                                            tg.icon !== null ?
                                            <img src={`${config.baseUrl}/storage/tag_icons/${tg.icon}`} alt={tg.name} className={styles.UserPhoto} />
                                            :
                                            <div className={styles.UserPhoto}>
                                                <BiTag />
                                            </div>
                                        }
                                    </td>
                                    <td>{tg.name}</td>
                                    <td className="inline">
                                        <Button height={32} onClick={() => {
                                            setTag(tg);
                                            setName(tg.name);
                                            setIcon(tg.icon);
                                            setEditing(true);
                                            ogIconRemoved.current = false;
                                        }}>
                                            Edit
                                        </Button>
                                        <Button height={32} color="red" onClick={() => {
                                            setTag(tg);
                                            setDeleting(true);
                                        }}>Hapus</Button>
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
                        title="Tambah Tag Baru"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form action="#" onSubmit={submit}>
                        <div className="inline">
                            <InputFile label="Icon" labelStyle={{fontSize: 10}} onChange={(input, e) => {
                                setIcon(input.files[0]);
                            }} />
                            <div style={{display: 'flex',flexGrow: 1}}>
                                <Input label="Tag" value={name} onInput={e => setName(e.currentTarget.value)} required />
                            </div>
                        </div>

                        <Button>{addButton}</Button>
                    </form>
                </Popup>
            }

            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <TitleAdmin
                        title="Ubah Tag"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setEditing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form action="#" onSubmit={update}>
                        <div className="inline">
                            {
                                ogIconRemoved.current ?
                                    <InputFile label="Icon" labelStyle={{fontSize: 10}} onChange={(input, e) => {
                                        setIcon(input.files[0]);
                                    }} />
                                :
                                <div className="relative">
                                    <img src={`${config.baseUrl}/storage/tag_icons/${icon}`} alt={name} className={styles.UserPhoto} style={{
                                        height: 80,
                                        width: 80
                                    }} />

                                    <Button type="button" onClick={() => {
                                        setIcon(null);
                                        ogIconRemoved.current = true;
                                    }} circle height={24} color="red" style={{
                                        borderRadius: 6,
                                        position: 'absolute',
                                        top: 5,right: 5,
                                    }}>
                                        <BiX />
                                    </Button>
                                </div>
                            }
                            <div style={{display: 'flex',flexGrow: 1}}>
                                <Input label="Tag" value={name} onInput={e => setName(e.currentTarget.value)} required />
                            </div>
                        </div>

                        <Button>{editButton}</Button>
                    </form>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Tag"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>Yakin ingin menghapus tag {tag.name}? Data akan terhapus permanen dan tidak dapat dipulihkan</div>

                    <Button color="red" style={{width: '100%',marginTop: 30}} onClick={del}>{delButton}</Button>
                    <Button color="muted" style={{width: '100%',marginTop: 10}} onClick={() => setDeleting(false)} accent="secondary">Batalkan</Button>
                </Popup>
            }
        </>
    )
}

export default Tag;