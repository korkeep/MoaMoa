import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle } from 'react-icons/fa';
import Image from '../components/image';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
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
  z-index: 1001;
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
  margin-top: 15%;
  font-size: 20px;
  font-weight: bolder;
`;

const HashTagWrap = styled.div`
  padding-left: 10px;
  padding-top: 10px;
  color: #4dabf7;
  font-weight: bold;
  font-size: 15px;
`;

const CommentContainer = styled.div`
  padding-left: 10px;
  width: 100%;
  height: 60%;
  font-size: 20px;
  font-weight: bolder;
`;
const CommentWrap = styled.div`
  width: 93%;
  height: 85%;
  margin-left: 3px;
  margin-top: 10px;
  border-radius: 1em;
  padding-left: 15px;
  background-color: #fff9db;
`;
const CommentBox = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding-top: 10px;
`;

const InputWrap = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 20%;
`;

const Input = styled.input`
  width: 90%;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  outline: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const Line = styled.hr`
  position: fixed;
  top: 10%;
  left: 30%;
  width: 40%;
  border-top: 2px solid #868e96;
`;

export default function ImageView(props) {
  // ImageView 클릭시 API 연동 구현 필요

  return (
    <MainContainer>
      <PostContainer>
        <RelativeContainer>
          <TitleContainer>Image View</TitleContainer>
          <Line />
          <ImageWrapper>
            <Image
              id={props.index}
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
            />
          </ImageWrapper>
          <InfoContainer>
            <HashTagContainer>
              HashTag
              <HashTagWrap>#해시태그</HashTagWrap>
            </HashTagContainer>
            <CommentContainer>
              Comment
              <CommentWrap>
                <CommentBox>댓글1</CommentBox>
                <CommentBox>댓글2</CommentBox>
              </CommentWrap>
              <InputWrap>
                <Input type="text" placeholder="Comment Add..." />
              </InputWrap>
            </CommentContainer>
          </InfoContainer>
          <ButtonWrapper>
            <FaRegTimesCircle onClick={e => props.setIndex(-1)} />
          </ButtonWrapper>
        </RelativeContainer>
      </PostContainer>
    </MainContainer>
  );
}
