//Documentation on nwb config
//https://github.com/insin/nwb/blob/HEAD/docs/Configuration.md#configuration-file
module.exports = {
    webpack: {
        publicPath: '',
        copy: [
            // Copy directory contents to output
            {from: './src/retail-shop-flat-icon_small.jpg'}
        ],
        define: {
            'process.env.AUTH_DOMAIN': JSON.stringify('authDomain'),
            'process.env.AUTH_CLIENT_ID': JSON.stringify('authClientId'),
            'process.env.AUTH_AUDIENCE': JSON.stringify('authAudience')
        }
    }
};