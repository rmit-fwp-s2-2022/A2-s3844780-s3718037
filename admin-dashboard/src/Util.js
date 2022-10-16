import { getUsers, getUser, updateUser, updateThread, getThreads, getThread } from "./data/repository";


function inappropriateCheck(post) {
    // Obtain an array of bad words/swear words
    var badwordsArray = require('badwords/array');
    // Find if the post contains bad words.
    const foundSwears = badwordsArray
        .filter(word => post.toLowerCase()
            .includes(word.toLowerCase()));

    if (foundSwears.length) {
        // Return true if a bad word is found.
        return true
    } else {
        // Return false if the post is clean of bad words.
        return false
    }
}

// Delete a post based on if its a thread or comment post.
async function deletePost(post, ID, ID_Type) {

    if (ID_Type === "threadID") {
        // const response = await axios.post(API_HOST + "/api/reactions/TReaction", { reaction, userID, ID });
        // return response.data
    } else {
        // const response = await axios.post(API_HOST + "/api/reactions/CReaction", { reaction, userID, ID });
        // return response.data
    }

}

export {
    inappropriateCheck, deletePost
}