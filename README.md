# cycle-runkit

Cycle.js RunKit Component.

## Install

```sh
$ npm i -S cycle-runkit
```

Add the RunKit embed library to your page:

```html
<head>
    ...
    <script src='https://embed.runkit.com'></script>
    ...
</head>
```

## Usage

```js
const Embed = require('cycle-runkit')

module.exports = function App(sources) {
	const embed = Embed({
		DOM: sources.DOM,
		props: $.of({
			source: `console.log('Hello, world!')`
		})
	})

	return {
		DOM: embed.DOM
	}
}
```
