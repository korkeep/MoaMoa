import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'


// 헤더 사이즈
const header_height = "80px"

const MainContainer = styled.div`
    height: ${header_height};
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: white;
`

const LogoContainer = styled.div`
    display: inline-block;
`


const SearchContainer = styled.div`
    display: inline-block;
`

const MenuContainer = styled.div`
    display: inline-block;
    ul li {list-style-type: none;}
    ul {margin: 0; padding: 0;}
    li {
        display: inline;
    }
`

const AirContainer = styled.div`
    height: ${header_height};
`

export default function Header() {
    const [query, setQuery] = useState('')
    const history = useHistory()
    const query_string = query === '' ? '' : `?query=${query}`

    function onMainClick(e) {
        setQuery('')
        history.push('/image')
    }

    return (
        <>
            <MainContainer>
                <LogoContainer onClick={onMainClick}>
                    MoaMoa
                </LogoContainer>
                <SearchContainer>
                    <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            if (query === '') {
                                alert("검색어를 입력 해 주세요.")
                                return
                            }
                            const params = new URLSearchParams({
                                query: query
                            })
                            history.push('?' + params.toString())
                        }
                    }}
                    placeholder="search"/>
                </SearchContainer>
                <MenuContainer>
                    <ul>
                        <Link to={`/image` + query_string}><li>IMAGE</li></Link>
                        <Link to={`/video` + query_string}><li>VIDEO</li></Link>
                        <Link to={`/music` + query_string}><li>MUSIC</li></Link>
                        <Link to={`/etc` + query_string}><li>ETC</li></Link>
                    </ul>
                </MenuContainer>
            </MainContainer>
            <AirContainer />
        </>
    )
}