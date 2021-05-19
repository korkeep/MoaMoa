import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaInbox } from 'react-icons/fa'
import StoreView from '../components/storeView'
import PostView from '../components/postView'


const MainContainer = styled.div`
    position: fixed;
    width: 100px;
    right: 0.5%;
    bottom: 2%;
`

const ButtonWrapper = styled.div`
    background-color: white;
    display: inline-block;
    height: 60px;
    width: 60px;
    margin: 10px 20px;
    line-height: 60px;
    text-align: center;
    border-radius: 30px;
    z-index: 998;
    box-shadow: 2px 1px 7px 1px rgba(0, 0, 0, 0.4);
    &:hover { 
        background-color: #e9ecef;
     };
     cursor: pointer;
`
const SFaPlus = styled(FaPlus)`
    font-size:30px;
    padding-top: 15px;
    color: #343a40;
`

const SFaInbox = styled(FaInbox)`
    font-size:30px;
    padding-top: 15px;
    color: #343a40;
`
export default function SideBar() {
    const [is_postview, setIsPostview] = useState(false)
    const [is_storeview, setIsStoreview] = useState(false)

    return (
        <>
            <MainContainer>
                <ButtonWrapper onClick={e => setIsPostview(true)}>
                    <SFaPlus />
                </ButtonWrapper>
                <ButtonWrapper onClick={e => setIsStoreview(true)}>
                    <SFaInbox />
                </ButtonWrapper>
            </MainContainer>
            {is_postview && <PostView setView={setIsPostview}/>}
            {is_storeview && <StoreView setView={setIsStoreview}/>}
        </>
    )
}