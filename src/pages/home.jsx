import clsx from 'clsx'
import {useAtomValue} from 'jotai'
import {immerseAtom} from '../atoms/fullscreen'
import Search from '../components/Search'
import Clock from '../components/Clock'
import Favorites from '../components/Favorites'
// import FullscreenComponent from '../components/fullscreenComponent'
// import BackgroundChanger from '../components/BackgroundChanger'
import '../css/home.css'
import {Tool} from "../components/Tool";


export const Home = () => {
    const immerse = useAtomValue(immerseAtom)

    return (<div>
        {/*<BackgroundChanger/>*/}

            <div  className={clsx(immerse ? 'gaussian-blur mt-0' : 'mt-32 sm:mt-40 lg:mt-60')}> {/*加 背景模糊*/}
                <div id={clsx(immerse ? 'main-container-full' : 'main-container')}> {/*加 上边距*/}
                    <div className='my-0 mx-auto'>
                        <Clock/>
                    </div>

                    {!immerse && (
                        <div className='mt-8'>
                            <Search/>
                            <Favorites/>
                        </div>
                    )}

                </div>
            </div>
        <Tool/>
            {/*<FullscreenComponent />*/}
    </div>)
}
