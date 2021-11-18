// 导入模型
const Question = require('../models/question')

module.exports = {

    async getAllQuestions(ctx, next) {
      try {
          const data = await Question.getAllQuestions()
          ctx.body = { msg: 1001, data }
      } catch (err) {
          ctx.body = { code: -1, msg: 1000, }
      }
      await next();
    },

    async createQuestion(ctx, next) {
        const req = ctx.request.body
        if (req.topic && req.option && req.answer) {
            try {
                const data = await Question.createQuestion(req)
                ctx.body = { msg: 1003, data }
            } catch (err) {
                ctx.body = { code: -1, msg: 1000 }
            }
        } else {
            ctx.body = { code: -1, msg: 1002 }
        }
        await next();
    },

    async isCorrect(ctx, next) {
      const req = ctx.request.body
      if (req.answers) {
          try {
              Promise.all(
                req.answers.map(async answer => await Question.isCorrect(answer))
              ).then(results => {
                console.log(results)
              })
              ctx.body = { msg: 1007 }
          } catch (err) {
              ctx.body = { code: -1, msg: 1008 }
          }
      } else {
          ctx.body = { code: -1, msg: 1002 }
      }
      await next();
    }
}