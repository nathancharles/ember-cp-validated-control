import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { validator, buildValidations } from 'ember-cp-validations';
import EmberObject from '@ember/object';
import setupObject from '../../helpers/setup-object';

module('Integration | Component | cp-validated-control', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows the error message when showValidation is true and there are errors', async function(assert) {
    assert.expect(3);

    const errorMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        message: errorMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').isVisible();
    assert.dom('[data-test-error-message]').hasText(errorMessage);
    assert.dom('[data-test-error-message]').hasAttribute('aria-live', 'polite');
  });

  test('it does not show the error message when showValidation is false and there are errors', async function(assert) {
    assert.expect(1);

    const errorMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        message: errorMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: false,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('it does not show the error message when showValidation is true and there are not errors', async function(assert) {
    assert.expect(1);

    const errorMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        message: errorMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject, {
        foobar: 'I have a value',
      }),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('it shows the warning message when showValidation is true and there are warnings', async function(assert) {
    assert.expect(3);

    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        isWarning: true,
        message: warningMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-warning-message]').isVisible();
    assert.dom('[data-test-warning-message]').hasText(warningMessage);
    assert
      .dom('[data-test-warning-message]')
      .hasAttribute('aria-live', 'polite');
  });

  test('it does not show the warning message when showValidation is false and there are warnings', async function(assert) {
    assert.expect(1);

    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        isWarning: true,
        message: warningMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: false,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-warning-message]').doesNotExist();
  });

  test('it does not show the warning message when showValidation is true and there are not warnings', async function(assert) {
    assert.expect(1);

    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        isWarning: true,
        message: warningMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject, {
        foobar: 'I have a value',
      }),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-warning-message]').doesNotExist();
  });

  test('it only shows error when there is errors and warnings', async function(assert) {
    assert.expect(5);

    const errorMessage = 'foobar should be short';
    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: [
        validator('presence', {
          presence: false,
          isWarning: true,
          message: warningMessage,
        }),
        validator('length', {
          max: 5,
          message: errorMessage,
        }),
      ],
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject, {
        foobar: 'I have a value',
      }),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').isVisible();
    assert.dom('[data-test-error-message]').hasText(errorMessage);
    assert.dom('[data-test-warning-message]').doesNotExist();
    assert.equal(true, this.get('testObject.validations.hasWarnings'));
    assert.equal(true, this.get('testObject.validations.isInvalid'));
  });

  test('it updates the visibility of the error message when showValidation is changed', async function(assert) {
    assert.expect(3);

    const errorMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        message: errorMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').isVisible();
    assert.dom('[data-test-error-message]').hasText(errorMessage);

    this.set('showValidation', false);

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('it updates the visibility of the error message when the validations change', async function(assert) {
    assert.expect(3);

    const errorMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        message: errorMessage,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').isVisible();
    assert.dom('[data-test-error-message]').hasText(errorMessage);

    this.set('testObject.foobar', 'I have a value');

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('it sets the errorClassName when passed', async function(assert) {
    assert.expect(1);

    const Validations = buildValidations({
      foobar: validator('presence', true),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });
    const customClassName = 'my-custom-class';

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
      customClassName
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        @errorClassName={{customClassName}}
        as |cvc|
      >
        <input type="text" name="test-input" data-test-input aria-invalid={{cvc.ariaInvalid}} value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-error-message]').hasClass(customClassName);
  });

  test('it sets the warningClassName when passed', async function(assert) {
    assert.expect(1);

    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        isWarning: true,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });
    const customClassName = 'my-custom-class';

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
      customClassName
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        @warningClassName={{customClassName}}
        as |cvc|
      >
        <input type="text" name="test-input" data-test-input aria-invalid={{cvc.ariaInvalid}} value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-warning-message]').hasClass(customClassName);
  });

  test('it exposes isErrorVisible for error visiblity', async function(assert) {
    assert.expect(2);

    const Validations = buildValidations({
      foobar: validator('presence', true),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
        <button type="button" data-test-button disabled={{cvc.isErrorVisible}}></button>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-button]').isDisabled();

    this.set('testObject.foobar', 'I have a value');

    assert.dom('[data-test-button]').isNotDisabled();
  });

  test('it exposes isWarningVisible for warning visiblity', async function(assert) {
    assert.expect(2);

    const Validations = buildValidations({
      foobar: validator('presence', {
        presence: true,
        isWarning: true,
      }),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
        <button type="button" data-test-button disabled={{cvc.isWarningVisible}}></button>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-button]').isDisabled();

    this.set('testObject.foobar', 'I have a value');

    assert.dom('[data-test-button]').isNotDisabled();
  });

  test('it exposes isValidationVisible for error or warning visiblity', async function(assert) {
    assert.expect(7);

    const errorMessage = 'foobar should be short';
    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: [
        validator('presence', {
          presence: true,
          isWarning: true,
          message: warningMessage,
        }),
        validator('length', {
          max: 5,
          min: 0,
          message: errorMessage,
        }),
      ],
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject, {
        foobar: 'I have a value',
      }),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" value/>
        <button type="button" data-test-button disabled={{cvc.isValidationVisible}}></button>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-button]').isDisabled();
    assert.dom('[data-test-error-message]').isVisible();

    this.set('testObject.foobar', null);

    assert.dom('[data-test-button]').isDisabled();
    assert.dom('[data-test-warning-message]').isVisible();

    this.set('testObject.foobar', 'yep');

    assert.dom('[data-test-button]').isNotDisabled();
    assert.dom('[data-test-error-message]').doesNotExist();
    assert.dom('[data-test-warning-message]').doesNotExist();
  });

  test('it exposes ariaDescribedby for error or warning messages', async function(assert) {
    assert.expect(7);

    const errorMessage = 'foobar should be short';
    const warningMessage = 'foobar should not be empty';
    const Validations = buildValidations({
      foobar: [
        validator('presence', {
          presence: true,
          isWarning: true,
          message: warningMessage,
        }),
        validator('length', {
          max: 5,
          min: 0,
          message: errorMessage,
        }),
      ],
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject, {
        foobar: 'I have a value',
      }),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        @elementId="validated-control"
        as |cvc|
      >
        <input type="text" name="test-input" data-test-input aria-describedby={{cvc.ariaDescribedby}} value/>
      </CpValidatedControl>
    `);

    assert
      .dom('[data-test-input]')
      .hasAttribute('aria-describedby', 'validated-control-message');
    assert
      .dom('[data-test-error-message]')
      .hasAttribute('id', 'validated-control-message');

    this.set('testObject.foobar', null);

    assert
      .dom('[data-test-input]')
      .hasAttribute('aria-describedby', 'validated-control-message');
    assert
      .dom('[data-test-warning-message]')
      .hasAttribute('id', 'validated-control-message');

    this.set('testObject.foobar', 'yep');

    assert.dom('[data-test-input]').doesNotHaveAttribute('aria-describedby');
    assert.dom('[data-test-error-message]').doesNotExist();
    assert.dom('[data-test-warning-message]').doesNotExist();
  });

  test('it exposes ariaInvalid for error visiblity', async function(assert) {
    assert.expect(2);

    const Validations = buildValidations({
      foobar: validator('presence', true),
    });
    const testObject = EmberObject.extend(Validations, {
      foobar: null,
    });

    this.setProperties({
      testObject: setupObject(this, testObject),
      showValidation: true,
    });

    await render(hbs`
      <CpValidatedControl
        @validations={{testObject.validations.attrs.foobar}}
        @showValidation={{showValidation}}
        as |cvc|
      >
        <input type="text" name="test-input" data-test-input aria-invalid={{cvc.ariaInvalid}} value/>
      </CpValidatedControl>
    `);

    assert.dom('[data-test-input]').hasAttribute('aria-invalid', '');

    this.set('testObject.foobar', 'I have a value');

    assert.dom('[data-test-input]').doesNotHaveAttribute('aria-invalid');
  });
});
