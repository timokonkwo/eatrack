/**
 * This project uses the JavaScript module design pattern
 * Module pattern makes use of IIFEs
 * functions in an IIFE function are private and cannot be accessed outside
 * Only returned methods/functions are public and accessible
 */


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



/** 
 * ====== UI CONTROLLER ====== *
 * Handles everything related to the interface of the App 
 * displays and inserts data to the DOM
 */
const UICtrl = (function() {
    /* UI Selectors */
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        clearAllBtn: '.clear-btn',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        editBtn: '.edit-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        totalCalories: '.total-calories'
    }


    /* Public Methods */
    return {
        populateItemList: items => {
            /* Create li items and send to the DOM */
            let html = '';

            /* Loop throught the items and add to the html */
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });

            /* Insert the list items to the ul in the DOM */
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        /* get the user entered item */
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        /* Remove all items from UI */
        clearList: () => {
            /* Get all list items */
            const listItems = document.querySelectorAll(UISelectors.listItems);
            /* remove all */
            Array.from(listItems).forEach(item => item.remove());
        },

        /* Function to add items to UI */
        addListItem: item => {
            /* Show the ul list */
            document.querySelector(UISelectors.itemList).style.display = 'block';
            /* Create li item */
            const li = document.createElement('li');
            /* Add class */
            li.className = 'collection-item';
            /* Add ID */
            li.id = `item-${item.id}`;
            /* Set the inner HTML of the list item */
            li.innerHTML = `
            <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>
            `;
            /* Insert the li into the ul */
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },

        /* Update the item in the UI */
        updateListItem: item => {
            /* Get all list items (returns a node list)*/
            let listItems = document.querySelectorAll(UISelectors.listItems);

            /* Turn node list into array and loop through to get the actual item */
            Array.from(listItems).forEach(listItem => {
                /* Get current item's id */
                let foundID = listItem.id;

                /* Check if it matches with the updated item id */
                if (foundID === `item-${item.id}`) {
                    /* Update it's content */
                    document.querySelector(`#${foundID}`).innerHTML = `
                    <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    `;
                }
            })
        },

        deleteListItem: (id) => document.querySelector(`#item-${id}`).remove(),

        /* Clear the input field after submit */
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        /* insert the item to edit into the fields */
        addEditItem: item => {
            document.querySelector(UISelectors.itemNameInput).value = item.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
        },

        /* hide li if no item is added */
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        /* Show total calories in the UI */
        showTotalCalories: totalCalories =>
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories,

        /* Hide the edit state buttons */
        clearEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        /* Show the edit state buttons */
        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        /* Make UI selectors accessible to other CTRLs */
        getUISelectors: () => UISelectors

    };
})()


/** 
 * ====== APP CONTROLLER ====== *
 * Initializes the App
 * Combines every other controller together.
 */

