const { buildSchema } = require('graphql')

/*
User - модель юзера с полем posts - массив постов, где каждый пост
явл тоже типом
Тип Post - модель поста для поста в массива
------------
мутации нужны для того, чтобы создавать или изменять объекты,
для них используется специальный тип input
------------
опишем тип запроса. Внутри будет несколько ф-ций, первая из которых 
будет возвращать всех пользователей, те массив, где каждый эл явл 
типом User.
Вторая ф-ция возвращает конкретного пользователя,
принимает id типа ID и возвращает объект типа User
------------
createUser принимает параметром тот самый input, тип userInput,
будет возвращаться пользователь, который был создан
*/

module.exports = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }

    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
    }

`)
