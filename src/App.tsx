import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { minuteState, hourSelector } from './atoms';



function App() {
  // const [minutes, setminutes] = useRecoilState(minuteState)
  // useRecoilState = 읽고 쓰려고할 때 사용 
  // 상태가 업데이트 되면 자동으로 리렌더링

  // useRecoilValue() recoil 상태 값을 반환 / 읽을 수만 있음
  // useSetRecoilState - 읽지않고 업데이트만 할때 사용한다
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  return (


    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input value={hours} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
