import React from 'react'
import axios from 'axios'

export default class FloristViewListings extends React.Component{

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        active: "displayViewAllListings",
        floristEmail: this.props.floristViewListingsLoginEmail
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/listings"
            + "?floristEmail=" + this.state.floristEmail)

        this.setState({
            'data': response.data,
            'responseStatus': response.status
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    render(){
        return <React.Fragment>
            "Heelo"
        </React.Fragment>
    }
}