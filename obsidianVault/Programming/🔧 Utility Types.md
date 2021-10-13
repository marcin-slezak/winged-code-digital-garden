Everyone who works with TS should be familiar with utility types that covers the common scenarios:

##  `Partial<Type>` and `Required<Type>`

Make all properties optional or required. *Partial* is perfect to update functions that takes as parameter an object that contains only fields that should be updated. 

```ts

type User = {
	name: string,
	email: string,
	birthDate: Date
}


const updateUser = async (user: Partial<User>): Promise<User> => {
	// ...
}
  

updateUser({birthDate: new Date()})
```



## `Pick<Type, Keys>` and  `Omit<Type, Keys>`

Creating a new type that contains only selected keys or removing selected jeys

```ts

type User = {
	name: string,
	email: string,
	birthDate: Date
	password: string
}

type UserPublic = Pick<User, "name" | "email">


```


## `ReturnType<FunctionType>`

Useful when we can not access to type that is return from a function

```ts
import {useHistory} from 'react-router'


cnst someFunctionThatNeedHistory = (history: ReturnType<typeof useHistory>) => {
	//...
}


const history = useHistory()
someFunctionThatNeedHistory(history)

```

## There is more

The full list of Utility Types are available here:
https://www.typescriptlang.org/docs/handbook/utility-types.html