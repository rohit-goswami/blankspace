import React from 'react';
import styled from '@emotion/styled';

// Components
import Header from './Header';

// Styled
const Main = styled.main`
    max-width: 120rem;
    width: 100%;
    margin: 10rem auto 0 auto;
    padding: 0 2rem;
`;

const Layout = ({ children }) => {
    return (
        <>
            <Header />

            <Main>{children}</Main>
        </>
    );
};

export default Layout;
