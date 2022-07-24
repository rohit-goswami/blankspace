import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Services
import { getAllSubmissionsByTest } from '../../services/interface';
import { retrieveFiles } from '../../services/ipfs';

// Components
import Layout from '../layouts/Layout';
import { TableContainer, Table, Column, Cell } from '../ui/Table';
import Title from '../ui/Title';
import { Button } from '../ui/Button';

// Utils
import { getShortFormatAddress } from '../../utils/metamask';

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
                response.map(item => getSubmissionContent(item.account, item.result, item.cidSubmission))
            );
            
            setSubmissions(newSubmissions);

        } catch (error) {
            console.log(error);
        }
    }

    const getSubmissionContent = async (submissionOwner, result, submissionCid) => {
        
        try {

            const submission = await retrieveFiles(submissionCid).then(data => JSON.parse(data));

            submission.result = result;
            submission.date = new Date(submission.date);

            // Hardcoded
            submission.submissionOwner = submissionOwner;
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
                                    <Link to={`/profile/${item.submissionOwner}`} style={{ textDecoration: 'none', color: '#808080' }}>
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
                                    </Link>
                                </Cell>
                                <Cell>{getShortFormatAddress(item.transaction)}</Cell>
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
