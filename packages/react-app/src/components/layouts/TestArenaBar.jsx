import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '../ui/Button';
import SearchBar from '../ui/SearchBar';

// Styled
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
`;

const TestArenaBar = ({ onSearch }) => {
    // Hook useNavigate
    const navigate = useNavigate();

    const handleCreateTest = e => {
        e.preventDefault();
        navigate('/create-test');
    };

    return (
        <Container>
            <SearchBar onChange={onSearch} />

            <Button onClick={handleCreateTest}>Create Test</Button>
        </Container>
    );
};

export default TestArenaBar;
