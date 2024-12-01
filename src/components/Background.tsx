import {useEffect} from 'react'
import {useAtom} from 'jotai'
import {b64Blob} from '../libs/base64'
import {backgroundImageAtom} from '../atoms/background'
import {defaultBackgroundImage} from '../common/config.ts';
import '../css/home.css'

const BackgroundChanger = () => {
    const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom)

    // 从localStorage中读取缓存的背景图片URL
    useEffect(() => {
        const cachedUrl = localStorage.getItem('backgroundImage')
        if (cachedUrl) {
            setBackgroundImage(b64Blob(cachedUrl))
        } else {
            setBackgroundImage(defaultBackgroundImage)
        }

        return () => {
            URL.revokeObjectURL(backgroundImage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id='bg' className='-z-10' style={{backgroundImage: `url(${backgroundImage})`}}></div>
    );
};

export default BackgroundChanger;
