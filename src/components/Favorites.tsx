import type {ChangeEvent, MouseEvent as ReactMouseEvent} from 'react'
import {useState} from 'react'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import NameAvatar from './NameAvatar'
import {FavoritesProvider, useFavorites} from '../providers/FavoritesProvider'
import '../css/favorites.css'

interface Favorites {
    id: string
    name: string
    href: string
}

const Favorites = () => {
    return (
        <FavoritesProvider>
            <div className='box'>
                <FavoritesList />
                <FavoritesAdd />
            </div>
        </FavoritesProvider>
    )
}

const FavoritesAdd = () => {
    const { setItem } = useFavorites()
    const [isShowAdd, setIsShowAdd] = useState(false)
    const [website, setWebsite] = useState('')
    const [name, setName] = useState('')

    const handleClick = () => {
        setIsShowAdd(!isShowAdd)
    }

    const handleWebsiteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWebsite(event.target.value)
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleConfirm = () => {
        if (website !== '' && website !== null) {
            const item = {
                id: uuidv4(),
                name: name,
                href: website,
            }
            setItem(item)
        } else {
            alert('添加失败:网址为空！')
        }
        setIsShowAdd(false)
    }

    return (
        <>
            <div className={clsx('addItemFrom', isShowAdd ? 'visible_animation' : 'hidden_animation')}>
                <input type="text" placeholder="请输入网站" value={website} onChange={handleWebsiteChange}/>
                <input type="text" placeholder="请输入名称" value={name} onChange={handleNameChange}/>
                <div>
                    <button onClick={handleConfirm}>添加</button>
                    <button onClick={handleClick}>取消</button>
                </div>
            </div>
            <div className="list" onClick={() => handleClick()}>
                <span>+</span>
            </div>
        </>
    )
}

const linkTo = (link: string) => {
    //删除://前面的内容
    link = link.replace(/.*?:\/\//, '')

    window.open('//' + link)
}

const FavoritesList = () => {
    const { list } = useFavorites()

    return list.map(item => (
        <FavoritesItem key={item.id} item={item} />
    ))
}

const FavoritesItem = ({ item }: {
    item: Favorites
}) => {
    const { remove } = useFavorites()

    const removeItem = (ev: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        ev.stopPropagation()
        remove(item.id)
    }

    const handleClick = () => {
        linkTo(item.href)
    }

    return (
        <div className="list" key={item.id} onClick={handleClick} title={item.href}>
            <div className="del" onClick={removeItem}>
                <span>×</span>
            </div>
            {/*<img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${item.href}&size=256`} alt="图标呢？"/>*/}
            {/*<img src={`https://favicon.im/${item.href}?larger=true`} alt=""/>*/}
            <div className="imgIcon">
                <NameAvatar name={item.name} src={item.href}/>
            </div>
            <span>{item.name}</span>
        </div>
    )
}

export default Favorites;
