(function (window) {
    'use strict';
    var App = window.App || {};

    class Truck {
        constructor(truckId, db) {
            console.log('running the Truck function');
            this.truckId = truckId;
            this.db = db;
        }
        createOrder(order) {
            console.log(`Adding order for ${order.emailAddress}`);
            return this.db.add(order.emailAddress, order);
        }
        deliverOrder(customerId) {
            console.log(`Delerving order for ${customerId}`);
            return this.db.remove(customerId);
        }
        printOrder() {
            Object.keys(this.db.getAll()
                .then(allData => {
                    allData.forEach(function(id) {
                        this.db.get(id).then(data => {
                            console.log(data);
                        });
                    }, this);
                    console.log(`Truck #${this.truckId} has pending orders:`);
            }));
        }
    }

    App.Truck = Truck;
    window.App = App;
})(window);