import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dxrc7whc8',
  api_key: '951782529679145',
  api_secret: '77yObkeYVYoDtBvcVAhbC9GNBf0',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    console.log(req.body, 'loudinary');
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

export const sendImageToCloudinary = (path, name) => {
  try {
    cloudinary.uploader.upload(
      path,
      { public_id: name },
      function (err, result) {
        return result;
      },
    );
  } catch (err) {
    throw Error('fail');
  }
};
