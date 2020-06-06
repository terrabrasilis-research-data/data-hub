const proxy = [
    {
      context: '/api',
      target: 'http://0.0.0.0:8090',
      pathRewrite: {'^/api' : ''}
    }
  ];
  
module.exports = proxy;