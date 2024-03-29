const mongoose = require("mongoose");

//PublicationSchema
const PublicationSchema = mongoose.Schema ({
    id: Number,
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    books: [String],
});

//Publication model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;