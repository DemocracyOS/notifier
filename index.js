const Graceful = require('node-graceful')
const config = require('./lib/config')

// Load translations
require('./lib/translations')

const notifier = module.exports = {}

/**
 * Notifier Init
 * Initialize async dependencies, including DB connection, jobs, etc
 *
 * @method init
 * @return {Notifier}
 */

notifier.init = function init () {
  return Promise.all([
    require('./lib/db'),
    require('./lib/agenda')
  ]).then(([db, agenda]) => {
    notifier.db = db
    notifier.agenda = agenda

    return notifier
  }).catch((err) => { throw err })
}

/**
 * Notifier Server Start
 * Start processing jobs
 *
 * @method start
 * @return {Notifier}
 */

notifier.start = function start () {
  return notifier.init()
    .then(require('./lib/agenda'))
    .then((agenda) => {
      agenda.start()
      Graceful.on('exit', () => agenda.stop())

      return notifier
    })
    .catch((err) => { throw err })
}

/**
 * Expose config, this allows the overriding of any config option.
 * @return {Config}
 */

notifier.config = config

/**
 * Expose db connection using mongojs
 * Will be defined after the call of init()
 * @return {MongoJS}
 */

notifier.db = null

/**
 * Expose Agenda instance
 * Will be defined after the call of init()
 * @return {Agenda}
 */

notifier.agenda = null

/**
 * Email sender utility
 * @return {Mailer}
 */

notifier.mailer = require('./lib/mailer')
