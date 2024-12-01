import {ChangeEvent, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {hexToHsl, hslToHex} from '../libs/color'

interface HslColor {
    h: number
    s: number
    l: number
}

interface PickerProps {
    onChange: (color: string) => void
}

function Picker(props: PickerProps) {
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
        const hex = hslToHex(hsl.h, hsl.s, hsl.l);
        props.onChange(hex)
    }, [hsl])

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hex = event.target.value
        const [h, s, l] =  hexToHsl(hex)
        setHsl({h, s, l})
    }

    return (
        <div className='fixed inset-0'>
            <div className="md:w-3/5 w-4/5 absolute bottom-5 translate-x-1/2 right-1/2">
                <div className='backdrop-blur p-5 rounded-md'>
                    <div className="grid grid-cols-2 items-center py-1">
                        <p>
                            <span>HSL 调色面板</span>
                        </p>
                        <p className="text-right">
                            <label>
                                原生调色板
                                <input type='color' onChange={onColorChange}/>
                            </label>
                        </p>
                    </div>
                    <div className="color-bar" style={{
                        backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                    }}></div>
                    <div>
                        <label>
                            H（色调）
                            <input type='range' className='w-full' min={0} max={360} value={hsl.h}
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
                    <div className="color-bar color-bar1"></div>
                    <div>
                        <label>
                            S（饱和度）
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
                    <div className="color-bar" style={{
                        background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
                    }}></div>
                    <div>
                        <label>
                            L（亮度）
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
                    <div className="color-bar" style={{
                        background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
                    }}></div>
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