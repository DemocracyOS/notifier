const React = require('react');
const ReactDom = require('react-dom/server');
const { Email, Item, Span, A, renderEmail } = require ('react-html-email');

const CommentLiked = (props) => {
  return (
    <div>
      <Item align="center">
        <Span fontSize={20}>
          <h1>{props.title}</h1>
          <h3>{props.author}</h3>
          <p>{props.comment}</p>
        </Span>
      </Item>
    </div>
  );
}

const App = (props) => {
  const html = ReactDom.renderToStaticMarkup(<CommentLiked {...props}/>);

  return html;
}

module.exports = App;
