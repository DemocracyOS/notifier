const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
const t = require('t-component')

module.exports = function welcomeEmail (vars, opts) {
  t.lang(opts.lang)

  return html`
    <p>${t('templates.email.greeting')}</p>
    <p>${t('templates.comment-reply.body')}</p>
    <p>${vars.reply}</p>
    <p>${raw(t('templates.comment-reply.body2'))}</p>
    <p>${t('templates.email.signature')}</p>
  `
}
