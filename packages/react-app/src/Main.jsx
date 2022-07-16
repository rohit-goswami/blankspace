import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import CreateTest from './components/pages/CreateTest';
import Error404 from './components/pages/Error404';
import Home from './components/pages/Home';
import TestArena from './components/pages/TestArena';

const Main = () => {
    return (
        <Routes>
            {/* The Routes decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/test-arena' element={<TestArena />}></Route>
            <Route exact path='/create-test' element={<CreateTest />}></Route>
            <Route path='*' element={<Error404 />}></Route>
        </Routes>
    );
};

export default Main;
