import React, { useState } from 'react';
import styled from 'styled-components';

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
  return (
    <MainContainer
      onClick={e => props.onClickFunction(props.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inHover && (
        <DownloadButton onClick="downloadFunction">저 장</DownloadButton>
      )}
      <Figure>
        <Image_ src={props.src} />
      </Figure>
    </MainContainer>
  );
}
