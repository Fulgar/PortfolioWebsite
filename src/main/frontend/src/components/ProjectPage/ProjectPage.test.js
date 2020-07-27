import React from 'react';
import ReactDOM from 'react-dom';
import ProjectPage from './ProjectPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});