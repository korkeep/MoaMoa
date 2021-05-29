import React, { useState } from 'react'
import { FaFile, FaMinus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { STORE_DELETE } from '../redux/store'

const MainContainer = styled.div`
    width: 900px;
    height: 200px;
    margin: 20px;
    -webkit-box-shadow: 10px 10px 25px -10px rgba(0,0,0,0.5); 
    box-shadow: 10px 10px 25px -10px rgba(0,0,0,0.5);
`

const RelativeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const ImageContainer = styled.div`
    float: left;
    width: 200px;
    height: 200px;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }
    svg {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }
`

const ContentContainer = styled.div`
    display: inline-block;
    width: 700px;
    height: 200px;
`

const TitleContainer = styled.div`
    padding: 8px;
    font-size: 24px;
    font-weight: bold;
`

const TypeContainer = styled.div`
    span {
        margin-left: 8px;
        padding: 4px 8px;
        font-size: 14px;
        border-radius: 10px;
        background-color: black;
        color: white;
    }
`

const ButtonWrapper = styled.div`
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 8px;
    font-size: 24px;
`

const ButtonContainer = styled.div`
    margin: 8px;
    span {
        font-size: 14px;
        border: 1px solid #888888;
        border-radius: 10px;
        padding: 4px 8px;
        margin-right: 8px;
    }
    span.main {
        border: 1px solid black;
    }
`

const type_to_korean = (type) => {
    switch (type) {
        case "Image":
            return "사진"
        case "Video":
            return "영상"
        case "Music":
            return "음악"
        default:
            return "기타 파일"
    }
}

export default function StoreBlock(props) {
    const { type, id, summary, main_tag, sub_tags, src, index, onClickFunction } = props
    let image = props.image
    
    if (type === "Music" || type === "etc") {
        image = <FaFile />
    } else {
        image = <img src={src} />
    }
    const tags = sub_tags.map((x, index) => <span key={index}>{`# ${x}`}</span>)

    const dispatch = useDispatch()
    const removeElement = () => {
        if (window.confirm("정말 삭제 하시겠습니까?")) {
            dispatch({type: STORE_DELETE, index: index})
        }
    }

    return (
        <MainContainer>
            <RelativeContainer>
                <ButtonWrapper onClick={removeElement}>
                    <FaMinus />
                </ButtonWrapper>
                <ImageContainer onClick={e => onClickFunction(id)}>
                    {image}
                </ImageContainer>
                <ContentContainer>
                    <TitleContainer>
                        {summary}
                    </TitleContainer>
                    <TypeContainer>
                        <span>{type_to_korean(type)}</span>
                    </TypeContainer>
                    <ButtonContainer>
                        <span className="main">{`# ${main_tag}`}</span>
                        {tags}
                    </ButtonContainer>
                </ContentContainer>
            </RelativeContainer>
        </MainContainer>
    )
}