## Functional component props

```tsx
import React from 'react'

type User = {
	firstName: string,
	lastName: string,
	email: string,
	birthDate: Date
}

type UserFormProps = {
	initialValues?: Partial<User>,
	onSubmit?: (user:User) => Promise<boolean>
}

export const UserForm: React.FC<AddPatientFormProps> = ({initialValues, onSubmit}) => {
	// ...
	return (...)
}

```

Please note that *React.FC* adds to type a children props automatically. 


## useState 

```tsx
import react, { useState } from "react"

type MousePosition = {
	x: number | null,
	y: number | null
}


type SomeComponentProps = {}

export const SomeComponent: React.FC<SomeComponentProps> = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({ 
		x: null,
		y: null 
	});

	// ...
	
	return (...)

}
```


## useRef

```tsx
import React, { FunctionComponent, useRef } from "react";

export type AnimatedSvgProps = {}

export const AnimatedSvg: FunctionComponent<AnimatedSvgProps> = () => {
	const divRef = useRef<HTMLDivElement>(null);
	
	// svgRef.current -> RefObject<HTMLDivElement>.current: HTMLDivElement
	
	return (
		<div ref={svgRef}>
			(...)
		</div>
	)
}
```


## React MouseEvent 

```tsx
import react, { MouseEvent } from "react"


type SomeComponentProps = {}

export const SomeComponent: React.FC<SomeComponentProps> = () => {
	
	const onClick = (event: MouseEvent<HTMLButtonElement>) => {
		// ...
	}

	return (<button onClick={onClick}>Click me 🙈 </button>)

}
```

## native MouseEvent 


```tsx
import react, { useEffect } from "react"


type SomeComponentProps = {}

export const SomeComponent: React.FC<SomeComponentProps> = () => {
	
	const updateMousePosition = (ev: MouseEvent): void => {
		// ev.clientX
		// ev.clientY
	};
	
	useEffect(() => {

		window.addEventListener("mousemove", updateMousePosition);
		return () => window.removeEventListener("mousemove", updateMousePosition);

	}, []);

	// ...
	
	return (...)
}
```


## useInterval

```ts
const intervalId: NodeJS.Timer = setInterval(() => {...}, 1000)

```