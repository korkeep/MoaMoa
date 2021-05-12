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
    filter: grayscale(0.8);
  }
`;

const Image_ = styled.img`
  object-fit: cover;
  width: 100%;
  vertical-align: bottom;
`;

export default function Image(props) {
  return (
    <MainContainer onClick={e => props.onClickFunction(props.id)}>
      <Figure>
        <Image_ src={props.src} />
      </Figure>
    </MainContainer>
  );
}
