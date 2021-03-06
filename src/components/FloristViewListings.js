import React from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import EditListing from './EditListing'
import DeleteListing from './DeleteListing'
import '../components-css/FloristViewListings.css'

export default class FloristViewListings extends React.Component {

    // Deployment URL
    url = 'https://ywy-project2-fmp-express-app.herokuapp.com'

    // Testing URL
    //url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ],
        'active': "displayViewAllListings",
        'floristProfile': this.props.floristProfile,
        'displayEditModalBox': false,
        'displayDeleteModalBox': false,
        'listingToBeEdited': {},
        'listingIdToBeEdited': "",
        'listingNameToBeEdited': "",
        'listingDescriptionToBeEdited': "",
        'listingFlowerTypeToBeEdited': [],
        'listingPriceToBeEdited': 0,
        'listingOccasionToBeEdited': [],
        'listingQuantityToBeEdited': 0,
        'listingImageToBeEdited': "",
        'listingIdToBeDeleted': {}
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings")

        // Sort by descending date (Default)                                         
        let array = response.data
        array.sort(function (a, b) {
            if (a.date_listed < b.date_listed) return 1;
            if (a.date_listed > b.date_listed) return -1;
            return 0;
        })

        this.setState({
            'data': array
        })

        //console.log(response.data)
    }

    componentDidMount() {
        this.fetchData()
    }

    // Set states to be sent to EditListing.js
    diplayEditModalBox = (listing) => {
        this.setState({
            'displayEditModalBox': true,
            'listingToBeEdited': listing,
            'listingIdToBeEdited': listing._id,
            'listingNameToBeEdited': listing.name,
            'listingDescriptionToBeEdited': listing.description,
            'listingFlowerTypeToBeEdited': listing.flower_type,
            'listingPriceToBeEdited': listing.price,
            'listingOccasionToBeEdited': listing.occasion,
            'listingQuantityToBeEdited': listing.quantity,
            'listingImageToBeEdited': listing.image
        })
    }

    // After edit is confirmed, will return to FloristViewListings.js and page will re-render.
    onAfterEditListings = () => {
        this.fetchData()

        this.setState({
            'active': "displayViewAllListings",
            'displayEditModalBox': false
        })
    }

    // Set states to be sent to DeleteListing.js
    displayDeleteModalBox = (listing) => {
        this.setState({
            'displayDeleteModalBox': true,
            'listingToBeEdited': listing,
            'listingIdToBeDeleted': listing._id
        })
    }

    // After deleting listing, will return to FloristViewListings.js and page will re-render.
    onAfterDeleteListings = () => {
        this.fetchData()

        this.setState({
            'active': "displayViewAllListings",
            'displayDeleteModalBox': false
        })
    }

    // Displays the Edit Modal Box (EditListing.js) or Delete Modal Box (DeleteListing.js)
    renderModal() {
        if (this.state.displayEditModalBox) {
            // Information passed via props to EditListing.js
            return <EditListing
                displayViewAllListings={this.onAfterEditListings}
                listingToBeEdited={this.state.listingToBeEdited}
                listingIdToBeEdited={this.state.listingIdToBeEdited}
                listingNameToBeEdited={this.state.listingNameToBeEdited}
                listingDescriptionToBeEdited={this.state.listingDescriptionToBeEdited}
                listingFlowerTypeToBeEdited={this.state.listingFlowerTypeToBeEdited}
                listingPriceToBeEdited={this.state.listingPriceToBeEdited}
                listingOccasionToBeEdited={this.state.listingOccasionToBeEdited}
                listingQuantityToBeEdited={this.state.listingQuantityToBeEdited}
                listingImageToBeEdited={this.state.listingImageToBeEdited} />

        } else if (this.state.displayDeleteModalBox) {
            // Information passed via props to DeleteListing.js
            return <DeleteListing
                displayViewAllListings={this.onAfterDeleteListings}
                listingIdToBeDeleted={this.state.listingIdToBeDeleted}
                floristProfile={this.state.floristProfile}
            />
        } else {
            return null;
        }
    }

    render() {
        return <React.Fragment>
            <div className="container">
                <h1>View your listings</h1>
                {this.state.data.map(listing =>
                    (this.state.floristProfile[0]._id == listing.florist.florist_id) ?
                        <div className="view-listing-div">
                            <h6>{listing.name} dated <Moment format="D MMM YYYY">{listing.date_listed}</Moment></h6>
                            <button className="btn btn-primary btn-sm mx-2" onClick={() => { this.diplayEditModalBox(listing) }}>Edit Listing</button>
                            <button className="btn btn-danger btn-sm" onClick={() => { this.displayDeleteModalBox(listing) }}>Delete Listing</button>
                        </div>
                        : null
                )}
            </div>

            <div>{this.renderModal()}</div>

        </React.Fragment>
    }
}