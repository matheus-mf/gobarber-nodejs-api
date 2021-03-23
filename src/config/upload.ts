import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
