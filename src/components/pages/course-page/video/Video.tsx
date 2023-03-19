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

    useEffect(() => {
        const video = myRef.current;
        const hls = new Hls();
            if (!props.link) {
                router.push('/');
                return;
            }
            hls.loadSource(props.link);
            video && hls.attachMedia(video);

    }, [myRef, props.link] );

    return (

            <video
                poster={props.poster}
                controls
                ref={myRef}
                style={{height: 300}}
            />

    );

};

export default Video;