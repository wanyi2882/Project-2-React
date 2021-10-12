import React from 'react'
import axios from 'axios'
import Home from './components/Home'
import Florists from './components/Florists'
import Listings from './components/Listings'
import Admin from './components/Admin'
import './FloristStop.css'


export default class FloristStop extends React.Component {


    state = {
        'active': 'home',
        'dropdown': false,
        'searchKeyword': "",
        'searchCategory': []
    }


    search(){
        this.setState({
            'active': 'listings',
            'dropdown': false
        })
    }

    setActive = (page) => {
        this.setState({
            active: page
        })
    }

    renderContent() {
        if (this.state.active == 'home') {
            return <Home />
        } else if (this.state.active == 'listings') {
            return <Listings 
                    searchKeyword = {this.state.searchKeyword} 
                    searchCategory = {this.state.searchCategory}/>
        } else if (this.state.active == 'florists') {
            return <Florists />
        } else if (this.state.active == 'admin') {
            return <Admin />
        }
    }

    toggle = () => {
        if (this.state.dropdown == false) {
            this.setState({
                dropdown: true
            })
        } else {
            this.setState({
                dropdown: false
            })
        }
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateCategoryCheckboxes = (event) => {
        // check if the value that the user has clicked already exists
        // 1. if exists, then the user is UNCHECKING the box
        // 2. if does not exists, then the user is CHECKING the box

        let arrayToModify = this.state[event.target.name];

        if (arrayToModify.includes(event.target.value)) {
            let indexToRemove = arrayToModify.indexOf(event.target.value);
            let cloned = [...arrayToModify.slice(0, indexToRemove), 
                          ...arrayToModify.slice(indexToRemove + 1)];
            this.setState({
                [event.target.name]: cloned
            })
        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            this.setState({
                [event.target.name]: cloned
            })
        }
    }

    showSearch() {
        if (this.state.dropdown) {
            return <React.Fragment>
                <div id="searchbox">
                    <h3>Search</h3>
                    <div>
                        <label className="form-label">Keyword Search</label>
                        <input type="text"
                            className="form-control"
                            name="searchKeyword"
                            value={this.state.searchKeyword}
                            onChange={this.updateFormField} />
                    </div>
                    <div>
                        <div><label className="form-label">Flower Categories: </label></div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="roses"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('roses')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-roses">
                                Roses
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="sunflower"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('sunflower')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-sunflower">
                                Sunflower
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="gerbera"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('gerbera')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-gerbera">
                                Gerbera
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="baby breath"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('baby breath')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-baby breath">
                                Baby Breath
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-danger" 
                            onClick={() => this.search()}>Search</button>
                </div>
            </React.Fragment>


        } else {
            return null;
        }
    }

    render() {
        return (
            <React.Fragment>

                <ul className="nav nav-tabs justify-content-end">
                    <li className="nav-item">
                        <button className="nav-link"
                            aria-current="page"
                            onClick={() => this.setActive('home')}>Home</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link"
                            onClick={() => this.setActive('admin')}>Admin</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link"
                            onClick={() => this.setActive('listings')}>Listings</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link"
                            onClick={() => this.setActive('florists')}>Florists</button>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle"
                            aria-expanded={this.state.dropdown}
                            onClick={() => this.toggle()}>Search</button>
                    </li>
                </ul>
                {this.showSearch()}
                {this.renderContent()}
            </React.Fragment>
        )
    }
}