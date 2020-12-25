const util = require('util')
const multer = require('multer')
const maxSize = 5 * 1024 * 1024

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const uploadFile = multer({
    storage,
    limits: { fileSize: maxSize },
}).single('file')

const uploadFileMiddleware = util.promisify(uploadFile)
export default uploadFileMiddleware

// export async function uploadFileMiddleware() {
//     try {
//         const storage = multer.diskStorage({
//             destination: (req, file, cb) => {
//                 cb(null, 'assets/uploads/')
//             },
//             filename: (req, file, cb) => {
//                 cb(null, `${Date.now()}-${file.originalname}`)
//             },
//         })
//
//         const uploadFile = multer({
//             storage,
//             limits: { fileSize: maxSize },
//         }).single('file')
//         return uploadFile
//         // return util.promisify(uploadFile)
//     } catch (e) {
//         console.log('uploadFileMiddleware...', e)
//     }
// }
