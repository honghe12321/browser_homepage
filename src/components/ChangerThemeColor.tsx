import {useEffect, useState} from 'react'
import {useAtomValue, useSetAtom} from 'jotai'
import {BsFlower3} from 'react-icons/bs'
import {themeColorAtom} from '../atoms/themeColor'
import ColorPicker from './ColorPicker'
import {toolUnfoldAtom} from '../atoms/tools'

export const Theme = () => {
    const [show, setShow] = useState<boolean>(false)
    const setThemeColor = useSetAtom(themeColorAtom)

    const handleColorChange = (color: HSLColor) => {
        // let color_rgb = hexToRgb(color)
        // document.documentElement.style.setProperty('--color-rgb', rgbToStr(color_rgb));
        setThemeColor(color)
    }

    const handleClick = () => {
        setShow(!show)
    }

    const toolUnfold = useAtomValue(toolUnfoldAtom)

    useEffect(() => {
        if (!toolUnfold) {
            setShow(false)
        }
    }, [toolUnfold])

    return (
        <>
            <ColorPicker show={show} onChange={handleColorChange}/>
            <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl' onClick={handleClick}>
                <label>
                    <BsFlower3 size='20' color='white'/>
                </label>
            </div>
        </>
    )
}
