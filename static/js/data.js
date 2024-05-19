/**
 * This file contains an array of cat objects, each with specific attributes such as id, name, home, age,
 * gender, kind, description, and the number of time it has been liked. These objects will be used to
 * populate the custom database which will used by the frontend application.
 */

const data = [
    {
        id: 1,
        name: "Whiskers",
        home: "UK",
        age: 2,
        gender: "Male",
        kind: "British Shorthair",
        description: "Whiskers is a playful and affectionate British Shorthair with a soft grey coat. He loves to chase after toys and snuggle up on the couch. With his friendly disposition and charming personality, Whiskers quickly becomes the heart of any household he enters.",
        liked: 0,
        isOnDisplay: true,
    },
    {
        id: 2,
        name: "Mittens",
        home: "USA",
        age: 3,
        gender: "Female",
        kind: "Siamese",
        description: "Mittens is a curious and intelligent Siamese cat with striking blue eyes. She enjoys exploring her surroundings and engaging in interactive play. Her sleek, elegant appearance is matched by her affectionate nature, making her a wonderful companion for any cat lover.",
        liked: 0,
        isOnDisplay: false,
    },
    {
        id: 3,
        name: "Shadow",
        home: "Canada",
        age: 1,
        gender: "Male",
        kind: "Maine Coon",
        description: "Shadow is a large and fluffy Maine Coon who loves to explore. Despite his size, he is gentle and friendly, always eager to meet new people and animals. His adventurous spirit and loving demeanor make him a delightful addition to any family looking for a loyal and entertaining pet.",
        liked: 0,
        isOnDisplay: false,
    },
    {
        id: 4,
        name: "Luna",
        home: "Australia",
        age: 4,
        gender: "Female",
        kind: "Persian",
        description: "Luna is a gentle and elegant Persian cat with a luxurious white coat. She enjoys a relaxed lifestyle, often found lounging in sunny spots or receiving gentle pets. Her calm and affectionate personality, along with her stunning appearance, makes her the perfect companion for a serene and loving home.",
        liked: 0,
        isOnDisplay: false,
    },
    {
        id: 5,
        name: "Simba",
        home: "South Africa",
        age: 3,
        gender: "Male",
        kind: "Bengal",
        description: "Simba is a striking Bengal cat with a wild appearance and a heart of gold. He has an energetic personality and loves to climb and explore. His unique coat and playful nature make him a standout in any setting, while his affectionate side ensures he forms strong bonds with his family.",
        liked: 0,
        isOnDisplay: false,
    }
];



export default data;