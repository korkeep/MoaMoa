import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'

import SEO from '../../components/SEO';
import Music from '../../components/music';
import MusicView from '../../components/musicView'
import { server_ip } from '../../setting/env';

const MainContainer = styled.div`
  width: 92%;
  padding-left: 4%;
  padding-top: 2%;
`;
const MusicWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  min-width: 200px;
  min-height: 30px;
  vertical-align: bottom;
`;

const ColumnWrapper = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-between;
  width: 98%;
  overflow: hidden;
  border-bottom: 5px double #868e96;
  font-weight: bolder;
`;
const TitleWrapper = styled.div`
  width: 42%;
`;

const ArtistWrapper = styled.div`
  width: 12%;
`;

const UploadDateWrapper = styled.div`
  width: 20%;
`;
const ViewsWrapper = styled.div`
  width: 15%;
`;

export default function MusicPage() {
  const [musics, setMusics] = useState([]); // Image 배열이 담겨 있음
  const [page, setPage] = useState(0); // 쿼리로 던져야 하는 페이지 넘버
  const [index, setIndex] = useState(-1);
  const params = new URLSearchParams(window.location.search)
  const url_query = params.get('query')
  const { sort, day } = useSelector((state) => state.query)

  const initialMusic = async () => {
    try {
      // let params = {page: 1, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const music_list_response = await axios.get(server_ip + '/music/list' + query_string)
      const music_list = music_list_response.data.musics.map(x => (
        <MusicWrapper key={x.music}>
          <Music
            type="Music"
            onClickFunction={setIndex}
            id={x.id}
            artist={x.main_tag}
            title={x.title}
            date={x.published_date}
            main_tag={x.main_tag}
            summary={x.summary}
            sub_tags={x.sub_tags}
            views={x.visited}
          />
        </MusicWrapper>
      ))
      setMusics(music_list)
      setPage(2)
      return
    } catch (err) {
      console.log(err)
      return
    }
  };

  const getMusic = async () => {
    try {
      // let params = {page: page, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const music_list_response = await axios.get(server_ip + '/music/list' + query_string)
      const music_list = music_list_response.data.musics(x => (
        <MusicWrapper key={x.music}>
          <Music
            type="Music"
            onClickFunction={setIndex}
            id={x.id}
            artist={x.main_tag}
            title={x.title}
            date={x.published_date}
            main_tag={x.main_tag}
            summary={x.summary}
            sub_tags={x.sub_tags}
            views={x.visited}
          />
        </MusicWrapper>
      ))
      setMusics([...musics, ...music_list])
      setPage(2)
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
      await getMusic();
    }
  };

  useEffect(async () => {
    await initialMusic();
  }, []);

  useEffect(async () => {
    await initialMusic()
  }, [day, sort]);

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
      {index !== -1 && (
        <MusicView
          setIndex={setIndex}
          index={index} />
      )}
      <MainContainer>
        <ColumnWrapper>
          <ArtistWrapper>가수명</ArtistWrapper>{' '}
          <TitleWrapper>제목</TitleWrapper>{' '}
          <UploadDateWrapper>업로드 날짜</UploadDateWrapper>
          <ViewsWrapper>다운로드수</ViewsWrapper>
        </ColumnWrapper>
        {musics}
      </MainContainer>
    </>
  );
}
