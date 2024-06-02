import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import config from "../../config";
import { useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import { BiImage, BiShow, BiTrash, BiUser, BiX } from "react-icons/bi";
import styles from "../styles/Master.module.css";
import Popup from "../../components/Popup";
import Button from "../../components/Button";

const User = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [q, setQ] = useState(searchParams.get('q'));
    const [isLoading, setLoading] = useState(true);
    const [raw, setRaw] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    const [isDetailing, setDetailing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delButton, setDelButton] = useState('Hapus Pengguna');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/admin/user?&page=${page}`, {
                q: q,
            })
            .then(response => {
                let res = response.data;
                setUsers(res.users.data);
            })
        }
    }, [isLoading]);

    const search = useDebouncedCallback(() => {
        setLoading(true);
    }, 1500);

    const del = () => {
        setDelButton('Menghapus...');
        axios.post(`${config.baseUrl}/api/user/delete-account`, {
            token: user.token,
            bypass_pw: 'yes'
        })
        .then(response => {
            let res = response.data;
            setDelButton('Hapus Pengguna');
            setLoading(true);
            setDeleting(false);
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'user'} />
            <div className="content user">
                <TitleAdmin
                    title="Pengguna"
                    description="Data semua pengguna promociin"
                    right={
                        <Input label="Cari pengguna" value={q} onInput={e => {
                            let val = e.currentTarget.value;
                            setQ(val);
                            searchParams.set('q', val);
                            setSearchParams({
                                q: val,
                            });
                            search();
                        }} />
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th><BiImage /></th>
                            <th>Nama</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, u) => (
                                <tr key={u}>
                                    <td>
                                        {
                                            user.photo === null ?
                                            <div className={styles.UserPhoto}>
                                                <BiUser color={config.primaryColor} />
                                            </div>
                                            :
                                            <img src={`${config.baseUrl}/storage/user_photos/${user.photo}`} alt={user.name} className={styles.UserPhoto} />
                                        }
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td className="inline">
                                        <Button onClick={() => {
                                            setUser(user);
                                            setDetailing(true);
                                        }} accent="secondary" height={36}>
                                            <BiShow />
                                            Detail
                                        </Button>
                                        <Button color="red" height={36} onClick={() => {
                                            setUser(user);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash /> Hapus
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                isDetailing &&
                <Popup onDismiss={() => setDetailing(false)}>
                    <TitleAdmin
                        left={
                            user.photo === null ?
                            <div className={styles.UserPhoto} style={{width: 80,height: 80}}>
                                <BiUser color={config.primaryColor} />
                            </div>
                            :
                            <img src={`${config.baseUrl}/storage/user_photos/${user.photo}`} alt={user.name} className={styles.UserPhoto} style={{width: 80,height: 80}} />
                        }
                        title={user.name}
                        description={user.username}
                        right={
                            <Button accent="secondary" color="muted" circle onClick={() => setDetailing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    {JSON.stringify(user)}
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Pengguna"
                        right={
                            <Button accent="secondary" color="muted" circle onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div style={{marginBottom: 20}}>Yakin ingin menghapus pengguna {user.name}? Tindakan ini akan menghapus semua data yang terkait dan tidak dapat dipulihkan</div>

                    <Button color="red" style={{width: '100%'}} onClick={del}>{delButton}</Button>
                </Popup>
            }
        </>
    )
}

export default User;