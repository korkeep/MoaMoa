import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import SEO from '../../components/SEO';
import Image from '../../components/image';
import ImageView from '../../components/imageView';
import { server_ip } from '../../setting/env'
import { QUERY_CHANGE, PAGE_CHANGE } from '../../redux/query'

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
`;

export default function ImagePage() {
  const [images, setImages] = useState([]); // Image 배열이 담겨 있음
  const [index, setIndex] = useState(-1); // Image View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
  const [loading, setLoading] = useState(false); // 로딩 중인지 아닌지
  const [page, setPage] = useState(1);
  const params = new URLSearchParams(window.location.search)
  const url_query = params.get('query')
  const { sort, day } = useSelector((state) => state.query)  // query 빼오기

  const test_print = () => {console.log(sort, day, page)}

  const initialImage = async () => {
    test_print()
    try {
      // let params = {page: 1, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const image_list_response = await axios.get(server_ip + '/image/list' + query_string)
      const image_list = image_list_response.data.images.map(x => (
          <ImageWrapper key={x.id}>
            <Image
              type="Image"
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
      setImages(image_list);
      setPage(2)
      return
    } catch (err) {
      console.log(err)
      return
    }
  };

  const getImage = async () => {
    try {
      // let params = {page: page, sort: sort}, 추후제거
      if (url_query !== null) {params.query = url_query}
      if (sort === 'visited') {
        if (day !== '')
          params.day = day
      }
      let query_string = '?' + new URLSearchParams(params).toString()

      const image_list_response = await axios.get(server_ip + '/image/list' + query_string)
      const image_list = image_list_response.data.images.map(x => (
          <ImageWrapper key={x.id}>
            <Image
              type="Image"
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
      setImages([...images, ...image_list]);
      setPage(page + 1)

      return
    } catch (err) {
      console.log(err)
      return
    }
  };

  const handleScroll = async () => {
    console.log("handle Scroll")
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      await getImage();
    }
  };

  // day, sort 변경
  useEffect(async () => {
    await initialImage()
  }, [day, sort]);
  
  // 초기 값 세팅
  useEffect(async () => {
    await initialImage()
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
      <MainContainer id="container">{images}</MainContainer>
      {index !== -1 && (
        <ImageView
          setIndex={setIndex}
          index={index} />
      )}
    </>
  );
}
