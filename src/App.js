import styled, {keyframes} from "styled-components"

const Wrapper = styled.div`
display: flex;
`

const rotateanimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform:rotate(360deg);
    border-radius: 0px;
  }
`

const Emoji = styled.span`
    font-size: 36px;
`

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display:flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateanimation} 1s linear infinite;
  ${Emoji} {
      &:hover {
      font-size: 50px;
    }
  }
  /* & span {
    font-size: 36px;
    color: #fff;
  
    &:hover {
      font-size: 50px;
    }

     
  } */
    
  span:hover {
    color: red;
  }

`

// & 자기 자신을 지목 
// ${} 입력하면 타겟팅 가능, 자식 까지 분류가능하다

// 애니메이션을 적용하려면 keyframes import 해주자

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>해피</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
