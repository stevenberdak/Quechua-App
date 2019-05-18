import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import WordSearch from './WordSearch';
import Nav from './Nav';
import News from './News';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: <WordSearch />,
    }

    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    switch(page) {
      case 'tab-b':
        this.setState((state, props) => { return  { content: <News /> }});
        break;
      case 'tab-c':
        this.setState((state, props) => { return  { content: null }});
        break;
      default:
        this.setState((state, props) => { return  { content: <WordSearch /> }});
        break;
    }
  }

  render() {
    return (
      <div id='app'>
        <nav id='nav-bar-container'>
            <Nav callback={ this.setPage } />
        </nav>
        <main id='content-container'>    
            { this.state.content }
        </main>
        <footer>
          
        </footer>
      </div>
    );
  }
}

export default App;
