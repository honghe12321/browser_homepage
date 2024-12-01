import {useAtomValue} from 'jotai'
import {backgroundImageAtom} from '../atoms/background'
import '../css/home.css'

const BackgroundChanger = () => {
    const backgroundImage: string = useAtomValue(backgroundImageAtom)

    return (
        <div id='bg' className='-z-10' style={{backgroundImage: `url(${backgroundImage})`}}></div>
    );
};

export default BackgroundChanger;
