import React, { useEffect } from "react";
import Header from "../components/Header";
import Jumbo from "../components/Jumbo";
import Footer from "../components/Footer";
import styles from "./styles/Home.module.css";
import contStyles from "./styles/Contact.module.css";
import { BiLogoWhatsapp, BiMap } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import Input from "../components/Input";
import Button from "../components/Button";

const Contact = () => {
    useEffect(() => {
        document.title = "Kontak - Promociin";
    }, []);

    const submit = e => {
        e.preventDefault();
    }

    return (
        <>
            <Header active="contact" />
            <div className="content">
                <Jumbo
                    withNavigation={true} breadcrumb={'Kontak'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Hubungi Kami</div>
                        </>
                    }
                />

                <div className={styles.Section}>
                    <div className={contStyles.Container}>
                        <div className={contStyles.Item}>
                            <BiLogoWhatsapp size={40} />
                            <div className={contStyles.Title}>Whatsapp</div>
                            <a href="https://wa.me/628123456789" className={contStyles.Link} target="_blank">+62 812 3456 789</a>
                        </div>
                        <div className={contStyles.Item}>
                            <MdEmail size={40} />
                            <div className={contStyles.Title}>Email</div>
                            <a href="mailto:halo@promociin.com" className={contStyles.Link}>promociin.com@gmail.com</a>
                        </div>
                        <div className={contStyles.Item}>
                            <BiMap size={40} />
                            <div className={contStyles.Title}>Lokasi</div>
                            <a href="https://maps.app.goo.gl/PboDBPnW5Fope6KQA" className={contStyles.Link} target="_blank">
                                Koridor Coworking Space, Jalan Tunjungan No. 1, Surabaya
                            </a>
                        </div>
                    </div>
                </div>

                <form className={styles.Section} onSubmit={submit}>
                    <Input label="Nama" />
                    <Input label="Email" />
                    <Input label="Pesan Anda" multiline />
                    <div className="inline">
                        <Button>Kirim</Button>
                    </div>
                </form>

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.857744056239!2d112.73458997511585!3d-7.257026492749663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f942ccdd7ce3%3A0x12072f0108ba519a!2sKoridor%20Coworking%20Space!5e0!3m2!1sen!2sid!4v1706021537913!5m2!1sen!2sid"
                    style={{border: 0}}
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    className={contStyles.MapFrame}
                ></iframe>

                <Footer />
            </div>
        </>
    )
}

export default Contact;