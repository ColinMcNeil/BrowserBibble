//Navbar scroll detection
doc.on("mousemove", function (event) {
    if (event.pageY > $(window).height() - 40 && shown == false) {
        $("#mynavbar").slideDown();
        shown = true;
    }
    else if (event.pageY <= $(window).height() - 40 && shown == true && !$('#search').hasClass('searchfocus')) {
        $("#mynavbar").slideUp();
        shown = false;
    }
});
$('#close').on('click', function () {
    ipcRenderer.sendSync('synchronous-message', 'close')
})
$('#min').on('click', function () {
    ipcRenderer.sendSync('synchronous-message', 'min')
})
$('#max').on('click', function () {
    ipcRenderer.sendSync('synchronous-message', 'max')
})
$('#back').on('click', function () {
    webview.goBack()
})
$('#forward').on('click', function () {
    webview.goForward()
})
doc.keydown(function (e) {
    //console.log(e.keyCode)
    if (e.keyCode === 123) {
        webview.openDevTools()
        remote.getCurrentWindow().toggleDevTools();
    }

    if (e.keyCode === 116) {
        webview.reload();
    }
    if (e.keyCode == 27) {
        webview.sendInputEvent({ type: 'keyDown', keyCode: 'Esc' })
    }
})


doc.keyup(function (e) {
    if (document.readyState !== 'complete') { return }
    if (e.keyCode == 18 && !overlayup) {
        initializeTabs()
        $('.overlay').fadeIn('fast')
        overlayup = true;
    }
    else if (e.keyCode == 18 && overlayup) {
        $('.overlay').fadeOut('fast')
        overlayup = false;
    }
})
