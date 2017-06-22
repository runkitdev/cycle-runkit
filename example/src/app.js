import { div, button, textarea } from '@cycle/dom'
import Embed from '../../src'
import $ from 'xstream'

export function App(sources) {
	const sourceString$ = sources.DOM
		.select('.Source')
		.events('input')
		.map(e => e.target.value)
		.startWith(
`require('left-pad')
log('Hello, ' + process.env.FIRSTNAME + ' ' + process.env.LASTNAME + '!')`
		)

	const preambleString$ = sources.DOM
		.select('.Preamble')
		.events('input')
		.map(e => e.target.value)
		.startWith(`const log = console.log`)

	const evaluate$ = sources.DOM
		.select('.Run')
		.events('click')

	const remove$ = sources.DOM
		.select('.Remove')
		.events('click')

	const add$ = sources.DOM
		.select('.Add')
		.events('click')

	const embed_visible$ = $.merge(
			remove$.map(() => false),
			add$.map(() => true)
		)
		.startWith(true)

	const embed = Embed({
		DOM: sources.DOM,
		props: $.combine(sourceString$, preambleString$)
			.map(([sourceString, preambleString]) => ({
				source: sourceString,
				// readOnly: true,
				// mode: 'endpoint',
				nodeVersion: 7,
				env: ['FIRSTNAME=Haskell', 'LASTNAME=Curry'],
				title: 'Hello',
				minHeight: '200px',
				packageTimestamp: 1451606400000,
				preamble: preambleString
			})),
		evaluate: evaluate$
	})

	embed.onLoad.addListener({ next: console.log })
	embed.onURLChanged.addListener({ next: console.log })
	embed.onEvaluate.addListener({ next: console.log })

	const vtree$ = $.combine(embed.DOM, sourceString$, preambleString$, embed_visible$).map(([
		embed,
		sourceString,
		preambleString,
		embed_visible
	]) => div(embed_visible ? [
		'Source: ', textarea('.Source', sourceString),
		'Preamble: ', textarea('.Preamble', preambleString),
		button('.Run', 'Run'),
		embed,
		button('.Remove', 'Remove')
	] : [
		button('.Add', 'Add')
	]))

	const sinks = {
		DOM: vtree$
	}

	return sinks
}
