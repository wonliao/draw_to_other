draw_to_other
=============

2台mobile 互相即時塗鴉傳送給對方，使用 html5 canvas + websocket + node.js

youtube 影片

[![youtube 影片](http://img.youtube.com/vi/-qqQIr7wij4/0.jpg)](http://www.youtube.com/watch?v=-qqQIr7wij4)

A、說明

    因為之前已經練習過 websocket 與 node.js 的溝通，所以這次主要是練習 html5 的 canvas 畫圖

    關於 websocket 與 node.js 的溝通請參照 https://github.com/wonliao/remote_control_box


B、設定

    1、下載 https://github.com/wonliao/nodejs_echo_server 並依說明安裝及啟動.
    2、修改 draw_to_other/www/js/index.js 這個檔案，找到 var wsUri = "ws://192.168.1.143:8000"; 改成你的 IP 及 PORT.


C、啟動

    1、 nodejs 的 broadcast server 請參照 https://github.com/wonliao/nodejs_echo_server 的說明
    2、 iOS 請用 xcode 編譯並執行
