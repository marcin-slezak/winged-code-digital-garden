The first month with TypeScript will piss you off. If you enable strict mode, you will spend a lot of time figuring out how to make TypeScript happy, even if you know that code works perfectly fine. Also, reading code will be much harder initially, and you will feel lost with dozens of declared types. 

From my experience, still worth giving a try as I noticed that:
- my code that was written in TypeScript usually works the first time, much less debugging
- once you know how to use React, it's much easier to understand code written by someone else as it requires developers to describe directly aspects that, up to this point, you had to guess/debug in pure JavaScript yourself (more complex object structure, data structure relation between different parts of an application, callbacks params, required or optional parameters)
- it's much easier to review code and spot a part of code that needs to be refactored
- it helps to refactor a code as TS will highlight places where types do not match anymore
- it can be really powerful tool if you use TS on frontent/backnd and keep types declaration for DTO (Data Transfer Object) e.g. by using GraphQL