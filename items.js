/**
 * ====== ITEM CONTROLLER ====== *
 * Handles everything related to the items and it's methods for this App 
 * Item constructor
 * item methods, etc
 */

const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0,
    };

    /* Public Methods */
    return {
        setItems: items => items == null ? data.items = [] : data.items = items,
        getItems: () => data.items,
        logData: () => data,
        addItem: (name, calories) => {
            /* Create ID for the item */
            let ID;
            if (data.items.length) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            /* Convert the calories input to number */
            calories = parseInt(calories);

            /* Call item constructor and create item */
            newItem = new Item(ID, name, calories);

            /* Add item to items array */
            data.items.push(newItem);

            /* returns the added item to app for other purposes like inserting to the DOM */
            return newItem;
        },

        getTotalCalories: () => {
            /* initialize total calories */
            let totalCalories = 0;

            /* Loop through items and add calories */
            data.items.forEach(item => totalCalories += item.calories);

            /* Set total calories */
            data.totalCalories = totalCalories;

            /* return the total calories to the App CTRL */
            return data.totalCalories;
        },

        /* Get the item by it's id */
        getItemById: id => {
            /* Initialize found */
            let found = null;

            /* Loop through the items to find item with the id */
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            })

            /* return the found item with id */
            return found;
        },

        /* Clear all items */
        clearAll: () => data.items = [],

        /* Update the item */
        updateItem: (name, calories) => {
            /* convert the calories to number */
            calories = parseInt(calories);

            /* initialize the found item */
            let found = null;

            /* loop through items to find the item to update */
            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },

        deleteItem: id => data.items.splice(id, 1),

        getCurrentItem: () => data.currentItem,

        /* set current item in the data structure */
        setCurrentItem: item => data.currentItem = item
    };

})();