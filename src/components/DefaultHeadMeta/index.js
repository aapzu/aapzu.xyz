import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const DefaultHeadMeta = (props) => (
	<div hidden>
		<Helmet
			title="aapzu.xyz"
			meta={ [
				{
					name: 'generator',
					content: `${process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
				},
				...props.meta ? props.meta : [],
			] }
			script={[
				{
					src: 'https://cdn.polyfill.io/v2/polyfill.min.js'
				},
				...props.scripts ? props.scripts : [],
			]}
		/>
		
		<Helmet
			meta={ [{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			}] }
		/>
		<style>{`
			@-ms-viewport {
				width: device-width;
			}
			#phenomic {
				width: 100%;
				height: 100%;
			}
		`}</style>
		<link rel='icon' href='img/favicon.ico'/>
	</div>
)

const {arrayOf, object} = PropTypes

DefaultHeadMeta.propTypes = {
	meta: arrayOf(object),
	scripts: arrayOf(object),
}

DefaultHeadMeta.contextTypes = {
	metadata: object.isRequired,
}

export default DefaultHeadMeta
