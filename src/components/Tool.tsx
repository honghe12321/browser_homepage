import { BsChevronUp,BsChevronDown} from 'react-icons/bs'
import {useState} from 'react'
import clsx from 'clsx'
import BackgroundChanger from './BackgroundChanger'
import FullscreenComponent from './FullscreenComponent'

export function Tool() {
    // 控制设置面板显示或隐藏
    const [showSettings, setShowSettings] = useState<boolean>(true);

    return (
        <>
            <div
                className={clsx('fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2 transition-all duration-500 ease-in-out', showSettings ? 'translate-y-0' : 'translate-y-16')}>
                <div className='flex justify-center w-full'>
                    {/*设置按钮*/}
                    <div className='inline-block px-2 pt-0.5 bg-white/20 backdrop-blur rounded-t-lg'
                         onClick={() => setShowSettings(prev => !prev)}>
                        {showSettings ? < BsChevronDown size='20' color='white'/>
                                        : < BsChevronUp size='20' color='white'/>}

                    </div>
                </div>
                <div
                    className={clsx('p-3 bg-white/20 backdrop-blur rounded-2xl flex',)}>
                    <BackgroundChanger/>
                    <FullscreenComponent/>
                </div>
            </div>
        </>
    )
}
