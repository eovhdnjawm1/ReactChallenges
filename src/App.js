import styled from "styled-components"

const Father = styled.div`
  display:flex;
`

// props
const Box = styled.div`
background-color: ${(props) => props.bgColor};
width: 100px;
height: 100px;
`

// 상속
const SubBox = styled(Box)`
  width:150px;
`

const Circle = styled(Box)`
border-radius: 50px;
`

// 스타일을 활용하고 싶다
//  href 같은것을 쓰고싶다
const Btn = styled.button`
  color: white;
  background-color:tomato;
  border: 0;
  border-radius: 15px;
`

// 
const Input = styled.input.attrs({required: true, minLength:10, placeholder:"text"})`
  background-color: tomato;
`

function App() {
  return (
    <>
    <Father>
      <Box bgColor="teal" />
      <Box bgColor="tomato" />
      <Circle bgColor="tomato" />
      <SubBox bgColor="blue" />

    </Father>
    {/* as 라고하면 a 태그로 쓰고싶다 같은 속성이나 태그 자체를 바꾸고싶을때*/}
        <Btn >Log in</Btn>
        <Btn as="a" href="/">Log in</Btn>
        <Input  />
        <Input  />
        <Input  />
        <Input  />
        <Input  />
        <Input  />
    </>
  );
}

export default App;
