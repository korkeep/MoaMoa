import React from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'


const MainContainer = styled.div`
    width: 100%;
`

export default function Index() {
    return (
        <>
            <SEO 
                title="Hello, DropBox!"
                description="Hello, DropBox!"
            />
            <MainContainer>
                This is Main
            </MainContainer>
        </>
    )
}