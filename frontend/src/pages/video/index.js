import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'

import SEO from '../../components/SEO';
import Image from '../../components/image';
import VideoView from '../../components/videoView';
import { server_ip } from '../../setting/env';

const MainContainer = styled.div`
  width: 92%;
  column-count: 5;
  column-gap: 2em;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    column-count: 3;
    column-gap: 2em;
  }
  @media all and (max-width: 767px) {
    column-count: 2;
    column-gap: 1em;
  }
  padding-left: 4%;
  padding-top: 2%;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  align-items: center;
  margin-bottom: 20px;
  min-width: 200px;
  min-height: 100px;
  border-radius: 2em;
  -moz-border-radius: 2em;
  -webkit-border-radius: 2em;
  vertical-align: bottom;
`;

export default function VideoPage() {
  const [videos, setVideos] = useState([]); // Image 배열이 담겨 있음
  const [index, setIndex] = useState(-1); // Image View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
  const [page, setPage] = useState(0); // 쿼리로 던져야 하는 페이지 넘버
  const params = new URLSearchParams(window.location.search)
  const url_query = params.get('query')
  const { sort, day } = useSelector((state) => state.query)  // query 빼오기

  const initialVideo = async () => {
    try {
      // let params = {page: 1, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const video_list_response = await axios.get(server_ip + '/video/list' + query_string)
      const video_list = video_list_response.data.videos.map(x => (
        <ImageWrapper key={x.id}>
            <Image
              type="Video"
              id={x.id}
              onClickFunction={setIndex}
              summary={x.summary}
              main_tag={x.main_tag}
              sub_tags={x.sub_tags}
              src={x.image}
            />
          </ImageWrapper>
        )
      )
      setVideos(video_list);
      setPage(2)
      return
    } catch (err) {
      console.log(err)
      return
    }
  };
  
  const getVideo = async () => {
    try {
      // let params = {page: page, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const video_list_response = await axios.get(server_ip + '/video/list' + query_string)
      const video_list = video_list_response.data.videos.map(x => (
        <ImageWrapper key={x.id}>
            <Image
              type="Video"
              id={x.id}
              onClickFunction={setIndex}
              summary={x.summary}
              main_tag={x.main_tag}
              sub_tags={x.sub_tags}
              src={x.video}
            />
          </ImageWrapper>
        )
      )
      setVideos([...videos, ...video_list]);
      setPage(page + 1)
      return
    } catch (err) {
      console.log(err)
      return
    }
  };

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      await getVideo();
    }
  };

  // day, sort 변경
  useEffect(async () => {
    await initialVideo()
  }, [day, sort]);
  
  // 첫 쿼리
  useEffect(async () => {
    await initialVideo();
  }, []);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <SEO title="Hello, DropBox!" description="Hello, DropBox!" />
      <MainContainer>{videos}</MainContainer>
      {index !== -1 && (
        <VideoView
          setIndex={setIndex}
          index={index}
          image={videos} />
      )}
    </>
  );
}
