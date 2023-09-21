import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SlideComponent from '../../components/SlidComponent';
import LoopSlidComponent from '../../components/LoopSlidComponent';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '../../firebaseConfig';
import styled from 'styled-components';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [images, setImages] = useState([]);
    const [contentText1, setContentText1] = useState('');
    const [contentText2, setContentText2] = useState('');
    const [contentText3, setContentText3] = useState('');
    const [picName, setPicName] = useState('');
    const fetchProjectData = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setImages(data.projectImages.split('|'));
            setContentText1(data.contentText1);
            setContentText2(data.contentText2);
            setContentText3(data.contentText3);
            setPicName(data.picName);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, []);

    console.log(projectId);
    return (
        <>
            <GridWrapper>
                <ContentGrid>
                    <ContentItem>프로젝트 이름: &nbsp;&nbsp;{picName}</ContentItem>
                    <ContentItem>내용 1: &nbsp;&nbsp;{contentText1}</ContentItem>
                    <ContentItem>내용 2: &nbsp;&nbsp;{contentText2}</ContentItem>
                    <ContentItem></ContentItem>
                    <ContentItem style={{ gridColumn: 'span 2' }}> 내용 3: &nbsp;&nbsp;{contentText3}</ContentItem>
                </ContentGrid>
            </GridWrapper>
            <SlideComponent images={images} />
            <LoopSlidComponent images={images} />
        </>
    );
};
const GridWrapper = styled.div``;

const ContentGrid = styled.div`
    display: grid;
    max-width: 800px;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    margin-left: 22rem;
    margin-bottom: 1.5rem;
`;

const ContentItem = styled.div``;

export default ProjectDetail;
