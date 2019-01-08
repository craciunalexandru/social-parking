import styled from 'styled-components';

export const ListItem = styled.div`
    width: 200px;
    height: 50px;
    background-color: #303f9f;
    padding: 5px;
    cursor: pointer;
    margin-left: 5px;
    margin-top: 10px;

    &:hover {
        background-color: #00595a;
    }
`;

export const ListItemText = styled.div`
    top: 5%;
    color: #E8E8EE;
    position: relative;
    font-size: 15px;
    padding: 3px;
    font-family: 'Rubik', sans-serif;
`;

export const ListWrapper = styled.div`
    padding: 20px;
    position: absolute;
`;