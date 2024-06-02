import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import Button from "../../components/Button";
import config from "../../config";
import { BiDice4, BiImage, BiTrash, BiX } from "react-icons/bi";
import Popup from "../../components/Popup";
import Input from "../../components/Input";
import { useDebouncedCallback } from "use-debounce";
import styles from "../styles/LiveCode.module.css";

const LiveCode = () => {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingUser, setLoadingUser] = useState(false);

    const [codes, setCodes] = useState([]);
    const [raw, setRaw] = useState(null);
    const [q, setQ] = useState('');
    const [item, setItem] = useState(null);

    const [code, setCode] = useState('');
    const [users, setUsers] = useState([]);
    const [targetUser, setTargetUser] = useState(null);

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/stream/code`)
            .then(response => {
                let res = response.data;
                setRaw(res.codes);
                setCodes(res.codes.data);
            })
        }
    }, [isLoading]);

    useEffect(() => {
        if (isLoadingUser) {
            setLoadingUser(false);
            axios.get(`${config.baseUrl}/api/user/search?q=${q}`)
            .then(response => {
                let res = response.data;
                setUsers(res.users);
            })
        }
    }, [isLoadingUser]);

    const generateRandomCode = (limit = 6) => {
        let generated = "";             
        let templateLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let templateNumber = '0123456789';
        let letters = templateLetter.split('');
        let numbers = templateNumber.split('');
        for (let i = 0; i < (limit / 2); i++) {
            generated += letters[Math.floor(Math.random() * (letters.length - 1))]
        }                   
        for (let i = 0; i < (limit / 2); i++) {
            generated += numbers[Math.floor(Math.random() * (numbers.length - 1))]
        }
        setCode(generated);
        return generated;       
    }

    const submit = (e) => {
        axios.post(`${config.baseUrl}/api/stream/code/generate`, {
            user_id: targetUser.id,
            code: code,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setQ('');
            setAdding(false);
        })
        e.preventDefault();
    }
    const del = (e) => {
        axios.post(`${config.baseUrl}/api/stream/code/delete`, {
            code_id: item.id
        })
        .then(response => {
            setLoading(true);
            setDeleting(false);
        });
        e.preventDefault();
    }

    const debounce = useDebouncedCallback(() => {
        setLoadingUser(true);
    }, 1200);

    const chooseUser = user => {
        setUsers([]);
        setQ('');
        setTargetUser(user);
    }
    
    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'live_code'} />
            <div className="content user">
                <TitleAdmin 
                    title="Kode Live Streaming"
                    right={
                        <Button onClick={() => setAdding(true)}>Tambah</Button>
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Kode</th>
                            <th>Sudah digunakan?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            codes.map((cd, c) => (
                                <tr key={c}>
                                    <td>{cd.user.name}</td>
                                    <td>{cd.code}</td>
                                    <td>
                                        {
                                            cd.has_used ?
                                            <>Sudah</>
                                            : ''
                                        }
                                    </td>
                                    <td>
                                        {
                                            cd.has_used ? '' :
                                            <Button color="red" height={32} onClick={() => {
                                                setItem(cd);
                                                setDeleting(true);
                                            }}>
                                                <BiTrash />
                                            </Button>
                                        }
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
                        title="Tambah Kode Akses"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form action="#" onSubmit={submit}>
                        <Input label="Kode Akses" value={code} onInput={e => setCode(e.currentTarget.value)} right={
                            <Button type="button" circle color="#fff" accent="secondary" style={{borderRadius: 0,marginBottom: 10}} onClick={() => generateRandomCode()}>
                                <BiDice4 size={20} />
                            </Button>
                        } required />
                        {
                            targetUser !== null ?
                            <>
                                <div className={styles.UserItem}>
                                    <img src={`${config.baseUrl}/storage/user_photos/${targetUser.photo}`} alt={targetUser.name} className={styles.UserPhoto} />
                                    <div style={{display: 'flex',flexDirection: 'column',gap: 5,flexGrow: 1}}>
                                        <div>{targetUser.name}</div>
                                        <div style={{fontSize: 12,color: '#666'}}>{targetUser.email}</div>
                                    </div>
                                    <Button type="button" accent="secondary" color="red" height={20} circle onClick={() => setTargetUser(null)}>
                                        <BiX />
                                    </Button>
                                </div>
                                <Button>Beri Kode Akses</Button>
                            </>
                            :
                            <>
                                <Input label="Cari user" value={q} onInput={e => {
                                    setQ(e.currentTarget.value);
                                    debounce();
                                }} />
                                <div>
                                    {
                                        users.map((us, u) => (
                                            <div key={u} className={styles.UserItem}>
                                                <img src={`${config.baseUrl}/storage/user_photos/${us.photo}`} alt={us.name} className={styles.UserPhoto} />
                                                <div style={{display: 'flex',flexDirection: 'column',gap: 5,flexGrow: 1}}>
                                                    <div>{us.name}</div>
                                                    <div style={{fontSize: 12,color: '#666'}}>{us.email}</div>
                                                </div>
                                                <Button type="button" accent="secondary" onClick={() => chooseUser(us)}>
                                                    Pilih
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        }
                    </form>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Kode Akses"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form action="#" onSubmit={del}>
                        <div>Yakin ingin menghapus kode akses ini?</div>
                        <Button color="red">Hapus</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default LiveCode;