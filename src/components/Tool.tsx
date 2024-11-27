import {BsBox} from 'react-icons/bs'
import {useState} from 'react'
import clsx from 'clsx'
import BackgroundChanger from './BackgroundChanger'
import FullscreenComponent from './FullscreenComponent'

export function Tool() {
    // 控制设置面板显示或隐藏
    const [showSettings, setShowSettings] = useState<boolean>(false);

    return (
        <div className='fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2'>
            <div
                className={clsx('transition-all duration-500 ease-in-out transform', showSettings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                <BackgroundChanger/>
                <FullscreenComponent/>
            </div>

            <div className='flex justify-center w-full'>
                {/*设置按钮*/}
                <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl'
                     onClick={() => setShowSettings(prev => !prev)}>
                    <BsBox size='20' color='white'/>
                </div>
            </div>

        </div>
    )
}
