import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle, FaDownload, FaEye, FaCalendarDay } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import Image from '../components/image';
import { server_ip } from '../setting/env';
import axios from 'axios';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.3);
`;

const TitleContainer = styled.div`
  display: inline-block;
  transform: translate(-50%, 0%);
  position: fixed;
  top: 0;
  left: 50%;
  padding: 20px;
  font-size: 32px;
  font-weight: bolder;
`;

const PostContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 100%;
  max-width: 1080px;
  z-index: 2001;
  margin: auto;
  background-color: white;

  border-radius: 3em;
  -moz-border-radius: 2em;
  -webkit-border-radius: 2em;
  box-shadow: 2px 1px 7px 1px rgba(0, 0, 0, 0.5);
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  position: fixed;
  cursor: pointer;
  top: 0;
  right: 1%;
  padding: 8px;
  font-size: 32px;
  svg {
    padding: 4px;
  }
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  display: flex;
  align-items: center;
  vertical-align: bottom;
`;

const InfoContainer = styled.div`
  height: 100%;
  width: 50%;
  position: fixed;
  top: 0%;
  right: 0%;
  align-items: center;
`;
const HashTagContainer = styled.div`
  padding-left: 10px;
  width: 100%;
  height: 10%;
  margin-top: 100px;
  font-size: 20px;
  font-weight: bolder;
`;

const HashTagWrap = styled.div`
  padding-left: 4px;
  padding-top: 10px;
  font-weight: bold;
`;

const ContentContainer = styled.div`
  padding-left: 10px;
  width: 100%;
  height: 60%;
  font-size: 20px;
  font-weight: bolder;
`;
const ContentWrap = styled.div`
  font-size: 14px;
  width: 93%;
  height: 85%;
  margin-left: 3px;
  margin-top: 10px;
  border-radius: 1em;
  padding: 8px;
  background-color: #fff9db;
`;

const Line = styled.hr`
  position: fixed;
  top: 10%;
  left: 30%;
  width: 40%;
  border-top: 2px solid #868e96;
`;

const ContentWrapper = styled.span`
  margin: 6px;
`

const HashTag = styled.span`
  font-size: 14px;
  border: 1px solid #888888;
  border-radius: 10px;
  padding: 4px 8px;
  margin-right: 8px;

  &.main_tag {
    border: 1px solid black;
  }
`

const DetailContainer = styled.div`
  padding: 2px 8px;
  font-size: 12px;
  color: #888888;
`

export default function ImageView(props) {
  // API 연동 전 임시
  const { index } = props
  const type = 'Image'
  const [image, setImage] = useState({})
  
  const getImage = async () => {
    try {
      const image_response = await axios.get(`${server_ip}/image/view/${index}`)
      let temp_image = image_response.data[0]
      if (temp_image.sub_tags[0] === "null")
        delete temp_image.sub_tags
    
      setImage(temp_image)
    } catch (err) {
      console.log(err)
    }
  }

  let sub_tags_element = []
  if (image.sub_tags !== undefined) {
    sub_tags_element = image.sub_tags.map(x => (
      <a href={`/image?query=${x}`}><HashTag># {x}</HashTag></a>
    ))
  }

  const downloadFile = () => {
    var link = document.createElement('a');

    link.setAttribute('download', null);
    link.style.display = 'none';

    document.body.appendChild(link);

    link.setAttribute('href', image.image);
    link.click();

    document.body.removeChild(link);
  }

  // data patch 시 사용
  useEffect(async () => {
    getImage()
  }, [])


  // ImageView 클릭시 API 연동 구현 필요
  return (
    <MainContainer>
      <PostContainer>
        <RelativeContainer>
          <TitleContainer>Image View</TitleContainer>
          <Line />
          <ImageWrapper>
            <Image
              type={type}
              id={index}
              summary={image.summary}
              main_tag={image.main_tag}
              sub_tags={image.sub_tags}
              src={image.image}
              onClickFunction={(id) => null}
            />
          </ImageWrapper>
          <InfoContainer>
            <HashTagContainer>
              <ContentWrapper>HashTag</ContentWrapper>
              <HashTagWrap>
              <a href={`/image?query=${image.main_tag}`}><HashTag className="main_tag">{`# ${image.main_tag}`}</HashTag></a>
                {sub_tags_element}
              </HashTagWrap>
            </HashTagContainer>
            <ContentContainer>
              <ContentWrapper>Content</ContentWrapper>
              <DetailContainer><FaCalendarDay /> {image.published_date}</DetailContainer>
              <DetailContainer><FaEye /> {image.visited}</DetailContainer>
              <ContentWrap>
                {image.summary}
              </ContentWrap>
            </ContentContainer>
          </InfoContainer>
          <ButtonWrapper>
            <FaDownload onClick={downloadFile}/>
            <FaRegTimesCircle onClick={e => props.setIndex(-1)} />
          </ButtonWrapper>
        </RelativeContainer>
      </PostContainer>
    </MainContainer>
  );
}
