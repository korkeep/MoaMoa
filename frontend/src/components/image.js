import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';

import { STORE_ADD } from '../redux/store'

const MainContainer = styled.div`
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
  height: 100%;
  vertical-align: middle;
`;

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

export default function Image(props) {
  const [inHover, setHover] = useState(false);
  const { contents } = useSelector(state => state.store)
  const contents_list = Array.from(contents)
  const dispatch = useDispatch()

  const storeFunction = () => {
    for (let content of contents_list) {
      if (content.type == props.type && content.id == props.id) {
        alert("이미 찜 목록에 존재 합니다.")
        return
      }
    }

    alert("찜 목록에 저장 되었습니다.")
    const content = {
      type: props.type,
      id: props.id,
      summary: props.summary,
      main_tag: props.main_tag,
      sub_tags: props.sub_tags,
      src: props.src
    }
    dispatch({type: STORE_ADD, content: content})
    console.log(content)
  }

  return (
    <MainContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inHover && (
        <DownloadButton onClick={e => storeFunction()}>담 기</DownloadButton>
      )}
      <Figure onClick={e => props.onClickFunction(props.id)}>
        <Image_ src={props.src} />
      </Figure>
    </MainContainer>
  );
}
