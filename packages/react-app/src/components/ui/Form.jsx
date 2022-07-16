import styled from '@emotion/styled';

export const Form = styled.form`
    max-width: 600px;
    width: 95%auto;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Field = styled.div`
    display: block;
    margin-bottom: 2rem;
    align-items: center;

    @media (min-width: 768px) {
        display: flex;
    }

    label {
        display: block;
        font-size: 1.8rem;

        @media (min-width: 768px) {
            flex: 0 0 110px;
        }
    }

    input,
    textarea,
    select {
        padding: 1rem;
        width: 100%;

        @media (min-width: 768px) {
            flex: 1;
            width: 80%;
        }
    }

    textarea {
        height: 400px;
    }
`;

export const InputSubmit = styled.input`
    background-color: white;
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: black;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: 3px solid white;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;
