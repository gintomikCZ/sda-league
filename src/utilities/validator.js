export default {

  required (v) {
    return (typeof v !== 'undefined') && (v !== null) && (v !== '')
  },
  minLength (v, par) {
    return typeof v === 'string' && v.length >= par
  },
  maxLength (v, par) {
    return typeof v === 'string' && v.length <= par
  }
}

