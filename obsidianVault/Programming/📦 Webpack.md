## Basic [webpack](https://webpack.js.org/) setup with typescript and hot reload

### dependecies
`webpack`, `webpack-cli`, `webpack-dev-server`, `typescript`,  `ts-loader`

### wepack.config.js

```js

const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
	static: './dist',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
```

### tsconfig.json

```json
{
	"compilerOptions": {
		"outDir": "./dist/",
		"noImplicitAny": true,
		"module": "es6",
		"target": "es5",
		"jsx": "react",
		"allowJs": true,
		"moduleResolution": "node"
	}
}
```


### dist/index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Winged Code Art</title>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script src="main.js"></script>
	</body>
</html>
```

### npm scripts

```json
{
	"build": "webpack",	
	"start": "webpack serve --open"
}
```