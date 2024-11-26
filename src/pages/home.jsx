import '../css/home.css'
import Search from "../components/search";
import Clock from "../components/clock";
import Favorites from "../components/favorites";
import FullscreenComponent from "../components/fullscreenComponent";
import {useState} from "react";
import BackgroundChanger from '../services/BackgroundChanger'

export const Home = ()=>{
    const [isImmerseFullscreen, setImmerseIsFullscreen] = useState(false);
    // const toggleImmerseFullscreen = () => {
    //     setImmerseIsFullscreen(!isImmerseFullscreen);
    //
    // }
    return (<div >
                <BackgroundChanger/>
                    <div  className={`${isImmerseFullscreen? 'gaussian-blur mt-0':'mt-32 sm:mt-40 lg:mt-60'} `}> {/*加 背景模糊*/}
                        <div id={`${isImmerseFullscreen?"main-container-full" :"main-container"}`}> {/*加 上边距*/}
                            <div className='my-0 mx-auto'>
                                <Clock isImmerseFullscreen={isImmerseFullscreen}/>
                            </div>

                            {!isImmerseFullscreen
                                &&
                                <div className='mt-8'>
                                    <Search/>
                                    <Favorites/>
                                </div>
                            }

                        </div>
                    </div>

                    <FullscreenComponent isImmerseFullscreen={isImmerseFullscreen}
                                         setImmerseIsFullscreen={setImmerseIsFullscreen}/>

    </div>)
}