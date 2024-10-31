import React, { useState, useEffect } from 'react';
import { GoScreenNormal } from "react-icons/go";
import { GoScreenFull } from "react-icons/go";
import "../css/fullscreenComponent.css"

const FullscreenComponent = ({isImmerseFullscreen,setImmerseIsFullscreen}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // 处理全屏变化事件
    const handleFullscreenChange = () => {
        // 检查当前是否处于全屏状态
        setIsFullscreen(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    };

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
    }, []);

    // 请求全屏
    const requestFullscreen = () => {
        const elem = document.documentElement; // 获取根元素
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    };

    // 退出全屏
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    };

    // 处理按钮点击事件
    const toggleFullscreen = (Immerse) => {
        if (Immerse){
            if (!isImmerseFullscreen){
                setImmerseIsFullscreen(true);
                requestFullscreen();
            }else {
                setImmerseIsFullscreen(false);
            }
        }else {
            if (!isFullscreen) {
                requestFullscreen();
            } else {
                setImmerseIsFullscreen(false);
                exitFullscreen();
            }
        }



    };

    return (
        <div>
            <div className="Layout">
                <div onClick={()=>toggleFullscreen(false)}>
                    {isFullscreen ? <GoScreenNormal title={"退出全屏"}/> : <GoScreenFull title={"全屏模式"}/>}
                </div>
            </div>
            <div className="Layout2">
                <div onClick={()=>toggleFullscreen(true)}>
                    {isImmerseFullscreen ? <GoScreenNormal title={"退出沉浸"}/> : <GoScreenFull title={"沉浸模式"}/>}
                </div>
            </div>
        </div>


    );
};

export default FullscreenComponent;