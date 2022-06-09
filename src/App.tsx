import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("")
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 기본 event의 타입은 any... js가 쓰는것
    // React 는 InputElement에서 실행될거라고 설정
    event.preventDefault();
    const { currentTarget: { value }, } = event;
    setUsername(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 해당 이벤트가 어떤 태그에 이용될 것 인지에대해서도 보호를 받을 수 있음

    event.preventDefault();
    // 해당 코드는 form에서만 쓸 수 잇으므로 위에서 보호받지않고 해당 코드를 다른 태그에서
    // 사용하게된다면.. 에러가 안뜬다.. 그냥 처음부터 찾아야한다.

    console.log("hello", username);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={username} onChange={onChange} type="text" placeholder='username' />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
