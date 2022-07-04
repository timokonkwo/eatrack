/**
 *  ====== STORAGE CONTROLLER ======
 * Handles everything related to Local Storage for this App */

const StorageCtrl = (function() {

    return {
        setStorage: items => localStorage.setItem('data', JSON.stringify(items)),

        getStoredItems: () => JSON.parse(localStorage.getItem('data')),

        clearStorage: () => localStorage.clear()
    }

})();