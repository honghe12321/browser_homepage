import {useEffect, useState, useRef, createContext, useContext} from 'react'
import type {ChangeEvent, RefObject} from 'react'
import ReactDOM from 'react-dom'
import {hexToHsl, hslToHex} from '../libs/color'
import {jotaiStore} from '../providers/store'
import {themeColorAtom, defaultThemeColor} from '../atoms/themeColor'
import '../css/color-picker.css'

interface PickerProps {
    ref: RefObject<HTMLDivElement | null>
    onChange: (color: HSLColor) => void
}

interface ColorPickerPortalProps {
    onChange: (color: HSLColor) => void
}

function Picker(props: PickerProps) {
    const state = useContext(ColorPickerContext)

    useEffect(() => {
        const container = props.ref.current
        if (container) {
            container.style.setProperty('--h', `${state.h}`)
        }
    }, [state.h])

    useEffect(() => {
        const container = props.ref.current
        if (container) {
            container.style.setProperty('--s', `${state.s}%`)
        }
    }, [state.s])

    useEffect(() => {
        const container = props.ref.current
        if (container) {
            container.style.setProperty('--l', `${state.l}%`)
        }
    }, [state.l])

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hex = event.target.value
        const [h, s, l] = hexToHsl(hex)
        props.onChange({h, s, l})
    }

    return (
        <div className='fixed inset-0'>
            <div className="md:w-3/5 w-4/5 absolute bottom-20 translate-x-1/2 right-1/2">
                <div className='backdrop-blur p-5 rounded-3xl color-picker bg-black/20' style={{
                    animation: '180ms linear forwards fade-in',
                }} ref={props.ref}>
                    <div>
                        <div className="py-1 opacity-100">
                            <span>主题色预览(点击预览条可唤起原生取色器)</span>
                        </div>
                        <div className="color-bar color-bar0">
                            <label>
                                <input className='w-full h-full opacity-0' type='color' value={state.hex} onChange={onColorChange}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        色相 (H)
                        <div className="color-bar color-bar1">
                            <label>
                                <input type='range' className='w-full ' min={0} max={360} value={state.h}
                                       onChange={(event) => {
                                           const v = parseInt(event.target.value, 10)
                                           props.onChange({
                                               h: v,
                                               s: state.s,
                                               l: state.l,
                                           })
                                       }}/>
                            </label>
                        </div>
                        饱和度 (S)
                        <div className="color-bar color-bar2">
                            <label>
                                <input type='range' className='w-full' min={0} max={100} value={state.s}
                                       onChange={(event) => {
                                           const v = parseInt(event.target.value, 10)
                                           props.onChange({
                                               h: state.h,
                                               s: v,
                                               l: state.l,
                                           })
                                       }}/>
                            </label>
                        </div>
                        明度 (L)
                        <div className="color-bar color-bar3">
                            <label>
                                <input type='range' className='w-full' min={0} max={100} value={state.l}
                                       onChange={(event) => {
                                           const v = parseInt(event.target.value, 10)
                                           props.onChange({
                                               h: state.h,
                                               s: state.s,
                                               l: v,
                                           })
                                       }}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ColorPickerProps {
    show: boolean
    onChange: (color: HSLColor) => void
}

interface PickerState {
    show: boolean
    hex: string
}

type ColorPickerState = PickerState & HSLColor

const ColorPickerContext = createContext<ColorPickerState>(Object.assign({
    show: false,
    hex: '',
}, defaultThemeColor));

function ColorPickerPortal(props: ColorPickerPortalProps) {
    const state = useContext(ColorPickerContext)
    const pickerRef = useRef<HTMLDivElement>(null)
    const [hidden, setHidden] = useState<boolean>(true)

    useEffect(() => {
        if (state.show) {
            setHidden(false)
        } else {
            const picker = pickerRef.current

            if (picker) {
                picker.style.animationName = 'fade-out'
                setTimeout(() => setHidden(true), 180)
            }
        }
    }, [state.show])

    useEffect(() => {
        const picker = pickerRef.current

        function handleAnimationend() {
            if (!state.show) {
                setHidden(true)
            }
        }

        if (picker) {
            picker.addEventListener('animationend', handleAnimationend, false)
        }

        return () => {
            if (picker) {
                picker.removeEventListener('animationend', handleAnimationend)
            }
        }
    }, [pickerRef.current])

    if (hidden) {
        return null
    }

    const picker = <Picker ref={pickerRef} onChange={props.onChange} />
    return ReactDOM.createPortal(picker, document.body)
}

function ColorPicker(props: ColorPickerProps) {
    const [state, setState] = useState<ColorPickerState>(() => {
        const hsl = jotaiStore.get(themeColorAtom)
        const hex: string = hslToHex(hsl.h, hsl.s, hsl.l)
        const state: ColorPickerState = {
            show: false, hex,
            h: hsl.h, s: hsl.s, l: hsl.l,
        }
        return state
    })

    useEffect(() => {
        setState({
            ...state,
            show: props.show,
        })
    }, [props.show])


    function onChange(hsl: HSLColor) {
        const hex: string = hslToHex(hsl.h, hsl.s, hsl.l)
        setState({
            ...state,
            h: hsl.h, s: hsl.s, l: hsl.l, hex,
        })
        props.onChange(hsl)
    }

    return (
        <ColorPickerContext value={state}>
            <ColorPickerPortal onChange={onChange} />
        </ColorPickerContext>
    )
}

export default ColorPicker
