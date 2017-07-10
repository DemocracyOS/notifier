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
  en: ({ userName, topicTitle, comment, url }) => html`
    ${styles}
    <p>Hi! ${userName},</p>
    <br />
    <p><strong>${comment.author.fullName}</strong> commented the topic: "${topicTitle}":</p>
    <br />
    <p><i>${comment.text}</i></p>
    <br />
    <p>${raw(`Please <a href="${url}">click here</a> to see it.`)}</p>
  `.toString(),

  es: ({ userName, topicTitle, comment, url }) => html`
    ${styles}
    <p>Hola ${userName},</p>
    <p><strong>${comment.author.fullName}</strong> comentó en "${topicTitle}":</p>
    <br />
    <p><i>${comment.text}</i></p>
    <br />
    <p>${raw(`Por favor, <a href="${url}">cliquea aquí</a> para verlo.`)}</p>
  `.toString()
}
