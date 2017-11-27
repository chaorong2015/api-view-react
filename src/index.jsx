import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import fs from 'fs';
import Index from './renderer/Index';

function layout(data) {
  let style = fs.readFileSync(__dirname + '/css/style.min.css');
  // let content = renderToString(<Index value={data} />);
  let content = renderToStaticMarkup(<Index value={data} />);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="http://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
      <style type="text/css">${style}</style>
    </head>
    <body>
      <div id="app">
          ${content}
      </div>
    </body>
    </html>
  `;
}

export default function (props) {
  return layout(props || {});
}
