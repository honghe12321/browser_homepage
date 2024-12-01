import {useRef} from 'react';
import type {ChangeEvent} from 'react';
import {useSetAtom} from 'jotai';
import {BsFlower3} from 'react-icons/bs'
import {themeColorAtom} from '../atoms/themeColor'

export const Theme = () => {
    const colorInputRef = useRef<HTMLInputElement>(null)
    const setThemeColor = useSetAtom(themeColorAtom)

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setThemeColor(e.target.value)
    }
    const handleDivClick = () => {
        colorInputRef.current?.click()
    }

    return (
        <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl' onClick={handleDivClick}>
            <label>
                <input
                    ref={colorInputRef}
                    type='color'
                    onChange={handleColorChange}
                    className='hidden'
                />
                <BsFlower3 size='20' color='white'/>
            </label>
        </div>
    )
}
