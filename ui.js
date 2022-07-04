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