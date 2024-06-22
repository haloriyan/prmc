import React, { useEffect } from "react";
import Header from "../components/Header";
import Jumbo from "../components/Jumbo";
import styles from "./styles/Home.module.css";
import Footer from "../components/Footer";
import Separator from "../components/Separator";
import Clients from "../Partials/Clients";

const About = () => {
    useEffect(() => {
        document.title = "Tentang - Promociin";
    }, []);

    const clients = [
        {logo: "/images/kp.jpg"},
        {logo: "/images/rdi.png"}
    ];

    return (
        <>
            <Header active="about" child={'about'} />
            <div className="content">
                <Jumbo
                    withNavigation={true} breadcrumb={'Tentang'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Tentang Promociin</div>
                        </>
                    }
                />

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

export default About;