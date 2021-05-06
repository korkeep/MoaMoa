import React, { useState } from 'react'
import styled from 'styled-components'


const MainContainer = styled.div`
    display: inline-block;
    background-color: white;
    justify-content: center; 

    cursor: pointer;
    border-radius:2.0em;
    -moz-border-radius: 2.0em;
    -webkit-border-radius: 2.0em;
    border:1px solid #C0C0C0;
    overflow:hidden;
    margin-bottom : 20px;
    min-width: 200px;
    min-height: 100px;
`


const Figure = styled.div` 
  filter:none;
  &:hover { filter:grayscale(0.8); };
`;

const Image_ = styled.img`
  object-fit:cover;
  width:100%;
  vertical-align : bottom;
`;

export default function Image(props) {
    return (
        <MainContainer onClick={e => props.onClickFunction(props.id)}>
            <Figure>
                <Image_ src = {props.src}/>
                {props.id}
            </Figure>
        </MainContainer>
    )
}