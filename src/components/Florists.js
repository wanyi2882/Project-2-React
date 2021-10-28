import React from 'react'
import LoginFlorists from './LoginFlorists'
import AddFlorists from './AddFlorists'

export default class Florists extends React.Component {

    state = {
        'active': 'loginFlorist'
    }

    setActive = (page) => {
        this.setState({
            'active': page,
        })
    }

    afterAddFlorist = () => {
        this.setActive("loginFlorist")
    }

    goToCreateProfile = () => {
        this.setActive("addFlorist")
    }

    renderContent() {
        if (this.state.active == 'loginFlorist') {
            return <LoginFlorists 
                    onGoToCreateProfile={this.goToCreateProfile}
            />
        } else if (this.state.active == 'addFlorist') {
            return <AddFlorists onAfterAddFlorist={this.afterAddFlorist}/>
        }
    }

    render() {
        return <React.Fragment>
            {this.renderContent()}
        </React.Fragment>
    }

}