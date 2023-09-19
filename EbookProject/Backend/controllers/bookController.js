const Book = require("../models/Book");

const bookController = {
getAllBooks: async (req, res) => {
    try {
    const books = await Book.find();
    res.json(books);
    } catch (err) {
    console.log(err);
    }
},

addBook: async (req, res) => {
    try {
    const newBook = await Book.create(req.body);
    res.status(200).json({ msg: "New book added", newBook });
    } catch (err) {
    console.error(err);
    // Handle the error appropriately, e.g., by sending an error response
    res.status(500).json({ error: "Internal server error" });
    }
},

updateBook: async (req, res) => {
    try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, {
        $set: { ...req.body },
    });
    res.status(200).json({ msg: "you could update me", updateBook });
    } catch (err) {
    console.log(err);
    }
},

deleteBook: async (req, res) => {
    try {
    const { id } = req.params;
    const deletcont = await Book.findByIdAndDelete(id);
    res.status(200).json({ msg: "you deleted that Book" });
    } catch (err) {
    console.log(err);
    }
},

getBook: async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.json(book);
    } catch (err) {
        console.log(err);
    }
},

searchBooksByTitle: async (req, res) => {
    try {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: "Title parameter is required" });
    }

    const searchResults = await Book.find({
        title: { $regex: title, $options: "i" },
    });

    res.status(200).json(searchResults);
    } catch (error) {
    console.error("Error searching for books:", error);
    res
        .status(500)
        .json({ error: "An error occurred while searching for books" });
    }
},

searchBooksByKeyword: async (req, res) => {
    const keyword = req.params.keyword;
    const searchBy = req.query.searchBy || "Keyword"; // Default to searching by Title if not specified

    try {
    let query = {};

    if (searchBy === "Keyword") {
        query = { description: { $regex: keyword, $options: "i" } };
    } else if (searchBy === "Authors") {
        query = { authors: { $regex: keyword, $options: "i" } };
    } else if (searchBy === "Categories") {
        query = { categories: { $regex: keyword, $options: "i" } };
    } else if (searchBy === "Language") {
        query = { language: { $regex: keyword, $options: "i" } };
    } else if (searchBy === "Date") {
        // Assuming there's a date field in your schema
        query = { publishedDate: { $regex: keyword, $options: "i" } };
    } else if (searchBy === "Title") {
        query = { title: { $regex: keyword, $options: "i" } };
    }

    const foundBooks = await Book.find(query);

    res.json(foundBooks);
    } catch (error) {
    console.error("Error searching Books by Keyword:", error);
    res
        .status(500)
        .json({ error: "An error occurred while searching for books." });
    }
},

uploadPdf: async (req, res) => {
    try {
    const bkpdfUrl = `/pdfFile/${req.file.filename}`;

    if (!bkpdfUrl) {
        return res.status(404).json({ error: "url not created" });
    }

    res.status(200).json({ message: "file uploaded successfully", bkpdfUrl });
    } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "file upload failed" });
    }
},
};

module.exports = bookController;
