import {useEffect} from 'react';
import {b64Blob} from '../libs/base64';
import '../css/home.css'
import {backgroundImageAtom} from "../atoms/background";
import {useAtom} from "jotai";

const BackgroundChanger = () => {
    const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom)
    // 从localStorage中读取缓存的背景图片URL
    useEffect(() => {
        const cachedUrl = localStorage.getItem('backgroundImage');
        if (cachedUrl) {
            setBackgroundImage(b64Blob(cachedUrl));
        } else {
            setBackgroundImage('https://assets.truimo.com/images/p241022/2f8ef7077540980aaa272e9f2b17e10a.png')
        }

        return () => {
            URL.revokeObjectURL(backgroundImage);
        }
    }, []);

    return (
            <div id='bg' className='-z-10' style={{backgroundImage: `url(${backgroundImage})`}}></div>
    );
};

export default BackgroundChanger;
