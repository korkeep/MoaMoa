import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'


// 헤더 사이즈
const header_height = "140px"

const HeaderTop = styled.div`
    background-color: black;
    float:up;
    height : 20px;
`

const HeaderBottom = styled.div`
    background-color: #FEEBB6;
    height : 8px;
    border:2px solid #C0C0C0;
`

const MainContainer = styled.div`
    height: ${header_height};
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #FFFFFF;
`

const LogoContainer = styled.div`
    display: inline-block;
    padding-left : 10px;
    img {
        width: 100px;
        
        vertical-align : bottom;
    }
`

const SearchContainer = styled.div`
    position:fixed;
    top:65px;
    left:130px;
    input {
        width: 500px;
        padding: 12px 24px;

        transition: transform 250ms ease-in-out;
        font-size: 17px;
        line-height: 12px;

        color: #575756;
        //background-color: #C0C0C0;
        background-color: transparent;

        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 95% center;
        border-radius: 50px;
        border: 1px solid #575756;
        transition: all 250ms ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        &::placeholder {
            color: color(#575756 a(0.8));
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        &:hover,
        &:focus {
            padding: 12px 0;
            outline: 0;
            border: 1px solid transparent;
            border-bottom: 1px solid #575756;
            border-radius: 0;
            background-position: 100% center;
        }
    }
`

const MenuContainer = styled.div`
    position:fixed;
    top:49px;
    right:0px;
`
const SLink = styled(NavLink)`
    list-style-type: none;
    color: black;               
    float: left;               
    line-height: 55px;          
    vertical-align: middle;     
    text-align: center;         
    padding-left : 2em;
    padding-right : 2em;
    text-decoration: none !important;
    &:hover {
        background-color: #FEEBB6;
    }
    &.active {
    font-weight: 600;
    background-color: #FEEBB6;
    float: left;               
    line-height: 55px;          
    vertical-align: middle;     
    text-align: center;         
    padding-left : 2em;
    padding-right : 2em;
    color: black;
    text-decoration: none !important;
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
                <HeaderTop />
                <LogoContainer onClick={onMainClick}>
                    <img src = "logo.png"></img>
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
                        <SLink activeClassName="active" to={`/image` + query_string}>IMAGE</SLink>
                        <SLink to={`/video` + query_string}>VIDEO</SLink>
                        <SLink to={`/music` + query_string}>MUSIC</SLink>
                        <SLink to={`/etc` + query_string}>ETC</SLink>
                    </ul>
                </MenuContainer>
                <HeaderBottom />
            </MainContainer>
            
            <AirContainer/>
        </>
    )
}