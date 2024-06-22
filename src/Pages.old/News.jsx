import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./styles/Home.module.css";
import newsStyles from "./styles/News.module.css";
import axios from "axios";
import config from "../config";
import Button from "../components/Button";

const Media = ({id}) => {
    const [isLoading, setLoading] = useState(true);
    const [media, setMedia] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.blogUrl}/wp-json/wp/v2/media/${id}`)
            .then(response => {
                let res = response.data;
                setMedia(res);
            })
        }
    }, [isLoading]);

    return media === null ?
        <div className={newsStyles.Media}></div>
        :
        <img src={media.source_url} alt={media.source_url} className={newsStyles.Media} />
}

const News = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.blogUrl}/wp-json/wp/v2/posts?per_page=12`)
            .then(response => {
                let res = response.data;
                setItems(res);
            })
        }
    }, [isLoading]);

    return (
        <>
            <Header active="info" child={'news'} />
            <div className="content">
                <div className={styles.Section}>
                    <div className="inline">
                        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1}}>
                            <div className={styles.SectionTitle} style={{textAlign: 'left',marginBottom: 10}}>Artikel</div>
                            <div style={{fontSize: 14,color: '#8492a6',textAlign: 'left'}}>Selalu ada insight baru dari kami</div>
                        </div>
                        <Button accent="secondary" onClick={() => {
                            window.open(config.blogUrl, '_blank')
                        }}>Lebih Banyak</Button>
                    </div>

                    <div className={newsStyles.Container}>
                        {
                            items.map((item, i) => (
                                <a href={item.link} className={newsStyles.Item} key={i} target="_blank">
                                    <Media id={item.featured_media} />
                                    <div className={newsStyles.Title}>{item.title.rendered}</div>
                                </a>
                            ))
                        }
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default News;