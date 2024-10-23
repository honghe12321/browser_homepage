import React, { useState, useEffect } from 'react';
import { GoScreenNormal } from "react-icons/go";
import { GoScreenFull } from "react-icons/go";
import "../css/fullscreenComponent.css"

const FullscreenComponent = () => {
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
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            requestFullscreen();
        } else {
            exitFullscreen();
        }
    };

    return (
        <div className="Layout">
            <div onClick={toggleFullscreen}>
                {isFullscreen ? <GoScreenNormal/> : <GoScreenFull/>}
            </div>
        </div>
    );
};

export default FullscreenComponent;