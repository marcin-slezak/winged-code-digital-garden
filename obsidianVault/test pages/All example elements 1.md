# Head 1
## Head 2
### Head 3
#### Head 4
##### Head 5
###### Head 6

List of elements
- one
- two
- three
	* three and one
	* three and two
- four

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ipsum orci, eu porttitor odio luctus sed. Phasellus quis orci enim. Nam at iaculis eros. Integer quis pretium purus. Fusce non nunc vitae orci finibus tempor in ut massa. Fusce pellentesque sapien consectetur turpis euismod, et lobortis mauris posuere. Etiam porta elementum tincidunt. Vivamus et ornare ipsum, at dapibus ante. Curabitur urna erat, feugiat eget ex sit amet, egestas congue nisi. Sed laoreet metus nec odio elementum, eget facilisis enim auctor. Mauris velit libero, euismod non sapien vitae, rutrum finibus nisi. Nullam eu metus in mi mollis vulputate quis sit amet augue. Sed nec aliquet metus, eu egestas erat. Maecenas at nisi vulputate tortor facilisis elementum ut in ex. Maecenas nec rutrum ipsum, ac rhoncus mi.


*This text will be italic*

**This text will be bold**


a ~~strikethrough~~ element

this is :smile: smile emoji

Ordered list


1. Item 1
2. Item 2
3. Item 3

Tasks list


- [x] checked list item
- [ ] unchecked list item

Nested blocks


1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.


link to external page (just typed http...)

 http://www.google.com/

standard markdown link:

[Get Showdown!](https://github.com/showdownjs/showdown)

Tables:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |


Some text as md:

```md
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales ipsum orci, eu porttitor odio luctus sed. 

Phasellus quis orci enim. Nam at iaculis eros. Integer quis pretium purus. 
```


here is some html:

```html
<div class="some-class">
	<h1>Header</h1>
	<p>paragraph</p>
</div>
```

here is some TypeScript:

```ts

export type UserInput = {
	firstName: string
	lastName: string
	emai: string
	age?: number
}

export type User = User & {
	id: string
}

export const addUser(user:UserInput): Promise<User> = {
	// ...
}

```


Link to local svg:

![[undraw_Gardening_eaf3.svg]]

Link to local png:

![[Pasted image 20210908182236.png]]


Link to other page in the garden

[[What is digital garden]]

[[Some file in ts folder]]


x in root

[[x]]


x in ts folder

[[test pages/TS/x]]