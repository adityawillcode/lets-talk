const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "*", methods: ["GET", "POST"]
    }
})
let users = [];

const addUser = (userObject) => {  // userObject ={name,id,socketId}

    users.push(userObject)
}



const removeUser = (socketId) => {


    users = users.filter((user) => {
        return user.socketId !== socketId
    })


}

const getUserName = (socketId) => {
    const name = users.find((user) => {
        return user.socketId == socketId
    }).name
    return name

}
const getUserId = (socketId) => {
    const userId = users.find((user) => {
        return user.socketId == socketId
    }).id
    return userId
}

const getOnlineUsers = () => {
    io.emit('online-users', { users })
}


const getUserById = (userId) => {
    const user = users.find((user) => {
        return user.id == userId
    })
    return user
}



io.on('connection', (socket) => {

    const userData = JSON.parse(socket.handshake.query.userData);
    console.log(userData, ' connected');
    addUser({ ...userData, socketId: socket.id })

    socket.emit('user-connected', { myId: getUserId(socket.id) })

    setTimeout(() => {
        getOnlineUsers()

    }, 2000)


    socket.once('disconnect', () => {
        console.log(getUserName(socket.id), 'disconnected');
        removeUser(socket.id)
        getOnlineUsers()

    })

    socket.on('join-room', ({ roomId }) => {
        socket.join(roomId)
        console.log(getUserName(socket.id), ' joined ', roomId);

    })
    socket.on('leave-room', ({ roomId }) => {
        console.log(getUserName(socket.id), ' leaved ', roomId);
        socket.leave(roomId)
    })

    socket.on('message', (message) => {   //message:{sender,roomId,body}
        io.to(message.roomId).emit('message-response', message)
    })


    socket.on('call-user', ({ offer, callTo, callFrom }) => {
        console.log({ callTo, callFrom });
        // we are having details of sender and reciever , now we need to emit an event for the socket id which reciever is having
        if (getUserById(callTo.id)) {
            io.to(getUserById(callTo.id).socketId).emit('call-user', { callFrom, callTo, offer })
        } else {
            socket.emit('call-cancel', { callFrom, callTo, errorMessage: 'User Is Offline' })
        }
    })
    socket.on('call-cancel', ({ callTo, callFrom, errorMessage }) => {
        io.to(getUserById(callFrom.id).socketId).emit('call-cancel', { callFrom, callTo, errorMessage })
    })

    socket.on('call-accepted', ({callTo, callFrom, answer}) => {
        console.log('this is call-accepted-event');
        io.to(getUserById(callFrom.id).socketId).emit('call-accepted', { callFrom, callTo, answer })
    })

})





httpServer.listen(5000, () => {
    console.log('web-socket server is eastablished...');
})

