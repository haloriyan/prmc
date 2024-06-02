import React, { useState } from "react";
import styles from "./styles/MenuAdmin.module.css";
import { BiAlarmExclamation, BiChevronLeft, BiEdit, BiGroup, BiHome, BiListCheck, BiMobile, BiSolidCoupon, BiTag, BiUser, BiVideo } from "react-icons/bi";

const MenuAdmin = ({active}) => {
    const [mobileShowMenu, setMobileShowMenu] = useState(false);
    const [isPublic, setPublic] = useState(false);

    if (window.screen.width > 480) {
        return (
            <div className={styles.Menu}>
    
                <div className={styles.MenuArea}>
                    <a href="/admin/dashboard" className={`${styles.MenuItem} ${active === 'dashboard' ? styles.MenuActive : ''}`}>
                        <BiHome />
                        <div className={styles.MenuText}>Dashboard</div>
                    </a>
                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Master Data
                    </div>
                    <a href="/admin/master/admin" className={`${styles.MenuItem} ${active === 'admin' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Administrator</div>
                    </a>
                    <a href="/admin/master/user" className={`${styles.MenuItem} ${active === 'user' ? styles.MenuActive : ''}`}>
                        <BiMobile />
                        <div className={styles.MenuText}>Pengguna</div>
                    </a>
                    <a href="/admin/master/hometag" className={`${styles.MenuItem} ${active === 'hometag' ? styles.MenuActive : ''}`}>
                        <BiTag />
                        <div className={styles.MenuText}>Home Tag</div>
                    </a>
                    <a href="/admin/master/announcement" className={`${styles.MenuItem} ${active === 'announcement' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Pengumuman</div>
                    </a>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Manajemen Konten
                    </div>
                    <a href="/admin/content" className={`${styles.MenuItem} ${active === 'content' ? styles.MenuActive : ''}`}>
                        <BiEdit />
                        <div className={styles.MenuText}>Semua Konten</div>
                    </a>
                    <a href="/admin/content/report" className={`${styles.MenuItem} ${active === 'content_report' ? styles.MenuActive : ''}`}>
                        <BiAlarmExclamation />
                        <div className={styles.MenuText}>Pelaporan Konten</div>
                    </a>
                    <a href="/admin/content/live-code" className={`${styles.MenuItem} ${active === 'live_code' ? styles.MenuActive : ''}`}>
                        <BiVideo />
                        <div className={styles.MenuText}>Kode Live Streaming</div>
                    </a>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Periklanan
                    </div>
                    <a href="/admin/ad/campaign" className={`${styles.MenuItem} ${active === 'campaign' ? styles.MenuActive : ''}`}>
                        <div className={styles.MenuText}>Semua Kampanye</div>
                    </a>

                </div>
            </div>
        )
    }
}

export default MenuAdmin;