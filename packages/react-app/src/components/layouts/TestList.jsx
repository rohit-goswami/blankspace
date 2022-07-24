import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Services
import { getAllTests } from '../../services/interface';
import { retrieveFiles } from '../../services/ipfs';

// Components
import TestCard from './TestCard';

// Styled
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`;

const testsInit = [
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

const TestList = ({ search }) => {

    // States
    const [tests, setTests] = useState([]);
    const [testsFilter, setTestsFilter] = useState([]);

    useEffect(() => {

        if (tests.length === 0) {
            getTests();
        } else {
            filterTests(tests);
        }
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const getTests = async () => {

        try {
            
            const response = await getAllTests();

            console.log(response);
            
            const newTests = await Promise.all(
                response.map(item => getTestContent(item.cidTest, item.cidImage))
            );

            setTests(newTests);
            filterTests(newTests);

        } catch (error) {
            console.log(error);
        }
    }

    const getTestContent = async (testCid, imageCid) => {
        
        try {

            const testContent = await retrieveFiles(testCid).then(data => JSON.parse(data));

            testContent.cid = testCid;
            testContent.imageCid = imageCid;

            return testContent;

        } catch (error) {
            console.log(error);
        }
    }

    const filterTests = testsSearch => {
        try {
            if (search.trim() === '') {
                setTestsFilter(testsSearch);
            } else {
                const expression = new RegExp(search.trim(), 'i');

                setTestsFilter(
                    testsSearch.filter(
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
                    <TestCard key={test.uid} test={test} />
                ))}
            </Container>
        </>
    );
};

export default TestList;
