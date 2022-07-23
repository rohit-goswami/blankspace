import styled from '@emotion/styled';

export const TableContainer = styled.div`
    overflow: hidden;
    overflow-x: auto;
    clear: both;
    width: 100%;
    padding: 1rem 0;
`;

export const Table = styled.table`
    margin: 0 auto;
    color: black;
    border-collapse: collapse;
    width: 100%;
    background: white;
    border-radius: 1rem;
    overflow: hidden;

    thead tr {
        height: 6rem;
        background: #36304a;
    }

    thead th {
        font-size: 1.8rem;
        color: #fff;
        line-height: 1.2;
        font-weight: unset;
    }

    td,
    th {
        text-align: left;
        padding-left: 0.8rem;
    }

    td:nth-of-type(1),
    th:nth-of-type(1) {
        padding-left: 4rem;
    }

    tbody tr {
        font-size: 1.5rem;
        color: #808080;
        line-height: 1.2;
        font-weight: unset;
        height: 5rem;
    }

    tbody tr:nth-of-type(even) {
        background-color: #f5f5f5;
    }
`;

export const Column = styled.th`
    width: ${props => props.width};
`;

export const Cell = styled.td`
    text-align: ${props => props.textAlign};
    border-top: ${props => props.borderTop || 'inherit'};
    border-bottom: ${props => props.borderBottom || 'inherit'};
`;
