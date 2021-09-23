 As usual, truth is somewhere in the middle. Projects are extremely different. Small bug in spaceship flight control unit can cost millions of dollars or lives of many people. For a startup in the early stages, wild experiments to get traction are much more valuable than perfection. Often, in one projects we have both extremes and as pragmatic programmers, we should adapt our approach to maximalize benefits.

  

There are a few cases when I see test automation valuable:

- complex logic implementation e.g. mathematical calculations, business logic, regular expressions, dates calculations

- external services or libraries with limited testing possibilities e.g. mocking error or rare responses, checking passed parameters

- features that are hardly accessible, require a lot of time to execute manually e.g. features hidden deep inside the application, rare cronjob events, required complex configuration

  
  

Potentially, all those cases fit into code that we write on a daily basis around the Redux store. Let’s see what and how we can test code using Redux store based on [example project on github](https://github.com/marcin-slezak/redux-lists-with-paginations). In this project we use a basic set of redux tolls ([`reduxjs/toolkit`](https://github.com/reduxjs/redux-toolkit)) and [Jest](https://jestjs.io/) but on a basic level so expert knwoledge is not required to understand the concept. You may notice we use Redux Duck, if you are not familiar with Redux Ducks then probably all you need to know is that it’s a pattern to split Redux store into smaller modules.

  
  
  

Specifically, we want to test [/store/ducks/lists-with-pagination.js](https://github.com/marcin-slezak/redux-lists-with-paginations/blob/master/store/ducks/lists-with-pagination.js). It’s a module responsible for loading different paginated data from a server and keeping them in a store.

  

Redux duck:

```js

import { createSlice, createSelector } from '@reduxjs/toolkit';

const REQUEST_STATUS = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED',
};

  
const addList = (state, action) => {
	const { name, url } = action.payload;

	return 
	{
		...state,
		[name]: {
			data: [],
			page: 0,
			requestStatus: false,
			url,
		}
	}
};

  

const updateListData = (state, action) => {
	const { name, data } = action.payload

	return {
		...state,
		[name]: {
			...state[name],
			data
		}
	}
};

  

const updateListPage = (state, action) => {
	const { name, page } = action.payload
	return {
		...state,
		[name]: {
			...state[name],
			page
		}
	}
};

  

const updateListRequestStatus = (state, action) => {
	const { name, requestStatus } = action.payload
	return {
		...state,
		[name]: {
			...state[name],
			requestStatus
		}
	}
};

  

const getListDataSelector = listName => createSelector(state => state[listName], lists => lists.data);

const listWithPagination = createSlice({
	name: 'lists-with-pagination',
	initialState: {},
	reducers: {	
		addList,
		updateListData,
		updateListPage,
		updateListRequestStatus,
	}
});

  
listWithPagination.REQUEST_STATUS = REQUEST_STATUS;

  
listWithPagination.actions.load = ({ name }) => async (dispatch, getState) => {

	const { url, page} = getState().listWithPagination[name];
	dispatch(listWithPagination.actions.updateListRequestStatus({ name, requestStatus: REQUEST_STATUS.PENDING }));

	try{
		const response = await fetch(url, {method: 'POST', body: {page}});
		const responseData = await response.json();
		dispatch(listWithPagination.actions.updateListData({ name, data: responseData.list }));
		dispatch(listWithPagination.actions.updateListRequestStatus({ name, requestStatus: REQUEST_STATUS.SUCCESS }));
	}catch(e){
		dispatch(listWithPagination.actions.updateListRequestStatus({ name, requestStatus: REQUEST_STATUS.FAILED }));

	}
};

  

listWithPagination.actions.loadNextPage = ({ name }) => async (dispatch, getState) => {

	const nextPage = getState().listWithPagination[name].page + 1;
	dispatch(listWithPagination.actions.updateListPage({ name, page: nextPage}));
	dispatch(listWithPagination.actions.load({ name }));

};

  

export { listWithPagination, getListDataSelector };

```

  

We have 3 options to test this code:

- testing reducers in isolation

- testing action creators in isolation

- testing a working Redux store as a whole

  
  
  

## Testing reducers

Reducer is a pure function that takes as parameter previous state and action definition (that are simple object), returns the next state. Pure function means that returned value always depends only on input parameters, without any side effects like API calls, access to a file system or external context. Additionally, reducers should not mutate the previous state. That makes testing really simple, we just need to execute reducer directly in a test and compare previous and next state. No mocks or advance setup.

  

Function

```js

const updateListPage = (state, action) => {

	const { name, page } = action.payload

	return {
		...state,
		[name]: {
			...state[name],
			page
		}
	}
};

```

  

Test

```js
describe('reducers', () => {

	test('increment page', () => {
		const prevState = {
			listA: {data: [], page: 1},
			listB: {data: [], page: 2}
		};

		const action = {payload: {name: 'listB', page: 3}};

		expect(listWithPagination.caseReducers.updateListPage(prevState, action)).toEqual({
			listA: {data: [], page: 1},
			listB: {data: [], page: 3},
		});
	});
});

```

  

## Testing action creators

We usually extend Redux using middlewares to use asynchronous action creators. One of the most popular is Redux-thunk that allows returning not only an action (that is just a plain object) but also an async function that will be executed by middleware. Action creators are not pure functions as it’s a place where we can make API calls, access file system or dispatch other action creators. To execute a test we have to provide `dispatch` function mock and what return `getState` function - but it’s not so simple as dispatch does a lot under the hood.

  

Function:

```js

	listWithPagination.actions.loadNextPage = ({ name }) => async (dispatch, getState) => {
		const nextPage = getState()[name].page + 1;
		dispatch(listWithPagination.actions.updateListPage({ name, page: nextPage}));
		dispatch(listWithPagination.actions.load({ name }));
};

```

  

Test:

```js

describe('action creators', () => {

	test('load next page', async () => {
	const dispatch = jest.fn();
	const getState = jest.fn().mockReturnValueOnce({listA: {data: [], page: 1}});

	await listWithPagination.actions.loadNextPage({name: 'listA'})(dispatch, getState);

	expect(dispatch.mock.calls.length).toBe(2);

// console.log(dispatch.mock.calls);

// [

// [{ type: 'lists-with-pagination/updateListPage', payload: [Object] }],

// [ [Function: _callee] ]

// ]

});

});

```

  

As you see, we will not figure out easily parameters passed to the second dispatch from a function. You can try ti implement more advance dispatch mock implementattion or use mock alerady created for this purpose: `redux-mock-store`.

  

Test

```js

import configureMockStore from 'redux-mock-store'

import thunk from "redux-thunk";

// ...

test('load next page with mockStore', async () => {

	const serverResponse = {
		list: [1, 2],
	};

	const json = () => Promise.resolve(serverResponse);

	global.fetch = () => Promise.resolve({json})

	const middlewares = [thunk]

	const getMockStore = configureMockStore(middlewares);

	const mockStore = getMockStore({ listA: { data: [], page: 1 } });

	await mockStore.dispatch(listWithPagination.actions.loadNextPage({ name: 'listA' }));

	expect(mockStore.getActions()).toEqual(
		[
			{
				type: 'lists-with-pagination/updateListPage',
				payload: { name: 'listA', page: 2 }
			},
			{
				type: 'lists-with-pagination/updateListRequestStatus',
				payload: { name: 'listA', requestStatus: 'PENDING' }
			},
			{
				type: 'lists-with-pagination/updateListData',
				payload: { name: 'listA', data: [1,2] }
			},
			{
				type: 'lists-with-pagination/updateListRequestStatus',
				payload: { name: 'listA', requestStatus: 'SUCCESS' }
			}
		]
	)
});

```

  

Now we have nice insights to all actions that were created. What’s important, we test only action creators in isolation. Reducers are not executed therefore the new state is not calculated.

  
## Testing whole Redux store

  

Last option is to test the redux store as a whole. It’s not a unit test anymore but integration tests. In one place we can test reducers, action creators and state.

```js

describe('full redux store test', () => {

	test('load next page', async () => {

		const serverResponse = {
			list: [1, 2],
		};

		const json = () => Promise.resolve(serverResponse);

		global.fetch = () => Promise.resolve({ json })

		const store = getStore({ listWithPagination: { listA: { data: [], page: 1 } } });

		await store.dispatch(listWithPagination.actions.loadNextPage({ name: 'listA' }));

		expect(store.getState()).toEqual({
			listWithPagination: {
				listA: {
				data: [1, 2],
				page: 2,
				requestStatus: listWithPagination.REQUEST_STATUS.SUCCESS
			}
		}

		});

	})

})

```

# Summary

  

Each approach has own pros and cons. Reducers testing is valuable if in one reducer state calculations are complex. Action creators testing make sense when we have complex application flow. Testing the whole store allows to validate overall result but we don’t have insights about flow and test quickly became really complex.

  

| Testing | Testing State | Testing flow | Action creators / reducers integration|Test complexity|
| -------------- |---------------| --------------|---------------------------------------|---------------|
| Reducers | yes | no |no |low |
| Action creators| no | yes |no |low |
| Whole store | no | no |yes |high |
