const React = require('react');
const ReactDom = require('react-dom/server');
const { Email, Item, Span, A, renderEmail } = require ('react-html-email');


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

module.exports = App;
