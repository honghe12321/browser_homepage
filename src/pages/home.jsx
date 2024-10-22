import '../css/home.css'
import Search from "../components/search";
import Clock from "../components/clock";
import Favorites from "../components/favorites";
export const Home = ()=>{
    return (<div>
        <Clock />
        <Search />
        <Favorites />
    </div>)
}