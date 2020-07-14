import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './Projects';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Projects />, div);
  ReactDOM.unmountComponentAtNode(div);
});