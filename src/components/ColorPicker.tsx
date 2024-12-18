import {ChangeEvent, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {hexToHsl, hslToHex} from '../libs/color'
import '../css/color-picker.css'

interface HslColor {
    h: number
    s: number
    l: number
}

interface PickerProps {
    onChange: (color: string) => void
}

function Picker(props: PickerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<string>()
    const [hsl, setHsl] = useState<HslColor>(() => {

        const color = localStorage.getItem('themeColor')

        if (color) {
            const [h, s, l] =  hexToHsl(color)
            return {h, s, l}
        }

        return {
            h: 50,
            s: 60,
            l: 50,
        }
    })

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.style.setProperty('--h', `${hsl.h}`)
            container.style.setProperty('--s', `${hsl.s}%`)
            container.style.setProperty('--l', `${hsl.l}%`)
        }

        requestAnimationFrame(() => {
            const hex = hslToHex(hsl.h, hsl.s, hsl.l)
            setHex(hex)
            props.onChange(hex)
        })

    }, [hsl])

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hex = event.target.value
        const [h, s, l] =  hexToHsl(hex)
        setHsl({h, s, l})
    }

    return (
        <div className='fixed inset-0'>
            <div className="md:w-3/5 w-4/5 absolute bottom-20 translate-x-1/2 right-1/2">
                <div className='backdrop-blur p-5 rounded-3xl color-picker bg-black/20' style={{
                    animation: 'fade-in 180ms'
                }} ref={containerRef}>
                    <div>
                        <div className="py-1 opacity-100">
                            <span>主题色预览(点击预览条可唤起原生取色器)</span>
                        </div>
                        <div className="color-bar color-bar0">
                                <label>
                                    <input className='w-full h-full opacity-0' type='color' value={hex} onChange={onColorChange}/>
                                </label>
                        </div>
                    </div>
                    <div>
                        色相 (H)
                        <div className="color-bar color-bar1">
                            <div>
                                <label>
                                    <input type='range' className='w-full ' min={0} max={360} value={hsl.h}
                                           onChange={(event) => {
                                               const v = parseInt(event.target.value, 10)
                                               setHsl({
                                                   h: v,
                                                   s: hsl.s,
                                                   l: hsl.l,
                                               })
                                           }}/>
                                </label>
                            </div>
                        </div>
                        饱和度 (S)
                        <div className="color-bar color-bar2">
                            <div>
                                <label>
                                    <input type='range' className='w-full' min={0} max={100} value={hsl.s}
                                           onChange={(event) => {
                                               const v = parseInt(event.target.value, 10)
                                               setHsl({
                                                   h: hsl.h,
                                                   s: v,
                                                   l: hsl.l,
                                               })
                                           }}/>
                                </label>
                            </div>
                        </div>
                        明度 (L)
                        <div className="color-bar color-bar3">
                            <div>
                                <label>
                                    <input type='range' className='w-full' min={0} max={100} value={hsl.l}
                                           onChange={(event) => {
                                               const v = parseInt(event.target.value, 10)
                                               setHsl({
                                                   h: hsl.h,
                                                   s: hsl.s,
                                                   l: v,
                                               })
                                           }}/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ColorPickerProps {
    show: boolean
    onChange: (color: string) => void
}

function ColorPicker(props: ColorPickerProps) {
    if (props.show) {
        return ReactDOM.createPortal(
            <Picker onChange={props.onChange}/>, document.body
        )
    }

    return null
}

export default ColorPicker