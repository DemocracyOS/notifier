module.exports.emailAddress = function emailAddress (user) {
  return {
    name: user.lastName ? user.firstName + ' ' + user.lastName : user.firstName,
    address: user.email
  }
}
