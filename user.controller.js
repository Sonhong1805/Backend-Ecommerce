const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const { users } = require('./data/user.data');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${uuidv4()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  const { mimetype } = file;

  if (mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an images', 422), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadAvatar = upload.single('avatar');

exports.getMe = (req, res) => {
  const { userId } = req;

  let user = users.find(
    item => item.id === userId
  );
  user = {...user};
  user.password = undefined; 
  
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        user,
      }
    });
};

exports.updateMe = (req, res) => {
  const {
    userId,
    file,
    body: {
      username,
    }
  } = req;

  let user = users.find(
    item => item.id === userId
  );
  user.username = username || user.username;
  if (file) {
    user.avatar = file.filename;
  }
  user.password = undefined; 
  
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        user,
      }
    });
}
