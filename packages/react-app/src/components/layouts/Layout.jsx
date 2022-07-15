import React from 'react';

// Components
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header />

            <main>{children}</main>
        </>
    );
};

export default Layout;
