module.exports.emailAddress = function emailAddress (user) {
  return {
    address: user.email,
    name: user.lastName ? user.firstName + ' ' + user.lastName : user.firstName
  }
}
