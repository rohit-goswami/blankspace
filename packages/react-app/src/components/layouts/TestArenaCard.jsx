import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import { Button } from '../ui/Button';

// Styled
const Container = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    text-align: center;
    padding: 1rem;
    position: relative;

    img {
        border-radius: 50%;
        margin: 1rem 0;
    }

    .title {
        margin: 1rem 0;
        font-size: 2.8rem;
        font-weight: 700;
    }

    .description {
        font-size: 1.4rem;
        margin: 1rem 0;
    }

    .time {
        position: absolute;
        top: -1rem;
        right: 0.5rem;
        font-size: 1.2rem;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    column-gap: 1rem;
    margin-top: 3rem;
    justify-content: center;
`;

const TestArenaCard = ({ test }) => {
    return (
        <Container>
            <img src='./logo.svg' alt='' width={60} />
            <p className='title'>{test.title}</p>
            <p className='description'>{test.description}</p>
            <p className='time'>{test.minutes} min</p>

            <ButtonsContainer>
                <Link to={`/test/${test.uid}`}>
                    <Button>Start</Button>
                </Link>
                <Link to={`/submissions/${test.uid}`}>
                    <Button>Submissions</Button>
                </Link> 
            </ButtonsContainer>
        </Container>
    );
};

export default TestArenaCard;
