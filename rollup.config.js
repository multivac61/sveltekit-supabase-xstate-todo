import replace from '@rollup/plugin-replace'

replace({
	'process.env.NODE_ENV': process.env.NODE_ENV,
})