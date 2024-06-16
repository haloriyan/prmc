import React, { useState } from "react";
import styles from "./styles/MenuAdmin.module.css";
import { BiAlarmExclamation, BiChevronLeft, BiEdit, BiGroup, BiHome, BiListCheck, BiMobile, BiSolidCoupon, BiTag, BiUser, BiVideo } from "react-icons/bi";
import { Link } from "react-router-dom";

const MenuAdmin = ({active}) => {
    const [mobileShowMenu, setMobileShowMenu] = useState(false);
    const [isPublic, setPublic] = useState(false);

    if (window.screen.width > 480) {
        return (
            <div className={styles.Menu}>
    
                <div className={styles.MenuArea}>
                    <Link to="/admin/dashboard" className={`${styles.MenuItem} ${active === 'dashboard' ? styles.MenuActive : ''}`}>
                        <BiHome />
                        <div className={styles.MenuText}>Dashboard</div>
                    </Link>
                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Master Data
                    </div>
                    <Link to="/admin/master/admin" className={`${styles.MenuItem} ${active === 'admin' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Administrator</div>
                    </Link>
                    <Link to="/admin/master/user" className={`${styles.MenuItem} ${active === 'user' ? styles.MenuActive : ''}`}>
                        <BiMobile />
                        <div className={styles.MenuText}>Pengguna</div>
                    </Link>
                    <Link to="/admin/master/hometag" className={`${styles.MenuItem} ${active === 'hometag' ? styles.MenuActive : ''}`}>
                        <BiTag />
                        <div className={styles.MenuText}>Home Tag</div>
                    </Link>
                    <Link to="/admin/master/announcement" className={`${styles.MenuItem} ${active === 'announcement' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Pengumuman</div>
                    </Link>
                    <Link to="/admin/master/stream" className={`${styles.MenuItem} ${active === 'stream' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Stream Data</div>
                    </Link>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Manajemen Konten
                    </div>
                    <Link to="/admin/content" className={`${styles.MenuItem} ${active === 'content' ? styles.MenuActive : ''}`}>
                        <BiEdit />
                        <div className={styles.MenuText}>Semua Konten</div>
                    </Link>
                    <Link to="/admin/content/report" className={`${styles.MenuItem} ${active === 'content_report' ? styles.MenuActive : ''}`}>
                        <BiAlarmExclamation />
                        <div className={styles.MenuText}>Pelaporan Konten</div>
                    </Link>
                    <Link to="/admin/content/live-code" className={`${styles.MenuItem} ${active === 'live_code' ? styles.MenuActive : ''}`}>
                        <BiVideo />
                        <div className={styles.MenuText}>Kode Live Streaming</div>
                    </Link>
                    <Link to="/admin/content/training-center" className={`${styles.MenuItem} ${active === 'training_center' ? styles.MenuActive : ''}`}>
                        <BiAlarmExclamation />
                        <div className={styles.MenuText}>Training Center</div>
                    </Link>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Periklanan
                    </div>
                    <Link to="/admin/ad/campaign" className={`${styles.MenuItem} ${active === 'campaign' ? styles.MenuActive : ''}`}>
                        <div className={styles.MenuText}>Semua Kampanye</div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default MenuAdmin;