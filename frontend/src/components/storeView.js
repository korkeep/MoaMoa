import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import StoreBlock from './storeBlock'

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

const StoreContainer = styled.div`
    width: 980px;
    height: 80vh;
    overflow-y: auto;
`


export default function StoreView(props) {
    const { contents } = useSelector(state => state.store)
    // const store_list = contents.map(x => <StoreBlock props={x}/>)
    const store_list = [
        <StoreBlock
            type="Image"
            id={1}
            title="이미지 1"
            src="/Logo.png" />,
        <StoreBlock
            type="etc"
            id={2}
            title="파일 1" />,
        <StoreBlock
            type="etc"
            id={3}
            title="파일 1" />,
        <StoreBlock
            type="etc"
            id={4}
            title="파일 1" />
    ]

    return (
        <MainContainer>
            <PostContainer>
                <RelativeContainer>
                    <ButtonWrapper>
                        <FaRegTimesCircle onClick={e => props.setView(false)} />
                    </ButtonWrapper>
                    <StoreContainer>
                        {store_list}
                    </StoreContainer>
                </RelativeContainer>
            </PostContainer>
        </MainContainer>
    )
}