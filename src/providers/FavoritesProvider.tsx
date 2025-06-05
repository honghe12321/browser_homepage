import type {PropsWithChildren} from 'react'
import {createContext, useContext, useEffect, useState} from 'react'
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
    setAllItem: (item: Favorites[]) => void
}

const defaultContext: FavoritesProviderContext = {
    list: [],
    remove: (id: string) => {
        console.log('favorites remove', id)
    },
    setItem: (item: Favorites) => {
        console.log('favorites setItem', item)
    },
    setAllItem: (item: Favorites[]) => {
        console.log('favorites setItem', item)
    }
}

const FavoritesContext = createContext<FavoritesProviderContext>(defaultContext)

export const FavoritesProvider = (props: PropsWithChildren) => {
    const [list, setList] = useState<Array<Favorites>>(defaultContext.list)

    useEffect(() => {
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
        const data = JSON.stringify(list)
        if (list.length > 0) {
            window.localStorage.setItem('favorites', data)
        }
    }, [list])

    const remove = (id: string) => {
        const saved = list.filter(it => it.id !== id)
        setList(saved)
    }

    const setItem = (item: Favorites) => {
        const saved = _.concat(list, item)
        setList(saved)
    }
    const setAllItem = (list: Favorites[]) => {
        setList(list)
    }

    return (
        <FavoritesContext value={{
            list: list,
            remove: remove,
            setItem: setItem,
            setAllItem: setAllItem,
        }}>
            {props.children}
        </FavoritesContext>
    )
}

export const useFavorites = () => useContext(FavoritesContext)
