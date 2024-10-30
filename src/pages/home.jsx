import '../css/home.css'
import Search from "../components/search";
import Clock from "../components/clock";
import Favorites from "../components/favorites";
import FullscreenComponent from "../components/fullscreenComponent";
import {useState} from "react";

export const Home = ()=>{
    const [isImmerseFullscreen, setImmerseIsFullscreen] = useState(false);
    // const toggleImmerseFullscreen = () => {
    //     setImmerseIsFullscreen(!isImmerseFullscreen);
    //
    // }
    console.log(isImmerseFullscreen)
    return (<div >
                <div id="bg">
                    <div  className={`${isImmerseFullscreen? 'gaussian-blur':''}`}> {/*加 背景模糊*/}
                        <div id="main-container"> {/*加 上边距*/}
                            <Clock isImmerseFullscreen={isImmerseFullscreen}/>
                            {!isImmerseFullscreen
                                &&
                                <div>
                                    <Search/>
                                    <Favorites/>
                                </div>
                            }

                        </div>
                    </div>

                    <FullscreenComponent isImmerseFullscreen={isImmerseFullscreen}
                                         setImmerseIsFullscreen={setImmerseIsFullscreen}/>
                </div>
    </div>)
}