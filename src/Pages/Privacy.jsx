import React, { useEffect } from "react";
import Header from "../components/Header";
import styles from "./styles/Home.module.css";
import Footer from "../components/Footer";
import privStyles from "./styles/Privacy.module.css";
import { Link } from "react-router-dom";

const Privacy = () => {
    useEffect(() => {
        document.title = "Kebijakan Privasi - Promociin"
    }, []);

    return (
        <>
            <Header active="info" child={'privacy'} />
            <div className="content">
                <div className={styles.Section} style={{lineHeight: '12px',gap: 20}}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: 10}}>Kebijakan Privasi</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center',marginBottom: 30}}>Data dan privasi Anda sangat penting bagi kami</div>

                    <div className={privStyles.Body}>
                    Kebijakan privasi ini menjelaskan bagaimana Promociin ("kami") mengumpulkan, menggunakan, dan membagikan informasi pribadi pengguna ("Anda") saat menggunakan aplikasi [Nama Aplikasi Anda] ("Aplikasi"). Kami berkomitmen untuk melindungi privasi Anda dan menangani informasi pribadi Anda dengan hati-hati.
                    </div>

                    <h3 className={privStyles.SubTitle}>1. Informasi yang Kami Kumpulkan</h3>
                    <div className={privStyles.Body}>
                        Kami dapat mengumpulkan informasi berikut saat Anda menggunakan Aplikasi:
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>Informasi yang Anda Berikan Secara Langsung</span> : Ini termasuk informasi yang Anda berikan saat mendaftar akun, mengisi formulir, atau berinteraksi dengan fitur Aplikasi. Contohnya termasuk nama, alamat email, nomor telepon, dan informasi lain yang Anda pilih untuk diberikan.
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>Informasi yang Dikumpulkan Secara Otomatis</span> : Saat Anda menggunakan Aplikasi, kami dapat mengumpulkan informasi tertentu secara otomatis, termasuk:
                        <ul>
                            <li>
                                <span className={styles.Bold}>Data Penggunaan : </span>
                                Informasi tentang bagaimana Anda menggunakan Aplikasi, seperti fitur yang Anda akses, waktu dan durasi penggunaan, dan interaksi Anda dengan konten Aplikasi.
                            </li>
                            <li>
                                <span className={styles.Bold}>Data Perangkat : </span>
                                Informasi tentang perangkat yang Anda gunakan untuk mengakses Aplikasi, seperti model perangkat, sistem operasi, pengidentifikasi unik perangkat, alamat IP, dan informasi jaringan seluler.
                            </li>
                        </ul>
                    </div>

                    <h3 className={privStyles.SubTitle}>2. Penggunaan Informasi</h3>
                    <div className={privStyles.Body}>
                        Kami menggunakan informasi yang kami kumpulkan untuk tujuan berikut:
                    </div>
                    <div className={privStyles.Body}>
                        <ul>
                            <li>
                                <span className={styles.Bold}>Menyediakan, Memelihara, dan Meningkatkan Aplikasi : </span>
                                Ini termasuk menggunakan informasi untuk mengoperasikan Aplikasi, menyediakan fitur dan fungsionalitas, memperbaiki bug dan masalah teknis, serta meningkatkan kinerja dan pengalaman pengguna.
                            </li>
                            <li>
                                <span className={styles.Bold}>Personalisasi Pengalaman : </span>
                                Kami dapat menggunakan informasi untuk mempersonalisasi pengalaman Anda dalam Aplikasi, seperti menampilkan konten yang relevan dengan minat Anda.
                            </li>
                            <li>
                                <span className={styles.Bold}>Komunikasi : </span>
                                Kami dapat menggunakan informasi untuk berkomunikasi dengan Anda, seperti mengirimkan pemberitahuan, pembaruan, atau informasi penting lainnya terkait Aplikasi.
                            </li>
                            <li>
                                <span className={styles.Bold}>Analisis dan Penelitian : </span>
                                Kami dapat menggunakan informasi untuk menganalisis tren penggunaan, memahami bagaimana pengguna berinteraksi dengan Aplikasi, dan melakukan penelitian untuk meningkatkan produk dan layanan kami.
                            </li>
                        </ul>
                    </div>

                    <h3 className={privStyles.SubTitle}>3. Pembagian Informasi</h3>
                    <div className={privStyles.Body}>
                        Kami dapat membagikan informasi pribadi Anda dalam situasi berikut:
                    </div>
                    <div className={privStyles.Body}>
                        <ul>
                            <li>
                                <span className={styles.Bold}>Dengan Penyedia Layanan : </span>
                                Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan, memelihara, dan meningkatkan Aplikasi. Penyedia layanan ini terikat oleh perjanjian kerahasiaan dan hanya diperbolehkan menggunakan informasi untuk tujuan yang kami tentukan.
                            </li>
                            <li>
                                <span className={styles.Bold}>Untuk Kepatuhan Hukum : </span>
                                Kami dapat membagikan informasi jika diwajibkan oleh hukum, peraturan, proses hukum, atau permintaan pemerintah yang sah.
                            </li>
                            <li>
                                <span className={styles.Bold}>Dalam Transaksi Bisnis : </span>
                                Jika kami terlibat dalam merger, akuisisi, atau penjualan aset, informasi pribadi Anda dapat ditransfer sebagai bagian dari transaksi tersebut. Kami akan memberi tahu Anda tentang perubahan kepemilikan atau penggunaan informasi pribadi Anda.
                            </li>
                        </ul>
                    </div>

                    <h3 className={privStyles.SubTitle}>4. Keamanan Informasi</h3>
                    <div className={privStyles.Body}>
                        Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi atau penyimpanan elektronik yang 100% aman, sehingga kami tidak dapat menjamin keamanan mutlak informasi Anda.
                    </div>

                    <h3 className={privStyles.SubTitle}>5. Retensi & Penghapusan Data</h3>
                    <div className={privStyles.Body}>
                        Kami akan menyimpan informasi pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan privasi ini, kecuali jika diperlukan periode penyimpanan yang lebih lama atau diizinkan oleh hukum. Jika Anda ingin menghapus akun Anda atau meminta penghapusan informasi pribadi Anda, silakan buka <Link to={'/delete-account'}>Laman Penghapusan Akun</Link>
                    </div>

                    <h3 className={privStyles.SubTitle}>6. Perubahan Kebijakan Privasi</h3>
                    <div className={privStyles.Body}>
                        Kami dapat memperbarui kebijakan privasi ini apabila diperlukan. Jika kami membuat perubahan materi, kami akan memberi tahu Anda melalui Aplikasi atau melalui cara lain yang sesuai.
                    </div>

                    <h3 className={privStyles.SubTitle}>7. Informasi Kontak</h3>
                    <div className={privStyles.Body}>
                        Jika Anda memiliki pertanyaan atau masalah tentang kebijakan privasi ini atau aplikasi Promociin, silakan <Link to={'/contact'}>Hubungi Kami</Link>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Privacy;