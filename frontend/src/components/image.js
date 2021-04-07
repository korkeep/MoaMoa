import React, { useState } from 'react'
import styled from 'styled-components'


const MainContainer = styled.div`
    display: inline-block;
    width: 250px;
    height: 300px;
    border: 1px solid black;
    background-color: white;
`

export default function Image(props) {
    return (
        <MainContainer onClick={e => props.onClickFunction(props.id)}>
            {props.id}
        </MainContainer>
    )
}