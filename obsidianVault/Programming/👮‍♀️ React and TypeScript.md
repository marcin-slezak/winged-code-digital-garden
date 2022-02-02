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


## map/reduce/filter on union type

regarding to https://github.com/microsoft/TypeScript/issues/36390

```ts
const arr: number[] | string[] = [];
// Add as any[]
(arr as any[]).map((a: number | string, index: number) => { 
    return index
});
```


## Object.keys

```ts

enum TasksTypes {
	PHONE_CALL = 'Phone call',
	WRITE_EMAIL = 'Write email',
	MEETING = 'Meeting',
}

(Object.keys(TasksTypes) as Array<keyof typeof TasksTypes>).map(key => {
	// key is keyof TasksTypes
})

```

## Typescript and Yup

```ts
import * as yup from 'yup';

const personSchema = yup.object({
  firstName: yup.string().defined(),
  nickName: yup.string().default('').nullable(),
  sex: yup
    .mixed()
    .oneOf(['male', 'female', 'other'] as const)
    .defined(),
  email: yup.string().nullable().email(),
  birthDate: yup.date().nullable().min(new Date(1900, 0, 1)),
});

interface Person extends yup.InferType<typeof personSchema> {}

const person: Person = await personSchema.validate(req.body.user, {stripUnknown: true}).catch(e => e)

if (person instanceof yup.ValidationError){
    return false;
}
									   
```