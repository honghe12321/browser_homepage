import {useEffect, useState} from 'react'
import type {ChangeEvent, MouseEvent as ReactMouseEvent} from 'react'
import NameAvatar from './NameAvatar'
import '../css/favorites.css'

interface Favorites {
    id: string
    name: string
    href: string
}

const Favorites = () => {
    const [favoritesList, setFavoritesList] = useState<Array<Favorites>>([])

    useEffect(() => {
        // 从 localStorage 获取配置信息
        const favorites = localStorage.getItem('favorites')
        setFavoritesList(favorites ? JSON.parse(favorites) : []);
    }, [])

    useEffect(() => {
        // 保存配置信息到localStorage
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }, [favoritesList])


    const addItem = (item: Favorites) => {
        item.id = crypto.randomUUID()
        setFavoritesList(() => [...favoritesList, item])
    }

    const removeItem = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        e.stopPropagation();
        setFavoritesList(prevItems => prevItems.filter(item => item.id !== id));
    }

    const userClickAdd = () => {
        setIsShowAdd(true)
    }

    const [website, setWebsite] = useState('');
    const [name, setName] = useState('');
    const [isShowAdd, setIsShowAdd] = useState(false); // 控制表单显示

    const linkTo = (link: string) => {
        //删除://前面的内容
        link = link.replace(/.*?:\/\//, '');


        window.open("//" + link)
    }
    const handleWebsiteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWebsite(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    //点击确定
    const handleConfirm = () => {
        if (website !== "" && website !== null) {
            addItem({id: '', name: name, href: website})
        } else {
            alert('添加失败:网址为空！')
        }
        setIsShowAdd(false);
    };

    //点击取消
    const handleCancel = () => {
        setIsShowAdd(false);
    };


    return (
        <div className='box'>
            {favoritesList.map(item =>
                (
                    <div className={'list'} key={item.id} onClick={() => linkTo(item.href)} title={item.href}>
                        <div className='del' onClick={(e) => removeItem(e, item.id)}><span>×</span></div>
                        {/*<img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${item.href}&size=256`} alt="图标呢？"/>*/}
                        {/*<img src={`https://favicon.im/${item.href}?larger=true`} alt=""/>*/}
                        <div className="imgIcon">
                            <NameAvatar name={item.name} src={item.href}/>
                        </div>

                        <span>{item.name}</span>
                    </div>
                ))
            }
            <div>

            </div>
            {(
                <div className={`addItemFrom ${isShowAdd ? 'visible_animation' : 'hidden_animation'}`}>
                    <input type="text" placeholder="请输入网站" value={website} onChange={handleWebsiteChange}/>
                    <input type="text" placeholder="请输入名称" value={name} onChange={handleNameChange}/>
                    <div>
                        <button onClick={handleConfirm}>添加</button>
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
