import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Jumbo from "../components/Jumbo";
import styles from "./styles/Home.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import config from "../config";
import Footer from "../components/Footer";

const DeleteAccount = () => {
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        document.title = "Penghapusan Akun - Promociin";
    }, []);

    const submit = (e) => {
        // axios.post(`${config.baseUrl}/api/user/request-deletion`, {
        //     email, reason
        // })
        // .then(response => {
        //     let res = response.data;
        //     setDone(true);
        // })
        setDone(true);
        e.preventDefault();
    }

    return (
        <>
            <Header active="" />
            <div className="content">
                <Jumbo
                    withNavigation={true} breadcrumb={'Tentang'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Penghapusan Akun</div>
                        </>
                    }
                />
                {
                    done ?
                    <div className={styles.Section}>
                        <div>Permintaan penghapusan akun Anda telah kami terima. Akun Anda akan kami bantu hapus dalam waktu maksimal 1 x 24 jam.</div>
                    </div>
                    :
                    <div className={styles.Section}>
                        <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Mohon isi formulir berikut untuk mengirimkan permintaan penghapusan akun</div>
                        <form action="#" onSubmit={submit}>
                            <Input label="Email Akun :" placeholder={'Alamat email yang digunakan pada akun Anda'} onInput={e => setEmail(e.currentTarget.value)} />
                            <Input label="Alasan Penghapusan :" placeholder={'Mohon beri tahu kami alasan Anda ingin menghapus akun promociin'} onInput={e => setReason(e.currentTarget.value)} />
                            <Button>Kirim Permintaan</Button>
                        </form>
                    </div>
                }
                
                <Footer />
            </div>
        </>
    )
}

export default DeleteAccount