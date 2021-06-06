import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';

import { STORE_ADD } from '../redux/store'

const MainContainer = styled.div`
  display: inline-block;
  background-color: white;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
`;

const Figure = styled.div`
  filter: none;
  &:hover {
    filter: grayscale(0.8) blur(2px);
  }
`;

const Image_ = styled.img`
  object-fit: cover;
  width: 100%;
  vertical-align: bottom;
`;

const Video_ = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const DownloadButton = styled.div`
  position: absolute;
  z-index: 1;
  margin-left: 10px;
  margin-top: 10px;
  width: 50px;
  height: 20px;
  font-size: 1.3em;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 0.5em;
  border: 2px solid #f783ac;
  border-radius: 10px;
  background: #f783ac;
  text-align: center;
  color: white;
  cursor: default;
  &:hover {
    background: #e64980;
    border: 2px solid #e64980;
  }
`;

export default function Video(props) {
  return (
    <MainContainer>
        <Video_ controls autoPlay key={props.video_src}>
          <source src={props.video_src} type="video/mp4"/>
          지원하지 않는 브라우저 입니다.
        </Video_>
    </MainContainer>
  );
}
