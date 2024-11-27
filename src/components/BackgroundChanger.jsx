import React, {useState, useEffect} from 'react';
import {BsBox} from 'react-icons/bs';
import {b64Blob} from '../libs/base64';
import '../css/home.css'

const BackgroundChanger = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                const base64Url = e.target.result;
                setBackgroundImage(b64Blob(base64Url));
                // 将图片URL存储到localStorage中
                localStorage.setItem('backgroundImage', base64Url);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div id='bg' className='-z-10' style={{backgroundImage: `url(${backgroundImage})`}}>
            <div>
                <label>
                    <span className='relative inline-block m-2 p-2 bg-black/20 backdrop-blur rounded-xl'>
                        <BsBox size='20' color='white'/>
                    </span>
                    <input className='hidden' type="file" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>
        </div>
    );
};

export default BackgroundChanger;