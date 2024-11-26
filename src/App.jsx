import {Provider} from 'jotai';
import {Home} from './pages/home'
import {jotaiStore} from './libs/store';

// import {Home2} from "./pages/demo/home"
function App() {
    return (
        <Provider store={jotaiStore}>
            <Home/>
            {/*<Home2/>*/}
        </Provider>
    );
}

export default App;
