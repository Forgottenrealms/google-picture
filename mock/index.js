const express = require("express")
const imgList = require("./imgList/imgList.js")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(imgList)

app.listen(5000, () => {
    console.log("Mock server is running on PORT 5000")
})