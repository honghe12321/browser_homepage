import {atom} from 'jotai'
import {jotaiStore} from '../providers/store'

const themeColorAtom = atom('#33ffee')

themeColorAtom.onMount = (setAtom) => {
    const color = localStorage.getItem('themeColor')

    if (color) {
        setAtom(color)
    }
}

jotaiStore.sub(themeColorAtom, () => {
    const color: string = jotaiStore.get(themeColorAtom)

    localStorage.setItem('themeColor', color)
})

export {
    themeColorAtom,
}
