import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'styled-components';

export default class InputSubmit extends React.PureComponent {

	static propTypes = {
		name: PropTypes.string.isRequired,
		hosts: PropTypes.array.isRequired,
		alt: PropTypes.string
	}

	static defaultProps = {
		name: "",
		hosts: []
	};

	state = {
		src: ""
	}

	testImage(src, cache) {
		const image = new Image();
		try {
			return new Promise((resolve, reject) => {
				image.onload =()=> resolve(src);

				image.onerror =()=> {
					if (++cache.failure === cache.allowedFailure) {
						reject();
					}
				}
			});
		}
		finally {
			image.src = src;
		}
	}

	componentDidMount() {
		// First Success or Last Failure
		const {hosts, name} = this.props;
		const cache = {
			failure: 0,
			allowedFailure: hosts.length,
		}

		const testPromises = hosts.map(host =>
			this.testImage(`${host}/${name}`, cache)
		)

		Promise.race(testPromises).then((src)=>{
			this.setState({
				src,
			});
		}).catch((err) => {
			this.setState({
				src: '/',
			});
		})
     }


	render() {
		return(
			<img
				src={this.state.src}
				alt={this.props.alt}></img>
		);
	}
}
