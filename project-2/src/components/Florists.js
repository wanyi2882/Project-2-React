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
        </React.Fragment>
    }
}