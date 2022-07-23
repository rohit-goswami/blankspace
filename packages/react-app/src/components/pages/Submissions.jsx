import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Services
import { getAllSubmissionsByTest, setSubmissionFailed } from '../../services/interface';
import { retrieveFiles } from '../../services/ipfs';

// Components
import Layout from '../layouts/Layout';
import { TableContainer, Table, Column, Cell } from '../ui/Table';
import Title from '../ui/Title';
import { Button } from '../ui/Button';

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

const submissionsDefault = [
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
    const { id } = useParams();

    // States
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {

        if (submissions.length === 0) {
            getSubmissions();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSubmissions = async () => {

        try {

            const response = await getAllSubmissionsByTest(id);

            const newSubmissions = await Promise.all(
                response.map(item => getSubmissionContent(item.cidSubmission, item.result))
            );
            
            setSubmissions(newSubmissions);

        } catch (error) {
            console.log(error);
        }
    }

    const getSubmissionContent = async (submissionCid, result) => {
        
        try {

            const submission = await retrieveFiles(submissionCid).then(data => JSON.parse(data));

            submission.result = result;
            submission.date = new Date(submission.date);

            // Hardcoded
            submission.user = 'Todo Name';
            submission.username = 'Todo Username';
            submission.transaction = 'Todo Transaction';

            return submission;
            
        } catch (error) {
            console.log(error);
        }
    }

    const getTimeText = seconds => {
        return seconds && `${("0" + Math.floor(seconds / 60)).slice(-2)} min ${("0" + Math.floor(seconds % 60)).slice(-2)} sec`;
    }

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
                        {submissions
                            .sort((a, b) => (a.date < b.date ? 1 : -1))
                            .map(item => (
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
                                <Cell>{getTimeText(item.seconds)}</Cell>
                                <Cell>
                                    { item.result === 0 ? (
                                        <Link to={`/check-submission/${item.uid}`}>
                                            <Button>Check</Button>
                                        </Link>
                                    ) : item.result === 1 ? (
                                        <p style={{ color: 'var(--correct)'}}>PASSED</p>
                                    ) : (
                                        <p style={{ color: 'var(--wrong)'}}>FAILED</p>
                                    )}
                                </Cell>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export default Submissions;
