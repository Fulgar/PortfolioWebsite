import React from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from './PrivateRoute';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PrivateRoute />, div);
  ReactDOM.unmountComponentAtNode(div);
});