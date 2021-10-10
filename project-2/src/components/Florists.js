import React from 'react'
import axios from 'axios'

export default class Listing extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ]
    }

    fetchDate = async () => {
        let response = await axios.get(this.url + "/Florist")
        this.setState({
            data: response.data
        })
    }

    componentDidMount(){
        this.fetchDate()
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