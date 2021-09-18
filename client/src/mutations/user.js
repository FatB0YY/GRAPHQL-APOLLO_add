import {gql} from '@apollo/client'

// создание пользователя
export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age
        }
    }
`
