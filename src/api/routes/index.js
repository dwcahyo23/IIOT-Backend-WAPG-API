import MntnWoController from '../controllers/Mntn-WoController'

export default (app) => {
  app.post('/api/MntWo', MntnWoController.getWo)
  app.post('/api/User', MntnWoController.getUser)
}