const App = (function(StorageCtrl, ItemCtrl, UICtrl) {

    /* Load Event Listeners */
    const loadEventListeners = function() {

        /* Get UI Selectors from UI Ctrl */
        const UISelectors = UICtrl.getUISelectors();

        /* Event item - Add button */
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        /* Disable submit by enter */
        document.addEventListener('keypress', e => {
            if (e.key === "Enter") {
                e.preventDefault();
                return false;
            }
        })

        /* Event item - clear all button */
        document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllClick);

        /* Event item - edit button */
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        /* Event item - update button */
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        /* Event item - delete button */
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItemClick);

        /* Event item - back button */
        document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnClick);

    }

    /* function to clear all items */
    const clearAllClick = e => {
        /* clear all items from data structure */
        ItemCtrl.clearAll();

        /* clear from localStorage */
        StorageCtrl.clearStorage();

        /* Clear all items from UI */
        UICtrl.clearList();

        /* Prevent browser's defalut */
        e.preventDefault();

        /* Get new total calories */
        const totalCalories = ItemCtrl.getTotalCalories();

        /* Add total calories to UI */
        UICtrl.showTotalCalories(totalCalories);

        /* Hide the list to remove ul line */
        UICtrl.hideList();

        /* Clear the input fields */
        UICtrl.clearInput();

        /* Clear the edit state */
        UICtrl.clearEditState();

    }

    /* Adding and submitting item */
    const itemAddSubmit = e => {

        /* Get User Input from UI CTRL */
        const input = UICtrl.getItemInput();

        /* Make sure the input field's not empty*/
        if (input.name !== '' && input.calories !== '') {
            /* pass input values to Item CTRL (to create the item) and store the result */
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            /* Save to local storage */
            StorageCtrl.setStorage(ItemCtrl.getItems());

            /* Add item to UI list */
            UICtrl.addListItem(newItem);

            /* Get total calories */
            const totalCalories = ItemCtrl.getTotalCalories();

            /* Add total calories to UI */
            UICtrl.showTotalCalories(totalCalories);

            /* Clear the input fields */
            UICtrl.clearInput();
        }

        /* Prevent form's default behaviour */
        e.preventDefault();
    }

    /* Function to handle item editing */
    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {
            /* Get the list item id (item-0, item-1, etc) */
            const listId = e.target.parentElement.parentElement.id;

            /* split the 'item-*' into array and get the actual id */
            const id = parseInt(listId.split('-')[1])

            /* Get the item to edit */
            itemToEdit = ItemCtrl.getItemById(id);

            /* Set Current Item */
            ItemCtrl.setCurrentItem(itemToEdit);

            /* Add the item to edit in the field */
            UICtrl.addEditItem(itemToEdit);

            /* show the edit state */
            UICtrl.showEditState();

            /* Prevent form's default behaviour */
            e.preventDefault();
        }
    }

    /* Funtion to handle updating an item */
    const itemUpdateSubmit = function(e) {

        /* Get the new input (edited item) */
        const input = UICtrl.getItemInput();

        /* Update item */
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        /* Save to local storage */
        StorageCtrl.setStorage(ItemCtrl.getItems());

        /* Update the item in the UI */
        UICtrl.updateListItem(updatedItem);

        /* Get new total calories */
        const totalCalories = ItemCtrl.getTotalCalories();

        /* Add total calories to UI */
        UICtrl.showTotalCalories(totalCalories);

        /* Clear the edit state */
        UICtrl.clearEditState();

        /* Clear the input fields */
        UICtrl.clearInput();

        /* Prevent form's default behaviour */
        e.preventDefault();
    }

    /* Function to delete an item */
    const deleteItemClick = (e) => {

        /* Get the current item's id to delete */
        const itemID = ItemCtrl.getCurrentItem().id;

        /* Delete item from data structure */
        ItemCtrl.deleteItem(itemID);

        /* Save new local storage */
        StorageCtrl.setStorage(ItemCtrl.getItems());

        /* Delete item from UI */
        UICtrl.deleteListItem(itemID)

        /* Get new total calories */
        const totalCalories = ItemCtrl.getTotalCalories();

        /* Add total calories to UI */
        UICtrl.showTotalCalories(totalCalories);

        /* Clear the input fields */
        UICtrl.clearInput();

        /* Clear the edit state */
        UICtrl.clearEditState();

        /* Prevent form's default behaviour */
        e.preventDefault();
    }

    /* Function for back button */
    const backBtnClick = e => {

        /* Clear the input fields */
        UICtrl.clearInput();

        /* Clear the edit state */
        UICtrl.clearEditState();

        /* Prevent browser's defalut */
        e.preventDefault();

    }


    /* Public Methods */
    return {
        init: function() {

            /* Initially hide the edit state until edit btn is clicked */
            UICtrl.clearEditState()

            /* Fetch items from the Item Ctrl's Data structure */
            // const items = ItemCtrl.getItems();

            /* Fetch items from the Item LocalStorage */
            let items = StorageCtrl.getStoredItems();

            /* Set items to data structure */
            ItemCtrl.setItems(items)

            /* Check if there are any item */
            if (items == null) {
                /* Hide the list to remove ul line */
                UICtrl.hideList();
            } else {
                /* Populate the list of calories in the UI */
                UICtrl.populateItemList(items);

                /* Get new total calories */
                const totalCalories = ItemCtrl.getTotalCalories();

                /* Add total calories to UI */
                UICtrl.showTotalCalories(totalCalories);
            }

            /* Load Event Listeners */
            loadEventListeners();
        },
    }
})(StorageCtrl, ItemCtrl, UICtrl);

/* Initialize the App */
App.init();
