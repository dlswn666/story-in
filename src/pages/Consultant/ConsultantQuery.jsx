import React, { useEffect, useState } from 'react';
import BoardTable from '../../components/BoardTable';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
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

        const querySnapshot = await getDocs(collection(db, 'consultantRequest'));

        console.log('db 확인', querySnapshot.docs);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
    };

    const handleTableData = (post) => {
        console.log(post);
    };

    // const posts = [
    //     { id: 1, title: '첫 번째 글', author: 'Alice' },
    //     { id: 2, title: '두 번째 글', author: 'Bob' },
    //     { id: 3, title: '세 번째 글', author: 'Jhon' },
    //     // ...
    // ];

    const moveToFrom = () => {
        console.log('확인');
        navigate('/ConsultantForm');
    };
    return (
        <>
            <Wrapper>
                <SideWrapper></SideWrapper>
                <BorderWrapper>
                    <ButtonComponent buttonName="견적 문의" onClick={moveToFrom} />
                    <BoardTable posts={posts} onRowClick={handleTableData} />
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
