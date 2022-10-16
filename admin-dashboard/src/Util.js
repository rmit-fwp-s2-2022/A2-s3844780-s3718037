
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

export {
    inappropriateCheck
}