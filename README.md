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

## Sources

### props

The following parameters are properties on the `props` property of the sources object.

#### source : string

Specify the source code that the notebook will use.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`
    })
})
```

#### readOnly : boolean

If `true`, the user will not be able to edit or run the embed.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`,
        readOnly: true
    })
})
```

#### mode : string

If `'endpoint'`, the notebook will be run as an [endpoint](https://runkit.com/docs/endpoint) and a link to the served page will be shown.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `exports.endpoint = (req, res) => res.end('Hello, world!')`,
        mode: 'endpoint'
    })
})
```

#### nodeVersion : string

Request a version or semver range for the node engine.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`,
        nodeVersion: 7
    })
})
```

#### env : [string]

Provide a list of environment variables accessible in the notebook through `process.env`.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: 'console.log(`Hello, ${ process.env.FIRSTNAME } ${ process.env.LASTNAME }!`',
        env: ['FIRSTNAME=Haskell', 'LASTNAME=Curry']
    })
})
```

#### title : string

Provide a title for the notebook when opened on RunKit.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`,
        title: 'Hello World'
    })
})
```

#### minHeight : string

Provide a minimum height for the embed (`'130px'` by default).

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`,
        minHeight: '200px'
    })
})
```

#### packageTimestamp : number

Specify the Unix time in milliseconds at which packages should resolved. Packages published after the date will be ignored.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `require('babel-core')`,
        packageTimestamp: 1468195200000
    })
})
```

#### preamble : string

Specify source code that is run before the main source. This code will not be shown in the embed.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log(_.map(_.add(1), [1, 2, 3]))`,
        preamble: `const _ = require('lodash/fp')`
    })
})
```

### evaluate : stream ()

Evaluate the notebook.

```js
Embed({
    DOM: sources.DOM,
    props: $.of({
        source: `console.log('Hello, world!')`
    }),
    evaluate: sources.DOM
        .select('.Run')
        .events('click')
})
```

## Sinks

#### onLoad : stream ()

Emits when the embed is loaded.

```js
const embed = Embed({ ... })

embed.onLoad.addListener({
    next() {
        console.log('loaded!')
    }
})
```

#### onURLChanged : stream ()

Emits whenever the embed's URL changes.

```js
const embed = Embed({ ... })

embed.onURLChanged.addListener({
    next() {
        console.log('url changed!')
    }
})
```

#### onEvaluate : stream ()

Emits whenever the embed is evaluated.

```js
const embed = Embed({ ... })

embed.onEvaluate.addListener({
    next() {
        console.log('evaluated!')
    }
})
```

