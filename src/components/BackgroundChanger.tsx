import {BsCardImage} from 'react-icons/bs'
import {useSetAtom} from 'jotai'
import {b64Blob} from '../libs/base64'
import {backgroundImageAtom} from '../atoms/background'
import type {ChangeEvent} from 'react'
import '../css/home.css'

const BackgroundChanger = () => {
    const setBackgroundImage = useSetAtom(backgroundImageAtom)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', (evt) => {
                if (evt.target) {
                    const base64Url = evt.target.result

                    if (typeof base64Url === 'string') {
                        setBackgroundImage(b64Blob(base64Url))

                        localStorage.setItem('backgroundImage', base64Url)
                    }
                }
            }, false)
            reader.readAsDataURL(files[0])
        }
    }

    return (
        <>
            <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl'>
                <label>
                <span>
                    <BsCardImage size='20' color='white'/>
                </span>
                    <input className='hidden' type="file" accept="image/*" onChange={handleImageChange}/>
                </label>
            </div>
        </>
    );
};

export default BackgroundChanger;
