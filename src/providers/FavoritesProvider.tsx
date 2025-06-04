import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react'
import _ from 'lodash'

interface Favorites {
    id: string
    name: string
    href: string
}

interface FavoritesProviderContext {
    list: Array<Favorites>
    remove: (id: string) => void
    setItem: (item: Favorites) => void
}

const defaultContext: FavoritesProviderContext = {
    list: [],
    remove: (id: string) => {
        console.log('favorites remove', id)
    },
    setItem: (item: Favorites) => {
        console.log('favorites setItem', item)
    }
}

const FavoritesContext = createContext<FavoritesProviderContext>(defaultContext)

export const FavoritesProvider = (props: PropsWithChildren) => {
    const [list, setList] = useState<Array<Favorites>>(defaultContext.list)

    useEffect(() => {
        console.log("favorites list init")
        const favorites = window.localStorage.getItem('favorites')
        if (favorites) {
            const data = JSON.parse(favorites), list: Array<Favorites> = []
            if (_.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    list.push({
                        id: data[i].id,
                        name: data[i].name,
                        href: data[i].href,
                    })
                }
                if (list.length > 0) {
                    setList(list)
                }
            }
        }
    }, [])

    useEffect(() => {
        console.log("favorites list", list)
        const data = JSON.stringify(list)
        if (list.length > 0) {
            window.localStorage.setItem('favorites', data)
        }
    }, [list])

    const remove = (id: string) => {
        console.log('favorites remove', id)
        const saved = list.filter(it => it.id !== id)
        setList(saved)
    }

    const setItem = (item: Favorites) => {
        console.log("favorites set", item)
        const saved = _.concat(list, item)
        setList(saved)
    }

    return (
        <FavoritesContext value={{
            list: list,
            remove: remove,
            setItem: setItem,
        }}>
            {props.children}
        </FavoritesContext>
    )
}

export const useFavorites = () => useContext(FavoritesContext)
