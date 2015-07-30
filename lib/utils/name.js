module.exports = {
  format: function format (user) {
    return user.lastName ? user.firstName + ' ' + user.lastName : user.firstName
  }
}
