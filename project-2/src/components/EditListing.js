import React from "react";

export default class EditListing extends React.Component{
    state = {

    }

    hideModalBox = () => {
        this.props.displayViewAllListings()
    }

    render(){
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
    }
}