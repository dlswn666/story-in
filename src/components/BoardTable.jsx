import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from './ButtonComponent';

const BoardTable = ({ posts, onRowClick }) => {
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        handleRequestData();
    }, [posts]);

    const handleRequestData = () => {
        console.log(posts);
        const updateData = posts.map((data, index) => {
            const name = data.nameValue;
            if (name) {
                const firstLetter = name.charAt(0);
                const maskedName = firstLetter + '*'.repeat(name.length - 1);
                return { ...data, nameValue: maskedName };
            }
        });
        setRequestData(updateData);
    };

    return (
        <Wrapper>
            <Table>
                <TableHead>
                    <TableHeaderRow>
                        <TableHeader>번호</TableHeader>
                        <TableHeader>제목</TableHeader>
                        <TableHeader>작성자</TableHeader>
                    </TableHeaderRow>
                </TableHead>
                <tbody>
                    {requestData.map((post, index) => (
                        <TableRow key={post.id} onClick={() => onRowClick(post)}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{post.nameValue + ' 고객님의 ' + post.homeTypeValue + ' 견적 문의'}</TableCell>
                            <TableCell>{post.nameValue}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    border-bottom: 2px solid #ccc;
`;

const TableHeader = styled.th`
    padding: 0.5rem;
    text-align: left;
`;

const TableHeaderRow = styled.tr`
    background-color: white;
`;

const TableRow = styled.tr`
    cursor: pointer;

    &:nth-child(odd) {
        background-color: #f9f9f9;
    }

    &:hover {
        background-color: #e6e6e6;
    }
`;

const TableCell = styled.td`
    padding: 0.5rem;
    text-align: left;
`;

export default BoardTable;
