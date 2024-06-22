import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Jumbo from "../components/Jumbo";
import styles from "./styles/Home.module.css";
import faqStyles from "./styles/FAQ.module.css";
import { BiPlus, BiX } from "react-icons/bi";

const FAQ = () => {
    const [index, setIndex] = useState(null);

    useEffect(() => {
        document.title = "FAQ - Promociin";
    }, []);

    const faqs = [
        {
            question: "Bagaimana cara menggunakan aplikasi Promociin?",
            answer: "Anda dapat mengunduh aplikasi Promociin melalui Google Play kemudian membuat akun dan melengkapi informasi profesional Anda"
        },
        {
            question: "Apakah menggunakan Promociin berbayar?",
            answer: "Tidak. Kami tidak memungut biaya apapun, semua layanan dapat Anda gunakan secara gratis."
        },
        {
            question: "Apakah data-data pribadi saya aman?",
            answer: "Kami tidak meminta terlalu meminta banyak data pribadi Anda agar menjaga kepercayaan kepada kami. Namun untuk beberapa data yang kami butuhkan akan kami simpan dan telah kami enkripsi dengan teknologi tinggi sehingga tidak ada yang bisa membukanya tanpa melalui aplikasi dan cara-cara yang kami izinkan."
        }
    ];

    return (
        <>
            <Header active="info" child={'faq'} />
            <div className="content">
                <Jumbo
                    withNavigation={true} breadcrumb={'FAQ'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Frequently Asked Questions</div>
                        </>
                    }
                />

                <div className={styles.Section}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Pertanyaan Umum</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Kami memiliki jawaban dari semua pertanyaan Anda</div>

                    <div className={faqStyles.Container}>
                        {
                            faqs.map((faq, f) => (
                                <div key={f} className={faqStyles.Item}>
                                    <div className={faqStyles.Question} onClick={() => setIndex(f === index ? null : f)}>
                                        <div style={{display: 'flex',flexGrow: 1,color: f === index ? '#eb3c7f' : '#212121'}}>{faq.question}</div>
                                        {
                                            f === index ? <BiX size={20} /> : <BiPlus size={20} />
                                        }
                                    </div>
                                    {
                                        f === index &&
                                        <div className={faqStyles.Answer}>{faq.answer}</div>
                                    }
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

export default FAQ;