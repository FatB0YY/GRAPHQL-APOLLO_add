import React, { useEffect, useState } from 'react'
import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS, GET_ONE_USER } from './query/user'
import { CREATE_USER } from './mutations/user'

// useQuery предназначен, чтобы использовать запросы

const App = () => {
  // в поле data уже будет список пользователей
  // также сохраним его в состоянии.
  // то есть все те данные получим, которые запросили в query
  // ---------
  // refetch при вызове будет опять делаться запрос
  // и поле data будет обновляться
  // ---------
  // вторым параметром принимают массив опцияй
  // pollInterval: 500 повторяет сам запрос каждые пол секунды ептель
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)

  // именованная деструктуризация, чтобы названия не дублировались
  // передадим парметры только id.
  // захардкодим его
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  })

  // нам возврщ. не объект а кортеж, где первый эл это ф-ция
  // которая будет вызывать мутацию.
  // а параметром передаем эту мутацию
  const [newUser] = useMutation(CREATE_USER)

  // список пользователей состояние
  const [users, setUsers] = useState([])

  // состояние для инпутов
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  // придет те данные, которые запрашивали (id и username)
  console.log(oneUser)

  //  если data будет изменяться, будем перезаписывать пользователей
  useEffect(() => {
    //   тк data изначально пустое, а флаг loading становится true когда данные подгрузлись
    // сделаем проверку:
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = (event) => {
    event.preventDefault()
    newUser({
      variables: {
        // передаем перемнные, которые должня попасть в мутацию
        input: {
          // id генерируется на сервере
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data)
      // после всего очищаем инпуты
      setUsername('')
      setAge(0)
    })
  }
  const getAll = (event) => {
    event.preventDefault()
    refetch()
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type='text'
        />
        <input
          value={age}
          onChange={(event) => setAge(event.target.value)}
          type='number'
        />
        <div className='btns'>
          <button onClick={(event) => addUser(event)}>Создать</button>
          <button onClick={(event) => getAll(event)}>Получить</button>
        </div>
      </form>
      {/* отрисовка пользователей */}
      <div>
        {users.map((user) => (
          <div className='user'>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

/*
  fragment userWithoutAge on User {
    id, username, posts{
      title, content
    }
  }

  query{
    getAllUsers{
      ...userWithoutAge
    }
  }
*/
