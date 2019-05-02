import React from 'react';
import App, { INIT_ID } from './App';

import { shallow } from 'enzyme';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders all sections', () => {
    const wrapper = shallow(<App />);
    expect(!wrapper.find('Navbar').exists());
    expect(!wrapper.find('Apollo(InventoryList)').exists());
    expect(!wrapper.find('Apollo(InventoryDetails)').exists());
    expect(!wrapper.find('Apollo(Apollo(AddInventoryItem))').exists());
  });

});