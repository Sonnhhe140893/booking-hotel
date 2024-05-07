var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer  =   require('multer');
var cors = require('cors');

const router = require('express').Router();
require('dotenv').config();

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log("===> CONNECT DB ERROR : ",error)
})


const db = require("./app/models");
const Role = db.role;
database.once('connected', () => {
    console.log('===> CONNECT DB SUCCESS');
})

var indexRouter = require('./routes/index');
var initRouterAdmin = require('./routes/admin/init');
var initRouterFe = require('./routes/fe/init');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/admin', initRouterAdmin);
app.use('/api/v1/', initRouterFe);


// XỬ LÝ TẠM UPLOAD Ở ĐÂY

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        console.log('-------- OK filename file => ', file);

        const filename = 'image-' + randomUUID();
        const extension = path.parse(file.originalname).ext;
        callback(null, `${filename}${extension}`)
    }
});
var upload = multer({ storage : storage}).single('file');

app.post('/api/v1/upload-avatar',function(req,res){
	console.log('req----------> ',req);
    upload(req,res,function(err) {
        if(err) {
			console.log('error=========> ', err);
            return res.end("Error uploading file.");
        }
        const image = req.file;

        return res.status(200).json({ data: image, status: 200 });
    });
});
app.get('/uploads/:image',function(req,res){
    let image = req.params.image;
    return res.sendFile(image, { root: './uploads' });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// SET DOCUMENT API
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const {randomUUID} = require("crypto");

var options = {
    explorer: true
};
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;
