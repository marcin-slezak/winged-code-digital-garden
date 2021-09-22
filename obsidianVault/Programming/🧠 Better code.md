## External resources

- [Clean Code: Smells and Heuristics](https://moderatemisbehaviour.github.io/clean-code-smells-and-heuristics/)

## Code examples
### Unnecessery if..else block
bad:
```js
const isUserValid = user => {
	if(user.name && user.active && user.email){
		return true;
	}else{
		return false;
	}
}
```

better:
```js
const isUserValid = user => user.name && user.active && user.email;
```


