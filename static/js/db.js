 import data from "./data.js";

/**
 * Class representing the database.
 */
class DB {
    constructor() {
        this._data = data;
    }

    /**
     * Get all data from the database.
     * @returns {Array<Object>} An array of all cat objects.
     */
    getAll() {
        return this._data;
    }

    /**
     * Get a data by its ID.
     * @param {number} id - The ID of the data to retrieve.
     * @returns {Object|null} The data object if found, or null if not found.
     */
    getByID(id) {
        return this._data.find(cat => parseInt(cat.id) === parseInt(id)) || null;
    }


    getByDisplay() {
        return this._data.filter(item => item.isOnDisplay)
    }

    /**
     * Save a data obj to the database.
     * If the data exists, it will be updated; otherwise, it will be added.
     */
    save(data) {
        const index = this._data.findIndex(item => item.id === data.id);
        const NOT_FOUND = -1;

        if (typeof data !== "object") {
            throw new Error(`The data to be saved must be an object. Expected and object got ${typeof data}`);
        }
        if (index !== NOT_FOUND && data) {
            this._data[index] = data;
        } else {
            this._data.push(data)   
        }
       
    }

    /**
     * Reset the data to its previous state
     */
    static reset() {
       data.forEach((dataObj)  => {
         if (dataObj.liked) {
            dataObj.liked = 0;
         }
       })

    }
}

export default DB;

