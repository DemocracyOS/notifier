const config = require('./lib/config')

/**
 * Notifier Init
 * Initialize async dependencies, including DB connection, jobs, etc
 *
 * @method init
 * @return {Notifier}
 */

module.exports.init = function init () {
  return Promise.all([
    require('./lib/db'),
    require('./lib/agenda'),
    require('./lib/email')
  ]).then(([db, agenda]) => {
    module.exports.db = db
    module.exports.agenda = agenda
  }).catch((err) => { throw err })
}

/**
 * Expose config, this allows the overriding of any config option.
 * @return {Config}
 */

module.exports.config = config

/**
 * Expose db connection using mongojs
 * Will be defined after the call of init()
 * @return {MongoJS}
 */

module.exports.db = null

/**
 * Expose Agenda instance
 * Will be defined after the call of init()
 * @return {Agenda}
 */

module.exports.agenda = null

/**
 * Email sender utility
 * Will be defined after the call of init()
 * @return {Agenda}
 */

module.exports.email = null
