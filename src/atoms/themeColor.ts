import {atom} from 'jotai'
import {jotaiStore} from '../providers/store'

const defaultThemeColor: HSLColor = {
    h: 172,
    s: 86,
    l: 60,
}

const themeColorAtom = atom<HSLColor>(defaultThemeColor)

themeColorAtom.onMount = (setAtom) => {
    const color = localStorage.getItem('themeColor')

    if (color) {
        try {
            const parsed = JSON.parse(color)
            setAtom(Object.assign({}, defaultThemeColor, parsed))
        } catch (e: unknown) {
            console.error('Unable to parse theme color', e)
            localStorage.removeItem('themeColor')
        }
    }
}

jotaiStore.sub(themeColorAtom, () => {
    const color: HSLColor = jotaiStore.get(themeColorAtom);

    document.documentElement.style.setProperty('--accent-h', `${color.h}`);
    document.documentElement.style.setProperty('--accent-s', `${color.s}%`);
    document.documentElement.style.setProperty('--accent-l', `${color.l}%`);

    localStorage.setItem('themeColor', JSON.stringify(color));
})

export {
    themeColorAtom, defaultThemeColor
}
