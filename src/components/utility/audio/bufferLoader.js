define('bufferLoader', function() {
    'use strict';
    
    function BufferLoader(context, urlList, callback) {
            this.context = context;
            this.urlList = urlList;
            this.onload = callback;
            this.bufferList = [];
            this.loadCount = 0;
    }

    BufferLoader.prototype.loadBuffer = function(url, index) {
        var xhr = new XMLHttpRequest(),
            loader = this;

        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            loader.context.decodeAudioData(
                xhr.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length) {
                        loader.onload(loader.bufferList);
                    }
                }
            );
        };
        xhr.onerror = function() {
            alert('BufferLoader: XHR error');
        };
        xhr.send();
    };

    BufferLoader.prototype.load = function() {
        var i;
        for (i = 0; i < this.urlList.length; ++i) {
            this.loadBuffer(this.urlList[i], i);
        }
    };

    return {
        getInstance: function(context, urlList, callback) {
            return new BufferLoader(context, urlList, callback);
        }
    };
});
