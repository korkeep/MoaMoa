import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegTimesCircle } from 'react-icons/fa'
import { SORT_CHANGE, DAY_CHANGE, INITIALIZE_SORT_DAY } from '../redux/query'


const MainContainer = styled.div`
    position: fixed;
    right: 100px;
    width: 300px;
    height: 250px;
    bottom: 100px;
    background-color: white;
`

const SubContainer = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`

const ContentContainer = styled.div`
    text-align: center;
    margin: 8px 0;

    svg {
        width: 30px;
        height: 30px;
        transform: translate(10px, 10px);
    }
`

export default function SortView() {
    const dispatch = useDispatch()
    const { sort, day } = useSelector((state) => state.query)

    return (
        <MainContainer>
            <SubContainer>
                <ContentContainer>
                    <span>정렬 순: </span>
                    <select defaultValue={sort} onChange={(e) => dispatch({type: SORT_CHANGE, sort: e.target.value})} id="sort">
                        <option value="recent">최신순</option>
                        <option value="visited">조회수</option>
                    </select>
                </ContentContainer>
                <ContentContainer>
                    <span>최신 순: </span>
                    <select defaultValue={day} onChange={(e) => dispatch({type: DAY_CHANGE, day: e.target.value})} id="day">
                        <option value=""> - </option>
                        <option value="1">최근 1일</option>
                        <option value="7">최근 7일</option>
                        <option value="30">최근 1달</option>
                        <option value="90">최근 3달</option>
                        <option value="365">최근 1년</option>
                    </select>
                </ContentContainer>
                <ContentContainer>
                    <span>초기화</span>
                    <FaRegTimesCircle onClick={(e) => {
                        document.getElementById('sort').value="recent";
                        document.getElementById('day').value="";
                        dispatch({type: INITIALIZE_SORT_DAY})
                    }} />
                </ContentContainer>
            </SubContainer>
        </MainContainer>
    )
}