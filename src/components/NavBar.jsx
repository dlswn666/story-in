import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
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
            </NavWarpper>
        </>
    );
};

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
        @media (max-width: 768px) {
            ul {
                flex-direction: column;
                gap: 10px;
            }
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
            flex-direction: column;
            height: auto; /* 모바일 화면에서 자동으로 높이 조절 */
            padding: 2rem 0; /* 모바일 화면에서 자동으로 패딩 조절 */
        }
    }
`;

export default NavBar;
