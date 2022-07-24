import React from 'react';
import styled from '@emotion/styled';

// Components
import Layout from '../layouts/Layout';

// Styled
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 2rem;
`;

const CardContainer = styled.div`
    flex: 0 0 calc(50% - 1rem);
    text-align: center;
    border: .3rem solid white;
    border-radius: .7rem;
    padding: 1rem;
    cursor: pointer;

    p {
        font-size: 3.2rem;
        font-weight: bold;
    }

    img {
        transition: all 0.3s ease-in-out;
    }

    &:hover img {
        transform: scale(1.1);
    }
`;

const Home = () => {
    return (
        <Layout>
            <Container>
                <CardContainer>
                    <img src='/PoM.png' alt='Membership' style={{ width: '100%', borderRadius: '50%' }} />

                    <p>Join blankSpace as a Member</p>
                </CardContainer>

                <CardContainer>
                    <img src='/PoP.png' alt='Partnership' style={{ width: '100%' }} />

                    <p>Join blankSpace as a Partner</p>
                </CardContainer>
            </Container>
        </Layout>
    );
};

export default Home;
