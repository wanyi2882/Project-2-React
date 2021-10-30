import React from 'react'
import "../components-css/Home.css"

export default class Listing extends React.Component {


    state = {

    }

    goToListings = () => {
        this.props.goToListings()
    }

    goToFlorists = () => {
        this.props.goToFlorists()
    }

    render() {
        return <React.Fragment>
            <div id="home-background">
                <div className="container">
                    <div className="row">
                        <div id="introduction" className="col">
                            <div>Floral Market Place</div>
                            <div>“Where flowers bloom, so does hope.” – Lady Bird Johnson</div>
                        </div>
                    </div>

                    <div id="introduction-two" className="row justify-content-around">
                        <div id="viewAllListings" 
                        className="col-12 col-sm-5"
                        role="button"
                        onClick={() =>{this.goToListings()}}>
                            <span>Looking for a bouquet?</span> <br />
                            <span>Click here to view all our listings! </span>
                        </div>
                        <div id="floristPage" 
                        className="col-12 col-sm-5"
                        role="button"
                        onClick={() =>{this.goToFlorists()}}>
                            <span>Freelance or Homebased florists?</span> <br />
                            <span>Click here to start listing with us!</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}