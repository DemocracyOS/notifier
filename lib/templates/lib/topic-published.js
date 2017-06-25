const html = require('es6-string-html-template').html
const raw = require('es6-string-html-template').raw
const t = require('t-component')

module.exports = function welcomeEmail (vars, opts) {
  t.lang(opts.lang)
  const _t = (key) => t(key, vars)

  return html`
    <p>${_t('templates.email.greeting')}</p>
    <p>${_t('templates.topic-published.body')}</p>
    <p>${vars.topic}</p>
    <p>${raw(_t('templates.topic-published.body2'))}</p>
    <p>${_t('templates.email.signature')}</p>
  `.toString()
}
