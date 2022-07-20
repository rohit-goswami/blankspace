import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Components
import Layout from '../layouts/Layout';
import { TableContainer, Table, Column, Cell } from '../ui/Table';
import Title from '../ui/Title';

// Styled
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.8rem;
    padding: 1rem 0;

    p {
        margin: 0;
    }

    .name {
        font-weight: bold;
    }

    .username {
        font-size: 1.2rem;
    }
`;

const submissions = [
    {
        uid: 1,
        user: 'Adeodatus Jason',
        transaction: '0x9746f6940E2eb28930eFb4CeF49B2d1F2C9C5184',
        date: new Date(2022, 7, 10),
        time: 24,
        score: 7,
    },
    {
        uid: 2,
        user: 'Alla Sibusiso',
        transaction: '0x6563f6940E2eb28930eFb4CeF49B2d1F2C9C5478',
        date: new Date(2022, 7, 11),
        time: 10,
        score: 4,
    },
    {
        uid: 3,
        user: 'Breda Lexy',
        transaction: '0x3549f6940E2eb28930eFb4CeF49B2d1F2C9C6548',
        date: new Date(2022, 7, 10),
        time: 20,
        score: 6,
    },
    {
        uid: 4,
        user: 'Melanija Crescens',
        transaction: '0x6489f6940E2eb28930eFb4CeF49B2d1F2C9C2154',
        date: new Date(2022, 7, 14),
        time: 27,
        score: 8,
    },
    {
        uid: 5,
        user: 'Oddvarr Joel',
        transaction: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C5184',
        date: new Date(2022, 7, 19),
        time: 15,
        score: 10,
    },
];

const Submissions = () => {
    // Hook useParams
    const params = useParams();

    return (
        <Layout>
            <Title>Submissions</Title>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Column scope='col' width='30%'>
                                User
                            </Column>
                            <Column scope='col' width='25%'>
                                Transaction
                            </Column>
                            <Column scope='col' width='15%'>
                                Date
                            </Column>
                            <Column scope='col' width='15%'>
                                Time
                            </Column>
                            <Column scope='col' width='15%'>
                                Score
                            </Column>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(item => (
                            <tr key={item.uid}>
                                <Cell>
                                    <UserContainer>
                                        <AccountCircleIcon
                                            style={{
                                                fontSize: 40,
                                            }}
                                        />

                                        <div>
                                            <p className='name'>{item.user}</p>
                                            <p className='username'>@{item.user.replace(' ', '_')}</p>
                                        </div>
                                    </UserContainer>
                                </Cell>
                                <Cell>
                                    {item.transaction.substring(0, 6)}...
                                    {item.transaction.substring(item.transaction.length - 4)}
                                </Cell>
                                <Cell>{item.date.toLocaleDateString()}</Cell>
                                <Cell>{item.time} min</Cell>
                                <Cell>{item.score}</Cell>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export default Submissions;
