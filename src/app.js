requirejs.config({
    baseUrl: '../build',
    paths: {
        app: './app'
    }
});

requirejs(['AppController']);
