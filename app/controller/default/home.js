'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api hi"
  }

  async getArticleList(){
    let sql = 'SELECT article.Id as Id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime ,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.typeId = type.Id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body={
      data:results
    }
  }

  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.Id as Id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.article_content as article_content ,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime ,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.Id as typeId '+
              'FROM article LEFT JOIN type ON article.typeId = type.Id ' + 
              'WHERE article.id='+id
    let result = await this.app.mysql.query(sql)

    this.ctx.body = {data:result}
  }

  // 得到列别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  // 根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.Id as Id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime ,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.typeId = type.Id ' + 
              'WHERE typeId='+id
    const results = await this.app.mysql.query(sql)
    let sql2 = 'SELECT type.typeName FROM type WHERE Id='+id
    const results2 = await this.app.mysql.query(sql2)
    this.ctx.body={
      data:results,
      typeName:results2[0].typeName
    }
  }
}

module.exports = HomeController;
