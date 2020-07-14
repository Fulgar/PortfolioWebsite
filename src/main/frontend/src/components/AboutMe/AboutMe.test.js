import React from 'react';
import ReactDOM from 'react-dom';
import AboutMe from './AboutMe';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutMe />, div);
  ReactDOM.unmountComponentAtNode(div);
});