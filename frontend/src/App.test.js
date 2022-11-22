import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page', () => {
  
  var {container, debug} = render(< App />);
    debug();
});
