export default {
  formatDate(dbDate) {
    if (!dbDate) return ''
    const ar = dbDate.split('-')
    return ar[2] + '.' + ar[1] + '.' + ar[0]
  }
}