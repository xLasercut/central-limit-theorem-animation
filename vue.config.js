var publicPath = '/'

if (process.env.NODE_ENV === 'ghpages') {
    publicPath = '/central-limit-theorem-animation/'
}
else if (process.env.NODE_ENV === 'production') {
    publicPath = './'
}

module.exports = {
    publicPath: publicPath
}