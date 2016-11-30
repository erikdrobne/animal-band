requirejs.config({
    baseUrl: 'src',
    paths: {
        app: './app'
    }
});

requirejs(['components/AppController']);
