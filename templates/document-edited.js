const React = require('react');
const ReactDom = require('react-dom/server');
const { Email, Item, Span, A, renderEmail } = require ('react-html-email');


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

module.exports = App;
