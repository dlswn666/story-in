import React, { useState } from 'react';
import styled from 'styled-components';

const TabComponent = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '15%' }}></div>
                <Wrapper>
                    <TabMenu className="tab-buttons">
                        {React.Children.map(children, (child, index) => {
                            return (
                                <li
                                    className={activeTab === index ? 'submenu focused' : 'submenu'}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {child.props.label}
                                </li>
                            );
                        })}
                    </TabMenu>
                    <TabContent>{React.Children.toArray(children)[activeTab]}</TabContent>
                </Wrapper>
                <div style={{ width: '15%' }}></div>
            </div>
        </>
    );
};

const Wrapper = styled.div`
    background-color: #dcdcdc;
    width: 70%;
`;

const TabMenu = styled.ul`
    color: rgb(232, 234, 237);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin-top: 10px;
    justify-content: center;
    .submenu {
        // 기본 Tabmenu 에 대한 CSS를 구현
        display: flex;
        /* justify-content: space-between;
          width: 380px;
          heigth: 30px; */
        width: calc(100% / 3);
        padding: 10px;
        font-size: 15px;
        transition: 0.5s;
        border-radius: 10px 10px 0px 0px;
        background-color: #dcdcdc;
        cursor: pointer;
    }
    .focused {
        //선택된 Tabmenu 에만 적용되는 CSS를 구현
        background-color: rgb(255, 255, 255);
        color: rgb(21, 20, 20);
    }

    & div.desc {
        text-align: center;
    }
`;

const TabContent = styled.div`
    margin-top: 10px;
    padding-left: 40px;
    background-color: white;
`;

export default TabComponent;
