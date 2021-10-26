import React from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import EditListing from './EditListing'

export default class FloristViewListings extends React.Component{

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us17.gitpod.io'

    state = {
        'data': [

        ],
        'active': "displayViewAllListings",
        'floristId': this.props.floristViewListingsId,
        'displayModalBox': false,
        'listingToBeEdited': {},
        'listingIdToBeEdited': "",
        'listingNameToBeEdited': "",
        'listingDescriptionToBeEdited': "",
        'listingFlowerTypeToBeEdited': [],
        'listingPriceToBeEdited': 0,
        'listingOccasionToBeEdited': [],
        'listingQuantityToBeEdited': 0,
        'listingImageToBeEdited': ""
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings")

        this.setState({
            'data': response.data
        })

        //console.log(response.data)
    }

    componentDidMount() {
        this.fetchData()
    }

    diplayEditModalBox = (listing) => {
        this.setState({
            'displayModalBox': true,
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

    onAfterEditListings = () => {
        this.setState({
            'active': "displayViewAllListings",
            'displayModalBox': false
        })
    }

    renderModal() {
        if (this.state.displayModalBox) {
            return <EditListing 
                    displayViewAllListings = {this.onAfterEditListings}
                    listingToBeEdited = {this.state.listingToBeEdited}
                    listingIdToBeEdited = {this.state.listingIdToBeEdited}
                    listingNameToBeEdited = {this.state.listingNameToBeEdited}
                    listingDescriptionToBeEdited = {this.state.listingDescriptionToBeEdited}
                    listingFlowerTypeToBeEdited = {this.state.listingFlowerTypeToBeEdited}
                    listingPriceToBeEdited = {this.state.listingPriceToBeEdited}
                    listingOccasionToBeEdited = {this.state.listingOccasionToBeEdited}
                    listingQuantityToBeEdited = {this.state.listingQuantityToBeEdited}
                    listingImageToBeEdited = {this.state.listingImageToBeEdited}/>
        } else {
            return null;
        }
    }

    render(){
        return <React.Fragment>
            <h1>View your listings</h1>
            {this.state.data.map(listing => 
            (this.state.floristId == listing.florist.florist_id) ? 
            <div>
                <h6>{listing.name} dated <Moment format="D MMM YYYY">{listing.date_listed}</Moment></h6>
                <button onClick={() => {this.diplayEditModalBox(listing)}}>Edit Listing</button>
                <button>Delete Listing</button>
            </div>
            : null
        )}

        <div>{this.renderModal()}</div>
        
        </React.Fragment>
    }
}