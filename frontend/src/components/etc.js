import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';

import { STORE_ADD } from '../redux/store'

const MainContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-between;
  width: 98%;
  overflow: hidden;
  border-bottom: 1px solid black;
`;

const TitleWrapper = styled.div`
  width: 40%;
`;

const ArtistWrapper = styled.div`
  width: 10%;
`;

const UploadDateWrapper = styled.div`
  width: 20%;
`;

const ViewsWrapper = styled.div``;

const DownloadButton = styled.button``;

export default function Etc(props) {
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
      src: props.src,
    }
    dispatch({type: STORE_ADD, content: content})
    console.log(content)
  }

  console.log(props.onClickFunction)
  
  return (
    <MainContainer>
      <ArtistWrapper onClick={(e) => props.onClickFunction(props.id)}>{props.artist}</ArtistWrapper>
      <TitleWrapper onClick={(e) => props.onClickFunction(props.id)}>{props.title}</TitleWrapper>
      <UploadDateWrapper onClick={(e) => props.onClickFunction(props.id)}>{props.date}</UploadDateWrapper>
      <ViewsWrapper onClick={(e) => props.onClickFunction(props.id)}>{props.views}</ViewsWrapper>
      <DownloadButton onClick={() => storeFunction()}>Download</DownloadButton>
    </MainContainer>
  );
}
