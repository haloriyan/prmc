import React, { useEffect } from "react";
import Header from "../components/Header";
import styles from "./styles/Home.module.css";
import Footer from "../components/Footer";
import privStyles from "./styles/Privacy.module.css";

const ReturnPolicy = () => {
    useEffect(() => {
        document.title = "Kebijakan Pengembalian - IDN Express";
    }, []);
    
    return (
        <>
            <Header active="info" child={'privacy'} />
            <div className="content">
                <div className={styles.Section}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Kebijakan Pengembalian</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Aturan yang harus Anda patuhi ketika menggunakan layanan kami</div>

                    <div className={privStyles.Body}>
                        Halaman Kebijakan Privasi ini menjelaskan tentang bagaimana Kami mendapatkan, menggunakan, dan menjaga informasi yang pengguna berikan baik melalui aplikasi maupun layanan pihak ketiga.
                    </div>

                    <h3 className={privStyles.SubTitle}>1. Informasi yang Kami Dapatkan</h3>
                    <div className={privStyles.Body}>
                        Ketika pengguna mendaftar, menggunakan, dan/atau mengautentikasi layanan pihak ketiga, Kami bisa mendapatkan beberapa data pribadi seperti :
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>1.1. Informasi Dasar</span>. Kami berhak mengakses dan menyimpan informasi dasar yang terhubung dengan akun layanan pihak ketiga pengguna seperti (namun tidak terbatas pada) nama dan alamat email.
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>1.2. Izin Akses</span>. Kami akan meminta akses spesifik untuk mengakses beberapa data dan layanan dari pihak ketiga.
                    </div>

                    <h3 className={privStyles.SubTitle}>2. Bagaimana Kami Menggunakan Informasi Pengguna</h3>
                    <div className={privStyles.Body}>Kami akan menggunakan informasi pengguna untuk berbagai layanan pihak ketiga seperti :</div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>2.1. Akses Layanan Pihak Ketiga</span>. Untuk mengakses dan memproses layanan spesifik yang disediakan oleh pihak ketiga yang telah pengguna izinkan.
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>2.2. Komunikasi</span>. Mengirim dan menerima informasi yang terkait dengan akses layanan takotoko dan/atau pihak ketiga
                    </div>

                    <h3 className={privStyles.SubTitle}>3. Pengelolaan dan Pembagian Informasi</h3>
                    <div className={privStyles.Body}>Kami tidak menjual, menukarkan, atau membagikan data ke pihak manapun di luar kondisi berikut :</div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>3.1. Penyedia Layanan Tambahan</span>. Kami mungkin membagikan data pengguna kepada pihak ketiga yang hanya untuk kelancaran proses bisnis dan/atau aplikasi
                    </div>
                    <div className={privStyles.Body}>
                        <span className={styles.Bold}>3.2. Kewajiban Hukum</span>. Kami juga mungkin akan membagikan data pengguna kepada pihak berwenang atau hukum yang berlaku
                    </div>

                    <h3 className={privStyles.SubTitle}>4. Keamanan Data</h3>
                    <div className={privStyles.Body}>Kami telah mengimplementasikan dan menguji secara teknis dan terorganisir untuk melindungi data pribadi pengguna. Meskipun demikian tidak ada transaksi online yang sepenuhnya aman dan kami tidak menjamin secara absolut terhadap keamanan data pengguna.</div>
                

                    <h3 className={privStyles.SubTitle}>5. Hak-hak Pengguna</h3>
                    <div className={privStyles.Body}>Pengguna dapat mengubah maupun menghapus data yang kami simpan kapan saja dan mungkin ada beberapa data yang memerlukan permintaan khusus untuk melakukan perubahan atau penghapusan.</div>

                    <h3 className={privStyles.SubTitle}>6. Perubahan pada Kebijakan Privasi</h3>
                    <div className={privStyles.Body}>Kami mungkin dan berhak untuk mengubah sebagian atau seluruh kebijakan privasi Kami kapan saja. Kami akan memberitahukan kepada seluruh pengguna beberapa waktu sebelum perubahan tersebut efektif.</div>

                    <h3 className={privStyles.SubTitle}>7. Hubungi Kami</h3>
                    <div className={privStyles.Body}>Apabila terdapat pertanyaan lebih lanjut pengguna dapat mengirimkan pesan melalui halaman <a href="/contact">Hubungi Kami</a></div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ReturnPolicy;