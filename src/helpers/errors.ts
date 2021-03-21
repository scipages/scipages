/**
 * https://github.com/laracasts/Vue-Forms/blob/master/public/js/app.js
 * https://laracasts.com/series/learn-vue-2-step-by-step/episodes/20
 */
export class Errors {
  private errors: Record<string, Array<string>>

  /**
   * Create a new Errors instance.
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   */
  has (field: string) {
    return Object.prototype.hasOwnProperty.call(this.errors, field)
  }

  /**
   * Determine if we have any errors.
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   */
  get (field: string) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record (errors: Record<string, Array<string>>) {
    this.errors = errors
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear (field: string|null = null) {
    if (field) {
      delete this.errors[field]

      return
    }

    this.errors = {}
  }
}

export default Errors
