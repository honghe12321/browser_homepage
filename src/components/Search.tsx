import type {ChangeEvent, FormEvent} from 'react'
import {useState} from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
    position: relative;
    margin: 0 auto 0 auto;
    width: 21rem;
    height: 3.2rem;
    border-radius: 3rem;
    background-color: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4), 0 15px 40px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(50px);
    }

    @media (min-width: 640px) {
        width: 26rem;
    }
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: none;
    box-sizing: border-box;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0);

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`

const SearchButton = styled.button`
    font-size: 15px;
    height: 100%;
    width: 100%;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: hsl(var(--accent) / 60%);

    &:hover,
    &:active {
        background-color: var(--primary);
        color: #000000;
    }
`

const SearchFormContainer = styled.div`
    display: grid;
    height: 3.2rem;
    grid-template-columns: 3fr minmax(60px, 1fr);
    user-select: none;
`

const Search = () => {
    const [value, setValue] = useState<string>('')

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (value == 'shaoyang') {
            window.open('/love')
        }
        if (value !== '') {
            window.open('https://www.baidu.com/s?wd=' + value)
        }
    }

    function onValueChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    return (
        <SearchContainer>
            <form onSubmit={search}>
                <SearchFormContainer>
                    <label>
                        <SearchInput type='search' onChange={onValueChange} maxLength={64}
                                     placeholder='输入搜索词' autoComplete='off' name='word' autoCorrect='off'/>
                    </label>
                    <SearchButton type='submit'>搜索</SearchButton>
                </SearchFormContainer>
            </form>
        </SearchContainer>
    )
}

export default Search;
