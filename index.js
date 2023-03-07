const PORT = process.env.PORT || 3000
const express = require("express")
const socketIO = require("socket.io")
const https = require("https")
const names = require("./data")

const server = express().listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})

const io = socketIO(server)

io.on("connection", (socket) => {
  console.log("Client Connected")

  socket.emit("crypto", "message")

  socket.on("disconnect", () => {
    console.log("Client Disconnected")
  })

  socket.on("message", (data) => {
    console.log(data)
  })
})

function generate() {
  let main = []
  names.map((item, index) => {
    let obj = {
      id: index,
      name: item,
      price: Math.floor(Math.random() * 100 + 1),
    }
    main.push(obj)
  })
  return main
}

setInterval(() => {
  let prices = generate()
  io.emit("crypto", prices)
}, 2000)
