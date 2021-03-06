// WHEN I PUT THIS IN, THE SERVER DOES NOT WORK AND I GET (ERR)
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//
//
///////////////////////////
//                       //
//    THOUGHTS SCHEMA    //
//                       //
///////////////////////////
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // need a username to post a thought
    username: {
      type: String,
      required: true,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
//////////////////////////
//                      //
//    CREATE VIRTUAL    //
//                      //
//////////////////////////
// This creates the reaction count virtual for the thoughts
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

//
//
////////////////////////////////////////
//                                    //
//    INITIALIZE THE THOUGHT MODEL    //
//                                    //
////////////////////////////////////////
const Thoughts = model("thoughts", thoughtsSchema);
module.exports = Thoughts;
