import React, { useState } from 'react';
import styled from 'styled-components';

// Material UI
import Search from '@mui/icons-material/Search';

// Styled
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RelativeContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
    width: 100%;
    max-width: 40rem;
`;

const SearchInput = styled.input`
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 3rem;
    width: 100rem;
    outline: none;

    &:focus {
        border: 2px solid black;
    }
`;

const SearchIcon = styled(Search)`
    position: absolute;
    left: 0.5rem;
`;

const SearchBar = ({ onChange }) => {
    // States
    const [text, setText] = useState('');

    const handleChange = e => {
        setText(e.target.value);
        onChange(e.target.value);
    };

    return (
        <InputContainer>
            <RelativeContainer>
                <SearchIcon fontSize='large' />
                <SearchInput type='search' value={text} onChange={handleChange} />
            </RelativeContainer>
        </InputContainer>
    );
};

export default SearchBar;
