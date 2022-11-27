import App from './landing.body.js';

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { render, screen } from '@testing-library/react';

test('renders the body of the landing page', () => {
  render(< App />)
});