"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fluencyModel = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FluencyAnalysisSchema = new Schema({
    text: {
        type: String,
    },
    analysis: {
        english_sentence_structures: {
            type: String,
        },
        filler_and_repetitive_words: {
            type: String,
        },
        fluency_score: {
            type: String,
        },
        feedback_for_improvement: {
            type: [String],
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Create the model
exports.fluencyModel = mongoose.model("FluencyModel", FluencyAnalysisSchema);
