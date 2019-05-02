import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Navbar from './components/Navbar';
import InventoryList from './components/Inventory/InventoryList';
import InventoryDetails from './components/Inventory/InventoryDetails';
import AddInventoryItem from './components/Inventory/AddInventoryItem';

// Locate our Endpoint
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export const INIT_ID = '000000000000000000000000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: INIT_ID
    }
  }

  resetItemSelection = () => this.setState({ selectedItem: INIT_ID });
  updateSelectedItem = (e) => this.setState({ selectedItem: e.target.attributes.value.value });
  
  render = () => (
    <ApolloProvider client={client}>
      <div id="main">
        <Navbar />
        <InventoryList onClick={this.updateSelectedItem} />
        <InventoryDetails 
          selectedId={this.state.selectedItem}
          resetItemSelection={this.resetItemSelection} />
        <AddInventoryItem />
      </div>
    </ApolloProvider>
  );
}

export default App;
