import React from 'react';

const style = {
    width: '100%',
    fontSize: '2em',
    padding: '20px',
    textAlign: 'center',
    lineHeight: '2em',
    boxSizing: 'border-box'
};

export const Navbar = () =>
    <nav>
        <div className='title' style={style}>
            Inventory
        </div>
    </nav>;

export default Navbar;