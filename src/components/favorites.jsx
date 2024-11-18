import {useEffect, useState} from "react";
import "../css/favorites.css"
import NameAvatar from "./NameAvatar";
// import * as crypto from "node:crypto";

const Favorites = ()=>{

    const [favoritesList,setFavoritesList]=useState([])

    useEffect(() => {
        // 从localStorage获取配置信息
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        setFavoritesList(favorites);
    }, [])

    useEffect(() => {
        // 保存配置信息到localStorage
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }, [favoritesList])


    const addItem = (item) => {
        item.id=crypto.randomUUID()
        setFavoritesList(() =>[...favoritesList, item ])

    }
    const removeItem = (e,id) => {
        e.stopPropagation();
        setFavoritesList(prevItems => prevItems.filter(item => item.id !== id));

    }
    const userClickAdd = ()=>{
        setIsShowAdd(true)
    }


    const [website, setWebsite] = useState('');
    const [name, setName] = useState('');
    const [isShowAdd, setIsShowAdd] = useState(false); // 控制表单显示

    const linkTo=(link)=>{
        window.open("//"+link)
    }
    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    //点击确定
    const handleConfirm = () => {
        if (website!=="" && website !== null){
            addItem({name: name,href: website})
        }else alert("添加失败:网址为空！")
        setIsShowAdd(false);
    };

    //点击取消
    const handleCancel = () => {
        setIsShowAdd(false);
    };



    return (
        <div className='box'>
                {favoritesList.map(item=>
                    (
                        <div className={'list'} key={item.id} onClick={()=>linkTo(item.href)}>
                            <div className='del' onClick={(e) => removeItem(e,item.id)}><span>×</span></div>
                            {/*<img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${item.href}&size=256`} alt="图标呢？"/>*/}
                            {/*<img src={`https://favicon.im/${item.href}?larger=true`} alt=""/>*/}
                            <div className="imgIcon">
                                <NameAvatar name={item.name} src={item.href} />
                            </div>

                            <span>{item.name}</span>
                        </div>
                    ))
                }
            <div>

            </div>
            {(
                <div className={`addItemFrom ${isShowAdd?'visible':'hidden'}`}>
                    <input type="text" placeholder="请输入网站" value={website} onChange={handleWebsiteChange} />
                    <input type="text" placeholder="请输入名称" value={name} onChange={handleNameChange} />
                    <div>
                        <button onClick={handleConfirm}>确认</button>
                        <button onClick={handleCancel}>取消</button>
                    </div>

                </div>
            )}
                {/*最后一个list*/}
                <div className={'list'} onClick={() => userClickAdd()}>
                    <span>+</span>
                </div>


        </div>
    )

}

export default Favorites;