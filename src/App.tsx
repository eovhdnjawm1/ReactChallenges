import { useRecoilState } from 'recoil';
import { minuteState } from './atoms';


function App() {
  const [minutes, setminutes] = useRecoilState(minuteState)
  // useRecoilState = 읽고 쓰려고할 때 사용 
  // 상태가 업데이트 되면 자동으로 리렌더링

  // useRecoilValue() recoil 상태 값을 반환 / 읽을 수만 있음
  // useSetRecoilState - 읽지않고 업데이트만 할때 사용한다

  return (
    <>
      <input type="number" placeholder='Minutes'></input>
      <input type="number" placeholder='Minutes'></input>
    </>
  );
}

export default App;
