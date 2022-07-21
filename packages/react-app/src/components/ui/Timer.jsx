import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

// Styled
const AbsoluteContainer = styled.div`
    position: absolute;
    width: 7rem;
    top: 1rem;
    right: 1rem;
`;

const Container = styled.div`
    display: flex;
    font-size: 3rem;
    position: fixed;

    p {
        margin: 0;
    }
`;

const Timer = ({ startTimer, onTimeout }) => {

    // States
    const [time, setTime] = useState(0.1);
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!timeout && time > startTimer * 60) {
            setTimeout(true);
            onTimeout();
        }
    }, [time]);

    return (
        <AbsoluteContainer>
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
        </AbsoluteContainer>
    );
}
 
export default Timer;