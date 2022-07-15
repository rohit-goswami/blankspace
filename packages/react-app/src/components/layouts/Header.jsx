import React from 'react';
import styled from '@emotion/styled';

// Components
import MetaMask from './MetaMask';

// Styled
const HeaderStyled = styled.header`
    border-bottom: 2px solid black;
    padding: 1rem 0;
`;

const HeaderContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 2rem;

    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        padding: 0 5rem;
    }
`;

const DivFlexCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    padding: 0.7rem 0;
`;

const Header = () => {
    return (
        <HeaderStyled>
            <HeaderContainer>
                <DivFlexCenter id='logo'>
                    <img src='./logo.svg' alt='Logo' width={50} />
                </DivFlexCenter>

                <DivFlexCenter>
                    <MetaMask />
                </DivFlexCenter>
            </HeaderContainer>
        </HeaderStyled>
    );
};

export default Header;
