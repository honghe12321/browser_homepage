import {atom} from 'jotai'
import {defaultBackgroundImage} from '../common/config'
import {b64Blob} from '../libs/base64'

const backgroundImageAtom = atom(defaultBackgroundImage)

backgroundImageAtom.onMount = (setAtom) => {
    const cached = localStorage.getItem('backgroundImage')

    if (cached) {
        const blob: string = b64Blob(cached)
        setAtom(blob)

        return () => {
            URL.revokeObjectURL(blob)
        }
    }
}

export {
    backgroundImageAtom,
}
