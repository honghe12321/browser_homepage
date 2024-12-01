import {useState} from 'react'
import type {ChangeEvent, FormEvent} from 'react'
import clsx from 'clsx'
import styles from '../css/search.module.css'

const Search = () => {
    const [value, setValue] = useState<string>('')

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (value !== '') {
            window.open('https://www.baidu.com/s?wd=' + value)
        }
    }

    function onValueChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    return (
        <div className={styles['input-container']}>
            <form onSubmit={search}>
                <div className={styles['form-container']}>
                    <label>
                        <input type='search' className={styles['input']} onChange={onValueChange}
                               placeholder='输入搜索词' autoComplete='off' name='word' autoCorrect='off' maxLength={64}
                        />
                    </label>
                    <button className={clsx(styles['button'], 'bg-primary')} type='submit'>搜索</button>
                </div>
            </form>
        </div>
    )
}

export default Search;
