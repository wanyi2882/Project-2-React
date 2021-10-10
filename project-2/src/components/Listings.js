import React from 'react'
import axios from 'axios'
import "../components-css/Listings.css"

export default class Listing extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ]
    }

    fetchDate = async () => {
        let response = await axios.get(this.url + "/listings")
        this.setState({
            data: response.data
        })
    }

    componentDidMount(){
        this.fetchDate()
    }

    render(){
        return <React.Fragment>
            <div className="listing-background">
            {this.state.data.map( listings => 
            <div className="card" key={listings._id}>
                <div className="card-body">
                    <h3 className="card-title">{listings.name}</h3>
                    <h4>Ingredients</h4>
                    <ul>
                        {listings.flower_type.map ( type => <li>{type}</li>)}
                    </ul>
                </div>
            </div>)}
            </div>
        </React.Fragment>
    }
}