/**
 * This project uses the JavaScript module design pattern
 * Module patter makes use of IIFEs
 * functions in an IIFE function are private and cannot be accessed outside
 * Only returned methods/functions are public and accessible
 */


/**
 *  ====== STORAGE CONTROLLER ======
 * Handles everything related to Local Storage for this App */




/**
 * ====== ITEM CONTROLLER ====== *
 * Handles everything related to the items and it's methods for this App 
 * Item constructor
 * todo item methods, etc
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
        items: [
            { id: 0, name: "Egusi soup", calories: 1150 },
            { id: 1, name: "Egg source", calories: 300 },
            { id: 2, name: "Beans & Plantain", calories: 700 }
        ],
        currentItem: null,
        totalCalories: 0,
    };

    /* Public Methods */
    return {
        getItems: () => data.items,
        logData: () => data,
        addItem: (name, calories) => {
            /* Create ID for item */
            let ID;

            if (data.items.length > 0) {
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

            return newItem;
        },

        getTotalCalories: () => {
            let totalCalories = 0;

            /* Loop through items and add calories */
            data.items.forEach(item => totalCalories += item.calories);

            /* Set total calories */
            data.totalCalories = totalCalories;

            /* return the total calories to the App CTRL */
            return data.totalCalories;
        }
    };

})();



/** 
 * ====== UI CONTROLLER ====== *
 * Handles everything related to the interface of this App 
 * displays data to the DOM
 */
const UICtrl = (function() {
    /* UI Selectors */
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
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
            /*Create li items and send to the DOM*/
            let html = '';

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

        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: item => {
            /* Show the ul list */
            document.querySelector(UISelectors.itemList).style.display = 'block';
            /* Create li item */
            const li = document.createElement('li');
            /* Add class */
            li.className = 'collection-item';
            /* Add ID */
            li.id = `item-${item.id}`;
            li.innerHTML = `
            <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>
            `
                /* Insert li into the ul */
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },

        /* Clear the input field after submit */
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
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

const App = (function(ItemCtrl, UICtrl) {

    /* Load Event Listeners */
    const loadEventListeners = function() {

        /* Get UI Selectors from UI Ctrl */
        const UISelectors = UICtrl.getUISelectors();

        /* Event item - Add button */
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        /* Event item - edit button */
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    }

    /* Add item submit */
    const itemAddSubmit = e => {

        /* Get User Input from UI CTRL */
        const input = UICtrl.getItemInput();

        /* Make sure the input field's not empty*/
        if (input.name !== '' && input.calories !== '') {
            /* pass input values to Item CTRL (to create the item) and store the result */
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            /* Add item to UI list */
            UICtrl.addListItem(newItem);

            /* Get total calories */
            const totalCalories = ItemCtrl.getTotalCalories();

            /* Add total calories to UI */
            UICtrl.showTotalCalories(totalCalories);

            /* Clear the input fields */
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    /* Function to handle item editing */
    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {
            UICtrl.showEditState();

        }
    }


    /* Public Methods */
    return {
        init: function() {

            /* Initially hide the edit state until edit btn is clicked */
            UICtrl.clearEditState()

            /* Fetch items from the Item Ctrl's Data structure */
            const items = ItemCtrl.getItems();

            /* Check if there are any item */
            if (items.length === 0) {
                /* Hide the list to remove ul line */
                UICtrl.hideList();
            } else {
                /* Populate the list of calories in the UI */
                UICtrl.populateItemList(items);
            }

            /* Load Event Listeners */
            loadEventListeners();
        },
    }
})(ItemCtrl, UICtrl);

App.init();