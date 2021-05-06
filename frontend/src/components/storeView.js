import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle } from 'react-icons/fa'

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: rgba(0,0,0,0.5);
`

const PostContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80vh;
    width: 100%;
    max-width: 1080px;
    z-index: 1001;
    margin: auto;
    background-color: white;
`

const RelativeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const ButtonWrapper = styled.div`
    display: inline-block;
    position: fixed;
    top: 0;
    right: 0;
    padding: 8px;
    font-size: 32px;
`


export default function StoreView(props) {

    // ImageView 클릭시 API 기능 구현 필요

    return (
        <MainContainer>
            <PostContainer>
                <RelativeContainer>
                    <ButtonWrapper>
                        <FaRegTimesCircle onClick={e => props.setView(false)} />
                    </ButtonWrapper>
                </RelativeContainer>
            </PostContainer>
        </MainContainer>
    )
}