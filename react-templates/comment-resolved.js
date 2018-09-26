import React from 'react';
import ReactDom from 'react-dom/server';

const CommentResolved = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.author}</h3>
      <p>{props.comment}</p>
    </div>
  );
}

const App = (props) => {
  const html = ReactDom.renderToStaticMarkup(<CommentResolved {...props}/>);

  return html;
}

export default App;