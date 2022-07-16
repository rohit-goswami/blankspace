import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled
const Container = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    text-align: center;
    padding: 1rem;

    p {
        font-size: 1.4rem;
    }

    &:hover {
        cursor: pointer;
    }
`;

const TestArenaCard = ({ test }) => {
    // Hook useNavigate
    const navigate = useNavigate();

    const handleClick = e => {
        e.preventDefault();
        navigate(`/tests/${test.uid}`);
    };

    return (
        <Container onClick={handleClick}>
            <h2>{test.title}</h2>
            <p>{test.description}</p>
        </Container>
    );
};

export default TestArenaCard;
