import clsx from 'clsx'
import {useAtomValue} from 'jotai'
import {immerseAtom} from '../atoms/fullscreen'
import Search from '../components/Search'
import Clock from '../components/Clock'
import Favorites from '../components/Favorites'
import {Tool} from '../components/Tool'
import Background from '../components/Background'
import '../css/home.css'


export const Home = () => {
    const immerse = useAtomValue(immerseAtom)

    return (
        <div>
            <Background/>
            <div className={clsx(immerse ? 'gaussian-blur mt-0' : '')}> {/*加 背景模糊*/}
                <div id={clsx(immerse ? 'main-container-full' : 'main-container')}> {/*加 上边距*/}
                    <div className='my-0 mx-auto'>
                        <Clock/>
                    </div>
                    <div className={clsx('mt-8', immerse ? 'hidden' : '')}>
                        <Search/>
                        <Favorites/>
                    </div>
                </div>
            </div>
            <Tool/>
        </div>
    )
}
