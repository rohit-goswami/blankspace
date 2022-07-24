import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Material UI
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// Styled
const PageContainer = styled.div`
    max-width: 130rem;
    padding: 1rem 3rem;
    margin: 0 auto;

    p {
        color: white;
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconsContainer = styled.div`
    display: flex;
    column-gap: 3rem;
`;

const DescriptionContainer = styled.div`
    display: flex;
    margin-top: 5rem;
`;

const WhitePaperButton = styled.button`
    background-color: rgba(244, 73, 244, 1);
    border: none;
    border-radius: .6rem;
    padding: 2rem 4.5rem;
    color: white;
    font-size: 2.4rem;
    margin-top: 9rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    -webkit-box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.4);
    -moz-box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.4);
    box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.4);

    &:hover {
        transform: scale(1.1);
    }
`;

const GalaxyGallery = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const GalaxyContainer = styled.div`
    width: 32rem;
    height: 15rem;
    border-radius: .7rem;

    p {
        font-size: 2.4rem;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: .6rem;
        margin-top: 1rem;
    }

    img {
        transition: all 0.3s ease-in-out;
    }

    img:hover {
        transform: ${props => props.enable ? 'scale(1.1)' : 'inherit'};
    }
`;

const LandingPage = () => {
    return (
        <div style={{ background: 'radial-gradient(60% 106% at 34.94% 108.33%, #FDCBD1 0%, #7758D1 100%)' }}>
            <PageContainer>
                <Header>
                    <p style={{ fontSize: '3.4rem' }}>blankSpace</p>

                    <IconsContainer>
                        <a href='https://twitter.com/blankspace_pro' target='_blank'>
                            <TwitterIcon
                                style={{
                                    fontSize: 30,
                                    color: 'white'
                                }}
                            />
                        </a>
                        <img src='/discord-svgrepo-com.svg' alt='Discord' width={30} />
                        <YouTubeIcon
                            style={{
                                fontSize: 30,
                                color: 'white'
                            }}
                        />
                    </IconsContainer>
                </Header>

                <main>
                    <DescriptionContainer>
                        <div style={{ flex: '1', marginTop: '6rem' }}>
                            <p style={{ fontSize: '3.6rem' }}>The DeSoC of Professionals</p>
                            <p style={{ fontSize: '2.4rem', marginTop: '6rem', lineHeight: '1.2' }}>
                                We at blankSpace aims to bridge the gap between skilled people and the organizations. Leveraging Ethereum, Polygon, IPFS technology to decentraliz the way we connect in professional world today
                            </p>
                            <WhitePaperButton>Whitepaper</WhitePaperButton>
                        </div>

                        <div style={{ flex: '0 0 50rem', width: '60rem', height: '48rem', overflow: 'hidden' }}>
                            <img src='/BlankSpace-Lab.svg' alt='BlankSpace Lab' style={{ width: '95rem', height: '68rem', margin: '-15rem 0 0 -25rem' }}/>
                        </div>
                    </DescriptionContainer>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '3.2rem', color: '#5B047B' }}>blankSpace Galaxy</p>

                        <GalaxyGallery>
                            <GalaxyContainer enable>
                                <Link to='/test-arena' target='_blank'>
                                    <img src='/PoS-Arena Galaxy.svg' alt='PoS Arena' />
                                </Link>

                                <div>
                                    <CheckCircleIcon
                                        style={{
                                            fontSize: 30,
                                            color: 'white'
                                        }}
                                    />
                                    <p>Live Now</p>
                                </div>
                            </GalaxyContainer>

                            <GalaxyContainer>
                                <img src='/Marketplace Galaxy.svg' alt='Marketplace' />

                                <div>
                                    <AccessTimeFilledIcon
                                        style={{
                                            fontSize: 30,
                                            color: 'white'
                                        }}
                                    />
                                    <p>Coming soon</p>
                                </div>
                            </GalaxyContainer>

                            <GalaxyContainer>
                                <img src='/Pro-DeSoc Galaxy.svg' alt='Pro DeSoc' />

                                <div>
                                    <AccessTimeFilledIcon
                                        style={{
                                            fontSize: 30,
                                            color: 'white'
                                        }}
                                    />
                                    <p>Coming soon</p>
                                </div>
                            </GalaxyContainer>
                        </GalaxyGallery>
                    </div>

                    <div style={{ marginTop: '8rem', borderTop: '.4rem solid #B9AFAF' }}>
                        {/* <div style={{ width: '100%', overflow: 'hidden' }}>
                            <img src='/BlankSpace-Roadmap.svg' alt='Roadmap' style={{ width: '120%', margin: '-7rem 0 0 -10rem' }}/>
                        </div> */}

                        {/* <img src='/BlankSpace-Roadmap.png' alt='Roadmap' style={{ width: '120%' }}/> */}

                        <img src='/BlankSpace-Roadmap.svg' alt='Roadmap' style={{ width: '100%' }}/>
                    </div>
                </main>

                <footer style={{ textAlign: 'center' }}>
                    <p style={{ color: 'black', fontSize: '1.8rem' }}>&copy; 2022 blankSapce | Disclaimer | Privacy</p>
                </footer>
            </PageContainer>
        </div>
    );
}
 
export default LandingPage;