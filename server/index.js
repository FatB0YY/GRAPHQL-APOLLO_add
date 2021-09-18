const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: resolver
}))

 const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
