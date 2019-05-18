import React, { Component } from 'react';
import WordCard from './WordCard';
import { data } from './LocalWordStore.js';
import './WordSearch.css';

export default class WordSearch extends Component {

	constructor(props) {
		super(props);

	    this.state = {
	                searchInput: '',
	                searchTime: this.getTime(),
	                words: [] 
	     	};
	    this.handleSearchInput = this.handleSearchInput.bind(this);
    	this.buildWordListComponents = this.buildWordListComponents.bind(this);
    	this.performSearch = this.performSearch.bind(this);
    	this.getTime = this.getTime.bind(this);
    	this.pushWordToCurrentList = this.pushWordToCurrentList.bind(this);
	}


	componentDidMount() {
		this.setInitialState();
	}

	setInitialState() {
		this.setState((state, props) => ({ words: data }) );
	}

	getTime() {
		return new Date().getTime();
	}

	performSearch(searchPhrase) {
		if (searchPhrase.length === 0) {
			this.setState((state, props) => ({ words: data }) );
			return;
		}

		this.setState((state, props) => ({ words: [] }) );

		this.setState((state, props) => { return { searchTime: this.getTime() } }, function() {

					const found = [];
					const timeStamp = this.state.searchTime;

					for (let i in data) {
						if (this.state.searchTime !== timeStamp) {
							break;
						}
						const quechua = data[i].quechua;
						const english = data[i].english;

						const thisRef = this;

						if (this.matchPhrase(searchPhrase, quechua) || this.matchPhrase(searchPhrase, english)) {
							found.push(data[i]);

							this.pushWordToCurrentList(50 * found.length, timeStamp, [...found]);
						}
					}
					});
	}

	pushWordToCurrentList(offset, timeStamp, listSnapshot) {
		let thisThis = this;

		setTimeout(function() {
			if(thisThis.state.searchTime !== timeStamp) {
				return;
			}

			thisThis.setState((state, props) => ({ words: listSnapshot }) );
		}, offset);
	}

	matchPhrase(searchPhrase, matchPhrase) {
		if (matchPhrase.toLowerCase().includes(searchPhrase.toLowerCase())) {
			return true;
		}
	}

	handleSearchInput(event) {
		let searchPhrase = event.target.value;

		this.setState((state, props) => { return { searchInput: searchPhrase }}, 
			() => { this.performSearch(this.state.searchInput) });
	}

	buildWordListComponents(words) {
		if (words.length === 0) {
			return;
		}

		const wordCards = [];

		for (let i in words) {
			wordCards.push(<div key={words[i].quechua}><WordCard word={words[i]} /></div>);
		}


		return(<div>{ wordCards }</div>);
	}

	render() {
		return(
			<div id='word-search-container'>
				<div id='search-bar-outer'>
					<h2 className='word-search-header'>Quechua Word Search</h2>
					<p>Enter the word or phrase you want to search for:</p>
					<div id='search-bar' className="ui fluid icon input">
						<input id='search-input' 
							type='text'
							name='search'
							placeholder='Word or phrase...' 
							value={ this.state.searchTerm } 
							onChange={ this.handleSearchInput } />
						<i className='search icon'></i>
					</div>
				</div>
				<div id='results-list' className='results-list'>
					{ this.buildWordListComponents(this.state.words) }
				</div>
			</div>
			);
	}
}