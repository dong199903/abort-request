const router = require('koa-router')()
function sleep() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve()
    }, 2000);
  })
}
router.get('/api', async (ctx, next) => {
  await sleep()
  ctx.body="hello"
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
