const users = [{ id: 1, username: 'Vasya', age: 25 }]

const createUser = (input) => {
  const id = Date.now()
//   в input будут поля username age posts
  return {
    id,
    ...input,
  }
}

// функции, которые возвраащают какие-то данные
module.exports = {
  getAllUsers() {
    return users
  },

  getUser({ id }) {
    return users.find((user) => user.id == id)
  },

  createUser({ input }) {
    const user = createUser(input)
    users.push(user)
    return user
  },
}
