import MntnWoController from '../controllers/Mntn-WoController'

export default (app) => {
  app.get('/api/MntWo', MntnWoController.getWo)
}
