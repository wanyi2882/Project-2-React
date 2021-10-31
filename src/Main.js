import React from 'react'
import Home from './components/Home'
import Florists from './components/Florists'
import Listings from './components/Listings'
import './Main.css'


export default class FloristStop extends React.Component {


    state = {
        'active': 'home',
        'navDropdown': false
    }

    setActive = (page) => {
        this.setState({
            'active': page,
            'navDropdown': false
        })
    }

    goToListings = () => {
        this.setActive('listings')
    }

    goToFlorists = () => {
        this.setActive('florists')
    }

    // Toggle Collapsed Nav Hamburger
    toggleNav = () => {
        if (this.state.navDropdown == false) {
            this.setState({
                navDropdown: true
            })
        } else {
            this.setState({
                navDropdown: false
            })
        }
    }

    // Render different components on Click
    renderContent() {
        if (this.state.active == 'home') {
            return <Home 
                    goToListings={this.goToListings}
                    goToFlorists={this.goToFlorists} />
        } else if (this.state.active == 'listings') {
            return <Listings />
        } else if (this.state.active == 'florists') {
            return <Florists />
        } 
    }

    render() {
        return (
            <React.Fragment>
                {/* Nav Bar when screen size more than 576px */}
                <div id="navbar-expand" className="container-fluid fixed-top">
                    <ul className="nav nav-tabs">
                    <li id="navbar-expand-logo"
                        role="button"
                        onClick={() => this.setActive('home')}></li>

                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={() => this.setActive('home')}>Home</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={() => this.setActive('listings')}>Listings</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={() => this.setActive('florists')}>Florists Login</button>
                        </li>
                    </ul>
                </div>

                {/* Nav Bar when screen size less than 576px */}
                <nav id="collapsed-navbar" className="navbar navbar-light fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-brand"
                            role="button"
                            onClick={() => this.setActive('home')}></div>
                        <button className="navbar-toggler"
                            type="button"
                            onClick={() => { this.toggleNav() }}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {this.state.navDropdown ?
                            <div className="offcanvas offcanvas-end"
                                tabindex="-1">

                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                                    <button type="button"
                                        className="btn-close text-reset"
                                        onClick={() => { this.toggleNav() }}></button>
                                </div>

                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <div className="nav-link"
                                                onClick={() => this.setActive('home')}>Home</div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link"
                                                onClick={() => this.setActive('listings')}>Listings</div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link"
                                                onClick={() => this.setActive('florists')}>Florists Login</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </nav>

                {this.renderContent()}
            </React.Fragment>
        )
    }
}