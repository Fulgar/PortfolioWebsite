import React from 'react';
import ReactDOM from 'react-dom';
import AdminContributorTable from './AdminContributorTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminContributorTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});