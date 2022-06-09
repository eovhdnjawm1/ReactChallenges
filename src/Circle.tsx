import styled from "styled-components"

const Container = styled.div<ContainerProps>`
	width: 200px;
	height: 200px;
	background-color: ${props => props.bgColor};
	border-radius: 100px;
`

const x = (a: number, b: number) => a + b;
// 이렇게 하나씩 설정해야하는 것을

// object shape bgColor는 String 이여야한다.
interface CircleProps {
	bgColor: string;
}

interface ContainerProps {
	bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
	return <Container bgColor={bgColor} />

}

export default Circle;

interface PlayerShape {
	name: string;
	age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({ name: "nico", age: 12 })
sayHello({ name: "Hi", age: 12, hello: 1 })