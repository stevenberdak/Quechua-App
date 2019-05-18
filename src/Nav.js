import React, { Component } from 'react';
import peruFlag from './images/peru_flag.png';
import './Nav.css';

export default class Nav extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'tab-a',
			callback: props.callback,
		}
		this.setActive = this.setActive.bind(this);
	}

	componentDidMount() {
		this.setState((state, props) => { return { activeTab: 'tab-a' } });
	}

	setActive(event) {
		const id = event.target.id;

		this.setState((state, props) => { return { activeTab: id } }, 
			() => this.state.callback(this.state.activeTab));
	}

	isActive(id) {
		return this.state.activeTab === id;
	}

	anchor(id, text, isDefault) {
		return <a id={ id } className={ 'item ' + (this.isActive(id) ? 'active' : '') } onClick={ this.setActive }>{ text }</a>
	}

	onFocus() {
    	this.myInput.setAttribute('class', 'active');
  	}

	render() {
		return(
			<center>
				<div id='nav-outer'>
					<div id='nav-top'>
						<img src={ peruFlag } alt='Peru flag'/>
						<h1>Peru Wakichi</h1>
					</div>
					<div id='nav-links-outer'>
						<div id='nav-links' className='ui menu'>
							{ this.anchor('tab-a', 'Quechua Words', true) }
							{ this.anchor('tab-b', 'News') }
							{ this.anchor('tab-c', 'Locations') }
						</div>
					</div>
				</div>
			</center>
			);
	}
}