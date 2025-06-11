import React, { useState } from "react";
import BackgroundChanger from "../../components/Background.tsx";


type GameItem = {
    title: string;
    img: string;
    url: string;
};

const games: GameItem[] = [
    {
        title: "画线小车",
        img: "https://imgs.crazygames.com/doodle-road_16x9/20240912101139/doodle-road_16x9-cover?metadata=none&quality=85&width=273&fit=crop",
        url: "https://www.crazygames.com/embed/doodle-road",
    },
    {
        title: "冲冲冲萨沃拉",
        img: "https://imgs.crazygames.com/count-masters-stickman-games_16x9/20250220041115/count-masters-stickman-games_16x9-cover?metadata=none&quality=85&width=273&fit=crop",
        url: "https://www.crazygames.com/embed/count-masters-stickman-games",
    },
    {
        title: "换装小游戏",
        img: "https://imgs.crazygames.com/holographic-trends/20210210062727/holographic-trends-cover?metadata=none&quality=85&width=273&fit=crop",
        url: "https://www.crazygames.com/embed/model-wedding---girls-games",
    },
];

const Game: React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleGameSelect = (game: GameItem) => {
        setSelectedGame(game);
        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        setIsFullscreen(false);
    };

    // 全屏游戏视图
    if (isFullscreen && selectedGame) {
        return (
            <div className="fixed inset-0 z-50 bg-black">
                {/* 退出按钮 */}
                <button
                    onClick={exitFullscreen}
                    className="h-8 absolute top-0 left-0 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg "
                >

                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {!isFullscreen ? '不想玩了' :''}

                </button>

                {/* 游戏标题 */}
                {!isFullscreen ?<div
                    className="absolute top-0 right-0 h-8 z-50 bg-primary backdrop-blur px-4 py-2 rounded-lg text-white font-semibold  flex items-center ">
                    {selectedGame.title}
                </div>:<></>}

                {/* 游戏 iframe */}
                <iframe
                    src={selectedGame.url}
                    className="w-full h-full"
                    allow="gamepad *"
                    title={selectedGame.title}
                />
            </div>
        );
    }

    // 游戏列表视图
    return (

        <div className="min-h-screen bg-gradient-to-br">
            <BackgroundChanger/>
            {/* 标题 */}
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-2">
                    游戏整合
                </h1>
                <p className="text-red-500 text-center mb-12">
                    注：此网站仅为游戏整合，点击游戏后跳转内容与开发者无关
                </p>

                {/* 游戏网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((game, index) => (
                        <div
                            key={index}
                            onClick={() => handleGameSelect(game)}
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="relative overflow-hidden rounded-xl shadow-xl">
                                {/* 游戏图片 */}
                                <img
                                    src={game.img}
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />

                                {/* 悬浮遮罩 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <button className="w-full bg-primary hover:bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                                            开始游戏
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 游戏标题 */}
                            <div className="mt-3 text-center">
                                <h3 className="text-primary font-semibold text-lg hover:text-blue-500 transition-colors duration-200">
                                    {game.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 如果没有游戏 */}
                {games.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">暂无游戏</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Game };