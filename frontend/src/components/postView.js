import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa'
import Dropzone, { useDropzone } from 'react-dropzone'

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
const TitleContainer = styled.div`
    display: inline-block;
    transform: translate(-50%, 0%);
    position: fixed;
    top: 0;
    left: 50%;
    padding: 20px;
    font-size: 32px;
    font-weight: bolder;
`
const DragDropContainer = styled.div`
    position: fixed;
    transform: translate(-50%, -50%);
    top:50%;
    left:50%;
    width: 500px;
    height: 400px;
    border: 3px dashed #adb5bd;
    &:hover { background-color:#e9ecef; };
    cursor: pointer;
`
const ButtonWrapper = styled.div`
    display: inline-block;
    position: fixed;
    top: 0;
    right: 0;
    padding: 8px;
    font-size: 32px;
    cursor: pointer;
`

const PreviewContainer = styled.div`
    position: relative;
    top: 100px;
    left: 40px;
    width: 50%;
`

const DetailContainer = styled.div`
    position: fixed;
    top: 100px;
    left: 50%;
    width: 50%;
`

const FileContainer = styled.div`
    position: fixed;
    bottom: 0;
    border-radius: 8px;
    border: 1px solid black;
    height: 180px;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -20px);

    p {
        margin: 20px 0;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }
`

const ContentContainer = styled.div`
    margin: 8px 0;
`

const ContentNameWrapper = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 4px 0;
`

const ContentInput = styled.input`
    width: 400px;
    padding: 8px;
    border: 1px solid black;
    font-size: 16px;
    border-radius: 4px;
    word-break: break-all;
    overflow-wrap: break-word;
`

const ContentTextarea = styled.textarea`
    width: 400px;
    height: 100px;
    padding: 8px;
    border: 1px solid black;
    font-size: 16px;
    border-radius: 4px;
    overflow-wrap: break-word;
    resize: none;
`

const HashTag = styled.span`
  font-size: 14px;
  border: 1px solid #888888;
  border-radius: 10px;
  padding: 4px 8px;
  margin-right: 8px;

  &:first-of-type {
    border: 1px solid black;
  }
  svg {
      transform: translateY(2px);
  }
`

const HashTagContainer = styled.div`
    margin: 8px 0;
`

const CustomImage = styled.img`
    width: 400px;
    max-height: 500px;
    object-fit: cover;
  
`

const CustomVideo = styled.video`
    width: 400px;
    max-height: 500px;
    object-fit: cover;
    position: fixed;
    top: 200px;
`

const SubmitButton = styled.button`
    background-color: black;
    color: white;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 18px;
`

export default function PostView(props) {
    const [acceptedFile, setAcceptedFile] = useState(null)
    const [summary, setSummary] = useState('')
    const [hash_tag, setHashTag] = useState('')
    const [hash_tags, setHashTags] = useState([])
    let preview, message

    if (acceptedFile !== null) {
        console.log(acceptedFile[0])
        message = acceptedFile[0].path
        if (acceptedFile[0].type.startsWith('image')) {
            preview = <CustomImage src={URL.createObjectURL(acceptedFile[0])} />
        } else if (acceptedFile[0].type.startsWith('video')) {
            preview = (
                <CustomVideo controls>
                    <source src={URL.createObjectURL(acceptedFile[0])} type={acceptedFile[0].type}/>
                    지원하지 않는 브라우저 입니다.
                </CustomVideo>
            )
        } else if (acceptedFile[0].type.startsWith('audio')) {
            preview = <audio controls src={URL.createObjectURL(acceptedFile[0])}>
                            Your browser does not support the
                            <code>audio</code> element.
                        </audio>
        } else {
            preview = <CustomImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFpqOXYHlS5UFVgfKan5ihUBktkCDPCNTBnQ&usqp=CAU" />
        }
    } else {
        preview = <></>
        message = "밑에 dropzone을 이용하여, 파일을 업로드 해 주세요!"
    }

    const hash_tag_elements = hash_tags.map((x, index) => (
        <HashTag>{x} <FaRegTimesCircle onClick={e => {
            setHashTags([...hash_tags.slice(0, index), ...hash_tags.slice(index + 1)])
        }}/></HashTag>
    ))

    return (
        <MainContainer>
            <PostContainer>
                <RelativeContainer>
                    <TitleContainer>
                        Upload File
                    </TitleContainer>
                    <PreviewContainer>
                        {preview}
                    </PreviewContainer>
                    <DetailContainer>
                        <ContentContainer>
                            <ContentNameWrapper>Summary</ContentNameWrapper>
                            <ContentTextarea
                                value={summary}
                                onChange={e => setSummary(e.target.value)}
                            />
                        </ContentContainer>
                        <ContentContainer>
                            <ContentNameWrapper>HashTag<span style={{fontSize: '12px'}}> (첫 번째 태그는 매인 태그로 등록됩니다.)</span></ContentNameWrapper>
                            <ContentInput
                                value={hash_tag}
                                onChange={e => setHashTag(e.target.value)}
                                placeholder="태그를 입력해 주세요 ('Enter'키로 추가)"
                                onKeyPress={e => {
                                    if (e.key === "Enter") {
                                        if (hash_tag === '') {
                                            alert("태그를 입력 해 주세요.")
                                            return
                                        } else if (hash_tags.findIndex(tag => tag === hash_tag) != -1) {
                                            alert("태그가 이미 존재합니다.")
                                            return
                                        }
                                        setHashTag('')
                                        setHashTags([...hash_tags, hash_tag])
                                    }
                                }}
                            />
                            <HashTagContainer>
                                {hash_tag_elements}
                            </HashTagContainer>
                        </ContentContainer>
                        <ContentContainer>
                            <ContentNameWrapper>File</ContentNameWrapper>
                            {message}
                        </ContentContainer>
                        <ContentContainer>
                            <SubmitButton>업로드</SubmitButton>
                        </ContentContainer>
                    </DetailContainer>
                    <Dropzone
                        onDrop={(file) => (setAcceptedFile(file))}
                        >
                        {({getRootProps, getInputProps}) => (
                            <FileContainer {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>파일을 드래그하거나, 클릭을 한 후 파일을 선택해주세요.</p>
                            </FileContainer>
                        )}
                    </Dropzone>
                    <ButtonWrapper>
                        <FaRegTimesCircle onClick={e => props.setView(false)} />
                    </ButtonWrapper>
                </RelativeContainer>
            </PostContainer>
        </MainContainer>
    )
}