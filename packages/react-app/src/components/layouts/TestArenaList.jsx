import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import TestArenaCard from './TestArenaCard';

// Styled
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;

    @media (min-width: 1250px) {
        padding: 0;
    }
`;

const tests = [
    {
        uid: 1,
        title: 'Solidity Test',
        description: 'This is a Solidity Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 2,
        title: 'Java Test',
        description: 'This is a Java Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 3,
        title: 'HTML Test',
        description: 'This is an HTML Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 4,
        title: 'CSS Test',
        description: 'This is a CSS Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 5,
        title: 'Python Test',
        description: 'This is a Python Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 6,
        title: 'C Test',
        description: 'This is a C Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
    {
        uid: 7,
        title: 'C# Test',
        description: 'This is a C# Test for basic level',
        time: 30,
        question: [
            {
                uid: 1,
                statement: 'What is the first line you have to write in a soldity file',
                options: [
                    {
                        uid: 1,
                        statement: 'pragma solidity ^v;',
                    },
                    {
                        uid: 2,
                        statement: 'import solidity ^v;',
                    },
                    {
                        uid: 3,
                        statement: 'require solidity ^v;',
                    },
                ],
            },
        ],
        answers: [1],
    },
];

const TestArenaList = ({ search }) => {
    // States
    const [testsFilter, setTestsFilter] = useState([]);

    useEffect(() => {
        filterTests();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const filterTests = () => {
        try {
            if (search.trim() === '') {
                setTestsFilter(tests);
            } else {
                const expression = new RegExp(search.trim(), 'i');

                setTestsFilter(
                    tests.filter(
                        test => test.title.search(expression) !== -1 || test.description.search(expression) !== -1
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Container>
                {testsFilter.map(test => (
                    <TestArenaCard key={test.uid} test={test} />
                ))}
            </Container>
        </>
    );
};

export default TestArenaList;
