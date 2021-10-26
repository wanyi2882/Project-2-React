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
        'displayModalBox': false
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

    diplayEditModalBox = () => {
        this.setState({
            'displayModalBox': true
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
                    displayViewAllListings = {this.onAfterEditListings}/>
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
                <button onClick={() => {this.diplayEditModalBox()}}>Edit Listing</button>
                <button>Delete Listing</button>
            </div>
            : null
        )}

        <div>{this.renderModal()}</div>
        
        </React.Fragment>
    }
}