import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'

import SEO from '../../components/SEO';
import Music from '../../components/music';
import MusicView from '../../components/musicView'

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
  const [musics, setmusics] = useState([]); // Image 배열이 담겨 있음
  const [page, setPage] = useState(0); // 쿼리로 던져야 하는 페이지 넘버
  const [loading, setLoading] = useState(false); // 로딩 중인지 아닌지
  const [index, setIndex] = useState(-1);
  const { query } = useSelector((state) => state.query)  // query 빼오기
  const music = musics.find(element => element.id === index)

  const getMusic = async () => {
    setPage(page + 1);
    setLoading(true);
    let templist = [];

    // 여기는 API 만들어지면 업데이트 하겠습니다.
    for (let i = 0; i < 20; i++) {
      templist.push(
        <MusicWrapper>
          <Music
            type="Music"
            key={page * 20 + i}
            onClickFunction={setIndex}
            id={page * 20 + i}
            artist={`IU`}
            title={`좋은 날`}
            date={`2020-01-01`}
            main_tag={"아이유"}
            summary={`IU - 좋은 날`}
            sub_tags={["서브 태그 1", "서브 태그 2"]}
            views={10}
          />
        </MusicWrapper>
      );
    }
    setmusics([...musics, ...templist]);
    setLoading(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && loading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      getMusic();
    }
  };

  useEffect(() => {
    getMusic();
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
      {index !== -1 && (
        <MusicView
          setIndex={setIndex}
          index={index}
          music={music} />
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
