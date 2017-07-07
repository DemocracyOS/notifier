const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw

module.exports = function welcomeEmail (vars, { lang }) {
  const t = translations[translations] || translations.en
  return t(vars)
}

const styles = raw(`
  <style>
    p { margin: 0; }
  </style>
`)

const translations = module.exports.translations = {
  en: ({ userName, topicTitle, reply, comment, url }) => html`
    ${styles}
    <p>Hi! ${userName},</p>
    <br />
    <p><strong>${reply.author.fullName}</strong> replied to a comment on "${topicTitle}".</p>
    <br />
    <p>Original comment by <strong>${comment.author.fullName}</strong>:</p>
    <p><i>${comment.text}</i></p>
    <br />
    <p>Reply by <strong>${reply.author.fullName}</strong>:</p>
    <p><i>${reply.text}</i></p>
    <br />
    <p>${raw(`Please <a href="${url}">click here</a> to see it.`)}</p>
  `.toString(),

  es: ({ userName, topicTitle, reply, comment, url }) => html`
    ${styles}
    <p>Hola ${userName},</p>
    <p><strong>${reply.author.fullName}</strong> respondió un comentario en "${topicTitle}".</p>
    <p>Comentario original por <strong>${comment.author.fullName}</strong>:</p>
    <p><i>${comment.text}</i></p>
    <br />
    <p>Respuesta por <strong>${reply.author.fullName}</strong>:</p>
    <p><i>${reply.text}</i></p>
    <br />
    <p>${raw(`Por favor, <a href="${url}">cliquea aquí</a> para verla.`)}</p>
  `.toString()
}
