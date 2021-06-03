import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import Music from '../../components/music';

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

export default function ImagePage() {
  const [musics, setmusics] = useState([]); // Image 배열이 담겨 있음
  const [page, setPage] = useState(0); // 쿼리로 던져야 하는 페이지 넘버
  const [loading, setLoading] = useState(false); // 로딩 중인지 아닌지

  /*function returnFunction(index) {
        function onClickImage(e) {
            setIndex(index)
        }
        return onClickImage
    }*/

  const getImage = async () => {
    setPage(page + 1);
    setLoading(true);
    let templist = [];

    // 여기는 API 만들어지면 업데이트 하겠습니다.
    for (let i = 0; i < 20; i++) {
      templist.push(
        <MusicWrapper>
          <Music
            key={page * 20 + i}
            id={page * 20 + i}
            title="좋은날.wav"
            date="2020-03-14"
            artist="IU"
            views="30"
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
      getImage();
    }
  };

  useEffect(() => {
    getImage();
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
