import { renderToString } from 'react-dom/server';
import { App } from './app/App';
export function render() { return renderToString(<App />); }
