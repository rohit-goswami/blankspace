import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// Styled
const Container = styled.div`
    display: flex;
    font-size: 3rem;
    position: fixed;
    top: 7rem;
    right: 2rem;
`;

const Timer = ({ startTimer, onTimeout }) => {

    // States
    const [time, setTime] = useState(0.1);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time > startTimer * 60) {
            onTimeout();
        }
    }, [time]);

    return (
        <Container>
            { startTimer * 60 > time ? (
                <>
                    <p>{("0" + Math.floor((startTimer - time / 60) % 60)).slice(-2)}:</p>
                    <p>{("0" + (59 - Math.floor((time) % 60))).slice(-2)}</p>
                </>
            ) : (
                <>
                    <p>{"00"}:</p>
                    <p>{"00"}</p>
                </>
            )}
        </Container>
    );
}
 
export default Timer;