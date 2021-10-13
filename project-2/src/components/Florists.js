import React from 'react'
import axios from 'axios'

export default class Listing extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ]
    }

    fetchData = async () => {
        let response = await axios.get(this.url + "/florists")
        this.setState({
            data: response.data
        })
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        return <React.Fragment>
            {this.state.data.map( florist => 
            <div className="card" key={florist._id}>
                <div className="card-body">
                    <h3 className="card-title">{florist.name}</h3>
                </div>

            </div>)}
        </React.Fragment>
    }
}