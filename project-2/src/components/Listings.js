import React from 'react'
import axios from 'axios'
import "../components-css/Listings.css"

export default class Listing extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ],
        'display': false,
        'dropdown': false,
        'searchKeyword': "",
        'searchCategory': [],
        'occasion': []
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings"
                                                + "?name=" + this.state.searchKeyword
                                                + "&"
                                                + "flower_type=" + this.state.searchCategory
                                                + "&"
                                                + "occasion=" + this.state.occasion)

        this.setState({
            'data': response.data,
            'dropdown': false
        })

        console.log(response)
        console.log(response.data)
    }

    componentDidMount() {
        this.fetchData()
    }

    hideModalBox = () => {
        this.setState({
            'display': false
        })
    }

    renderModal() {
        if (this.state.display) {
            return <React.Fragment>
                <div className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                    }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"></h5>
                                <button type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.hideModalBox}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={this.hideModalBox}>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        } else {
            return null;
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
                    <button className="btn btn-danger" onClick={() => this.fetchData()}>Search</button>
                </div>
            </React.Fragment>


        } else {
            return null;
        }
    }

    render() {
        return <React.Fragment>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle"
                        aria-expanded={this.state.dropdown}
                        onClick={() => this.toggle()}>Search</button>
                </li>
            </ul>
            {this.showSearch()}

            <div className="listing-background">
                <div className="container">
                    <div className="row">
                        {this.state.data.map(listings =>
                            <div className="col-sm" key={listings._id}>
                                <div className="card card-listing"
                                    role="button"
                                    key={listings._id}
                                    onClick={() => {
                                        this.setState({
                                            'display': true
                                        })
                                    }}>
                                    <img className="card-img-top card-image img-fluid"
                                        src={listings.image} />
                                    <div className="card-body">
                                        <h3 className="card-title">{listings.name}</h3>
                                        <h4>By <span></span></h4>
                                        <h5>${listings.price}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {this.renderModal()}
            </div>
        </React.Fragment>
    }
}