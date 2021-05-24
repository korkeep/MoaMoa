/*
Store에 들어가는 객체 attribute
type: Image, Video, Music, Etc
id: content id
title: 타이틀
src: 썸네일 이미지 링크, Music, Video는 없음
main_tag: 메인태그
sub_tags: 서브 태그 배열
*/

const initState = {
    contents: []
}

export const STORE_ADD = "store/STORE_ADD"
export const STORE_DELETE = "store/STORE_DELETE"
export const STORE_CLEAR = "store/STORE_CLEAR"

export const store_add = (content) => {
    return {
        type: STORE_ADD,
        content: content
    }
}

export const store_delete = (index) => {
    return {
        type: STORE_DELETE,
        index: index
    }
}

export const store_clear = () => {
    return {
        type: STORE_CLEAR,
    }
}

const storeReducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_ADD:
            return {
                contents: [...state.contents, action.content]
            }
        case STORE_DELETE:
            return {
                contents: [...state.contents.slice(0, action.index), ...state.contents.slice(action.index + 1)]
            }
        case STORE_CLEAR:
            return {
                contents: []
            }
        default:
            return state
    }
}

export default storeReducer