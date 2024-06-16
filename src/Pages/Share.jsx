import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import styles from "./styles/Share.module.css";
import { BiUser } from "react-icons/bi";
import Button from "../components/Button";
import queryString from "query-string";

const Share = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/content/${id}`)
            .then(response => {
                let res = response.data;
                setContent(res.content);
            })
        }
    }, [isLoading]);

    return (
        <>
            <div className={styles.Body}></div>
            <div className={styles.Header}>
                <img src="/images/Icon-Play.png" alt="icon" className={styles.HeaderIcon} />
                <div className={styles.HeaderTitle}>Promociin</div>
            </div>
            <div className={styles.Content}>
                <div className={styles.Card}>
                    {
                        content?.user.photo === null ?
                        <div className={styles.Photo}>
                            <BiUser size={25} color={config.primaryColor} />
                        </div>
                        :
                        <img src={`${config.baseUrl}/storage/user_photos/${content?.user.photo}`} alt={content?.user.name} className={styles.Photo} />
                    }
                    <div className={styles.Name}>{content?.user.name}</div>
                    <div className={styles.Username}>{content?.user.username}</div>
                    <Button style={{borderRadius: 999}} onClick={() => {
                        window.open(`com.promociin.app://Player/${btoa(JSON.stringify(content))}`);
                        // window.open('com.promociin.app://Upload')
                    }}>Open Video</Button>
                </div>
            </div>
        </>
    )
}

export default Share;