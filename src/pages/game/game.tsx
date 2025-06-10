import React from "react";

const Game: React.FC = () => {
    return (
        <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
            <iframe
                src="https://games.crazygames.com/en_US/count-masters-stickman-games/index.html?v=1.333"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="gamepad *"
                title="Count Masters Game"
            ></iframe>
        </div>
    );
};

export { Game };
