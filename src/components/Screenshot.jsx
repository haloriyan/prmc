import React from "react";
import styles from "./styles/Screenshot.module.css";

const Screenshot = ({src, aspectRatio = 9/19.5, frameSrc = "/images/frame.png"}) => {
    return (
        <div className={styles.container} style={{
            aspectRatio: aspectRatio
        }}>
            <img src={frameSrc} alt="frame image" className={styles.frame} />
            <div className={styles.image_container}>
                <img src={src} alt="source image" className={styles.image} style={{
                    aspectRatio: aspectRatio
                }} />
            </div>
        </div>
    )
}

export default Screenshot