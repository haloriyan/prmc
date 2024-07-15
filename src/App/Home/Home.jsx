import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import config from "../../config";
import VideoContent from "./VideoContent";

const Home = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, clientHeight } = containerRef.current;
            const newVideoIndex = Math.round(scrollTop / clientHeight);
            setCurrentVideo(newVideoIndex);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/page/home`)
                .then(response => {
                    let res = response.data;
                    setLoading(false);
                    setContents(res.contents);
                });
        }
    }, [isLoading, triggerLoading]);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollTo({
                top: (currentVideo * container.clientHeight) - 30,
                behavior: "smooth",
            });
        }
    }, [currentVideo]);

    return (
        <>
            <Header />
            <Sidebar active={'home'} />
            <div
                className="absolute top-16 right-0 w-full py-4 flex flex-col gap-8 items-center overflow-y-scroll"
                ref={containerRef}
                style={{ height: "calc(100vh - 4rem)" }}
            >
                {
                    contents.map((cont, index) => (
                        <VideoContent
                            cont={cont}
                            key={index}
                            isActive={index === currentVideo}
                        />
                    ))
                }
            </div>
            <div className="fixed top-16 right-0">
                sds
            </div>
        </>
    );
};

export default Home;
