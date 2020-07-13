import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Homepage />, div);
  ReactDOM.unmountComponentAtNode(div);
});