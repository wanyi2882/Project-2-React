import React from 'react'
import axios from 'axios'
import "../components-css/Listings.css"

export default class Listing extends React.Component {

    url = 'https://3000-tan-nightingale-xhc8uhmi.ws-us18.gitpod.io'

    state = {
        'data': [

        ],
        'display': false
    }

    fetchDate = async () => {
        let response = await axios.get(this.url + "/listings")
        this.setState({
            data: response.data
        })
    }

    componentDidMount() {
        this.fetchDate()
    }

    hideModalBox = () => {
        this.setState({
            'display': false
        })
    }

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
                                <h5 className="modal-title"></h5>
                                <button type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={this.hideModalBox}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
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

        render() {
            return <React.Fragment>
                <div className="listing-background">
                    <div className="container">
                        <div className="row">
                            {this.state.data.map(listings =>
                                <div className="col-sm" key={listings._id}>
                                    <div className="card card-listing"
                                        role="button"
                                        key={listings._id}
                                        onClick={() => {
                                            this.setState({
                                                'display': true
                                            })
                                        }}>
                                        <img className="card-img-top card-image img-fluid"
                                            src={listings.image} />
                                        <div className="card-body">
                                            <h3 className="card-title">{listings.name}</h3>
                                            <h4>${listings.price}</h4>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {this.renderModal()}
                </div>
            </React.Fragment>
        }
    }