module.exports = app => {
  app.use('/', require('./base.routes'))
  app.use('/', require('./auth.routes'))
  app.use('/product', require('./products.routes'))
  app.use('/user', require('./users.routes'))
  app.use('/api', require('./api.routes'))
}