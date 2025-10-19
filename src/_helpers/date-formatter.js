
// this class will format 2020-06-04T10:00 into YYYY-MM-DD HH:MM AM/PM format
exports.DareFormatter = function () {
  this.getCurrentTimeFormat = function (date) { // 2020-06-04T10:00
    var currentdate = new Date(date)
    var year = currentdate.getFullYear()
    var month = currentdate.getMonth() + 1
    var monthFomt = (month < 10) ? '0' + month : month
    var date = (currentdate.getDate() < 10) ? '0' + currentdate.getDate() : currentdate.getDate()
    var dateString = year + '-' + monthFomt + '-' + date
    return dateString
  }
  this.getCurrentHour = function (time) {
    var date = new Date(time)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    hours = hours % 12
    hours = hours || 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    return hours + ':' + minutes
  }
  this.getCurrentAMPM = function (time) {
    var date = new Date(time)
    var hours = date.getHours()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    return ampm
  }
  this.getFormatedTime = function (time) {
    return this.getCurrentTimeFormat(time) + ' ' + this.getCurrentHour(time) + ' ' + this.getCurrentAMPM(time)
  }
  this.getFormattedHour = function (time) {
    return this.getCurrentHour(time) + ' ' + this.getCurrentAMPM(time)
  }
}
