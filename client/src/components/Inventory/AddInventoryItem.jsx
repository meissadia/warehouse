import React from 'react';
import { graphql, compose } from 'react-apollo';
import { isEmpty } from 'lodash';

import Errors from '../Errors';
import { InventoryQuery, LocationsQuery } from '../../queries';
import { AddInventoryItemMutation } from '../../mutations';
import { camelize } from '../../helpers/presenters';

export class AddInventoryItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
    }

    defaultState = () => ({
        name: '',
        photo_url: '',
        locationid: '',
        description: '',
        quantity: 0,
        errors: []
    })

    dismissErrors = () => this.setState({ errors: [] });

    updateState = (key, event) => {
        var val = event.target.value;
        this.setState({
            [key]: key === 'name' ? camelize(val) : val
        })
    }

    formValid = () => {
        const required = ['locationid', 'name'];
        var errors = []

        required.forEach((r) => {
            if (isEmpty(this.state[r])) {
                errors.push(`Missing required field "${r}"`);
            }
        });

        this.setState({ errors });
        return isEmpty(errors);
    }

    /*
     * Call our Mutation and pass variables
     * Fetch the updated results using refetchQueries
    */
    submitForm = (e) => {
        e.preventDefault();
        if (this.formValid()) {
            this.props.AddInventoryItem({
                variables: { ...this.state },
                refetchQueries: [
                    { query: InventoryQuery }
                ]
            }).then(_data => {
                this.setState(this.defaultState);
            }).catch(data => {
                console.log('Add Item Failed: ', data);
            });
        }
    }


    locationOptions = () => {
        const { loading, locations } = this.props.LocationsQuery;

        if (loading) return <option disabled>Loading...</option>;

        return locations.map((location) => (
            <option
                key={location.id}
                value={location.id}>
                {location.name}
            </option>
        ))
    }


    render = () => {
        return (
            <div id='add-item'>
                <Errors errors={this.state.errors} dismiss={this.dismissErrors} />
                <h1>Add Item</h1>
                <form id='add-item-form' onSubmit={this.submitForm}>
                    <div className='field'>
                        <label>Name:</label>
                        <input
                            type="text"
                            required
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}
                        />
                    </div>
                    <div className='field'>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            onChange={(e) => this.setState({ quantity: parseInt(e.target.value) })}
                            value={this.state.quantity}
                        />
                    </div>
                    <div className='field'>
                        <label>Description:</label>
                        <input
                            type="textarea"
                            onChange={(e) => this.setState({ description: e.target.value })}
                            value={this.state.description}
                        />
                    </div>
                    <div className='field'>
                        <label>Photo:</label>
                        <input
                            className='file-picker'
                            type="file"
                            onChange={(e) => this.setState({ photo_url: e.target.value })}
                            value={this.state.photo_url}
                        />
                    </div>
                    <div className='field'>
                        <label>Location:</label>
                        <select
                            name="location"
                            id="location"
                            value={this.state.locationid}
                            required
                            onChange={(e) => this.setState({ locationid: e.target.value })}
                        >
                            <option value="">&lt;Select Location&gt;</option>
                            {this.locationOptions()}
                        </select>
                    </div>
                    <input id='submit' type='submit'>+</input>
                </form>
            </div>
        );
    }
}

/*
Compose allows us to bind multiple queries to a component.
The `name` option will be the named `data` object for that query.
```
this.props.AddInventory.loading
this.props.QueryInventory.inventory
```
*/
export default compose(
    graphql(LocationsQuery, { name: 'LocationsQuery' }),
    graphql(AddInventoryItemMutation, { name: 'AddInventoryItem' }),
)(AddInventoryItem);