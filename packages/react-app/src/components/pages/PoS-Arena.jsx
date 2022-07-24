import React, { useState } from 'react';

// Components
import Layout from '../layouts/Layout';
import TestArenaBar from '../layouts/TestArenaBar';
import TestList from '../layouts/TestList';

const PoSArena = () => {
    // States
    const [search, setSearch] = useState('');

    return (
        <Layout>
            <TestArenaBar onSearch={text => setSearch(text)} />
            <TestList search={search} />
        </Layout>
    );
};

export default PoSArena;
