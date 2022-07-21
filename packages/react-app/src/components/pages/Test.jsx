import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

// Services
import { retrieveFiles } from '../../services/ipfs';

// Components
import { Form, InputSubmit } from '../ui/Form';
import Layout from '../layouts/Layout';
import Title from '../ui/Title';
import Timer from '../ui/Timer';

// Styled
const QuestionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-bottom: 3rem;
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

const DefaultTest = {
    uid: uuidv4(),
    owner: '',
    title: 'Solidity',
    description: 'Basic Solidity Test',
    level: 1,
    time: 30,
    questions: [
        {
            uid: '1234',
            order: 1,
            question: 'Are semicolons required?',
            singleAnswer: true,
            options: [
                {
                    uid: '6548',
                    order: 1,
                    option: 'Yes',
                    correct: true,
                },
                {
                    uid: '9547',
                    order: 2,
                    option: 'No',
                },
            ],
        },
        {
            uid: '2345',
            order: 2,
            question: 'What is the first line you have to write in a Smart Contract file?',
            singleAnswer: true,
            options: [
                {
                    uid: '5487',
                    order: 1,
                    option: 'import solidity ^0.8.4;',
                },
                {
                    uid: '3269',
                    order: 2,
                    option: 'pragma solidity ^0.8.4;',
                    correct: true,
                },
                {
                    uid: '5555',
                    order: 3,
                    option: 'require solidity ^0.8.4;',
                },
            ],
        },
    ],
};

const Test = () => {
    // Hook useParams
    const params = useParams();

    // States
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        if (!loaded) {
            getTest();
            setLoaded(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTest = async () => {
        try {
            // const cid = 'bafybeihimhu5eub747uqkbjr2z5rdex7qji27i5zhab6sbujbmkhj4fbc4';

            // const response = await retrieveFiles(cid);

            // setTest(JSON.parse(response));

            // console.log(response);

            setTest(DefaultTest);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTimeout = () => {
        setTimeout(true);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (timeout) {
            console.log('Timeout');
            return;
        }

        const submission = {
            owner: '',
            test: test.uid,
            answers,
        };

        console.log(submission);
    };

    const handleChangeCorrectOption = e => {
        const questionId = e.target.id.split('#')[1];
        const optionId = e.target.id.split('#')[2];
        const question = test.questions.find(item => item.uid === questionId);

        if (answers.filter(item => item.question === questionId).length > 0) {
            if (e.target.checked) {
                if (question.singleAnswer) {
                    setAnswers([
                        ...answers.filter(item => item.question !== questionId),
                        {
                            question: questionId,
                            answers: [optionId],
                        },
                    ]);
                } else if (question.multipleAnswer) {
                    setAnswers([
                        ...answers.filter(item => item.question !== questionId),
                        {
                            question: questionId,
                            answers: [...answers.find(item => item.question === questionId).answers, optionId],
                        },
                    ]);
                }
            } else {
                if (question.singleAnswer) {
                    setAnswers(answers.filter(item => item.question !== questionId));
                } else if (question.multipleAnswer) {
                    if (answers.filter(item => item.question === questionId && item.answers.length > 1)) {
                        setAnswers([
                            ...answers.filter(item => item.question !== questionId),
                            {
                                question: questionId,
                                answers: answers
                                    .find(item => item.question === questionId)
                                    .answers.filter(item => item !== optionId),
                            },
                        ]);
                    } else {
                        setAnswers(answers.filter(item => item.question !== questionId));
                    }
                }
            }
        } else {
            setAnswers([
                ...answers,
                {
                    question: questionId,
                    answers: [optionId],
                },
            ]);
        }
    };

    const isOptionChecked = (questionId, optionId) => {
        const question = answers.find(item => item.question === questionId);

        if (question) {
            return question.answers.includes(optionId);
        }

        return false;
    };

    return (
        <Layout>
            <Title>{test && test.title}</Title>

            <Timer
                startTimer={1}
                onTimeout={handleTimeout}
            />

            <Form onSubmit={handleSubmit} noValidate>
                <QuestionsContainer>
                    {test &&
                        test.questions
                            .sort((a, b) => (a.order > b.order ? 1 : -1))
                            .map(question => (
                                <div key={question.uid}>
                                    <Caption>
                                        {question.order} - {question.question}
                                    </Caption>

                                    <OptionsContainer>
                                        {question.options
                                            .sort((a, b) => (a.order > b.order ? 1 : -1))
                                            .map(option => (
                                                <OptionContainer key={option.uid}>
                                                    <input
                                                        id={`check#${question.uid}#${option.uid}`}
                                                        type='checkbox'
                                                        checked={isOptionChecked(question.uid, option.uid)}
                                                        onChange={handleChangeCorrectOption}
                                                    />

                                                    <label htmlFor={`check#${question.uid}#${option.uid}`}>
                                                        {option.option}
                                                    </label>
                                                </OptionContainer>
                                            ))}
                                    </OptionsContainer>
                                </div>
                            ))}
                </QuestionsContainer>

                <InputSubmit type='submit' value='Submit Test' />
            </Form>
        </Layout>
    );
};

export default Test;
