const { ServerError } = require('../utils/errors.js')
const path = require('path')
const fs = require('fs')

const model = (req, res, next) => {
	req.select = function (fileName) {
		// console.log(fileName)
		try {
			let files = fs.readFileSync(path.join(process.cwd(), 'src', 'database', fileName + '.json'), 'UTF-8')
			files = files ? JSON.parse(files): []
			return files
		} catch(error) {
			return next( new ServerError(error.message) )
		}
	}

	req.insert = function (fileName, data) {
		try {
			fs.writeFileSync(path.join(process.cwd(), 'src', 'database', fileName + '.json'), JSON.stringify(data, null, 4))
			return true
		} catch(error) {
			return next( new ServerError(error.message) )
		}
	}
	return next()
}


module.exports = model