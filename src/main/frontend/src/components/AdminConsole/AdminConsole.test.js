import React from 'react';
import ReactDOM from 'react-dom';
import AdminConsole from './AdminConsole';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminConsole />, div);
  ReactDOM.unmountComponentAtNode(div);
});