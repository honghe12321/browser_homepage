import React from 'react';
import '../css/Search.css'; // 确保路径正确

const Search = () => {

    const search = (event,value)=> {
        if (value!==""){
            window.open('https://www.baidu.com/s?wd=' + value)
        }

    }

    return (
        <div className="input-container">
            <input type="text" className="input"
                   id="searchInput" placeholder="请输入内容" />
            <button className="button" onClick={(event) => search(event,document.getElementById('searchInput').value)}>搜索</button>
        </div>
    );
}

export default Search;