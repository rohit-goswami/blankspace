import React, { useState } from 'react';

// Components
import Layout from '../layouts/Layout';
import TestArenaBar from '../layouts/TestArenaBar';
import TestArenaList from '../layouts/TestArenaList';

const TestArena = () => {
    // States
    const [search, setSearch] = useState('');

    return (
        <Layout>
            <TestArenaBar onSearch={text => setSearch(text)} />
            <TestArenaList search={search} />
        </Layout>
    );
};

export default TestArena;
