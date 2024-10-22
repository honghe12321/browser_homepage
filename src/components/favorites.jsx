import {useState} from "react";
import "../css/favorites.css"

// 从localStorage获取配置信息
const favorites = JSON.parse(localStorage.getItem('favorites'));

const Favorites = ()=>{

    const [favoritesList,setFavoritesList]=useState(favorites? favorites:[])
    // 保存配置信息到localStorage
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
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
                            <img src={`https://${item.href}/favicon.ico`} alt="图标呢？"/>
                            <span>{item.name}</span>
                        </div>
                    ))
                }
            <div>
                {isShowAdd && (
                    <div className='addItemFrom'>
                        <input type="text" placeholder="请输入网站" value={website} onChange={handleWebsiteChange} />
                        <input type="text" placeholder="请输入名称" value={name} onChange={handleNameChange} />
                        <div>
                            <button onClick={handleConfirm}>确认</button>
                            <button onClick={handleCancel}>取消</button>
                        </div>

                    </div>
                )}
            </div>

                {/*最后一个list*/}
                <div className={'list'} onClick={() => userClickAdd()}>
                    <span>+</span>
                </div>

        </div>
    )

}

export default Favorites;