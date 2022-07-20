import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

// Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// Services
import { storeFiles, retrieveFiles } from '../../services/ipfs';

// Components
import Layout from '../layouts/Layout';
import Title from '../ui/Title';
import { Form, Field, InputSubmit } from '../ui/Form';
import { Button } from '../ui/Button';

// Styled
const Image = styled.img`
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;

    @media (min-width: 768px) {
        flex: 1;
        width: 80%;
    }

    &:hover {
        cursor: pointer;
    }
`;

const OptionsTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    column-gap: 3rem;
`;

const OptionsContainer = styled.ul`
    padding: 0;

    li {
        list-style-type: none;
        margin-bottom: 1rem;
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

    .icons {
        display: none;
    }

    &:hover .icons {
        display: flex;
    }
`;

const FooterQuestion = styled.div`
    display: flex;
    justify-content: space-between;
`;

const levels = [
    {
        uid: '1',
        name: 'Basic',
    },
    {
        uid: '2',
        name: 'Intermediate',
    },
    {
        uid: '3',
        name: 'Advanced',
    },
    {
        uid: '4',
        name: 'Expert',
    },
];

const CreateTest = () => {
    // Hook useNavigate
    const navigate = useNavigate();

    // Hook useRef
    const inputFileRef = useRef(null);

    // States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(null);
    const [time, setTime] = useState(30);
    const [file, setFile] = useState(undefined);
    const [questions, setQuestions] = useState([]);
    const [editOption, setEditOption] = useState(null);

    useEffect(() => {
        if (!level) {
            setLevel(levels[0]);
        }

        if (questions.length === 0) {
            addQuestion();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addQuestion = () => {
        const order = questions.length + 1;

        setQuestions([
            ...questions,
            {
                uid: uuidv4(),
                order: order,
                caption: `Question ${order}?`,
                singleAnswer: true,
                options: [
                    {
                        uid: uuidv4(),
                        order: 1,
                        caption: 'Option 1',
                        correct: true,
                    },
                    {
                        uid: uuidv4(),
                        order: 2,
                        caption: 'Option 2',
                    },
                    {
                        uid: uuidv4(),
                        order: 3,
                        caption: 'Option 3',
                    },
                ],
            },
        ]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const test = {
            uid: uuidv4(),
            owner: '',
            title,
            description,
            level: level.uid,
            time,
            questions,
        };

        console.log(test);

        // storeFiles(test);

        navigate('/test-arena');
    };

    const handleChangeLevel = e => {
        const newLevel = levels.find(item => item.uid === e.target.value);
        setLevel(newLevel);
    };

    const handleUploadImage = e => {
        e.preventDefault();
        inputFileRef.current.click();
    };

    const handleChangeImage = e => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleChangeQuestion = e => {
        const questionId = e.target.id.split('#')[1];
        const question = questions.find(item => item.uid === questionId);

        const newQuestion = {
            ...question,
            caption: e.target.value,
        };

        setQuestions([...questions.filter(item => item.uid !== questionId), newQuestion]);
    };

    const handleChangeType = e => {
        const questionId = e.target.id.split('#')[1];
        const question = questions.find(item => item.uid === questionId);

        if (e.target.value === 'single') {
            question.singleAnswer = true;
            delete question.multipleAnswer;

            const correctOptions = question.options.filter(item => item.correct);

            if (correctOptions.length > 1) {
                const correctOptionId = Math.min(...correctOptions.map(item => item.uid));

                question.options = question.options.map(item => {
                    if (item.order !== correctOptionId) {
                        delete item.correct;
                    }

                    return item;
                });
            }
        } else {
            delete question.singleAnswer;
            question.multipleAnswer = true;
        }

        setQuestions([...questions.filter(item => item.uid !== questionId), question]);
    };

    const handleChangeCorrectOption = e => {
        const questionId = e.target.id.split('#')[1];
        const optionId = e.target.id.split('#')[2];
        const question = questions.find(item => item.uid === questionId);
        const option = question.options.find(item => item.uid === optionId);

        if (question.singleAnswer) {
            if (!option.correct) {
                const oldCorrectOption = question.options.find(item => item.correct);
                delete oldCorrectOption.correct;

                option.correct = true;

                question.options = [
                    ...question.options.filter(item => item.uid !== option.uid && item.uid !== oldCorrectOption.uid),
                    option,
                    oldCorrectOption,
                ];
            } else {
                return;
            }
        } else if (question.multipleAnswer) {
            if (option.correct) {
                const correctOptions = question.options.filter(item => item.correct);

                if (correctOptions.length > 1) {
                    delete option.correct;

                    question.options = [...question.options.filter(item => item.uid !== option.uid), option];
                } else {
                    return;
                }
            } else {
                question.options = [
                    ...question.options.filter(item => item.uid !== option.uid),
                    {
                        ...option,
                        correct: true,
                    },
                ];
            }
        } else {
            return;
        }

        setQuestions([...questions.filter(item => item.uid !== questionId), question]);
    };

    const handleChangeOption = e => {
        const questionId = e.target.id.split('#')[1];
        const optionId = e.target.id.split('#')[2];
        const question = questions.find(item => item.uid === questionId);
        const option = question.options.find(item => item.uid === optionId);
        option.option = e.target.value;

        setQuestions([
            ...questions.filter(item => item.uid !== questionId),
            {
                ...question,
                options: [...question.options.filter(item => item.uid !== optionId), option],
            },
        ]);
    };

    const handleKeyDownOption = e => {
        if (e.key === 'Enter') {
            setEditOption(null);
        }
    };

    const handleEditOption = e => {
        const id = e.target.id || e.target.parentElement.id;
        const questionId = id.split('#')[1];
        const optionId = id.split('#')[2];

        setEditOption({
            question: questionId,
            option: optionId,
        });
    };

    const handleDeleteOption = e => {
        const id = e.target.id || e.target.parentElement.id;
        const questionId = id.split('#')[1];
        const optionId = id.split('#')[2];
        const question = questions.find(item => item.uid === questionId);

        if (question.options.length > 2) {
            const option = question.options.find(item => item.uid === optionId);

            if (option.correct && question.options.filter(item => item.correct).length === 1) {
                const newCorrectOption = question.options.filter(item => !item.correct)[0];
                newCorrectOption.correct = true;
                newCorrectOption.order = 1;

                setQuestions([
                    ...questions.filter(item => item.uid !== questionId),
                    {
                        ...question,
                        options: [
                            newCorrectOption,
                            ...question.options
                                .filter(item => item.uid !== optionId && item.uid !== newCorrectOption.uid)
                                .map((item, idx) => ({
                                    ...item,
                                    order: idx + 2,
                                })),
                        ],
                    },
                ]);
            } else {
                setQuestions([
                    ...questions.filter(item => item.uid !== questionId),
                    {
                        ...question,
                        options: question.options
                            .filter(item => item.uid !== optionId)
                            .map((item, idx) => ({
                                ...item,
                                order: idx + 1,
                            })),
                    },
                ]);
            }
        }
    };

    const handleAddOption = e => {
        e.preventDefault();

        const questionId = e.target.id.split('#')[1];
        const question = questions.find(item => item.uid === questionId);

        question.options.push({
            uid: uuidv4(),
            order: question.options.length + 1,
            caption: `Option ${question.options.length + 1}`,
        });

        setQuestions([...questions.filter(item => item.uid !== questionId), question]);
    };

    const handleDeleteQuestion = e => {
        e.preventDefault();

        const questionId = e.target.id.split('#')[1];
        setQuestions(
            questions
                .filter(item => item.uid !== questionId)
                .map((question, idx) => ({
                    ...question,
                    order: idx + 1,
                }))
        );
    };

    const handleAddQuestion = e => {
        e.preventDefault();
        addQuestion();
    };

    return (
        <Layout>
            <Title>Create Test</Title>

            <Form onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <legend>Test Information</legend>

                    <Field>
                        <label htmlFor='title'>Title</label>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            autoComplete='off'
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <label htmlFor='description'>Description</label>
                        <input
                            id='description'
                            type='text'
                            value={description}
                            autoComplete='off'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <label htmlFor='level'>Level</label>
                        <select id='level' value={level ? level.uid : ''} onChange={handleChangeLevel}>
                            {levels.map(item => (
                                <option key={item.uid} value={item.uid}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field>
                        <label htmlFor='time'>Time</label>
                        <input id='time' type='number' value={time} onChange={e => setTime(e.target.value)} />
                    </Field>

                    <Field>
                        <label htmlFor='image'>Image</label>
                        <input
                            id='image'
                            ref={inputFileRef}
                            type='file'
                            accept='image/*'
                            onChange={handleChangeImage}
                            style={{ display: 'none' }}
                        />
                        {file ? (
                            <Image src={URL.createObjectURL(file)} alt='Test Token' onClick={handleUploadImage} />
                        ) : (
                            <Button onClick={handleUploadImage}>Upload Image</Button>
                        )}
                    </Field>
                </fieldset>
                <fieldset>
                    <legend>Questions</legend>

                    {questions
                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                        .map(question => (
                            <fieldset key={question.uid}>
                                <legend>{question.order}</legend>

                                <Field>
                                    <label htmlFor={`question#${question.uid}`}>Question</label>
                                    <input
                                        id={`question#${question.uid}`}
                                        type='text'
                                        value={question.caption}
                                        autoComplete='off'
                                        onChange={handleChangeQuestion}
                                    />
                                </Field>

                                <OptionsTitleContainer>
                                    <p>Options</p>

                                    <div>
                                        <input
                                            id={`single#${question.uid}`}
                                            type='radio'
                                            value='single'
                                            name={`options${question.uid}`}
                                            defaultChecked
                                            onChange={handleChangeType}
                                        />
                                        <label htmlFor={`single#${question.uid}`}>Single Answer</label>
                                    </div>

                                    <div>
                                        <input
                                            id={`multiple#${question.uid}`}
                                            type='radio'
                                            value='multiple'
                                            name={`options${question.uid}`}
                                            onChange={handleChangeType}
                                        />
                                        <label htmlFor={`multiple#${question.uid}`}>Multiple Answer</label>
                                    </div>
                                </OptionsTitleContainer>

                                <OptionsContainer>
                                    {question.options
                                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                                        .map(option => (
                                            <OptionContainer key={option.uid}>
                                                <input
                                                    id={`check#${question.uid}#${option.uid}`}
                                                    type='checkbox'
                                                    checked={Boolean(option.correct)}
                                                    onChange={handleChangeCorrectOption}
                                                />

                                                {editOption &&
                                                editOption.question === question.uid &&
                                                editOption.option === option.uid ? (
                                                    <input
                                                        id={`check#${question.uid}#${option.uid}`}
                                                        type='text'
                                                        value={option.caption}
                                                        onChange={handleChangeOption}
                                                        onKeyDown={handleKeyDownOption}
                                                        onBlur={() => setEditOption(null)}
                                                    />
                                                ) : (
                                                    <label htmlFor={`check#${question.uid}#${option.uid}`}>
                                                        {option.caption}
                                                    </label>
                                                )}

                                                <div className='icons'>
                                                    <EditIcon
                                                        id={`editOption#${question.uid}#${option.uid}`}
                                                        style={{
                                                            fontSize: 20,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={handleEditOption}
                                                    />

                                                    <DeleteRoundedIcon
                                                        id={`deleteOption#${question.uid}#${option.uid}`}
                                                        style={{
                                                            fontSize: 20,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={handleDeleteOption}
                                                    />
                                                </div>
                                            </OptionContainer>
                                        ))}
                                </OptionsContainer>

                                <FooterQuestion>
                                    <Button id={`addOption#${question.uid}`} onClick={handleAddOption}>
                                        Add Option
                                    </Button>
                                    <Button id={`deleteQuestion#${question.uid}`} onClick={handleDeleteQuestion}>
                                        Delete Question
                                    </Button>
                                </FooterQuestion>
                            </fieldset>
                        ))}

                    <Button onClick={handleAddQuestion}>Add Question</Button>
                </fieldset>

                <InputSubmit type='submit' value='Create Test' />
            </Form>
        </Layout>
    );
};

export default CreateTest;
