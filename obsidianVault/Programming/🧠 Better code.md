## Unnecessery if..else block
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


