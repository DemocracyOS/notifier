const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
const t = require('t-component')

module.exports = function welcomeEmail (vars, opts) {
  t.lang(opts.lang)

  return html`
    <p>${t('templates.email.greeting')}</p>
    <p>${raw(t('templates.welcome-email.body'))}</p>
    <p>${t('templates.email.signature')}</p>
    <p>${t('templates.welcome-email.ps')}</p>
  `
}
