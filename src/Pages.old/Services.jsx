import React, { useEffect } from "react";
import Header from "../components/Header";
import styles from "./styles/Home.module.css";
import Footer from "../components/Footer";
import servStyles from "./styles/Service.module.css";
import Separator from "../components/Separator";
import config from "../config";
import Button from "../components/Button";

const Services = () => {
    useEffect(() => {
        document.title = "Layanan Kami - IDN Express";
    }, []);

    const services = [
        {
            name: "Impor",
            image: "https://choirexpress.co.id/media/frontend/IMPORT.jpg",
            body: "IDN Express sekarang hadir dengan layanan jasa Impor dari Korea, Hongkong, Singapore ke Indonesia. Hubungi Hotline kami(Klik Tombol dibawah ini) untuk mendapatkan informasi yang lebih detail."
        },
        {
            name: "Ekspor",
            image: "https://choirexpress.co.id/media/frontend/ekspor.jpg",
            body: "IDN Express memberikan layanan kiriman ke luar negeri yang dilakukan secara professional dan penuh tanggung jawab. Kami memastikan kiriman Anda sampai ditujuan dengan tepat waktu dan aman. IDN Express berkomitmen memberikan pelayanan terbaik."
        },
        {
            name: "Jasa Titip",
            image: "https://choirexpress.co.id/media/frontend/JASTIP_2.png",
            body: "Membantu pelanggan untuk membelikan product dari toko online (Shopee, Tokopedia, Lazada, Zalora, Bukalapak, Jd.id, Blibli dll) cukup kirimkan linknya kepada kami."
        }
    ]
    return (
        <>
            <Header active="about" sub={'services'} />
            <div className="content">
                <div className={styles.Section}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Layanan Kami</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Solusi pengiriman lengkap ke mana saja dengan harga terjangkau</div>

                    <div className={servStyles.Container}>
                        {
                            services.map((serv, s) => (
                                <div key={s} className={servStyles.Item}>
                                    <img src={serv.image} alt={serv.name} className={servStyles.Cover} />
                                    <div className={servStyles.Content}>
                                        <div className={servStyles.Title}>{serv.name}</div>
                                        <Separator color={config.primaryColor} height={4} style={{borderRadius: 99}} width="8%" />
                                        <div className={servStyles.Description}>{serv.body}</div>
                                        <div className="inline">
                                            <Button>Hubungi Kami</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Services;