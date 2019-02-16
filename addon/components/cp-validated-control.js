import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { or } from '@ember/object/computed';
import layout from '../templates/components/cp-validated-control';

export default Component.extend({
  layout,

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

  isValidationVisible: or('showError', 'showWarning').readOnly(),

  ariaDescribedby: computed('isValidationVisible', function () {
    return get(this, 'isValidationVisible') ? get(this, 'messageId') : null;
  }),

  init() {
    this._super(...arguments);
    set(this, 'messageId', `${get(this, 'elementId')}-message`);
  },
});
