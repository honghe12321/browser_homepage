import BackgroundChanger from "./BackgroundChanger";
import FullscreenComponent from "./FullscreenComponent";
export function Tool(){
    return<div className='fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2'>
        <BackgroundChanger/>
        <FullscreenComponent/>
    </div>
}