import { useState } from 'react';
import styled from "styled-components"

const Container = styled.div<ContainerProps>`
	width: 200px;
	height: 200px;
	background-color: ${props => props.bgColor};
	border-radius: 100px;
	border: 1px solid ${props => props.borderColor};
`

const x = (a: number, b: number) => a + b;
// 이렇게 하나씩 설정해야하는 것을

// object shape bgColor는 String 이여야한다.
interface CircleProps {
	bgColor: string;
	// 반드시 넣어줘야하는 require 하지만 옵션으로 넣어주고 싶다.
	borderColor?: string;
	// ? 를 넣으면 없을 수도 있다라는 것
	// string or undefine
	text?: string;
}

interface ContainerProps {
	bgColor: string;
	borderColor: string;

}

// ContainerProps에는 옵션이 아니니까는 ?? bgColor 혹은 "white"를 입력하여 default 컬러를 설정하게 해준다.
// 이것이 optional props 라는 것
// default 값을 다른곳에서도 설정할 수 있다.
function Circle({ bgColor, borderColor, text = "default" }: CircleProps) {
	const [counter, setCounter] = useState(1)
	const [value, setValue] = useState<number | string>(1)
	setCounter(2)
	setValue("hello");

	return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} >
		{text}
	</Container>
	// return <Container bgColor={bgColor} borderColor={borderColor ?? "white"} />

}

export default Circle;

interface PlayerShape {
	name: string;
	age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({ name: "nico", age: 12 })