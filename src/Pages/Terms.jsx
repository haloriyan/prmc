import React, { useEffect } from "react";
import Header from "../components/Header";
import styles from "./styles/Home.module.css";
import Footer from "../components/Footer";
import privStyles from "./styles/Privacy.module.css";

const Terms = () => {
    useEffect(() => {
        document.title = "Syarat & Ketentuan - Promociin";
    }, []);

    return (
        <>
            <Header active="info" child={'privacy'} />
            <div className="content">
                <div className={styles.Section} style={{gap: 20}}>
                    <div className={styles.SectionTitle} style={{textAlign: 'center',marginBottom: -20}}>Syarat & Ketentuan</div>
                    <div style={{fontSize: 14,color: '#8492a6',textAlign: 'center'}}>Aturan yang harus Anda patuhi ketika menggunakan layanan kami</div>

                    <div className={privStyles.Body}>
                        Pedoman Komunitas ini merupakan aturan dan standar untuk penggunaan aplikasi Promociin agar sesuai dengan hukum dan norma-norma dalam masyarakat. Memberikan pengalaman media sosial yang aman bagi setiap pengguna. Pedoman ini berlaku untuk setiap pengguna aplikasi Promociin tanpa pengecualian. Setiap pengguna dianggap mengetahui, membaca, dan wajib patuh terhadap syarat dan ketentuan ini.
                    </div>
                    <div className={privStyles.Body}>
                        Definisi pengguna adalah individu atau organisasi yang menggunakan atau mengunduh aplikasi Promociin untuk melakukan berbagai aktivitas di dalamnya.
                    </div>
                    <div className={privStyles.Body}>
                        Ada beberapa poin utama dalam dokumen ini :
                    </div>
                    <ol>
                        <li>Larangan terhadap beberapa konten, aktivitas, dan sanksi</li>
                        <li>Pedoman konten dan aktivitas standar</li>
                        <li>Batasan usia</li>
                        <li>Keamanan dan pengumpulan data</li>
                        <li>Pemberdayaan diri, bisnis, dan komunitas</li>
                        <li>Pernyataan tentang syarat dan ketentuan penggunaan</li>
                        <li>Tentang Kami dan Hubungi Kami</li>
                    </ol>

                    <h3 className={privStyles.SubTitle}>1. Larangan terhadap beberapa konten, aktivitas, dan sanksi</h3>
                    <div className={privStyles.Body}>
                        Setiap pengguna aplikasi Promociin pada kolom konten dan komentarnya :
                    </div>
                    <ol>
                        <li>Dilarang melakukan segala sesuatu yang melanggar peraturan perundang-undangan atau melawan hukum.</li>
                        <li>Dilarang melakukan kegiatan yang tidak sesuai dengan norma yang ada dan melanggar Hak Asasi Manusia serta bertentangan dengan kemanusiaan.</li>
                        <li>Dilarang melakukan kegiatan kriminal, termasuk perjudian, pemerasan, penipuan, dan akun palsu, serta memberikan informasi palsu.</li>
                        <li>Dilarang melakukan kegiatan yang berkaitan dengan pornografi, aktivitas seksual, dan tindakan porno, termasuk ketelanjangan dan/atau memperlihatkan bagian tubuh yang tidak senonoh (body exposure), termasuk mempromosikan layanan seksual atau mainan seks.</li>
                        <li>Dilarang melakukan kegiatan yang merugikan Suku, Agama, Ras, dan Kelompok Sosial (SARA), termasuk ujaran kebencian, intimidasi, penghasutan, dan perilaku kebencian lainnya, serta segala sesuatu yang dapat menimbulkan kegaduhan masyarakat.</li>
                        <li>Dilarang melakukan eksploitasi dan perdagangan manusia, kekerasan seksual, pelecehan seksual, perundungan (bullying), kegiatan pedofilia, dan pencemaran nama baik, termasuk tidak memberikan perlindungan terhadap anak, perempuan, dan penyandang disabilitas.</li>
                        <li>Dilarang menyebarkan ideologi dan doktrin yang bertentangan dengan hukum.</li>
                        <li>Dilarang melakukan kegiatan yang mendorong perubahan gender dan bedah kosmetik estetika tanpa memberikan informasi yang jelas mengenai potensi risikonya.</li>
                        <li>Dilarang melakukan kegiatan yang menampilkan darah manusia, penyiksaan terhadap hewan dan kekerasan fisik lainnya yang tidak manusiawi, serta konten yang menakutkan dan mengejutkan.</li>
                        <li>Dilarang melakukan kegiatan yang berhubungan dengan konsumsi alkohol, rokok dan tembakau, serta obat-obatan terlarang.</li>
                        <li>Dilarang menyebarkan virus atau sejenisnya dan link yang berbahaya bagi perangkat elektronik seperti komputer, laptop, dan ponsel serta berbagi kode QR.</li>
                        <li>Dilarang melanggar hak kekayaan intelektual, termasuk hak cipta atau hak orang lain menurut hukum.</li>
                        <li>Dilarang mempromosikan dan menjual produk-produk yang melanggar hukum, termasuk senjata api, bahan peledak, obat-obatan terlarang, dan segala barang yang membahayakan masyarakat.</li>
                        <li>Dilarang melakukan aktivitas dan promosi bunuh diri serta cara-cara yang merugikan atau melukai diri sendiri, termasuk gangguan makan dan perilaku penurunan berat badan yang berbahaya.</li>
                        <li>Dilarang terlibat dalam aktivitas apa pun yang berkaitan dengan misinformasi, termasuk politik dan pemilu.</li>
                        <li>Dilarang menggunakan media sintetik dan memanipulasi kejadian agar tampak nyata tanpa pemberitahuan terlebih dahulu.</li>
                        <li>Dilarang memposting data pribadi orang lain tanpa persetujuannya dan/atau memalsukan identitas diri, orang lain, dan/atau organisasi.</li>
                    </ol>

                    <div className={privStyles.Body}>
                        Setiap pelanggaran terhadap tindakan yang dilarang akan mengakibatkan sanksi berupa konten atau aktivitas. Pembekuan, pemblokiran, atau penghapusan akun atau komentar yang dapat dilakukan dengan segera, terkadang tanpa pemberitahuan terlebih dahulu, dan/atau tindakan hukum sesuai peraturan perundang-undangan. Jika Anda keberatan dengan pemblokiran tersebut, Anda dapat mengajukan keberatan melalui email layanan pelanggan.
                    </div>

                    <h3 className={privStyles.SubTitle}>2. Standar Isi dan Pedoman Kegiatan</h3>
                    <ol>
                        <li>Hindari semua konten, aktivitas, dan tindakan terlarang dalam pedoman ini.</li>
                        <li>Gunakan aplikasi dan media sosial dengan bijak, jangan melakukan hal-hal yang dapat merugikan diri sendiri atau orang lain. Selalu berpikir dua kali sebelum melakukannya.</li>
                        <li>Dilarang memposting atau membagikan video, termasuk komentar yang tidak pantas dan melanggar hukum termasuk norma yang ada.</li>
                        <li>Melindungi akun dan informasi pribadi, termasuk data pribadi saat memposting video atau berkomentar di media sosial.</li>
                        <li>Cara terbaik dalam memposting video adalah dengan mengikuti hukum dan norma, tidak menampilkan atau memperlihatkan informasi pribadi yang berlebihan seperti alamat rumah atau kontak telepon, dan cukup menyebutkan nama dan memberikan email.</li>
                        <li>Berhati-hatilah terhadap permintaan pertemanan atau pengikut dari orang asing.</li>
                        <li>Berhati-hatilah terhadap segala penipuan, pemerasan, dan tindakan kriminal lainnya.</li>
                        <li>Jika diajak bertemu secara pribadi oleh orang atau organisasi yang tidak dikenal, jangan pernah pergi sendirian. Ajaklah selalu teman, saudara, atau keluarga untuk menemani Anda. Jangan mudah percaya pada informasi yang biasanya terkesan tidak masuk akal dan selalu periksa kebenarannya.</li>
                        <li>Gunakan mesin pencari dan berbagai sumber untuk memeriksa ulang semuanya.</li>
                        <li>Jangan mudah mempercayai link atau undangan dari sumber yang tidak diketahui atau mencurigakan.</li>
                        <li>Tetap waspada terhadap tindakan pengguna media sosial lainnya, terutama yang melanggar hukum.</li>
                        <li>Jangan mudah percaya dan terjerumus pada informasi yang salah.</li>
                        <li>Jika dihubungi dan ditawari sesuatu, jangan mudah percaya.</li>
                        <li>Jangan pernah memenuhi permintaan pengiriman uang dan/atau barang, meskipun tawaran tersebut tampak menarik.</li>
                        <li>Selalu waspada dan berhati-hati dalam menggunakan media sosial dan aplikasi ini.</li>
                    </ol>

                    <div className={privStyles.Body}>
                        Jaga dirimu. Berhati-hatilah terhadap segala aktivitas kriminal yang mungkin terjadi, dan jika Anda merasa keselamatan dan keamanan Anda terancam, segera hubungi pihak penegak hukum. Mintalah bantuan pada teman, saudara, dan keluarga. Jangan menyelesaikan masalah sendirian tanpa bantuan apa pun.
                    </div>

                    <h3 className={privStyles.SubTitle}>3. Pembatasan Usia</h3>
                    <div className={privStyles.Body}>
                        Untuk dapat mendownload aplikasi ini, Anda harus berusia minimal 15 (lima belas) tahun dan harus berusia 17 (tujuh belas) tahun dan/atau sudah menikah untuk dapat memposting video dan melakukan aktivitas lainnya.
                    </div>

                    <h3 className={privStyles.SubTitle}>4. Keamanan Data dan Data yang Dikumpulkan</h3>
                    <div className={privStyles.Body}>
                        Kami menyimpan data Anda dan tidak membaginya dengan pihak ketiga. Informasi data pribadi dikumpulkan hanya untuk proses pendaftaran.
                    </div>

                    <h3 className={privStyles.SubTitle}>5. Pemberdayaan Diri, Entitas Bisnis, dan Komunitas</h3>
                    <div className={privStyles.Body}>
                        Promociin adalah aplikasi berbagi video pendek. Dirancang untuk memberdayakan dan meningkatkan kompetensi diri, kreativitas, bisnis, dan komunitas dengan cara yang modern dan inovatif. Ini adalah platform media sosial yang menyenangkan dan membuka peluang positif untuk meningkatkan taraf hidup. Nikmati hiburan sehari-hari dengan video inspiratif.
                    </div>

                    <h3 className={privStyles.SubTitle}>6. Pernyataan Syarat dan Ketentuan Penggunaan</h3>
                    <ol>
                        <li>Segala aktivitas yang dilakukan dalam aplikasi, termasuk dampak penggunaan Promociin, merupakan tanggung jawab pribadi pengguna dan bukan merupakan tanggung jawab Promociin atau PT. Adelia Kreasi Indonesia. Segala kerusakan perangkat elektronik akibat pengunduhan atau penggunaan aplikasi ini bukan merupakan tanggung jawab Promociin atau PT. Adelia Kreasi Indonesia.</li>
                        <li>Konten yang mengandung dan dimaksudkan semata-mata untuk promosi atau iklan harus disetujui oleh administrator aplikasi Promociin.</li>
                        <li>Administrator aplikasi Promociin berhak merevisi atau mengubah syarat dan ketentuan secara berkala dan sewaktu-waktu. Pengguna harus membaca syarat dan ketentuan secara teratur.</li>
                        <li>Pengguna harus memperbarui aplikasi sesuai dengan pedoman dan instruksi yang ditetapkan. Pembaruan aplikasi penting untuk menjaga keamanan dan kinerja aplikasi.</li>
                        <li>Administrator aplikasi Promociin berhak mengambil tindakan yang diperlukan, termasuk menghapus, membekukan, atau memblokir konten, akun, dan/atau komentar tanpa pemberitahuan sebelumnya atas segala pelanggaran syarat dan ketentuan termasuk pedoman.</li>
                        <li>Penggunaan aplikasi harus sesuai dengan tujuan aplikasi tersebut. Dilarang menggunakan Aplikasi untuk tujuan ilegal atau tujuan lain yang melanggar hukum.</li>
                        <li>Setiap pengguna harus mematuhi pedoman dan mematuhi semua hukum dan peraturan.</li>
                        <li>Setiap pengguna menyetujui semua syarat dan ketentuan yang ditetapkan atau disediakan oleh Promociin dan/atau PT. Adelia Kreasi Indonesia.</li>
                    </ol>

                    <h3 className={privStyles.SubTitle}>7. Tentang Kami dan Hubungi Kami</h3>
                    <div className={privStyles.Body}>
                        Promociin merupakan salah satu unit usaha PT. Adelia Kreasi Indonesia, sebuah badan hukum yang berkedudukan di Indonesia. Visi kami adalah memberikan kontribusi kesejahteraan umum melalui peningkatan kompetensi dan kemajuan tenaga kerja khususnya di bidang ketenagakerjaan. Misi kami adalah memberikan kontribusi positif kepada setiap tenaga kerja dan pemangku kepentingan hubungan industrial, termasuk perusahaan, dengan memfasilitasi atau terhubung melalui aplikasi Promociin. Hubungi kami di promociin.com@gmail.com.
                    </div>

                    <div className={privStyles.Body}>
                        Promosi Aja
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Terms;