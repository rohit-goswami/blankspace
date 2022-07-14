import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Error404 from './components/pages/Error404';
import Home from './components/pages/Home';

const Main = () => {
    return (
        <Routes>
            {/* The Routes decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Home />}></Route>
            <Route path='*' element={<Error404 />}></Route>
        </Routes>
    );
};

export default Main;
