import React from 'react'
import Home from './components/Home'
import Florists from './components/Florists'
import Listings from './components/Listings'
import Admin from './components/AddListing'
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

    afterAddListing = () => {
        this.setActive('listings')
    }

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

    renderContent() {
        if (this.state.active == 'home') {
            return <Home />
        } else if (this.state.active == 'listings') {
            return <Listings />
        } else if (this.state.active == 'florists') {
            return <Florists />
        } else if (this.state.active == 'admin') {
            return <Admin onAfterAddListing={this.afterAddListing} />
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* Nav Bar when screen size more than 576px */}
                <div id="navbar-expand" className="container-fluid fixed-top">
                    <ul className="nav nav-tabs justify-content-end">
                        <li className="nav-item">
                            <button className="nav-link"
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

                {/* Nav Bar when screen size less than 576px */}
                <nav id="collapsed-navbar" className="navbar navbar-light fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-brand" role="button"></div>
                        <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            onClick={() => { this.toggleNav()}}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {this.state.navDropdown ? 
                        <div className="offcanvas offcanvas-end"
                            tabindex="-1" 
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel">

                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                <button type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    onClick={() => { this.toggleNav()}}></button>
                            </div>

                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <div className="nav-link"
                                            onClick={() => this.setActive('home')}>Home</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link"
                                            onClick={() => this.setActive('admin')}>Admin</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link"
                                            onClick={() => this.setActive('listings')}>Listings</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link"
                                            onClick={() => this.setActive('florists')}>Florists</div>
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