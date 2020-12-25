import userApiRouter from '../components/user'
import authApiRouter from '../components/auth'
import fileApiRouter from '../components/file'
const routerManager = (app) => {
    userApiRouter(app)
    authApiRouter(app)
    fileApiRouter(app)
}
export default routerManager
