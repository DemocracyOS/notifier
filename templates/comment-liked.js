module.exports = function build(props) {
  return `
    <h1>${props.title}</h1>
    <h3>${props.author}</h3>
    <p>${props.comment}</p>
  `;
};
