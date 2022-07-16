import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Layout from '../layouts/Layout';
import Title from '../ui/Title';
import { Form, Field, InputSubmit } from '../ui/Form';

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
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [level, setLevel] = useState(null);

    useEffect(() => {
        if (!level) {
            setLevel(levels[0]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/test-arena');
    };

    const handleChangeLevel = e => {
        const newLevel = levels.find(item => item.uid === parseInt(e.target.value));
        setLevel(newLevel);
    };

    return (
        <Layout>
            <Title>Create Test</Title>

            <Form onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <legend>Test Information</legend>

                    <Field>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                    </Field>

                    <Field>
                        <label htmlFor='description'>Description</label>
                        <input
                            id='description'
                            type='text'
                            value={description}
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
                </fieldset>
                <fieldset>
                    <legend>Questions</legend>

                    <Field>
                        <label htmlFor='question'>Question #1</label>
                        <input id='question' type='text' value={question} onChange={e => setQuestion(e.target.value)} />
                    </Field>

                    <Field>
                        <label htmlFor='answer'>Answer #1</label>
                        <input id='answer' type='text' value={answer} onChange={e => setAnswer(e.target.value)} />
                    </Field>
                </fieldset>

                <InputSubmit type='submit' value='Create Test' />
            </Form>
        </Layout>
    );
};

export default CreateTest;
