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

    socket.on('call-user',(data)=>{
        io.to(getUserById(data.callTo.id).socketId).emit('incoming-call',data)
    })
    socket.on('send-answer',(data)=>{
        io.to(getUserById(data.callFrom.id).socketId).emit('get-answer',data)
    })
    socket.on('accept-call',(data)=>{
        console.log('this is data from accept-call event',data);
        io.to(getUserById(data.callFrom.id).socketId).emit('call-accepted',data)
    })
    socket.on('ice-candidates',(data)=>{
        console.log(data.iceCandidate);
        io.to(getUserById(data.candidateTo.id).socketId).emit('ice-candidates',data)
    })

  

})





httpServer.listen(5000, () => {
    console.log('web-socket server is eastablished...');
})

