import React from 'react';
import ReactDom from 'react-dom/server';

const DocumentEdited = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.author}</h3>
      <p>{props.comment}</p>
    </div>
  );
}

const App = (props) => {
  const html = ReactDom.renderToStaticMarkup(<DocumentEdited {...props}/>);

  return html;
}

export default App;