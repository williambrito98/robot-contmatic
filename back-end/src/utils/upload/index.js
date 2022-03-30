const multer = require('multer');
const { extname } = require('path');

module.exports = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            // Extração da extensão do arquivo original:
            const extensaoArquivo = extname(file.originalname);

            // Cria um código randômico que será o nome do arquivo
            const novoNomeArquivo = require('crypto')
                .randomBytes(64)
                .toString('hex');

            // Indica o novo nome do arquivo:
            cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
        }
    })
}