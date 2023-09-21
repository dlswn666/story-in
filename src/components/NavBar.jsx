import React, { useState } from 'react';
import styled from 'styled-components';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <NavWarpper>
                <WebName>
                    <a href="/">StoryIn</a>
                </WebName>
                <NaviBar>
                    <ul>
                        <li>
                            <a href="/main">Main</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/project">Project</a>
                        </li>
                        <li>
                            <a href="/consultant">Consultant</a>
                        </li>
                        <li>
                            <a href="/admin">Admin</a>
                        </li>
                    </ul>
                </NaviBar>
                <Hamburger onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </Hamburger>
            </NavWarpper>
            <SideMenu isOpen={isMenuOpen}>
                <ul>
                    <li>
                        <a href="/main">Main</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/project">Project</a>
                    </li>
                    <li>
                        <a href="/consultant">Consultant</a>
                    </li>
                    <li>
                        <a href="/admin">Admin</a>
                    </li>
                </ul>
            </SideMenu>
            <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
        </>
    );
};

const Hamburger = styled.div`
    display: none;
    width: 30px;
    height: 22px;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    div {
        width: 100%;
        height: 4px;
        background-color: black;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

const WebName = styled.h1`
    font-size: 2.3rem;
    color: black;
    font-family: 'Arial', sans-serif;
    margin-right: auto;

    a {
        text-decoration: none;
        color: black;

        &:hover {
            color: gray;
        }
    }
`;

const SideMenu = styled.div`
    position: fixed;
    top: 0;
    right: ${(props) => (props.isOpen ? '0' : '-50%')};
    width: 50%;
    height: 100%;
    background: white;
    transition: right 0.3s;
    z-index: 200;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ul {
        list-style: none;
    }

    li {
        margin: 1rem 0;
        font-size: 2rem;
    }

    a {
        text-decoration: none;
        color: black;
        transition: color 0.3s;

        &:hover {
            color: gray;
        }
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    cursor: not-allowed;
    z-index: 150;
`;

const NaviBar = styled.nav`
    float: right;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            display: inline;
            margin: 0 1rem;

            a {
                text-decoration: none;
                color: black;
                transition: color 0.3s;

                &:hover {
                    color: gray;
                }
            }
        }
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavWarpper = styled.div`
    background-color: #fafafa;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 10rem;
    z-index: 100;

    @media (max-width: 768px) {
        flex-direction: row; // 원래는 column 이었으나, 햄버거 메뉴 때문에 row로 변경
        justify-content: space-between; // 로고와 햄버거 메뉴가 양 끝으로 가도록
        padding: 1rem; // 패딩도 줄입니다
    }
`;

export default NavBar;
