import {useAtom} from 'jotai'
import {useEffect} from 'react'
import {GoScreenNormal} from 'react-icons/go'
import {GoScreenFull} from 'react-icons/go'
import {fullscreenAtom, immerseAtom} from '../atoms/fullscreen'
// import '../css/fullscreenComponent.css'


const FullscreenComponent = () => {
    const [fullscreen, setIsFullscreen] = useAtom(fullscreenAtom)
    const [immerse, setImmerseIsFullscreen] = useAtom(immerseAtom)

    // 处理全屏变化事件
    const handleFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement
        // 检查当前是否处于全屏状态
        setIsFullscreen(!!isFullscreen);
    }

    useEffect(() => {
        // 添加全屏变化事件监听器
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        // 组件卸载时移除事件监听器
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 请求全屏
    const requestFullscreen = () => {
        const elem = document.documentElement; // 获取根元素
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    // 退出全屏
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    // 处理按钮点击事件
    const toggleFullscreen = (one: boolean) => {
        if (one) {
            if (!immerse) {
                setImmerseIsFullscreen(true);
                requestFullscreen();
            } else {
                setImmerseIsFullscreen(false);
            }
        } else {
            if (!fullscreen) {
                requestFullscreen();
            } else {
                setImmerseIsFullscreen(false);
                exitFullscreen();
            }
        }
    }

    return (
        <>
            <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl'>
                <div onClick={() => toggleFullscreen(true)}>
                    {immerse ? <GoScreenNormal title={"退出沉浸"} size='20' color='white'/> :
                        <GoScreenFull title={"沉浸模式"} size='20' color='white'/>}
                </div>
            </div>
            <div className='inline-block p-2 bg-black/20 backdrop-blur rounded-xl'>
                <div onClick={() => toggleFullscreen(false)}>
                    {fullscreen ? <GoScreenNormal title={"退出全屏"} size='20' color='white'/> :
                        <GoScreenFull title={"全屏模式"} size='20' color='white'/>}
                </div>
            </div>

        </>
    );
};

export default FullscreenComponent;
