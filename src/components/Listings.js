import React from 'react'
import axios from 'axios'
import "../components-css/Listings.css"
import Moment from 'react-moment';
import { FaWhatsapp } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { HiChevronDoubleDown } from "react-icons/hi";
import { HiChevronDoubleUp } from "react-icons/hi";


export default class Listing extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ],
        'isLoaded': false,
        'display': false,
        'dropdown': false,
        'searchKeyword': "",
        'searchCategory': "",
        'searchOccasion': "",
        'displayAccordion': false,
        'modalListingDetails': {},
        'whatsappURL': "https://wa.me/65"
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings"
            + "?description=" + this.state.searchKeyword
            + "&"
            + "flower_type=" + this.state.searchCategory
            + "&"
            + "occasion=" + this.state.searchOccasion)

        // Sort by descending date (Default)                                         
        let array = response.data
        array.sort(function (a, b) {
            if (a.date_listed < b.date_listed) return 1;
            if (a.date_listed > b.date_listed) return -1;
            return 0;
        });

        this.setState({
            'data': array,
            'isLoaded': true
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    // Hide Modal Box and empty state 'modalListingDetails'
    hideModalBox = () => {
        this.setState({
            'display': false,
            'displayAccordion': false,
            'modalListingDetails': {},
            'whatsappURL': "https://wa.me/65"
        })
    }

    // Toggle accordion
    openAccordion = () => {
        this.state.displayAccordion ?

            this.setState({
                'displayAccordion': false,
                'whatsappURL': "https://wa.me/65"
            })
            :
            this.setState({
                'displayAccordion': true,
                'whatsappURL': "https://wa.me/65" + this.state.modalListingDetails.florist.contact.number
            })
    }

    // Render Modal Box when this.state.display is true
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
                                <h5 className="modal-title">{this.state.modalListingDetails.name} < br />
                                    by {this.state.modalListingDetails.florist.florist_name}</h5>
                                <button type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.hideModalBox}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <img src={this.state.modalListingDetails.image}
                                                id="modal-image" />
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <hr />
                                            <div>{this.state.modalListingDetails.description}</div>
                                            <hr />
                                            <div>Price: ${this.state.modalListingDetails.price}</div>
                                            <div>Available Quantity: {this.state.modalListingDetails.quantity}</div>
                                            <hr />
                                            <div> Occasion(s): {this.state.modalListingDetails.occasion.join(", ")} </div>
                                            <div> Flower Type(s): {this.state.modalListingDetails.flower_type.join(", ")} </div>
                                            <hr />
                                            <div>
                                                <div role="button"
                                                    onClick={() => this.openAccordion()}>
                                                        {this.state.displayAccordion ? 
                                                        <span>Florist Contact Information <HiChevronDoubleUp /></span> :
                                                        <span>Florist Contact Information <HiChevronDoubleDown /></span>}
                                                </div>

                                                {this.state.displayAccordion ?                                                
                                                    <div>
                                                        <hr />
                                                        {this.state.modalListingDetails.florist.contact_method.includes("whatsapp") ?
                                                            <div>
                                                                <a href={this.state.whatsappURL}>
                                                                    <FaWhatsapp /> {this.state.modalListingDetails.florist.contact.number}
                                                                </a>
                                                            </div> : null}

                                                        {this.state.modalListingDetails.florist.contact_method.includes("instagram") ?
                                                            <div>
                                                                <a href={this.state.modalListingDetails.florist.contact.instagram}>
                                                                    <FaInstagram /> Instagram</a>
                                                            </div> : null}

                                                        {this.state.modalListingDetails.florist.contact_method.includes("facebook") ?
                                                            <div>
                                                                <a href={this.state.modalListingDetails.florist.contact.facebook}>
                                                                <FaFacebookSquare /> Facebook</a>
                                                            </div> : null}
                                                    </div>
                                                    :
                                                    null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

    // Dropdown toggle display
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

    // Update form field 2 way binding
    updateFormField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Update form fields for checkboxes 2 way binding
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

    // Search Dropdown when clicked, this.state.dropdown is true
    showSearch() {
        if (this.state.dropdown) {
            return <React.Fragment>
                <div id="searchbox" className="container">
                    {/* Keyword Search */}
                    <div className="search-div">
                        <label className="form-label search-label">Keyword Search</label>
                        <input type="text"
                            className="form-control"
                            name="searchKeyword"
                            value={this.state.searchKeyword}
                            onChange={this.updateFormField} />
                    </div>

                    {/* Search by flower type (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Flower Categories</label></div>
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
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="tulips"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('tulips')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-tulips">
                                Tulips
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="hydrangea"
                                name="searchCategory"
                                checked={this.state.searchCategory.includes('hydrangea')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-hydrangea">
                                Hydrangea
                            </label>
                        </div>
                    </div>

                    {/* Search by occasion (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Occasion</label></div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="anniversary"
                                name="searchOccasion"
                                checked={this.state.searchOccasion.includes('anniversary')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-anniversary">
                                Anniversary
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="birthday"
                                name="searchOccasion"
                                checked={this.state.searchOccasion.includes('birthday')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-birthday">
                                Birthday
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="date"
                                name="searchOccasion"
                                checked={this.state.searchOccasion.includes('date')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-date">
                                Date
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="graduation"
                                name="searchOccasion"
                                checked={this.state.searchOccasion.includes('graduation')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-graduation">
                                Graduation
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input"
                                type="checkbox"
                                value="wedding"
                                name="searchOccasion"
                                checked={this.state.searchOccasion.includes('wedding')}
                                onChange={this.updateCategoryCheckboxes} />
                            <label className="form-check-label" for="category-wedding">
                                Wedding
                            </label>
                        </div>
                    </div>
                    <button id="search-btn" className="btn" onClick={() => this.searchButton()}>Search</button>
                </div>
            </React.Fragment>


        } else {
            return null;
        }
    }

    // On click of search button in the search dropdown
    searchButton = () => {
        this.fetchData()

        // On click of search button, fetch data from server and send information
        // to this.state.data. this.state.dropdown (search) is false.
        this.setState({
            'dropdown': false
        })
    }

    // Re-render and get all listings
    refreshViewAllListings = async () => {
        let response = await axios.get(this.url + "/listings")

        // Sort by descending date (Default)                                         
        let array = response.data
        array.sort(function (a, b) {
            if (a.date_listed < b.date_listed) return 1;
            if (a.date_listed > b.date_listed) return -1;
            return 0;
        });

        // On click of search button, fetch data from server and send information
        // to this.state.data. this.state.dropdown (search) is false.
        this.setState({
            'data': array,
            'searchKeyword': "",
            'searchCategory': "",
            'searchOccasion': ""
        })

    }

    // Render All listings
    render() {
        if (!this.state.isLoaded) {
            return null
        }
        return <React.Fragment>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle"
                        aria-expanded={this.state.dropdown}
                        onClick={() => this.toggle()}>Search</button>
                </li>
            </ul>
            {this.showSearch()}

            <div id="listing-background">
                {!this.state.data.length == 0 ?
                    // Data is available to display
                    <div className="container">
                        <div className="row">
                            {this.state.data.map(listings =>
                                <div className="col-12 col-sm-6 col-lg-4" key={listings._id}>
                                    <div className="card card-listing"
                                        role="button"
                                        key={listings._id}
                                        onClick={() => {
                                            this.setState({
                                                'display': true,
                                                'modalListingDetails': listings
                                            })
                                        }}>
                                        <img className="card-img-top card-image"
                                            src={listings.image} />
                                        <div className="card-body">
                                            <h6 className="card-title">{listings.name}</h6>
                                            <span>updated <Moment fromNow>{listings.date_listed}</Moment></span> <br />
                                            <span>by <span>{listings.florist.florist_name}</span></span> <br />
                                            <span>${listings.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    // No data to display
                    <div id="emptySearchResultsDiv">
                        <span id="emptySearchResultsText">
                            No results available for
                            {this.state.searchKeyword == "" ?
                                null :
                                <span> Keyword: {this.state.searchKeyword} </span>}
                            <br />

                            {this.state.searchCategory.length == 0 ?
                                null :
                                <span> Flower Type: {this.state.searchCategory.join(", ")} </span>}
                            <br />

                            {this.state.searchOccasion.length == 0 ?
                                null :
                                <span> Occasion: {this.state.searchOccasion.join(", ")} </span>}
                            <br />

                            <span> Why not &nbsp;
                                <span id="emptySearchResultsAlternative"
                                    role="button"
                                    onClick={() => this.refreshViewAllListings()}>
                                    view all available listings </span> ?
                            </span>
                        </span>
                    </div>}
                {this.renderModal()}
            </div>
        </React.Fragment>
    }
}