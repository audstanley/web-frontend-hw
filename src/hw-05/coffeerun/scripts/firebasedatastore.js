(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class FireBaseDataStore {
        constructor() {
            console.log('running the FireBaseDataStore function');
            firebase.initializeApp(window.FireBaseConfig);
            this.firestore = firebase.firestore();
        }
        async add(key, val) {
            const docRef = this.firestore.doc(`coffeeorders/${this.makeDocHash(20)}`);
            return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
        }
        async get(email, cb)  { 
            const docRef = this.firestore.collection(`coffeeorders`);
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.firestore.collection(`coffeeorders`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(email)   { 
            const docRef = await this.firestore.collection(`coffeeorders`);
            const batch = this.firestore.batch();
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        makeDocHash(len) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < len; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
    }
    App.FireBaseDataStore = FireBaseDataStore;
    window.App = App;

})(window);