import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle, FaDownload, FaEye, FaCalendarDay } from 'react-icons/fa';
import Video from '../components/video';

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
  top: 0;
  right: 1%;
  padding: 8px;
  font-size: 32px;
  svg {
    padding: 4px;
  }
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

export default function VideoView(props) {
  // API 연동 전 임시
  const type = "Video"
  const id = props.index
  const summary = "테스트 이미지"
  const main_tag = "메인 태그"
  const sub_tags = ["태그 1", "태그 2"]
  const video_src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  const visited = 10
  const published_date = '2021-05-25'

  const sub_tags_element = sub_tags.map(x => (
    <HashTag key={x}># {x}</HashTag>
  ))

  // data patch 시 사용
  useEffect(() => {

  }, [])


  // ImageView 클릭시 API 연동 구현 필요
  return (
    <MainContainer>
      <PostContainer>
        <RelativeContainer>
          <TitleContainer>Video View</TitleContainer>
          <Line />
          <ImageWrapper>
            <Video
              type={type}
              id={id}
              summary={summary}
              main_tag={main_tag}
              sub_tags={sub_tags}
              video_src={video_src}
            />
          </ImageWrapper>
          <InfoContainer>
            <HashTagContainer>
              <ContentWrapper>HashTag</ContentWrapper>
              <HashTagWrap>
                <HashTag className="main_tag">{`# ${main_tag}`}</HashTag>
                {sub_tags_element}
              </HashTagWrap>
            </HashTagContainer>
            <ContentContainer>
              <ContentWrapper>Content</ContentWrapper>
              <DetailContainer><FaCalendarDay /> {published_date}</DetailContainer>
              <DetailContainer><FaEye /> {visited}</DetailContainer>
              <ContentWrap>
                {summary}
              </ContentWrap>
            </ContentContainer>
          </InfoContainer>
          <ButtonWrapper>
            <FaDownload />
            <FaRegTimesCircle onClick={e => props.setIndex(-1)} />
          </ButtonWrapper>
        </RelativeContainer>
      </PostContainer>
    </MainContainer>
  );
}
