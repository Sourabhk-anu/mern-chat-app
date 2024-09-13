const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data')
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const chatRouter = require('./routes/chatRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json());

dotenv.config();
connectDb();

const PORT = process.env.PORT || 8001;

app.get('/', (req, res) => {
    res.send("API is started")
})

app.use('/api/users', userRouter)
app.use('/api/chats', chatRouter)

app.use(notFound);
app.use(errorHandler);

// app.get('/api/chat', (req, res) => {
//     res.send(chats);
// })

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})