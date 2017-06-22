const { div } = require('@cycle/dom')
const $ = require('xstream').default

function Embed(sources) {
	let state = null

	const onLoad = $.never()
	const onURLChanged = $.never()
	const onEvaluate = $.never()

	if (sources.hasOwnProperty('evaluate')) {
		sources.evaluate.addListener({
			next() {
				state.embed.evaluate()
			}
		})
	}

	const vt = sources.props.map(props => {
		const { source, preamble } = props

		return (
			div('.Embed', {
				hook: {
					insert(vnode) {
						state = {
							source,
							preamble,
							embed: window.RunKit.createNotebook(
								Object.assign({}, props, {
									element: vnode.elm,
									onLoad: onLoad.shamefullySendNext.bind(onLoad),
									onURLChanged: onURLChanged.shamefullySendNext.bind(onURLChanged),
									onEvaluate: onEvaluate.shamefullySendNext.bind(onEvaluate)
								})
							)
						}
					},
					update() {
						if (source !== state.source) {
							state.source = source
							state.embed.setSource(source)
						}
						if (preamble !== state.preamble) {
							state.preamble = preamble
							state.embed.setPreamble(preamble)
						}
					},
					destroy() {
						state.embed.destroy()
						state = null
					}
				}
			})
		)
	})

	const sinks = {
		DOM: vt,
		onLoad,
		onURLChanged,
		onEvaluate
	}

	return sinks
}

module.exports = Embed
