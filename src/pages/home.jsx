import '../css/home.css'
import Search from "../components/search";
import Clock from "../components/clock";
import Favorites from "../components/favorites";
import FullscreenComponent from "../components/fullscreenComponent";

export const Home = ()=>{
    return (<div >
                <div id="main-container">
                    <Clock />
                    <Search />
                    <Favorites />
                </div>
                <FullscreenComponent/>
            </div>)
}