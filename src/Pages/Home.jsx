import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import styles from "./styles/Home.module.css";
import Separator from "../components/Separator";
import { BiBadge, BiBadgeCheck, BiBox, BiComment, BiGroup, BiLock, BiMobile, BiSearch, BiSolidTruck, BiTime } from "react-icons/bi";
import config from "../config";
import Scroller from "../components/Scroller";
import Input from "../components/Input";
import Button from "../components/Button";
import Clients from "../Partials/Clients";

const Home = () => {
    const images = [
        "/images/bg1.png",
        "/images/bg2.png",
    ];

    const features = [
        {
            icon: <BiLock />,
            title: "Mudah dan Aman",
            description: "Semua data Anda tersimpan dan terenkripsi tingkat tinggi"
        },
        {
            icon: <BiGroup />,
            title: "Jangkauan Luas",
            description: "Temukan banyak orang dari berbagai bidang pekerjaan"
        },
        {
            icon: <BiTime />,
            title: "Mudah Atur Interview",
            description: "Atur jadwal, terima undangan interview langsung dari aplikasi"
        },
        
    ]

    const clients = [
        {logo: "/images/kp.jpg"},
        {logo: "/images/rdi.png"}
    ];

    const testimonials = [
        {
            name: "Elizabeth Olsen",
            body: "Sangat terkesan dengan keefisienan Promociin dalam membantu saya mencari pekerjaan. Antarmuka aplikasi yang mudah digunakan membuat proses pencarian pekerjaan menjadi lebih lancar. Terima kasih Promociin, saya berhasil menemukan pekerjaan impian saya melalui aplikasi ini!",
            photo: "https://ew.com/thmb/gmAk1GjSMjEF2qIkOZoW6hR70Mg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Elizabeth-Olsen-01-052523-8882960a392540918236a35f7a5ead92.jpg"
        },
        {
            name: "Andre Onana",
            body: "Promociin benar-benar membawa perubahan positif dalam perjalanan pencarian pekerjaan saya. Aplikasi ini tidak hanya memberikan banyak pilihan pekerjaan, tetapi juga menyederhanakan proses melamar pekerjaan. Saya sangat merekomendasikan Promociin kepada teman-teman yang sedang mencari peluang karir.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9_Onana.jpg/640px-Andr%C3%A9_Onana.jpg"
        },
        {
            name: "Kathrine Dennings",
            body: "Saya sangat terkesan dengan fitur pencarian pekerjaan yang canggih di Promociin. Aplikasi ini membantu saya menemukan pekerjaan yang sesuai dengan keahlian dan minat saya. Proses melamar pekerjaan menjadi lebih efisien dan transparan. Terima kasih Promociin, saya sangat puas dengan hasilnya!",
            photo: "https://ca-times.brightspotcdn.com/dims4/default/515e1d7/2147483647/strip/true/crop/600x399+0+0/resize/1200x798!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F03%2F70%2F94768fe13af7bab009cd6b20095a%2Fla-xpm-photo-2013-nov-05-la-et-mn-thor-kat-dennings-peoples-choice-20131105"
        },
        {
            name: "Robert Downey Jr",
            body: "Promociin adalah teman setia saya dalam mencari pekerjaan. Aplikasi ini tidak hanya memberikan informasi pekerjaan terbaru, tetapi juga memberikan tips dan saran yang sangat berguna untuk meningkatkan peluang sukses dalam wawancara. Saya sangat berterima kasih kepada Promociin atas kontribusinya dalam karir saya.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/1200px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg"
        },
        {
            name: "Julius Robert Oppenheimer",
            body: "Promociin bukan hanya sekadar aplikasi pencari pekerjaan, tetapi juga solusi lengkap untuk pengembangan karir. Saya menemukan banyak peluang pekerjaan menarik dan mendapatkan update industri terbaru. Aplikasi ini benar-benar membantu saya meningkatkan keterampilan dan pemahaman saya tentang dunia kerja. Terima kasih Promociin!",
            photo: "https://asset.kompas.com/crops/dsoejvYrxS1IwAwQY8_uKLz4jco=/72x45:611x404/1200x800/data/photo/2021/10/19/616e6a37873b1.jpeg"
        },
    ]

    useEffect(() => {
        document.title = "Home - Promociin";
    }, []);

    return (
        <>
            <Header />
            <div className="content">
                <Slide>
                    {
                        images.map((img, i) => (
                            <div key={i} className={`each-slide-effect`} style={{height: 500}}>
                                <img src={img} alt={`Image ${i}`} style={{width: '100%'}} />
                            </div>
                        ))
                    }
                </Slide>

                <div className={`${styles.Section} ${styles.About}`}>
                    <img src="/images/Icon-Play.png" alt="About Illustration" className={styles.AboutIllustration} />
                    <div className={styles.AboutContent}>
                        <div className={styles.SectionTitle}>Tentang Promociin</div>
                        <Separator color="#eb3c7f" height={4} style={{borderRadius: 99}} width="15%" margin="20px 0px 40px 0px" />
                        <div className={styles.AboutDescription}>
                            Promociin adalah aplikasi berbagi video yang dapat membantu menunjukkan apa yang menjadi profesi dan keahlian Anda sehingga dapat ditemukan dengan mudah oleh pencari talenta di Indonesia.
                        </div>
                        <div className={styles.AboutDescription} style={{marginTop: 20}}>
                            Kami juga bekerja sama dengan <i>Human Resources</i> dari puluhan perusahaan dan terus berkomitmen untuk terus mengembangkan talenta-talenta terbaik.
                        </div>
                    </div>
                </div>

                <div className={styles.Section} style={{paddingTop: 0}}>
                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureItem} style={{alignItems: 'center'}}>
                            <div className={styles.FeatureIcon}>100+</div>
                            <div className={styles.FeatureDescription}>Unduhan</div>
                        </div>
                        <div className={styles.FeatureItem} style={{alignItems: 'center'}}>
                            <div className={styles.FeatureIcon}>50+</div>
                            <div className={styles.FeatureDescription}>Pengguna Direkrut</div>
                        </div>
                        <div className={styles.FeatureItem} style={{alignItems: 'center'}}>
                            <div className={styles.FeatureIcon}>500+</div>
                            <div className={styles.FeatureDescription}>Video Diupload</div>
                        </div>
                    </div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>dan akan terus bertumbuh...</div>
                </div>

                <div className={`${styles.Section} ${styles.Features}`}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Kenapa Harus Install Promociin?</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Semakin berat paketnya, semakin murah harganya</div>
                    <div className={styles.FeatureContainer}>
                        {
                            features.map((feat, f) => (
                                <div className={styles.FeatureItem} key={f}>
                                    <div className={styles.FeatureIcon}>{feat.icon}</div>
                                    <div className={styles.FeatureTitle}>{feat.title}</div>
                                    <div className={styles.FeatureDescription}>{feat.description}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`${styles.Section}`}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Apa Kata Mereka?</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Lihat bagaimana orang-orang terbantu dengan Promociin</div>
                    <Scroller events={testimonials} count={3} />
                </div>

                <div className={styles.Section}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Mitra Kami</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Telah dipercaya oleh puluhan perusahaan di Indonesia</div>
                    <Clients clients={clients} />
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Home;