import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SEO from '../../components/SEO'
import Image from '../../components/image'
import ImageView from '../../components/imageView'


const MainContainer = styled.div`
    width: 100%;
`

export default function ImagePage() {
    const [images, setImages] = useState([])  // Image 배열이 담겨 있음
    const [index, setIndex] = useState(-1)  // Image View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
    const [page, setPage] = useState(0)  // 쿼리로 던져야 하는 페이지 넘버
    const [loading, setLoading] = useState(false)  // 로딩 중인지 아닌지

    /*function returnFunction(index) {
        function onClickImage(e) {
            setIndex(index)
        }
        return onClickImage
    }*/

    const getImage = async () => {
        setPage(page + 1)
        setLoading(true)
        let templist = []

        // 여기는 API 만들어지면 업데이트 하겠습니다.
        for (let i = 0; i < 20; i++) {
            templist.push(
                <Image
                key={page * 20 + i}
                onClickFunction={setIndex}
                id={page * 20 + i} />
            )
        }
        setImages([...images, ...templist])
        setLoading(false)
    }

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight && loading === false) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            getImage()
        }
    }

    useEffect(() => {
        getImage()
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            // scroll event listener 해제
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return (
        <>
            <SEO 
                title="Hello, DropBox!"
                description="Hello, DropBox!"
            />
            <MainContainer>
                {images}
            </MainContainer>
            {index !== -1 && <ImageView setIndex={setIndex}/>}
        </>
    )
}