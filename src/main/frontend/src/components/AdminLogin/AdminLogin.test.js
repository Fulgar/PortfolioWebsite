import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './AdminLogin';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminLogin />, div);
  ReactDOM.unmountComponentAtNode(div);
});