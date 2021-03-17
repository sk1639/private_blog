if (process.env.NODE_ENV === 'production') {
    console.log('production..connected');
    module.exports = require('./prod');
} else {
    console.log('dev..connected');
    module.exports = require('./dev');
}