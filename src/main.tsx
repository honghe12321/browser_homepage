import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Love from "./pages/love/love.tsx";
import Heart from "./pages/heart/heart.tsx";
import {Game} from "./pages/game/game.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<App />} />
                    <Route path='love' element={<Love />} />
                    <Route path='heart' element={<Heart />} />
                    <Route path='game' element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
