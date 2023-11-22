const config = require('./config')

const portCheck = (port) => {
    return Number(port)
}

const dummy = (array) => {
    if(Array.isArray(array)) {
        return 1
    } else {
        return 0
    }
}

const totalLikes = (array) => {
    if(array.length > 1) {
        const totalLikes = array.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
        return totalLikes
    } else {
        const singleArrayLikes = array[0].likes
        return singleArrayLikes
    }
}

const favoriteBlog = (array) => {
    const mostLiked = array.reduce((mostLikedObject, currentObject) => {
        return currentObject.likes > mostLikedObject.likes ? currentObject : mostLikedObject
    })

    const favorite = {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
    return favorite
}
  
module.exports = { dummy, portCheck, totalLikes, favoriteBlog }