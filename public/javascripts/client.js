(function (io) {
    var socket = new io('/serverClient');
    console.log(socket)
})(window.io);