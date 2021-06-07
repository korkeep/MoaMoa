import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle, FaTrash, FaDownload } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import StoreBlock from './storeBlock'
import { STORE_CLEAR } from '../redux/store'
import ImageView from './imageView'
import VideoView from './videoView'
import MusicView from './musicView'
import EtcView from './etcView'

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: rgba(0,0,0,0.5);
`

const PostContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80vh;
    width: 100%;
    max-width: 1080px;
    z-index: 1001;
    margin: auto;
    background-color: white;
`

const RelativeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const ButtonWrapper = styled.div`
    display: inline-block;
    position: fixed;
    top: 0;
    right: 0;
    padding: 8px;
    font-size: 32px;

    svg {
        margin-left: 8px;
    }
`

const StoreContainer = styled.div`
    width: 980px;
    height: 80vh;
    overflow-y: auto;
`


export default function StoreView(props) {
    const { contents } = useSelector(state => state.store)
    const dispatch = useDispatch()
    const [image, setImage] = useState("")
    const [image_index, setImageIndex] = useState(-1); // Image View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
    const [video_index, setVideoIndex] = useState(-1); // Video View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
    const [music_index, setMusicIndex] = useState(-1); // Music View 가 있는 인덱스 번호 저장, -1이면 꺼진다.
    const [file_index, setFileIndex] = useState(-1); // File View 가 있는 인덱스 번호 저장, -1이면 꺼진다.

    let store_list = contents.map((x, index) => {
            let onClickFunction
            switch (x.type) {
                case "Image":
                    onClickFunction = setImageIndex
                    break;
                case "Video":
                    onClickFunction = setVideoIndex
                    break;
                case "Music":
                    onClickFunction = setMusicIndex
                    break;
                default:
                    onClickFunction = setFileIndex
                    break;
            }

            return <StoreBlock
                type={x.type}
                key={[x.type, x.id]}
                id={x.id}
                summary={x.summary}
                main_tag={x.main_tag}
                sub_tags={x.sub_tags}
                src={x.src}
                index={index}
                onClickFunction={onClickFunction}
            />
        }
    )

    const clearStore = (e) => {
        if (window.confirm("정말 담은 리스트를 전체 초기화 하시겠습니까?")) {
            dispatch({type: STORE_CLEAR})
        }
    }

    const download_all = (e) => {
        let url_list = []
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].type === "Image") {
                url_list.push(contents[i].src)
            } else if (contents[i].type === "Video") {
                url_list.push(contents[i].video)
            } else if (contents[i].type === "Music") {
                url_list.push(contents[i].music)
            } else {
                url_list.push(contents[i].file)
            }
        }
        var link = document.createElement('a');

        link.setAttribute('download', null);
        link.style.display = 'none';

        document.body.appendChild(link);

        for (let i = 0; i < url_list.length; i++) {
            link.setAttribute('href', url_list[i]);
            link.click();
        }
        document.body.removeChild(link);
    }

    return (
        <>  
            {image_index !== -1 && (
                <ImageView setIndex={setImageIndex} index={image_index} />
            )}
            {video_index !== -1 && (
                <VideoView setIndex={setVideoIndex} index={video_index} />
            )}
            {music_index !== -1 && (
                <MusicView setIndex={setMusicIndex} index={music_index} />
            )}
            {file_index !== -1 && (
                <EtcView setIndex={setFileIndex} index={file_index} />
            )}
            <MainContainer>
                <PostContainer>
                    <RelativeContainer>
                        <ButtonWrapper>
                            <FaDownload onClick={download_all} />
                            <FaTrash onClick={clearStore}/>
                            <FaRegTimesCircle onClick={e => props.setView(false)} />
                        </ButtonWrapper>
                        <StoreContainer>
                            {store_list}
                        </StoreContainer>
                    </RelativeContainer>
                </PostContainer>
            </MainContainer>
        </>
    )
}