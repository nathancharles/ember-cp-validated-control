ember-cp-validated-control
==============================================================================

A wrapper for ember-cp-validations for handling the visibility of error and warning messages, as well as providing the display state of the validations. This is also A11Y friendly by communicating message changes via [aria-live="polite"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) and providing [aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute) and [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute) attributes to integrate with the wrapped control.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
npm install ember-cp-validated-control
```


Usage
------------------------------------------------------------------------------

### Example
```hbs
<CpValidatedControl
  @validations={{model.validations.attrs.foobar}}
  @showValidation={{showValidation}}
  @errorClassName="my-custom-error-message"
  @warningClassName="my-custom-warning-message"
  as |cvc| >
  <input
    type="text"
    name="foobar"
    aria-describedby={{cvc.ariaDescribedby}}
    aria-invalid={{cvc.ariaInvalid}}
    value={{model.foobar}} />
</CpValidatedControl>
```

### API
Property | Type | Description
-------- | ---- | -----------
validations | [ResultCollection](http://offirgolan.github.io/ember-cp-validations/docs/classes/ResultCollection.html) | ember-cp-validation object for the given attribute.
showValidations | Boolean | Flag to determine the visibility of the messages.
errorClassName | String | (optional) Custom class name for the error message.
warningClassName | String | (optional) Custom class name for the warning message.

### Exposed Properties
Property | Type | Description
-------- | ---- | -----------
isErrorVisible | Boolean | Indicates error message visibility.
isWarningVisible | Boolean | Indicates warning message visibility.
isValidationVisible | Boolean | Indicates either the error message or warning message visibility.
ariaDescribedby | String | The id of the message container for the aria-describedby attribute on the control.
ariaInvalid | Boolean | Indicates if the attribute is invalid and the error message is visibile.

Contributing
------------------------------------------------------------------------------

If you would like to contribute, you can fork the project, edit, and make a pull request. Please make sure you have passing tests and updated documentation.


### Installation

* `git clone <repository-url>`
* `cd ember-validated-input`
* `yarn install`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
