import {useState} from "react";
import "../css/favorites.css"

const Favorites = ()=>{
    const favorites = {
        name:"哔哩哔哩",href:"www.bilibili.com",id:0
    }
    // id后续添加
    favorites.id=0
    const [favoritesList,setFavoritesList]=useState([favorites])
    const addItem = (item) => {
        item.id=Math.max(...favoritesList.map(item => item.id)) + 1
        setFavoritesList(() =>[...favoritesList, item ])
    }
    const removeItem = (id) => {
        setFavoritesList(prevItems => prevItems.filter(item => item.id !== id));
    }
    const userClickAdd = ()=>{
        const website = prompt("请输入网址(不需要https://)","");
        const name = prompt("请输入名称");
        if (website!=="https://" && website !== null){
            addItem({name: name,href: website})
        }else alert("添加失败:网址或名字为空！")

    }

    if (favoritesList.length<10){
        addItem({name: "哔哩哔哩", href: "www.bilibili.com"})
    }
    console.log(favoritesList)
    return (
        <div className='box'>
                {favoritesList.map(item=>
                    (
                        <div className={'list'} key={item.id} >

                                <div className='del' onClick={() => removeItem(item.id)}>×</div>
                                <img src={`https://${item.href}/favicon.ico`} alt="图标加载失败"/>
                                <span>{item.name}</span>

                        </div>
                    ))
                }
                <div className={'list'} onClick={() => userClickAdd()}>
                    <span>+</span>
                </div>
        </div>
    )

}

export default Favorites;