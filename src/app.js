requirejs.config({
    baseUrl: './',
    paths: {
        app: './app'
    }
});

requirejs(['AppController']);
