import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Components
import MetaMask from '../ui/MetaMask';

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

const Title = styled.p`
    font-size: 2.6rem;
    margin: 0 1rem;
    color: white;
    text-decoration: none;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavItem = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 2.2rem;
    display: block;

    @media (min-width: 768px) {
        display: inline-block;
        margin-right: 2rem;
        font-size: 1.8rem;

        &:last-of-type {
            margin: 0;
        }
    }

    &:hover {
        color: black;
    }
`;

const Header = () => {
    return (
        <HeaderStyled>
            <HeaderContainer>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <DivFlexCenter id='logo'>
                        <img src='./logo.svg' alt='Logo' width={50} />
                        <Title>blankSpace</Title>
                    </DivFlexCenter>
                </Link>

                <Nav>
                    <NavItem to='/'>Home</NavItem>
                    <NavItem to='/test-arena'>Test Arena</NavItem>
                </Nav>

                <DivFlexCenter>
                    <MetaMask />
                </DivFlexCenter>
            </HeaderContainer>
        </HeaderStyled>
    );
};

export default Header;