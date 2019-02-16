import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { or } from '@ember/object/computed';
import layout from '../templates/components/cp-validated-control';

/**
 * cp-validated-control component
 * This handles the visibility of validation messages for ember-cp-validations.
 * This allows any control element to be wrapped and provides state variables in the wrapped context.
 *
 * @example ```hbs
 * <CpValidatedControl
 *   @validations={{model.validations.attrs.foobar}}
 *   @showValidation={{showValidation}}
 *   as |cvc| >
 *   <input
 *     type="text"
 *     name="foobar"
 *     aria-describedby={{cvc.ariaDescribedby}}
 *     aria-invalid={{cvc.ariaInvalid}}
 *     value={{model.foobar}} />
 * </CpValidatedControl>
 * ```
 *
 * @class CpValidatedControl
 * @module Component
 * @extends Ember.Component
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
