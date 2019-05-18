import React, { Component } from 'react';

export default class News extends Component {

	render() {
		return(
			<div>
			<h2>News</h2>
			<h2>{ process.env.REACT_APP_GOOGLE_NEWS_API }</h2>
			</div>
			);
	}
}