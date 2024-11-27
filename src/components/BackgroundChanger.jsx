import { BsCardImage } from "react-icons/bs";
import {b64Blob} from '../libs/base64';
import '../css/home.css'
import {backgroundImageAtom} from "../atoms/background";
import {useSetAtom} from "jotai";

const BackgroundChanger = () => {
    const setBackgroundImage = useSetAtom(backgroundImageAtom)

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
        <>
        <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl'>
            <label>
                <span >
                    <BsCardImage size='20' color='white'/>
                </span>
                <input className='hidden' type="file" accept="image/*" onChange={handleImageChange} />
            </label>
        </div>
        </>
    );
};

export default BackgroundChanger;
