import React, { useState } from 'react'
import { FaFile, FaMinus, FaMusic } from 'react-icons/fa'
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

const IconContainer = styled.div`
    width: 200px;
    height: 200px;
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
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
    
    if (type === "Music") {
        image = <IconContainer><FaMusic /></IconContainer>
    }
    else if (type === "Etc") {
        image = <IconContainer><FaFile /></IconContainer>
    } else {
        image = <img src={src} />
    }

    
    let tags
    let type_url

    switch (type) {
        case "Image":
            type_url = 'image'
            break;
        case "Video":
            type_url = 'video'
            break;
        case "Music":
            type_url = 'music'
            break;
        case "Etc":
            type_url = 'etc'
            break;
        default:
            break;
    }

    if (sub_tags !== undefined) {
        tags = sub_tags.map((x, index) => <a href={`/${type_url}/?query=${x}`}><span key={index}>{`# ${x}`}</span></a>)
    } else {
        tags = []
    }

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
                        <a href={`/${type_url}/?query=${main_tag}`}><span className="main">{`# ${main_tag}`}</span></a>
                        {tags}
                    </ButtonContainer>
                </ContentContainer>
            </RelativeContainer>
        </MainContainer>
    )
}