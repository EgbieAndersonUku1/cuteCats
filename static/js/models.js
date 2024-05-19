import DB from "./db.js";

const db = new DB();

/**
 * Class representing a Cat.
 */
class Cat {
    constructor() {
        this.id          = null;
        this.name        = null;
        this.home        = null;
        this.age         = null;
        this.gender      = null;
        this.kind        = null;
        this.description = null;
        this.liked       = null;
        this.isOnDisplay = false;
    }
    /**
     * Get all cats from the database.
     * @returns {Array<Object>} An array of all cat objects.
     */
    static getAllCats() {
        return db.getAll();
    }

    /**
     * Get the cat item on display from the database.
     * @returns {Cat|null} A Cat instance if found, or null if not found.
     */
    static getCurrentCatOnDisplay() {
        const catData = db.getByDisplay();
        return catData ? Cat._toClassObject(catData) : null;
    }

    /**
     * Get a cat by its ID.
     * @param {number} id - The ID of the cat to retrieve.
     * @returns {Cat|null} A Cat instance if found, or null if not found.
     */
    static getCatByID(id) {
        const catData = db.getByID(id);
        return catData ? Cat._toClassObject(catData) : null;
    }

    /**
     * Increment the click count of the cat.
     */
    updateLike() {
        this.liked++;
    }

    /**
     * Convert the cat instance to a plain object.
     * @returns {Object} The plain object representation of the cat instance.
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            home: this.home,
            age: this.age,
            gender: this.gender,
            kind: this.kind,
            like: this.like,
            description: this.description,
            isOnDisplay: this.isOnDisplay,
        };
    }

    /**
     * Convert a plain object to a Cat instance.
     * @param {Object} catData - The plain object representation of the cat.
     * @returns {Cat} The Cat instance.
     */
    static _toClassObject(catData) {
        const cat  = new Cat();
        const data = Array.isArray(catData) ? catData[0] : catData
       
       if (data) {
        cat.id          = data.id;
        cat.name        = data.name;
        cat.home        = data.home;
        cat.age         = data.age;
        cat.gender      = data.gender;
        cat.kind        = data.kind;
        cat.description = data.description;
        cat.liked       = data.liked;
        cat.isOnDisplay = data.isOnDisplay;

        cat.save();
        return cat;
       }
       
        return null;
    }

    /**
     * Save the cat to the database.
     */
    save() {
        db.save(this);
    }

    /**
     * Reset the DB to its initial state
     */
    static reset() {
        DB.reset();
      
    }
}

export default Cat;
