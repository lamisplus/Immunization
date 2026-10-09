// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { configure } from "@testing-library/react";

// The form tests render full Material-UI forms; give them room when suites
// run in parallel on slower machines.
configure({ asyncUtilTimeout: 5000 });
jest.setTimeout(30000);
