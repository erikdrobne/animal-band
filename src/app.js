requirejs.config({
    baseUrl: './',
    paths: {
        app: './app'
    }
});

requirejs(['AppController'], function(AppController) {
    AppController.init();
});
