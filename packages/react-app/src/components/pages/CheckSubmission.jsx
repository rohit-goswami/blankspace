import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

// Services
import {
    getSubmissionById,
    getTestById,
    setSubmissionPassed,
    setSubmissionFailed,
    mintSBT
} from '../../services/interface';
import { retrieveFiles } from '../../services/ipfs';

// Components
import Layout from '../layouts/Layout';
import Title from '../ui/Title';
import { Button } from '../ui/Button';

// Styled
const QuestionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin: 0 auto 3rem auto;
    font-size: 2rem;
    max-width: 60rem;
`;

const Caption = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
`;

const OptionsContainer = styled.ul`
    padding: 0;
    margin: 1rem 0;

    li {
        list-style-type: none;
        line-height: 1.2;
        margin-bottom: 0.5rem;
    }

    li:last-of-type {
        margin-bottom: 0;
    }

    input {
        font-size: 1.6rem;
    }
`;

const OptionContainer = styled.li`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding-left: 2.5rem;

    input {
        margin: 0.5rem 0 0;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 1rem;
    max-width: 60rem;
    margin: 0 auto;
`;

const CheckSubmission = () => {

    // Hook useParams
    const { id } = useParams();

    // Hook useNavigate
    const navigate = useNavigate();

    // States
    const [test, setTest] = useState(null);
    const [submission, setSubmission] = useState(null);

    useEffect(() => {

        if (!test && !submission) {
            getSubmission();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSubmission = async () => {

        try {

            // Get the submission from the smart contract
            const submissionResponse = await getSubmissionById(id);

            // Get the content of the submission
            const submissionContent = await retrieveFiles(submissionResponse.cidSubmission);

            // Parse the content of the submission
            const submissionJson = JSON.parse(submissionContent);

            // Setting data of the submission contracte to the submission object
            submissionJson.owner = submissionResponse.account;

            // Get the test from the smart contract
            const testResponse = await getTestById(submissionJson.test);

            // Get the content of the test
            const testContent = await retrieveFiles(testResponse.cidTest);

            // Parse the content of the submission
            const testJson = JSON.parse(testContent);

            // Setting data of the smart contract to the test object
            testJson.cidImage = testResponse.cidImage;
            testJson.sbt = testResponse.sbt;

            setSubmission(submissionJson);
            setTest(testJson);
            
        } catch (error) {
            console.log(error);
        }   
    }

    const handlePassed = async e => {
        
        try {
        
            await setSubmissionPassed(submission.uid);

            await mintSBT(test.sbt, submission.owner, test.cidImage);

            navigate(`/submissions/${test.uid}`);

        } catch (error) {
            console.log(error);
        }
    }

    const handleFailed = async e => {
        
        try {
        
            await setSubmissionFailed(submission.uid);

            navigate(`/submissions/${test.uid}`);
            
        } catch (error) {
            console.log(error);
        }
    }

    const isAnswerChecked = (questionId, optionId) => (
        submission.answers.find(item => item.question === questionId).answers.includes(optionId)
    );

    return (
        <Layout>
            <Title>{test && test.title}</Title>

            <QuestionsContainer>
                {test &&
                    test.questions
                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                        .map(question => (
                            <div key={question.uid}>
                                <Caption>
                                    {question.order} - {question.caption}
                                </Caption>

                                <OptionsContainer>
                                    {question.options
                                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                                        .map(option => (
                                            <OptionContainer key={option.uid}>
                                                <input
                                                    id={`check#${question.uid}#${option.uid}`}
                                                    type='checkbox'
                                                    checked={isAnswerChecked(question.uid, option.uid)}
                                                    readOnly
                                                />

                                                <label htmlFor={`check#${question.uid}#${option.uid}`}>
                                                    {option.caption}
                                                </label>
                                            </OptionContainer>
                                        ))}
                                </OptionsContainer>
                            </div>
                        ))}
            </QuestionsContainer>

            <ButtonsContainer>
                <Button onClick={handlePassed}>Passed</Button>
                <Button onClick={handleFailed}>Failed</Button>
            </ButtonsContainer>
        </Layout>
    );
}
 
export default CheckSubmission;