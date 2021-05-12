import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import Image from '../../components/image';
import ImageView from '../../components/imageView';

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
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  min-width: 200px;
  min-height: 100px;
  border-radius: 2em;
  -moz-border-radius: 2em;
  -webkit-border-radius: 2em;
  border: 1px solid #c0c0c0;
  vertical-align: bottom;
`;

export default function ImagePage() {
  const [images, setImages] = useState([]); // Image 배열이 담겨 있음
  const [index, setIndex] = useState(-1); // Image View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
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
        <ImageWrapper>
          <Image
            key={page * 20 + i}
            onClickFunction={setIndex}
            id={page * 20 + i}
            src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
          />
        </ImageWrapper>
      );
    }
    //테스트용 샘플코드(지우셔도 됩니다.)
    /*
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg" 
                id = "0"
                key = "0"
                onClickFunction={setIndex}
                />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg" />
        )
        templist.push(
            <Image
                src="https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png" />
        )
        */
    setImages([...images, ...templist]);
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
      <MainContainer>{images}</MainContainer>
      {index !== -1 && (
        <ImageView setIndex={setIndex} index={index} image={images} />
      )}
    </>
  );
}
