import React, { useEffect, useState } from 'react';
import BoardTable from '../../components/BoardTable';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import app from '../../firebaseConfig';
import { styled } from 'styled-components';

const ConsultantQuery = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchConsultantData();
    }, []);

    const fetchConsultantData = async () => {
        const db = getFirestore(app);

        const querySnapshot = await getDocs(collection(db, 'consultantRequest'), orderBy('submitDate', 'desc'));

        console.log('db 확인', querySnapshot.docs);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
    };

    const moveToFromUnit = (post) => {
        console.log(post);
        navigate(`/ConsultantForm?id=${post.id}`);
    };

    const moveToFrom = () => {
        console.log('확인');
        navigate(`/ConsultantForm`);
    };
    return (
        <>
            <Wrapper>
                <SideWrapper></SideWrapper>
                <BorderWrapper>
                    <ButtonComponent buttonName="견적 문의" onClick={moveToFrom} />
                    <BoardTable posts={posts} onRowClick={moveToFromUnit} />
                </BorderWrapper>
                <SideWrapper></SideWrapper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
`;

const BorderWrapper = styled.div`
    width: 70%;
`;

const SideWrapper = styled.div`
    width: 15%;
`;

export default ConsultantQuery;
