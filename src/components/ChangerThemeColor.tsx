import {useSetAtom} from "jotai/index";
import { BsFlower3 } from "react-icons/bs";
import {themeColorAtom} from "../atoms/themeColor.ts";
import {useRef} from "react";

export const Theme=()=>{
    const colorInputRef = useRef(null);
    const setThemeColor = useSetAtom(themeColorAtom)
    const handleColorChange = (e: { target: { value: string; }; }) => {
        setThemeColor(e.target.value);
    };

    const handleDivClick = () => {
        // @ts-ignore
        colorInputRef.current.click(); // 触发 input 的点击事件，打开颜色选择器
    };

    return (
        <>
            <div
                className="inline-block p-2 bg-black/20 backdrop-blur rounded-xl"
                onClick={handleDivClick} // 点击时触发 handleDivClick
            >
                {/* 隐藏的颜色选择器 */}
                <input
                    ref={colorInputRef}
                    type="color"
                    onChange={handleColorChange}
                    className="hidden"
                />
                <BsFlower3  size='20' color='white'/> {/* 你可以替换成其他图标或内容 */}
            </div>
        </>
    );
}

