import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaInbox } from 'react-icons/fa'
import StoreView from '../components/storeView'
import PostView from '../components/postView'


const MainContainer = styled.div`
    position: fixed;
    width: 100px;
    right: 0;
    bottom: 5%;
`

const ButtonWrapper = styled.div`
    background-color: white;
    display: inline-block;
    height: 60px;
    width: 60px;
    margin: 10px 20px;
    line-height: 60px;
    text-align: center;
    border: 1px solid black;
    border-radius: 30px;
    z-index: 998;
`

export default function SideBar() {
    const [is_postview, setIsPostview] = useState(false)
    const [is_storeview, setIsStoreview] = useState(false)

    return (
        <>
            <MainContainer>
                <ButtonWrapper onClick={e => setIsPostview(true)}>
                    <FaPlus />
                </ButtonWrapper>
                <ButtonWrapper onClick={e => setIsStoreview(true)}>
                    <FaInbox />
                </ButtonWrapper>
            </MainContainer>
            {is_postview && <PostView setView={setIsPostview}/>}
            {is_storeview && <StoreView setView={setIsStoreview}/>}
        </>
    )
}