
import { useContext, useRef } from 'react';
import styled from 'styled-components'
import { AppContext } from './stateManager/stateManager';

const Gallery = ({ chooseImg }) => {
    const { selected_items } = useContext(AppContext);
    const url = "https://picsum.photos/id"
    return (    
            selected_items.map(item => (
                <Image
                    src={`${url}/${item.id}/${item.width}/${item.height}`}
                    id={item.id}
                    width={item.width}
                    height={item.height}
                    onClick={chooseImg}
                />
            )))}
export default Gallery;

const Image = styled.img`
width: 30vh;
height: 150px;
display: flex;
align-items: center;
justify-content: right;
cursor: pointer;
padding: 2px;
`










