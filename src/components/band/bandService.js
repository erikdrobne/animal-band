define('bandService', function() {
    return {
        setRendererStyle: setRendererStyle
    };

    function setRendererStyle(renderer) {
        renderer.view.style.position = 'absolute';
        renderer.view.style.display = 'block';
    }
});
