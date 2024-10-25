import '../css/home.css'
import Search from "../components/search";
import Clock from "../components/clock";
import Favorites from "../components/favorites";
import FullscreenComponent from "../components/fullscreenComponent";

export const Home = ()=>{
    return (<div >
                <div id="bg">
                    {/*<img src='https://spc.neihanfly.com/2024/10/23/4ca13f6d71dbd.png' alt="背景加载失败"/>*/}
                </div>
                <div id="main-container">
                    <Clock />
                    <Search />
                    <Favorites />
                </div>
                <FullscreenComponent/>
            </div>)
}