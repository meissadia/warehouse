import React from 'react';
import { graphql } from 'react-apollo';

import { AddLocationMutation } from '../mutations';

class AddLocation extends React.PureComponent {
    state = {
        name: '',
        photo_url: ''
    }

    updateState(key, value) {
        this.setState({ [key]: value })
    }

    render() {
        return (
            <div className='addLocation'>
                <div className='field'>
                    <label>Name</label>
                    <input
                        type="text"
                        onChange={this.updateState.bind(null, 'name')}
                        value={this.state.name}
                    />
                </div>
                <div className='field'>
                    <label>Photo</label>
                    <input
                        type="file"
                        onChange={this.updateState.bind(null, 'photo_url')}
                        value={this.state.photo_url}
                    />
                </div>
            </div>
        );
    }
}

export default graphql(AddLocationMutation)(AddLocation);