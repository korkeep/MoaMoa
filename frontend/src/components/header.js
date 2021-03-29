import React from 'react'
import styled from 'styled-components'


// 헤더 사이즈
const header_height = "80px"

const MainContainer = styled.div`
    height: ${header_height};
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
`

const AirContainer = styled.div`
    height: ${header_height};
`

export default function Header() {
    return (
        <>
            <MainContainer>
                This is Header Components.
            </MainContainer>
            <AirContainer />
        </>
    )
}