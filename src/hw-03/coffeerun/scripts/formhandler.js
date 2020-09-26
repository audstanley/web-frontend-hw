(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App || {};
    var $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            // code will go here
            console.log('Inside FormHandler');
            if (!selector) { throw new Error('No selector provided'); }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addSubmitHandler(fn) {
            console.log('Setting submit handler for form with fn:', fn);
            this.$formElement.on('submit', function (event) {
                event.preventDefault();

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                
                $('#modal-body')
                    .html(() => {
                        return `
                            <p>Coffee: ${data.coffee}</p>
                            <p>Email: ${data.emailAddress}</p>
                            <p>Flavor: ${data.flavor}</p>
                            <p>Strength: ${data.strength}</p>
                        `;
                    });
                $("#myModal").modal();
                
                console.log(`DATA: ${JSON.stringify(data)}`);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);