import React, { useState } from 'react';
import styled from 'styled-components';

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
export default function Music(props) {
  return (
    <MainContainer>
      <ArtistWrapper>{props.artist}</ArtistWrapper>
      <TitleWrapper>{props.title}</TitleWrapper>
      <UploadDateWrapper>{props.date}</UploadDateWrapper>
      <ViewsWrapper>{props.views}</ViewsWrapper>
      <DownloadButton>Download</DownloadButton>
    </MainContainer>
  );
}
