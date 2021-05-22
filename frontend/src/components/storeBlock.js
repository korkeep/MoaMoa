import React, { useState } from 'react'
import { FaFile, FaMinus } from 'react-icons/fa'
import styled from 'styled-components'

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
        max-width: 200px;
        max-height: 200px;
    }
    svg {
        width: 200px;
        height: 200px;
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
        padding: 3px 6px;
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
    const { type, id, title, src } = props
    let image = props.image
    
    if (type === "Music" || type === "etc") {
        image = <FaFile />
    } else {
        image = <img src={src} />
    }

    return (
        <MainContainer>
            <RelativeContainer>
                <ButtonWrapper>
                    <FaMinus />
                </ButtonWrapper>
                <ImageContainer>
                    {image}
                </ImageContainer>
                <ContentContainer>
                    <TitleContainer>
                        {title}
                    </TitleContainer>
                    <TypeContainer>
                        <span>{type_to_korean(type)}</span>
                    </TypeContainer>
                </ContentContainer>
            </RelativeContainer>
        </MainContainer>
    )
}