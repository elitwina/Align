import { useContext, useRef, useState } from 'react';
import styled from 'styled-components'
import { AppContext } from './stateManager/stateManager';
import Gallery from './Gallery'
function Slider() {

  const { selected_items, set_selected_items, set_selected } = useContext(AppContext);
  const [minusShow, setMinusShow] = useState(false);
  const [plusShow, setPlusShow] = useState(true);
  const imageswrapper = useRef();

  const chooseImg = (event) => {
    let item_id = event.target.id;
    let index = idToindex(item_id);
    let array = [...selected_items];
    let item = selected_items[index];
    set_selected(item);
    let removed = array.splice(index, 1)
    array.unshift(item)
    set_selected_items([...array]);
  }
  const idToindex = (id) => {
    for (let i = 0; i < 5; i++) {
      if (selected_items[i].id === id) { return i }
    }
  }
  const ScrollGallery = (num) => {
    imageswrapper.current.scrollLeft += num;
    setPlusShow(imageswrapper.current.scrollLeft < 434);
    setMinusShow(imageswrapper.current.scrollLeft > 0);
    // console.log(ScrollPosition)
  }
  if (selected_items) {
    return (
      <Wrapper>
        <Arrow onClick={() => ScrollGallery(-220)} show={minusShow}>⇦</Arrow>
        <ImagesWrapper ref={imageswrapper}>
          <Gallery chooseImg={chooseImg} />
        </ImagesWrapper>
        <Arrow onClick={() => ScrollGallery(220)} show={plusShow} >⇨</Arrow>




      </Wrapper>
    );
  }
  else {
    return <h1>nothing</h1>
  }
}
export default Slider;


const Wrapper = styled.div`
display: flex;
width: 150vh
align-items: center;
`

const ImagesWrapper = styled.div`
width: 90vh;
display: flex;
overflow-x: scroll;
overflow: hidden;
align-items: center;
`
const Arrow = styled.div`
width: 25vh;
height: 150px;
align-items: center;
justify-content: center;
font-size: 10vh;
background: #5bc0de;
display: flex;
margin: 10px;
cursor: pointer;
border-radius: 50px;
opacity: ${props => props.show ? '1' : '0.2'}

`


const ImgBox = styled.img`
width: 30vh;
height: 150px;
display: flex;
align-items: center;
justify-content: right;
cursor: pointer;
padding: 2px;


`

