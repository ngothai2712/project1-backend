import { respondSuccess } from '../../helpers/messageResponse'

export const upload = async (req, res) => {
    try {
        // const { loginUser = {} } = req
        if (req.file === undefined) {
            return res.status(400).send({ message: 'Please upload a file!' })
        }
        const rawData = {
            message: 'Uploaded the file successfully: ' + req.file?.originalname,
            path: process.env.ASSETS_URL + req?.file?.filename,
            filename: req?.file?.filename,
        }
        return res.json(respondSuccess(rawData))
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
        })
    }
}

export const getFile = async (req, res) => {
    try {
        const id = req.params.id
        res.sendFile(__basedir + '/assets/uploads/' + id)
    } catch (err) {}
}

/*export const getListFiles = (req, res) => {
    const directoryPath = __basedir + '/resources/static/assets/uploads/'

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: 'Unable to scan files!',
            })
        }

        let fileInfos = []

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            })
        })

        res.status(200).send(fileInfos)
    })
}*/

/*export const download = (req, res) => {
    const fileName = req.params.name
    const directoryPath = __basedir + '/resources/static/assets/uploads/'

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Could not download the file. ' + err,
            })
        }
    })
}*/
