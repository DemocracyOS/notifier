const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
const t = require('t-component')

module.exports = function welcomeEmail (vars, opts) {
  t.lang(opts.lang)

  return html`
    <p>${t('templates.email.greeting')}</p>
    <p>${t('templates.topic-published.body')}</p>
    <p>${vars.topic}</p>
    <p>${raw(t('templates.topic-published.body2'))}</p>
    <p>${t('templates.email.signature')}</p>
  `
}
