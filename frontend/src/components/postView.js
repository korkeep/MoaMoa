import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa'

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
const TitleContainer = styled.div`
    display: inline-block;
    transform: translate(-50%, 0%);
    position: fixed;
    top: 0;
    left: 50%;
    padding: 20px;
    font-size: 32px;
    font-weight: bolder;
`
const DragDropContainer = styled.div`
    position: fixed;
    transform: translate(-50%, -50%);
    top:50%;
    left:50%;
    width: 500px;
    height: 400px;
    border: 3px dashed #adb5bd;
    &:hover { background-color:#e9ecef; };
    cursor: pointer;
`
const ButtonWrapper = styled.div`
    display: inline-block;
    position: fixed;
    top: 0;
    right: 0;
    padding: 8px;
    font-size: 32px;
    cursor: pointer;
`
const SFaPlus = styled(FaPlus)`
    position: fixed;
    transform: translate(-50%, -50%);
    top: 45%;
    left: 50%;
    font-size: 150px;
    color: #adb5bd;
`

const TextWrap = styled.div`
    position: fixed;
    width: 500px;
    transform: translate(-50%, -50%);
    left: 60%;
    top: 80%;
    text{
        font-weight: bolder;
        font-size: 40px;
        color: #adb5bd;
    }
`

export default function PostView(props) {

    // PostView 클릭시 기능 구현 필요

    return (
        <MainContainer>
            <PostContainer>
                <RelativeContainer>
                    <TitleContainer>
                        Upload File
                    </TitleContainer>
                    <DragDropContainer >
                        <SFaPlus />
                        <TextWrap>
                            <text>Drag & Drop file here!</text>
                        </TextWrap>
                    </DragDropContainer>
                    <ButtonWrapper>
                        <FaRegTimesCircle onClick={e => props.setView(false)} />
                    </ButtonWrapper>
                </RelativeContainer>
            </PostContainer>
        </MainContainer>
    )
}