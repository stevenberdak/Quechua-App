import React, { Component } from 'react';
import './WordCard.css';

class WordCard extends Component {

	constructor(props) {
		super(props);

		this.getMedia = this.getMedia.bind(this);
	}

	getMedia(type, value) {
		return <div></div>
	}

	render() {
		const word = this.props.word;

		return(
				<div className='word-card'>
					<div className='card'>
						<div className='content'>
					  		<h2>{word.quechua}</h2>
					  		<div className='description'>
					    		<p>{word.english}</p>
					  		</div>
						</div>
					</div>
				</div>
		);
	}
}

export default WordCard;