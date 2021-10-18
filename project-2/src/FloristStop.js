import React from 'react'
import Home from './components/Home'
import Florists from './components/Florists'
import Listings from './components/Listings'
import Admin from './components/AddListing'
import './FloristStop.css'


export default class FloristStop extends React.Component {


    state = {
        'active': 'home'
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
            return <Listings />
        } else if (this.state.active == 'florists') {
            return <Florists />
        } else if (this.state.active == 'admin') {
            return <Admin />
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
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
                    </ul>
                </div>



                {this.renderContent()}
            </React.Fragment>
        )
    }
}