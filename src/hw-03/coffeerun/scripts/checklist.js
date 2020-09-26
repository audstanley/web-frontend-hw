(function (window) {
    'use strict';
    var App = window.App || {};

    class CheckList {
        constructor(selector) {
            if(!selector) {
                throw new Error('no selector provided');
            }
            this.$element = $(selector);
            if (this.$element.length === 0) {
                throw new Error('Could not find element with selector:' + selector);
            }
        }
        addClickHandler(fn) {
            this.$element.on('click', 'input', function(event) {
                var email = event.target.value;
                this.removeRow(email);
                fn(email);
            }.bind(this));
        }
        addRow(coffeeOrder) {
            this.removeRow(coffeeOrder.emailAddress);
            
            var rowElement = new Row(coffeeOrder);
            this.$element.append(rowElement.$element);
        }
        removeRow(email) {
            this.$element
                .find(`[value="${email}"]`)
                .closest('[data-coffee-order="checkbox"]')
                .remove();
        }
    }


    class Row {
        constructor(coffeeOrder) {
            var $div = $(`<div></div>`, {
            'data-coffee-order': 'checkbox', 'class': 'checkbox' 
            });
            var $label = $('<label></label>');

            var $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: coffeeOrder.emailAddress
            });

            var $description = coffeeOrder.size + ' ';

            $description += `${coffeeOrder.coffee} `;
            $description += `${coffeeOrder.emailAddress}`;
            $description += `${coffeeOrder.strength}`;

            $label.append($checkbox);
            $label.append($description);
            $div.append($label);

            this.$element = $div;
        }
        
    }

    App.CheckList = CheckList;
    // App.Row = Row;
    window.App = App;
})(window);