import {ChangeEvent, useState} from 'react';
import '../css/Search.css'; // 确保路径正确
import {themeColorAtom} from "../atoms/themeColor.ts";
import {useAtomValue} from "jotai";

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
    const themColor = useAtomValue(themeColorAtom)

    return (
        <div className="input-container">
            <input type="text" className="input" onChange={onValueChange} placeholder="请输入内容"/>
            <button className="button"
                    onClick={search}
                    style={{backgroundColor:themColor as string}}>搜索
            </button>
        </div>
    );
}

export default Search;
