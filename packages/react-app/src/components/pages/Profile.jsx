import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// Components
import Layout from '../layouts/Layout';
import ProfilePicture from '../ui/ProfilePicture';

// Utils
import { getShortFormatAddress } from '../../utils/metamask';
import { retrieveFiles } from '../../services/ipfs';

// Styled
const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    min-height: 80vh;
`;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex: 0 0 calc(30% - 1rem);
    border: .3rem solid white;
    border-radius: 1rem;
    padding: 1rem;

    p {
        font-size: 1.6rem;

        span {
            font-weight: bold;
        }
    }

    .name {
        font-size: 2.4rem;
        font-weight: bold;
    }

    .address {
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

const OtherInfoContainer = styled.div`
    flex: 0 0 calc(70% - 1rem);
    border: .3rem solid white;
    border-radius: 1rem;
    padding: 1rem;

    .title {
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
`;

const SbtGallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`;

const SbtContainer = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    text-align: center;
    padding: 1rem;

    img {
        border-radius: .7rem;
        width: 100%;
    }
`;

const Profile = () => {

    // Hook useParams
    const { address } = useParams();

    // States
    const [user, setUser] = useState(null);
    const [sbtGallery, setSbtGallery] = useState([]);

    useEffect(() => {

        if (!user) {
            getUserData();
        }

        if (sbtGallery.length === 0) {
            getSbtGallery();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserData = async () => {

        try {

            setUser({
                name: 'Name User',
                intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                status: 'Learning Solidity',
                skills: 'JavaScript, Python'
            });
            
        } catch (error) {
            console.log();
        }
    }

    const getSbtGallery = async () => {

        try {

            const response = [{
                address: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c5166',
                name: 'Solidity Basic',
                cidImage: 'bafybeibtedjwiatmi3ftk23xrtnb67akvcuo6uaij4x5xjj7yrb2nijvou',
                owner: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
                date: new Date(2022, 7, 19)
            }, {
                address: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c4444',
                name: 'NFT Basic',
                cidImage: 'bafybeihvlne4pbxvmvpwi2zeaushifcpcxeccatlhyxbfmitc6pgykkliu',
                owner: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
                date: new Date(2022, 7, 20)
            }, {
                address: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c3333',
                name: 'Solidity Intermediate',
                cidImage: 'bafybeibtedjwiatmi3ftk23xrtnb67akvcuo6uaij4x5xjj7yrb2nijvou',
                owner: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
                date: new Date(2022, 7, 21)
            }, {
                address: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1453',
                name: 'Solidity Advanced',
                cidImage: 'bafybeihvlne4pbxvmvpwi2zeaushifcpcxeccatlhyxbfmitc6pgykkliu',
                owner: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
                date: new Date(2022, 7, 23)
            }];

            const sbts = await Promise.all(response.map(getImage));

            setSbtGallery(sbts);
            
        } catch (error) {
            console.log(error);
        }
    }

    const getImage = async sbt => {
        
        try {

            const image = await retrieveFiles(sbt.cidImage);
            sbt.image = image;

            return sbt

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <ProfileContainer>
                <UserInfoContainer>
                    <div style={{ textAlign: 'center' }}>
                        <ProfilePicture
                            width={200}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p className='name'>{user && user.name}</p>
                        <p className='address'>{getShortFormatAddress(address)}</p>
                    </div>

                    <p>{user && user.intro}</p>
                    <p><span>Status:</span> {user && user.status}</p>
                    <p><span>Top Skills:</span> {user && user.skills}</p>
                </UserInfoContainer>

                <OtherInfoContainer>
                    <p className='title'>SBT Gallery</p>

                    <SbtGallery>
                        { sbtGallery
                            .sort((a, b) => a.date < b.date ? 1 : -1)
                            .map(sbt => (
                                <SbtContainer key={sbt.address}>
                                    <img src='/logo.svg' alt='SBT' />
                                    <p style={{ fontWeight: 'bold', marginTop: '1rem', fontSize: '1.8rem' }}>{sbt.name}</p>
                                    <p style={{ fontSize: '1.4rem' }}>{getShortFormatAddress(sbt.owner)}</p>
                                </SbtContainer>
                            ))
                        }
                    </SbtGallery>
                </OtherInfoContainer>
            </ProfileContainer>
        </Layout>
    );
}
 
export default Profile;