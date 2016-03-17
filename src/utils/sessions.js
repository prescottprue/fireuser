export default (ref) => {
  const methods = {
    /** Get the number of sessions between two times
     * @param {Number} startTime - The time at which to start the between period (in UTC ms).
     * @param {Number} endTime - The time at which to start the between period (in UTC ms).
     * @return {Promise}
     */
    sessionsBetween (time1, time2) {
      return ref.child('sessions')
        .orderByChild('ended')
        .startAt(time1)
        .endAt(time2)
        .once('value')
        .then(sessionsSnap => sessionsSnap.numChildren())
    },

    /** Get the number of sessions since a specific time
     * @param {String} time - The UTC time to calculate from
     * @return {Promise}
     */
    sessionsSince: time => {
      return ref.child('sessions')
        .orderByChild('ended')
        .startAt(time)
        .endAt(Date.now())
        .once('value')
        .then(snap => snap.numChildren())
    },

    /**
     * Calculate average session length
     * @return {Promise}
     * @example
     * //Get the average session length
     * fa.averageSessionLength(function(count){
     *  console.log('The average session length is ~' + count ' mins')
     * })
     */
    averageSessionLength () {
      return ref.child('sessions')
        .once('value')
        .then(sessionsSnap => {
          let totalLength = null
          let sessionCount = sessionsSnap.numChildren()
          sessionsSnap.forEach(sessionSnap => {
            if (sessionSnap.val().hasOwnProperty('ended') && sessionSnap.val().hasOwnProperty('began')) {
              totalLength = totalLength + ((sessionSnap.val().ended - sessionSnap.val().began) / (1000 * 60))
              return
            }
            sessionCount--
          })
          return Math.floor(totalLength / sessionCount)
        })
    },
    /** Remove a user's sessions from the sessions record
     * @param {String} uid - The UID of the user for which to remove sessions.
     * @return {Promise}
     */
    removeUserSessions: uid => {
      return ref.child('sessions')
        .orderByChild('user')
        .equalTo(uid)
        .once('value').then(sessionsSnap => {
          sessionsSnap.forEach(session => session.ref().remove())
          return sessionsSnap.numChildren()
        })
    }
  }
  return Object.assign(
    {},
    methods
  )
}
