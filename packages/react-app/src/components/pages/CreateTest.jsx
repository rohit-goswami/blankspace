import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';


// Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// Components
import Layout from '../layouts/Layout';
import Title from '../ui/Title';
import { Form, Field, InputSubmit } from '../ui/Form';
import { Button } from '../ui/Button';

// Styled
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
        uid: 1,
        name: 'Basic',
    },
    {
        uid: 2,
        name: 'Intermediate',
    },
    {
        uid: 3,
        name: 'Advanced',
    },
    {
        uid: 4,
        name: 'Expert',
    },
];

const CreateTest = () => {
    // Hook useNavigate
    const navigate = useNavigate();

    // States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(null);
    const [time, setTime] = useState(30);
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
                order: order,
                question: `Question ${order}?`,
                singleAnswer: true,
                options: [
                    {
                        order: 1,
                        option: 'Option 1',
                        correct: true,
                    },
                    {
                        order: 2,
                        option: 'Option 2',
                    },
                    {
                        order: 3,
                        option: 'Option 3',
                    },
                ],
            },
        ]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const test = {
            owner: '',
            title,
            description,
            level: level.uid,
            time,
            questions,
        };



        console.log(test);

        navigate('/test-arena');
    };

    const handleChangeLevel = e => {
        const newLevel = levels.find(item => item.uid === parseInt(e.target.value));
        setLevel(newLevel);
    };

    const handleChangeQuestion = e => {
        const order = parseInt(e.target.id.split('#')[1]);
        const question = questions.find(item => item.order === order);

        const newQuestion = {
            ...question,
            question: e.target.value,
        };

        setQuestions([...questions.filter(item => item.order !== order), newQuestion]);
    };

    const handleChangeType = e => {
        const order = parseInt(e.target.id.split('#')[1]);
        const question = questions.find(item => item.order === order);

        if (e.target.value === 'single') {
            question.singleAnswer = true;
            delete question.multipleAnswer;

            const correctOptions = question.options.filter(item => item.correct);

            if (correctOptions.length > 1) {
                const correctOptionOrder = Math.min(...correctOptions.map(item => item.order));

                question.options = question.options.map(item => {
                    if (item.order !== correctOptionOrder) {
                        delete item.correct;
                    }

                    return item;
                });
            }
        } else {
            delete question.singleAnswer;
            question.multipleAnswer = true;
        }

        setQuestions([...questions.filter(item => item.order !== order), question]);
    };

    const handleChangeCorrectOption = e => {
        const orderQuestion = parseInt(e.target.id.split('#')[1]);
        const orderOption = parseInt(e.target.id.split('#')[2]);
        const question = questions.find(item => item.order === orderQuestion);
        const option = question.options.find(item => item.order === orderOption);

        if (question.singleAnswer) {
            if (!option.correct) {
                const oldCorrectOption = question.options.find(item => item.correct);
                delete oldCorrectOption.correct;

                option.correct = true;

                question.options = [
                    ...question.options.filter(
                        item => item.order !== option.order && item.order !== oldCorrectOption.order
                    ),
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

                    question.options = [...question.options.filter(item => item.order !== option.order), option];
                } else {
                    return;
                }
            } else {
                question.options = [
                    ...question.options.filter(item => item.order !== option.order),
                    {
                        ...option,
                        correct: true,
                    },
                ];
            }
        } else {
            return;
        }

        setQuestions([...questions.filter(item => item.order !== orderQuestion), question]);
    };

    const handleChangeOption = e => {
        const orderQuestion = parseInt(e.target.id.split('#')[1]);
        const orderOption = parseInt(e.target.id.split('#')[2]);
        const question = questions.find(item => item.order === orderQuestion);
        const option = question.options.find(item => item.order === orderOption);
        option.option = e.target.value;

        setQuestions([
            ...questions.filter(item => item.order !== orderQuestion),
            {
                ...question,
                options: [...question.options.filter(item => item.order !== orderOption), option],
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
        const orderQuestion = parseInt(id.split('#')[1]);
        const orderOption = parseInt(id.split('#')[2]);

        setEditOption({
            question: orderQuestion,
            option: orderOption,
        });
    };

    const handleDeleteOption = e => {
        const id = e.target.id || e.target.parentElement.id;
        const orderQuestion = parseInt(id.split('#')[1]);
        const orderOption = parseInt(id.split('#')[2]);
        const question = questions.find(item => item.order === orderQuestion);

        if (question.options.length > 2) {
            const option = question.options.find(item => item.order === orderOption);

            if (option.correct && question.options.filter(item => item.correct).length === 1) {
                const newCorrectOption = question.options.filter(item => !item.correct)[0];
                newCorrectOption.correct = true;
                newCorrectOption.order = 1;

                setQuestions([
                    ...questions.filter(item => item.order !== orderQuestion),
                    {
                        ...question,
                        options: [
                            newCorrectOption,
                            ...question.options
                                .filter(item => item.order !== orderOption && item.order !== newCorrectOption.order)
                                .map((item, idx) => ({
                                    ...item,
                                    order: idx + 2,
                                })),
                        ],
                    },
                ]);
            } else {
                setQuestions([
                    ...questions.filter(item => item.order !== orderQuestion),
                    {
                        ...question,
                        options: question.options
                            .filter(item => item.order !== orderOption)
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

        const order = parseInt(e.target.id.split('#')[1]);
        const question = questions.find(item => item.order === order);

        question.options.push({
            order: question.options.length + 1,
            option: `Option ${question.options.length + 1}`,
        });

        setQuestions([...questions.filter(item => item.order !== order), question]);
    };

    const handleDeleteQuestion = e => {
        e.preventDefault();

        const order = parseInt(e.target.id.split('#')[1]);
        setQuestions(
            questions
                .filter(item => item.order !== order)
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
                </fieldset>
                <fieldset>
                    <legend>Questions</legend>

                    {questions
                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                        .map(question => (
                            <fieldset key={question.order}>
                                <legend>{question.order}</legend>

                                <Field>
                                    <label htmlFor={`question#${question.order}`}>Question</label>
                                    <input
                                        id={`question#${question.order}`}
                                        type='text'
                                        value={question.question}
                                        autoComplete='off'
                                        onChange={handleChangeQuestion}
                                    />
                                </Field>

                                <OptionsTitleContainer>
                                    <p>Options</p>

                                    <div>
                                        <input
                                            id={`single#${question.order}`}
                                            type='radio'
                                            value='single'
                                            name={`options${question.order}`}
                                            defaultChecked
                                            onChange={handleChangeType}
                                        />
                                        <label htmlFor={`single#${question.order}`}>Single Answer</label>
                                    </div>

                                    <div>
                                        <input
                                            id={`multiple#${question.order}`}
                                            type='radio'
                                            value='multiple'
                                            name={`options${question.order}`}
                                            onChange={handleChangeType}
                                        />
                                        <label htmlFor={`multiple#${question.order}`}>Multiple Answer</label>
                                    </div>
                                </OptionsTitleContainer>

                                <OptionsContainer>
                                    {question.options
                                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                                        .map(option => (
                                            <OptionContainer key={option.order}>
                                                <input
                                                    id={`check#${question.order}#${option.order}`}
                                                    type='checkbox'
                                                    checked={Boolean(option.correct)}
                                                    onChange={handleChangeCorrectOption}
                                                />

                                                {editOption &&
                                                editOption.question === question.order &&
                                                editOption.option === option.order ? (
                                                    <input
                                                        id={`check#${question.order}#${option.order}`}
                                                        type='text'
                                                        value={option.option}
                                                        onChange={handleChangeOption}
                                                        onKeyDown={handleKeyDownOption}
                                                        onBlur={() => setEditOption(null)}
                                                    />
                                                ) : (
                                                    <label htmlFor={`check#${question.order}#${option.order}`}>
                                                        {option.option}
                                                    </label>
                                                )}

                                                <div className='icons'>
                                                    <EditIcon
                                                        id={`editOption#${question.order}#${option.order}`}
                                                        style={{
                                                            fontSize: 20,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={handleEditOption}
                                                    />

                                                    <DeleteRoundedIcon
                                                        id={`deleteOption#${question.order}#${option.order}`}
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
                                    <Button id={`addOption#${question.order}`} onClick={handleAddOption}>
                                        Add Option
                                    </Button>
                                    <Button id={`deleteQuestion#${question.order}`} onClick={handleDeleteQuestion}>
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
