import React from 'react'
import axios from 'axios'
import LoginFlorists from './LoginFlorists'
import AddFlorists from './AddFlorists'
import AddListing from './AddListing'


export default class Florists extends React.Component{

    state = {
        'active': 'loginFlorists'
    }

    setActive = (page) => {
        this.setState({
            active: page
        })
    }

    renderContent() {
        if (this.state.active == 'loginFlorists') {
            return <LoginFlorists />
        } else if (this.state.active == 'AddFlorists') {
            return <AddFlorists />
        }  else if (this.state.active == "AddListing"){
            return <AddListing />
        }
    }

    render(){
        return <React.Fragment>
                <button onClick={()=>this.setActive('AddFlorists')}>Create new Florist Account</button>
                <button onClick={()=>this.setActive('loginFlorists')}>See your Florist Profile</button>
                <button onClick={()=>this.setActive('AddListing')}>Add new Listing</button>
                <button>See all your Listings</button>
                {this.renderContent()}      
                </React.Fragment>
    }

}