import React, { useState, useEffect } from 'react';
import { BsBox } from "react-icons/bs";
import '../css/home.css'
const BackgroundChanger = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [cachedImage, setCachedImage] = useState(null);

    // 从localStorage中读取缓存的背景图片URL
    useEffect(() => {
        const cachedUrl = localStorage.getItem('backgroundImage');
        if (cachedUrl) {
            setCachedImage(cachedUrl);
            setBackgroundImage(cachedUrl);
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Url = reader.result;
                setBackgroundImage(base64Url);
                // 将图片URL存储到localStorage中
                localStorage.setItem('backgroundImage', base64Url);
                setCachedImage(base64Url);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div id='bg' className='-z-10' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <label><span className='relative inline-block m-2 p-2 bg-black/20 backdrop-blur rounded-xl'><BsBox size='20' color='white'/></span><input className='hidden' type="file" accept="image/*" onChange={handleImageChange} value=''/></label>
            </div>
        </div>


    );
};

export default BackgroundChanger;