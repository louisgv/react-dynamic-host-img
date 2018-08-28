import React from 'react';

import {
	storiesOf
} from '@storybook/react';

import {
	 action
} from '@storybook/addon-actions';

import styled from 'styled-components';

import DynamicHostImage from './../src';

const StyledDynamicHostImage = styled(DynamicHostImage)`
	background: black;
	padding: 1em;
`

storiesOf('DynamicHostImage', module)
	.add('smaller image load faster', () => (
		<DynamicHostImage name="icon.png" hosts={[
			"https://github.com/goonism/hyperproxy/raw/master/",
			"https://github.com/louisgv/sandbox/raw/master/",
		]} alt="Put something here"/>
	))
	.add('simple image from 2 hosts', () => (
		<DynamicHostImage name="icon.png" hosts={[
			"temporary.com",
			"qwfqf.here",
			"fakeurl.com",
			"https://github.com/louisgv/louisgv.github.io/raw/dev/",
		]} alt="Put something here"/>
	))
