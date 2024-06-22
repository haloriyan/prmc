import React from "react";
import styles from "./styles/Dots.module.css";
import config from "../config";

const Dots = ({vertical = 2, horizontal = 6, size = 8, gap = 8, containerStyle, color = "#ccc"}) => {
    const verticals = Array.from({ length: vertical }, (_, index) => index + 1);
    const horizontals = Array.from({ length: horizontal }, (_, index) => index + 1);
    return (
        <div className={styles.Container} style={{
            gap: gap,
            ...containerStyle
        }}>
            {
                verticals.map(vert => (
                    <div className={styles.Row} key={vert} style={{
                        gap: gap,
                    }}>
                        {
                            horizontals.map(hor => (
                                <div className={styles.Dot} style={{
                                    width: size,
                                    height: size,
                                    backgroundColor: color
                                }}></div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Dots;