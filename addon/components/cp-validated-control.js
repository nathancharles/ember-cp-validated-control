import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { or } from '@ember/object/computed';
import layout from '../templates/components/cp-validated-control';

/**
 * cp-validated-control component
 * This handles the visibility of validation messages for ember-cp-validations.
 * This allows any control element to be wrapped and provides state variables in the wrapped context.
 *
 * @class CpValidatedControl
 * @module Component
 * @extends Ember.Component
 *
 * @param {ResultCollection} validations - ember-cp-validation object for the given attribute.
 * @param {Boolean} showValidations - Flag to determine the visibility of the messages.
 * @param {String} errorClassName - (optional) Custom class name for the error message.
 * @param {String} warningClassName - (optional) Custom class name for the warning message.
 *
 * @property {Boolean} isErrorVisible - Indicates error message visibility.
 * @property {Boolean} isWarningVisible - Indicates warning message visibility.
 * @property {Boolean} isValidationVisible - Indicates either the error message or warning message visibility.
 * @property {String} ariaDescribedby - The id of the message container for the aria-describedby attribute on the control.
 * @property {Boolean} ariaInvalid - Indicates if the attribute is invalid and the error message is visibile.
 *
 * @example ```hbs
 * <CpValidatedControl
 *   @validations={{model.validations.attrs.foobar}}
 *   @showValidation={{showValidation}}
 *   @errorClassName="my-custom-error-message"
 *   @warningClassName="my-custom-warning-message"
 *   as |cvc| >
 *   <input
 *     type="text"
 *     name="foobar"
 *     aria-describedby={{cvc.ariaDescribedby}}
 *     aria-invalid={{cvc.ariaInvalid}}
 *     value={{model.foobar}} />
 * </CpValidatedControl>
 * ```
 */
export default Component.extend({
  layout,

  /**
   * Flag to control error message visibility
   *
   * @property {Boolean} showError
   * @public
   */
  showError: computed(
    'validations.{isValidating,isTruelyInvalid}',
    'showValidation',
    function() {
      return (
        get(this, 'showValidation') &&
        get(this, 'validations.isTruelyInvalid') &&
        !get(this, 'validations.isValidating')
      );
    }
  ).readOnly(),

  /**
   * Flag to control warning message visibility
   *
   * @property {Boolean} showWarning
   * @public
   */
  showWarning: computed(
    'validations.{isValidating,hasWarnings}',
    'showValidation',
    function() {
      return (
        get(this, 'showValidation') &&
        get(this, 'validations.hasWarnings') &&
        !get(this, 'showError') &&
        !get(this, 'validations.isValidating')
      );
    }
  ).readOnly(),

  /**
   * Flag to communicate message visibility
   *
   * @property {Boolean} isValidationVisible
   */
  isValidationVisible: or('showError', 'showWarning').readOnly(),

  /**
   * Property to define the aria-described by attribute.
   * Used for the message element id.
   *
   * @property {String|Null} ariaDescribedby
   * @public
   */
  ariaDescribedby: computed('isValidationVisible', function() {
    if (get(this, 'isValidationVisible')) {
      return `${get(this, 'elementId')}-message`;
    }
    return null;
  }),
});
