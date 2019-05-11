import React, { Component } from 'react';
import './App.css';
import { data } from './LocalWordStore.js';
import 'semantic-ui-css/semantic.min.css';
import flagLogo from './images/peru_flag.png';
import WordCard from './WordCard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
                searchInput: '',
                words: [] };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.buildWordListComponents = this.buildWordListComponents.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
  }

  setInitialState() {
    this.setState({words: data});
  }

  performSearch(searchPhrase) {
    if (searchPhrase.length === 0) {
      this.setState({words: data});
      return;
    }

    const results = [];

    for (let i in data) {
      const quechua = data[i].quechua;
      const english = data[i].english;

      if (this.matchPhrase(searchPhrase, quechua) || this.matchPhrase(searchPhrase, english)) {
        results.push(data[i]);
      }
    }

    this.setState({words: results});
  }

  matchPhrase(searchPhrase, matchPhrase) {
    if (matchPhrase.toLowerCase().includes(searchPhrase.toLowerCase())) {
      return true;
    }
  }

  handleSearchInput(event) {
    const search = event.target.value;

    this.setState({searchInput: search}, () => { this.performSearch(search) });
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
    return (
      <div id='app'>
        <nav id='nav-bar'>
          <div id='nav-bar-top'>
            <div id='nav-bar-top-inner'>
              <h1>Quechua Word Translator</h1>
            </div>
          </div>
          <div id='nav-bar-inner'>
            <img id='peru-coat-of-arms' src={ flagLogo } alt='Peru coat of arms'/>
              <div id='search-bar-outer'>
                <div id='search-bar' className="ui fluid icon input">
                 <input id='search-input' 
                        type='text'
                        name='search'
                        placeholder='Enter search term...' 
                        value={this.state.searchTerm} 
                        onChange={this.handleSearchInput} />
                <i className="search icon"></i>
              </div>
            </div>  
          </div>
        </nav>    
        <main>    
          <div id='content-outer'>
            <div id='results-list' className='results-list'>
              { this.buildWordListComponents(this.state.words) }
            </div>
          </div>
        </main>
        <footer>
          
        </footer>
      </div>
    );
  }
}

export default App;
