/**
 * This project uses the JavaScript module design pattern
 * Module pattern makes use of IIFEs
 * functions in an IIFE function are private and cannot be accessed outside
 * Only returned methods/functions are public and accessible
 */

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