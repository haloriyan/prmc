import React from 'react';
import styles from './styles/Waves.module.css';
import config from '../config';

const Waves = ({count = 3, width = '160px', height = '30px', color = config.primaryColor}) => {
    return (
        <div className={styles.Container} style={{
            width: width,
            height: height,
        }}>
            
        </div>
    )
}

export default Waves