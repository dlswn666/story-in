import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../firebaseConfig';
import LoadingPage from '../../components/LoadingPage';
import ImageCard from '../../components/ImageCard';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ProjectMain = () => {
    const [images, setImages] = useState('');
    const [projectDatas, setProjectDatas] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getProjectFirstImage = async () => {
        const db = getFirestore(app);
        const docRef = collection(db, 'projects');
        const docRefQuery = query(docRef, orderBy('submitDate', 'desc'), limit(10));
        const projectDataArray = [];

        try {
            const docSnap = await getDocs(docRefQuery);
            docSnap.forEach((doc) => {
                const projectId = doc.id;
                const projectDate = doc.submitDate;
                const projectData = doc.data();
                const projectFirstImage = projectData.projectImages.split('|')[0];
                const text1 = projectData.contentText1;
                console.log(text1);
                console.log(projectData);
                const text2 = projectData.contentText2;
                const text3 = projectData.contentText3;
                const projectDataObject = {
                    projectId,
                    projectFirstImage,
                    projectDate,
                    text1,
                    text2,
                    text3,
                };

                projectDataArray.push(projectDataObject);
            });
            setProjectDatas(projectDataArray);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getProjectFirstImage();
    }, []);

    return (
        <>
            <ImageGrid>
                {isLoading ? (
                    <>
                        <LoadingPage isLoading={isLoading} />
                    </>
                ) : (
                    <>
                        {projectDatas.map((data, index) => (
                            <Link key={data.projectId} to={`/project/${data.projectId}`}>
                                <ImageCard
                                    key={data.projectId}
                                    imageSrc={data.projectFirstImage}
                                    altText={data.text1}
                                    text={data.text2}
                                />
                            </Link>
                        ))}
                    </>
                )}
            </ImageGrid>
        </>
    );
};

export default ProjectMain;

const ImageGrid = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(4, 1fr);

    // 화면 크기가 768px 미만일 때
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }

    // 화면 크기가 480px 미만일 때
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
