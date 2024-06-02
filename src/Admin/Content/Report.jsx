import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../Partials/HeaderAdmin";
import MenuAdmin from "../../Partials/MenuAdmin";
import TitleAdmin from "../../Partials/TitleAdmin";
import axios from "axios";
import config from "../../config";
import { BiCheck, BiImage, BiX } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import moment from "moment";
import Switch from "../../components/Switch";
import styles from "../styles/Master.module.css";

const ContentReport = () => {
    const [isLoading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const [isDeleting, setDeleting] = useState(false);
    const [delButton, setDelButton] = useState('Ya, Hapus Konten Ini');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/admin/content/reported`, {
                show_all: showAll
            })
            .then(response => {
                let res = response.data;
                setContents(res.contents.data);
            })
        }
    }, [isLoading]);

    const del = () => {
        setDelButton('Menghapus konten...');
        axios.post(`${config.baseUrl}/api/content/delete`, {
            id: content.content_id,
            report_id: content.id,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setDeleting(false);
            setContent(null);
            setDelButton('Ya, Hapus Konten Ini');
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'content_report'} />
            <div className="content user">
                <TitleAdmin
                    title="Pelaporan Konten"
                    description="Konten yang dilaporkan karena tidak sesuai syarat dan ketentuan"
                    right={
                        <div>
                            <div className="inline" style={{justifyContent: 'flex-end'}}>
                                <Switch active={showAll} setActive={setShowAll} onChange={() => {
                                    setLoading(true);
                                }} />
                            </div>
                            <div style={{fontSize: 12,color: '#666',marginTop: 10}}>TAMPILKAN SEMUA</div>
                        </div>
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th><BiImage /></th>
                            <th>Pelapor</th>
                            <th>Topik</th>
                            {
                                showAll &&
                                <th>Status</th>
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contents.map((cont, c) => (
                                <tr key={c}>
                                    <td>
                                        {
                                            cont.content_id === null ?
                                            <div className={styles.UserPhoto}>
                                                <BiX />
                                            </div>
                                            :
                                            <img src={`${config.baseUrl}/storage/video_thumbs/${cont.content.thumbnail}`} alt={cont.id} className={styles.UserPhoto} />
                                        }
                                    </td>
                                    <td>{cont.user.name}</td>
                                    <td>{cont.topic.toUpperCase()}</td>
                                    {
                                        showAll &&
                                        <td>
                                            {
                                                cont.resolved &&
                                                    <BiCheck color="#2ecc71" size={24} />
                                            }
                                        </td>
                                    }
                                    <td>
                                        {
                                            !cont.resolved &&
                                            <Button height={32} accent="secondary" onClick={() => {
                                                setContent(cont);
                                            }}>
                                                <MdMoreHoriz />
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
                content !== null &&
                <Popup onDismiss={() => setContent(null)}>
                    <TitleAdmin
                        title="Detail Laporan"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setContent(null)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div className="inline">
                        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1,gap: 5}}>
                            <div style={{fontSize: 12,color: '#666'}}>PELAPOR</div>
                            <div>{content.user.name}</div>
                        </div>
                        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1,gap: 5}}>
                            <div style={{fontSize: 12,color: '#666'}}>TOPIK LAPORAN</div>
                            <div>{content.topic.toUpperCase()}</div>
                        </div>
                    </div>

                    <div className="inline" style={{marginTop: 20}}>
                        {
                            content.notes !== null &&
                            <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1,gap: 5}}>
                                <div style={{fontSize: 12,color: '#666'}}>CATATAN</div>
                                <div>{content.notes}</div>
                            </div>
                        }
                        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1,gap: 5}}>
                            <div style={{fontSize: 12,color: '#666'}}>LAPORAN DIBUAT</div>
                            <div>{moment(content.created_at).format('DD MMM Y - HH:mm:ss')}</div>
                        </div>
                    </div>

                    <div className="inline" style={{marginTop: 40,alignItems: 'flex-start'}}>
                        <video style={{
                            width: '35%',
                            aspectRatio: 9/16,
                            backgroundColor: '#000',
                        }} controls>
                            <source src={`${config.baseUrl}/storage/user_videos/${content.content.filename}`} />
                        </video>
                        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1}}>
                            <div style={{fontSize: 12,color: '#666'}}>PEMBUAT KONTEN</div>
                            <div>{content.content.user.name}</div>

                            <div style={{fontSize: 12,color: '#666',marginTop: 20}}>CAPTION</div>
                            <div>{content.content.caption}</div>

                            <div style={{fontSize: 12,color: '#666',marginTop: 20}}>WAKTU UPLOAD</div>
                            <div>{moment(content.content.created_at).format('DD MMM Y - HH:mm:ss')}</div>

                            <Button color="red" style={{marginTop: 20}} onClick={() => setDeleting(true)}>
                                Hapus Konten
                            </Button>
                        </div>
                    </div>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)} width="30%">
                    <TitleAdmin
                        title="Hapus Konten"
                        right={
                            <Button onClick={() => setDeleting(false)} color="muted" accent="secondary" circle>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>
                        Yakin ingin menghapus konten ini? Tindakan ini akan menghapus data secara permanen dan tidak dapat dipulihkan
                    </div>

                    <Button color="red" onClick={del} style={{marginTop: 40,width: '100%'}}>{delButton}</Button>
                    <Button color="muted" accent="secondary" style={{marginTop: 20,width: '100%'}} onClick={() => setDeleting(false)}>
                        Jangan Hapus Konten
                    </Button>
                </Popup>
            }
        </>
    )
}

export default ContentReport;