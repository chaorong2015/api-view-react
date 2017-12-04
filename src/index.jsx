import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import React from 'react';
import Index from './renderer/Index';

export default function parseReact(data) {
  // let content = renderToString(<Index value={data} />);
  // let content = renderToStaticMarkup(<Index value={data} />);
  return renderToStaticMarkup(<Index value={data} isDownload={true} />);
}
