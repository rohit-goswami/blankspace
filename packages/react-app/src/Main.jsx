import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import CheckSubmission from './components/pages/CheckSubmission';
import CreateTest from './components/pages/CreateTest';
import Error404 from './components/pages/Error404';
import Home from './components/pages/Home';
import LandingPage from './components/pages/LandingPage';
import Profile from './components/pages/Profile';
import Submissions from './components/pages/Submissions';
import Test from './components/pages/Test';
import TestArena from './components/pages/TestArena';

const Main = () => {
    return (
        <Routes>
            {/* The Routes decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<LandingPage />}></Route>
            <Route exact path='/check-submission/:id' element={<CheckSubmission />}></Route>
            <Route exact path='/create-test' element={<CreateTest />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/profile/:address' element={<Profile />}></Route>
            <Route exact path='/submissions/:id' element={<Submissions />}></Route>
            <Route exact path='/test/:id' element={<Test />}></Route>
            <Route exact path='/test-arena' element={<TestArena />}></Route>
            <Route path='*' element={<Error404 />}></Route>
        </Routes>
    );
};

export default Main;
