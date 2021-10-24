import React from 'react'
import axios from 'axios'
import Moment from 'react-moment';

export default class FloristViewListings extends React.Component{

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us17.gitpod.io'

    state = {
        'data': [

        ],
        'active': "displayViewAllListings",
        'floristId': this.props.floristViewListingsId
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

    render(){
        return <React.Fragment>
            <h1>View your listings</h1>
            <button className="btn btn-danger">Add New Listing</button>

            {this.state.data.map(listing => 
            (this.state.floristId == listing.florist._id) ? 
            <div>
                <h6>{listing.name} dated <Moment format="D MMM YYYY">{listing.date_listed}</Moment></h6>
                <button>Edit Listing</button>
                <button>Delete Listing</button>
            </div>
            : null
        )}
        </React.Fragment>
    }
}