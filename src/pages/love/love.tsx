import React, { useState } from 'react';

const Love: React.FC = () => {
    // 状态：存储“可以”按钮的宽高
    const [size, setSize] = useState({ width: 100, height: 40,cont:0 }); // 初始宽高
    const [love, setLove] = useState(false)

    // 处理“拒绝”按钮点击事件
    const handleReject = () => {
        setSize((prevSize) => ({
            width: prevSize.width * 1.7, // 每次点击宽度增加 20px
            height: prevSize.height * 1.7, // 每次点击高度增加 10px
            cont: prevSize.cont+1
        }));
        if (size.cont>=3){
            size.cont=2
        }
    };
    const handleLove = () => {
        setLove(true)
    }

    const getLabelText = () => {
        switch (size.cont) {
            case 0:
                return '可以和我在一起吗';
            case 1:
                return '嗯？不考虑一下吗';
            case 2:
                return '真的不再想想吗！！！';
            default:
                return '呜呜呜';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-4">
            {love ?
                <div>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={`/images/4.jpg`}
                            alt="Heart"
                            className="w-36 h-36 object-cover"
                        />
                        <label className="text-2xl text-blue-500 font-semibold">
                            ヾ(≧▽≦*)o最喜欢你了！！！！
                        </label>
                    </div>
                </div>
                :
                <div className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={`/images/${size.cont}.jpg`}
                            alt="Heart"
                            className="w-24 h-24 object-cover"
                        />
                        <label className="text-xl font-semibold text-gray-800">
                            {getLabelText()}

                    </label>
                </div>
                <div className="mt-6 flex justify-center items-center space-x-4">
                    {/* “可以”按钮：根据 size 状态动态调整宽高 */}
                    <button
                        onClick={() => handleLove()}
                        style={{
                            width: `${size.width}px`,
                            height: `${size.height}px`,
                        }}
                        className="bg-red-400 text-white px-6 py-2 rounded-xl hover:bg-red-500 transition duration-300 flex items-center justify-center"
                    >
                        可以
                    </button>
                    {/* “拒绝”按钮：点击时触发 handleReject */}
                    <button
                        onClick={handleReject}
                        style={{
                            width: `100px`,
                            height: `40px`,
                        }}
                        className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition duration-300"
                    >
                        拒绝
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default Love;