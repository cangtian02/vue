const express = require('express')
const router = express.Router()
const connection =  require('../sql/sql')

connection.connect()

// 查询新闻列表
router.get('/api/queryNewsList', function (req, res, next) {
  let sql = 'SELECT * FROM news_list'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errCode: -1,
        message: '查询新闻列表异常',
      })
    }
    res.json({
      errCode: 0,
      data: results,
    })
  })
})

// 根据新闻id查询新闻详情
router.get('/api/queryNewsDetail', function (req, res, next) {
  let sql = `SELECT * FROM news_detail WHERE id=${req.query.id}`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        errCode: -1,
        message: '查询新闻详情异常',
      })
    }

    res.json({
      errCode: 0,
      data: results[0],
    })
  })
})

module.exports = router
