import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import Slider from './Slider'
import { AppContext } from "./stateManager/stateManager"

export const ThemeContext = React.createContext();
let i = 0;
const App = () => {
  const { set_selected_items, selected_items, selected, set_selected, full_data, set_full_data } = useContext(AppContext);
  const [error, set_error] = useState(false);
  const [loading, set_loading] = useState(true);
  const [inHover, setInHover] = useState(false);
  const [getBigData, setGetBigData] = useState(true)

  const getData = () => { // Get 5 items.
    // clearTimeout(timer);
    fetch('http://localhost:4444/get5')
      .then((response) => response.json())
      .then((response) => {

          console.log("****", response)
          set_selected_items(response);
          set_selected(response[0]);
          set_loading(false)
     
      })
      .catch(function (err) {
        alert('error. maybe its because you have to refresh your browser to get more items. for the full error - take a look on your console') 
        console.log(err);  
        set_error(true);
      });
  }
  useEffect(() => {
    console.log("get big data")
    set_loading(true)
    fetch('http://localhost:4444/getall')
      .then((response) => response.json())
      .then((response) => {
        setGetBigData(false);
        getData();
        // set_full_data(response); // big list.
        set_loading(false)
      })
      .catch(function (err) {
        console.log("ERROR: ", err)
        set_error(true);
      });
  }, [getBigData])

  // if (error) {
  //   // clearTimeout(timer);
  //   set_error(false);
  // }
  if (!loading) {
    return (
      <div className="App">
        <Button onClick={getData}>Click here for new 5 items :)</Button>
        <Gallery>
          <Wrapper>
            <ImageBox src={`https://picsum.photos/id/${selected_items[0].id}/${selected_items[0].width}/${selected_items[0].height}`} onMouseEnter={() => setInHover(true)} onMouseLeave={() => setInHover(false)}></ImageBox>
            <AuthorBoxSpacer><AuthorBox hover={inHover}>{selected.author}</AuthorBox></AuthorBoxSpacer>
          </Wrapper>
          <Slider />
        </Gallery>
      </div>
    );
  }
  else { return <h1>loading...</h1> }
}

export default App;

//Styled Components:

const AuthorBoxSpacer = styled.div`
height: 5vh;
`
const Button = styled.button`
background: #5bc0de;
border: 1px solid black;
width: 40vh;
height: 6vh;
border-radius: 50px;
font-size: 3vh;
cursor: pointer;
`
const Img = styled.img.attrs(props => ({
  // width: props.data.width / 50,
  // height: props.data.height / 50
}))``;
const Gallery = styled.div`
width: 150vh;
height: 80vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
// margin-bottom: 10px;
display: flex;
flex-direction: column;
align-items: center;
`
const AuthorBox = styled.div`
overflow: hidden;
margin: 0 auto;
transition: all 0.4s ease-in-out;
background: #5bc0de;
display: flex;
width: 40vh;
align-items: center;
justify-content: center;
height: ${props => props.hover ? '5vh' : '0'}
`
const ImageBox = styled.img`
height: 40vh;
display: flex;
`