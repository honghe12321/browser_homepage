import {useState} from 'react'
import type {ChangeEvent} from 'react'
import '../css/search.css'

const Search = () => {
    const [value, setValue] = useState<string>('')

    const search = () => {
        if (value !== "") {
            window.open('https://www.baidu.com/s?wd=' + value)
        }
    }

    function onValueChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    return (
        <div className="input-container">
            <input type="text" className="input" onChange={onValueChange} placeholder="请输入内容"/>
            <button className='button bg-primary' onClick={search}>搜索</button>
        </div>
    );
}

export default Search;
