const { Router } = require("express")
const Mock = require("mockjs")

const router = new Router()

// 图片列表mock数据
const imgList = Mock.mock({
    "code": 200,
    "data|80": [
      {
        "id": "@id",
        "imgs": "@img(,@color)",
        "desc": "@paragraph(1)"
      }
    ]
})

router.get("/api/imgs&page=:page", (req, res) => {
    res.json(imgList)
})

module.exports = router