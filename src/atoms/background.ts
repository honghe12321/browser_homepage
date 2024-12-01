import {atom} from 'jotai'
import {defaultBackgroundImage} from '../common/config.ts'

const backgroundImageAtom = atom(defaultBackgroundImage)

export {
    backgroundImageAtom,
}
