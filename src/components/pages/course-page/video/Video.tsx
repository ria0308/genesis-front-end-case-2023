import React, {useEffect, useRef, useState} from 'react';
import Hls from 'hls.js';
import {useRouter} from "next/router";


export interface videoProps{
    link: string;
    poster: string;
}

const Video:  React.FC<videoProps>  = props => {
    const router = useRouter();
    const myRef = useRef<HTMLVideoElement>(null);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const video = myRef.current;
        const hls = new Hls();
        if (!props.link) {
            router.push("/");
            return;
        }
        hls.loadSource(props.link);
        video && hls.attachMedia(video);

        // Load saved progress from local storage
        const savedProgress = localStorage.getItem(props.link);
        if (savedProgress) {
            video.currentTime = parseFloat(savedProgress);
            setTime(parseFloat(savedProgress));
        }

        // Save current progress to local storage
        function handleTimeUpdate() {
            localStorage.setItem(props.link, video.currentTime.toString());
            setTime(video.currentTime);
        }

        video?.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video?.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [myRef, props.link, router]);


    return (

            <video
                poster={props.poster}
                playbackRate={playbackRate}
                controls
                ref={myRef}
                style={{height: 300}}
                onKeyDown={(event)=>{
                    if (event.code === "ArrowUp") {
                    setPlaybackRate((rate) => rate + 0.1);
                    } else if (event.code === "ArrowDown") {
                        setPlaybackRate((rate) => rate - 0.1);
                    }
                    myRef.current.playbackRate = playbackRate;
                }}
            />

    );

};

export default Video;