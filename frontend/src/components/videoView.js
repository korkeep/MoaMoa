import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle, FaDownload, FaEye, FaCalendarDay, FaFolderPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { STORE_ADD } from '../redux/store';
import Video from '../components/video';
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
  top: 0;
  right: 1%;
  padding: 8px;
  font-size: 32px;
  svg {
    padding: 4px;
  }
`;

const ImageWrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  top:50%;
  left:22%;
  overflow:hidden;
  max-width: 400px;
  max-height: 600px;
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
  // API ?????? ??? ??????
  const { index } = props
  const type = 'Viedo'
  const [video, setVideo] = useState({})
  const { contents } = useSelector(state => state.store)
  const contents_list = Array.from(contents)
  const dispatch = useDispatch()

  const storeFunction = () => {
    for (let content of contents_list) {
      if (content.type == "Video" && content.id == video.id) {
        alert("?????? ??? ????????? ?????? ?????????.")
        return
      }
    }
    const data = {
      ...video,
      type: type,
    }
    dispatch({type: STORE_ADD, content: data})
    alert("??? ????????? ?????? ???????????????.")
  }

  const getVideo = async () => {
    try {
      const video_response = await axios.get(`${server_ip}/video/view/${index}`)
      let temp_video = video_response.data[0]
      if (temp_video.sub_tags[0] === "null")
        delete temp_video.sub_tags

      setVideo(temp_video)
    } catch (err) {
      console.log(err)
    }
  }

  let sub_tags_element = []
  if (video.sub_tags !== undefined) {
    sub_tags_element = video.sub_tags.map(x => (
      <a href={`/video?query=${x}`} key={x}><HashTag># {x}</HashTag></a>
    ))
  }

  const downloadFile = () => {
    var link = document.createElement('a');

    link.setAttribute('download', null);
    link.style.display = 'none';

    document.body.appendChild(link);

    link.setAttribute('href', video.video);
    link.click();

    document.body.removeChild(link);
  }

  // data patch ??? ??????
  useEffect(async () => {
    await getVideo()
  }, [])


  // ImageView ????????? API ?????? ?????? ??????
  return (
    <MainContainer>
      <PostContainer>
        <RelativeContainer>
          <TitleContainer>Video View</TitleContainer>
          <Line />
          <ImageWrapper>
            <Video
              video_src={video.video}
            />
          </ImageWrapper>
          <InfoContainer>
            <HashTagContainer>
              <ContentWrapper>HashTag</ContentWrapper>
              <HashTagWrap>
              <a href={`/video?query=${video.main_tag}`}><HashTag className="main_tag">{`# ${video.main_tag}`}</HashTag></a>
                {sub_tags_element}
              </HashTagWrap>
            </HashTagContainer>
            <ContentContainer>
              <ContentWrapper>Content</ContentWrapper>
              <DetailContainer><FaCalendarDay /> {video.published_date}</DetailContainer>
              <DetailContainer><FaEye /> {video.visited}</DetailContainer>
              <ContentWrap>
                {video.summary}
              </ContentWrap>
            </ContentContainer>
          </InfoContainer>
          <ButtonWrapper>
            <FaFolderPlus onClick={storeFunction} />
            <FaDownload onClick={downloadFile} />
            <FaRegTimesCircle onClick={e => props.setIndex(-1)} />
          </ButtonWrapper>
        </RelativeContainer>
      </PostContainer>
    </MainContainer>
  );
}
