// ==UserScript==
// @name         ChatBot 1.13
// @namespace    http://tampermonkey.net/
// @version      1.13
// @description  ChatBot! Safe Friendly Tinychat Bot to assist you in rooms.
// @author       BadNintendo
// @grant        none
// @icon        https://tinychat.com/webrtc/2.0.0-81/images/favicon.png
// @match       https://tinychat.com/room/*
// @match       https://tinychat.com/*
// @exclude     https://tinychat.com/settings/*
// @exclude     https://tinychat.com/subscription/*
// @exclude     https://tinychat.com/promote/*
// @exclude     https://tinychat.com/coins/*
// @exclude     https://tinychat.com/gifts*
// @namespace   https://greasyfork.org/en/scripts/404440-chatbot
// @run-at      document-start
// ==/UserScript==
((ChatBot,Bot,CMD,Version) => {
    "use strict";
    //Compare version to pastebin often to Version #
    //Notify Box Timeout in Seconds for join/exit/kicks
    ChatBot.notifyalertboxtime = 3;
    //API_KEY FOR YOUTUBE
    var youtubekey = "AIzaSyAf1XXorjOLdjS2j5PGi3SLCGl7LhyxQXs";
    /*
        Share URL always check to see if version matches latest updates

        TinyChat Bot Script:
        Install...
        1. (Tamper Monkey Link)
        https://www.tampermonkey.net/
        2. (Create New Script)
        https://greasyfork.org/en/scripts/404440-chatbot
        3. (Commands)
        https://pastebin.com/X2StDFh4

    */
    //Do not Edit below These lines unless youre able to code javascript/css/html
    ((Version.encrypt+Version.title) == (Version.encrypt+'00b8d27c8e390f8b112cb4334d82')) ? ChatBot.version = '1.13' : alert('ChatBot cannot operate!');
    var room, MainElement, ChatLogElement, VideoListElement, SideMenuElement, TitleElement, UserListElement,ModerationListElement, ChatListElement, UserContextElement, MicrophoneElement, FeaturedCSS, VideoCSS, SideMenuCSS, MainCSS, RoomCSS, TitleCSS, ContextMenuCSS,ModeratorCSS, UserListCSS, ChatListCSS, NotificationCSS, ChatboxCSS;
    ChatBot.addEventListener('DOMContentLoaded', (event) => {
        room = ChatBot.location.pathname.split("/").pop();
        if(room) Bot.title = 'Tinychat room ('+room+') / ChatBot '+ChatBot.version+'v';
        else if(window.location.pathname == '/') setTimeout(() => { createPromo({ img : false, title : false }); }, 3000);
        var head = Bot.head || Bot.getElementsByTagName('head')[0],
            style = Bot.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) style.styleSheet.cssText = ChatBot.css;
        else style.appendChild(Bot.createTextNode(ChatBot.css));
    });
    ChatBot.alerted = () => {
        ChatLogElement.querySelector("#notification-content").style = 'z-index: 888; top: -20px; opacity: 1; filter: alpha(opacity=100)';
        if (ChatBot.timer) clearTimeout(ChatBot.timer);
        ChatBot.timer = setTimeout(() => { ChatLogElement.querySelector("#notification-content").style = ''; }, (ChatBot.notifyalertboxtime * 1000));
    };
    var createPromo = (data) => {
        var wrapper = Bot.createElement("div");
        var main = Bot.createElement("div");
            main.className = 'title';
            main.dataset.status = 'gold';
            main.onclick = () => { location.href = ('/room/'+((!data.title)?'StonerStatus':data.title)); };
            main.style = '-webkit-border-radius: 12px; -moz-border-radius: 12px; border-radius: 12px; -webkit-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; -moz-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black;';
        var imageholder = Bot.createElement("div");
            imageholder.className = 'tile-header';
            imageholder.style = '-webkit-border-radius: 12px; -moz-border-radius: 12px; border-radius: 12px; -webkit-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; -moz-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black;';
        var img = Bot.createElement("img");
            img.id = 'tile-header-image-promoted-0';
            if(!data.img) img.src = 'https://avatars.tinychat.com/1d/7831da/c8/small/phpcQ4XWs.png?v=1';
            else img.src = data.img;
            img.dataset.current = 0;
            img.onload = () => MasonryTails.Refresh();
        var titlewrapper = Bot.createElement("div");
            titlewrapper.className = 'tile-info';
            titlewrapper.style = 'z-index: 9;';
        var titleholder = Bot.createElement("div");
            titleholder.className = 'tile-name';
            if(!data.title) titleholder.innerText = 'StonerStatus';
            else titleholder.innerText = data.title;
        var mainwrapper = Bot.querySelector("#promoted");
        titlewrapper.appendChild(titleholder);
        imageholder.appendChild(titlewrapper);
        imageholder.appendChild(img);
        main.appendChild(imageholder);
        wrapper.append(main);
        mainwrapper.appendChild(wrapper);
    };
    ChatBot.DebugClear = true;
    CMD.YouTube = {API_KEY: youtubekey,XHR: new XMLHttpRequest(),Playing: false,MessageQueueList: [],NotPlayable: ["Private video", "Deleted video"],VideoID: undefined,Busy: false,DataReady: false,Clear: false,VideoReturn: false,SearchReturn: false,ListBuilt: true,PlayListCount: undefined,ShowQueue: false,CurrentTrack: {ID: undefined,duration: undefined,title: undefined,thumbnail: undefined}};
    if (CMD.YouTube.API_KEY !== "") Save("YouTubeAPI", CMD.YouTube.API_KEY);
    CMD.Game.Fish.HighScore = JSON.parse(Load("FishHighScore", JSON.stringify(["BadNintendo", 13337])));
    CMD.PublicCommandToggle = JSON.parse(Load("PublicCommandToggle", JSON.stringify(true)));
    CMD.CameraBorderToggle = JSON.parse(Load("CameraBorderToggle", JSON.stringify(true)));
    CMD.OGStyle.SavedHeight = JSON.parse(Load("OGStyleHeight", "3"));
    CMD.GreenRoomIgnoreList = JSON.parse(Load("GreenRoomIgnoreList", JSON.stringify([])));
    CMD.OGStyle.SavedWidth = JSON.parse(Load("OGStyleWidth", "1"));
    CMD.NotificationToggle = JSON.parse(Load("NotificationToggle", "0"));
    CMD.ChatStyleCounter = JSON.parse(Load("ChatStyle", "0"));
    CMD.KickKeywordList = JSON.parse(Load("KickKeywordList", JSON.stringify([])));
    CMD.TimeStampToggle = JSON.parse(Load("TimeStampToggle", JSON.stringify(true)));
    CMD.YouTube.API_KEY = Load("YouTubeAPI", "");
    CMD.GreenRoomToggle = JSON.parse(Load("GreenRoomToggle", JSON.stringify(true)));
    CMD.BanKeywordList = JSON.parse(Load("BanKeywordList", JSON.stringify([])));
    CMD.GreenRoomList = JSON.parse(Load("GreenRoomList", JSON.stringify([])));
    CMD.MainBackground = Load("MainBackground", "url(https://i.imgur.com/nOVCUTy.png) rgb(0, 0, 0) no-repeat");
    CMD.HighlightList = JSON.parse(Load("HighlightList", JSON.stringify([])));
    CMD.CanHostGames = JSON.parse(Load("CanHostGames", JSON.stringify(false)));
    CMD.ReminderList = JSON.parse(Load("ReminderList", JSON.stringify([])));
    CMD.MentionList = JSON.parse(Load("MentionList", JSON.stringify([])));
    CMD.CanSeeGames = JSON.parse(Load("CanSeeGames", JSON.stringify(true)));
    CMD.ThemeChange = JSON.parse(Load("ThemeChange", JSON.stringify(true)));
    CMD.BotModList = JSON.parse(Load("BotModList", JSON.stringify([])));
    CMD.IgnoreList = JSON.parse(Load("IgnoreList", JSON.stringify([])));
    CMD.Favorited = JSON.parse(Load("Favorited", JSON.stringify([['stonerstatus','https://avatars.tinychat.com/1d/7831da/c8/small/phpcQ4XWs.png'], null, null, null, null])));
    CMD.GreetList = JSON.parse(Load("GreetList", JSON.stringify([])));
    CMD.BotOPList = JSON.parse(Load("BotOPList", JSON.stringify(["-ALL"])));
    CMD.GreetMode = JSON.parse(Load("GreetMode", JSON.stringify(false)));
    CMD.FontSize = JSON.parse(Load("FontSize", 20));
    CMD.SafeList = JSON.parse(Load("AKB", JSON.stringify([])));
    CMD.Featured = JSON.parse(Load("Featured", JSON.stringify(false)));
    CMD.KickList = JSON.parse(Load("KickList", JSON.stringify([])));
    CMD.Reminder = JSON.parse(Load("Reminder", JSON.stringify(true)));
    CMD.TTSList = JSON.parse(Load("TTSList", JSON.stringify([])));
    CMD.BanList = JSON.parse(Load("BanList", JSON.stringify([])));
    CMD.UserYT = JSON.parse(Load("UserYT", JSON.stringify(true)));
    CMD.Popups = JSON.parse(Load("Popups", JSON.stringify(true)));
    CMD.Avatar = JSON.parse(Load("Avatar", JSON.stringify(true)));
    CMD.imgur = JSON.parse(Load("imgur", JSON.stringify(true)));
    CMD.Bot = JSON.parse(Load("Bot", JSON.stringify(true)));
    CheckUserTouchScreen();
    ChatBot.css = '#notification-content{ -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; position: absolute;     top: -149px; right: 12px; width: 249px; height: 150px; opacity: 0.1; filter: alpha(opacity=10) }'+
            '#notification-content:hover{ z-index: 888; top: -20px; -webkit-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; -moz-box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; box-shadow: inset 0 0 6px #000000,2px -4px 6px -6px black; opacity: 1; filter: alpha(opacity=100) }'+
            '.notifbtn{ width: 25px; position: absolute; top: 2px; right: 1px; opacity: 0.1; filter: alpha(opacity=10) }'+
            '.notifbtn:hover,#notification-content:hover + .notifbtn{ z-index: 889; opacity: 1; filter: alpha(opacity=100) }'+
            '#videos-header-volume,#modal,#videos-footer-submenu{z-index:999999}'+
            '#videos-footer{ z-index: 999; }';
    if (CMD.ThemeChange) {
        FeaturedCSS = "#modal,#videos-footer-submenu{z-index:999999}#videos.column>.videos-items{background:#0000003b;height:20%}#videos.column>.videos-items+.videos-items{background:none;height:80%}#videos.row>.videos-items{background:#0000003b;width:20%}#videos.row>.videos-items+.videos-items{background:none;width:80%}#videos.row.featured-2>.videos-items{width:20%}#videos.row.featured-2>.videos-items+.videos-items{width:80%}#videos.column.featured-2>.videos-items{height:20%}#videos.column.featured-2>.videos-items+.videos-items{height:80%}#videos.row.featured-3>.videos-items{width:20%}#videos.row.featured-3>.videos-items+.videos-items{width:80%}#videos.column.featured-3>.videos-items{height:20%}#videos.column.featured-3>.videos-items+.videos-items{height:80%}";
        ChatListCSS = "#modal,#videos-footer-submenu{z-index:999999}#chatlist{background:#00000075;}.list-item>span>img{top:6px;}.list-item>span.active>span{transition:none;box-shadow:none;background:transparent;visibility:hidden;}.list-item>span>span{top:-4px;background:transparent;box-shadow:none;}.list-item>span>span[data-messages]:before{background:#53b6ef;}.list-item>span[data-status=\"gold\"]:before,.list-item>span[data-status=\"extreme\"]:before,.list-item>span[data-status=\"pro\"]:before{top:5px;}#chatlist>#header>.list-item>span.active{background:#53b6ef;}#chatlist>#header{height:60px;top:30px}#chatlist>div>span{font-weight: 600;border-radius:unset;color:#FFFFFF;height:22px;line-height:22px;}#chatlist>div{height:22px;line-height:22px;}";
        ChatboxCSS = "#modal,#videos-footer-submenu{z-index:999999}#chat-download:hover{cursor: pointer;-webkit-box-shadow: inset 0 0 20px #53b6ef;box-shadow: inset 0 0 20px 0 #53b6ef;}#chat-download{position: absolute;right: 0;height: 22px;width: 22px;background: url(\"https://i.imgur.com/Bb3fr6Q.png\") center;background-size: 22px;}#chatlog-button{display:none!important;}@media screen and (max-width: 1200px){#chat-hide{top: -46px!important;left: -1px!important;width: 100%!important;border-radius: 0!important;}}#chat-hide{top: calc(50% - 18px);position: absolute;display: block;height: 16px;width: 16px;left: -8px;margin-top: -20px;border-radius: 16px;font-size: 0;background:url(https://i.imgur.com/jFSLyDD.png) #000000 center no-repeat;background-size:16px;cursor: pointer;z-index: 9999;-webkit-box-shadow: 0 0 6px #53b6ef;box-shadow: 0 0 6px #53b6ef;}#chat-instant.show{background:linear-gradient(0deg,rgb(0, 19, 29)0%,rgba(0, 0, 0, 0.85)50%,rgb(25, 29, 32)100%)!important;}#chat-wider:before{transition:.3s;margin: -4px 0 0 -4px;border-width: 6px 6px 6px 0;border-color: transparent #ffffff!important;}#chat-wider{-webkit-box-shadow: 0 0 6px #53b6ef;box-shadow: 0 0 6px #53b6ef;z-index: 2;background:#000000!important}#chat-wrapper{transition:none;}#fav-opt{display: inline-block;cursor: pointer;padding: 12px;background: #10131494;}#input-user:checked ~ #user-menu{display:inline-block;}#user-menu > a:hover #user-menu > span > a:hover{color: #FFFFFF}#user-menu > a, #user-menu > span > a {font-weight: 600;position: relative;display: inline-block;width:calc(100% - 30px);padding: 6px;box-sizing: border-box;font-size: 18px;color: #53b6ef;cursor: pointer;transition: .2s;}#user-menu {position: absolute;display: none;bottom: 50px;right: 0;border: 1px solid rgba(0, 0, 0, .06);box-sizing: border-box;border-radius: 3px;color: #FFFFFF;background: #101314;line-height: 1;box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .09);z-index: 1;}#user-menu > span {display: inline-block;width: 100%;padding: 12px;box-sizing: border-box;font-size: 16px;font-weight: 500;white-space: nowrap;text-overflow: ellipsis;cursor: default;overflow: hidden;}#label-user > img {position: absolute;height: 100%;left: -8px;vertical-align: top;}#label-user{position: relative;display: inline-block;height: 48px;width: 48px;border-radius: 100%;overflow: hidden;cursor: pointer;}#header-user{text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;position: absolute;top: 10px;right: 0;}#chat-wrapper.full-screen #chat-instant, #chatf-wrapper.full-screen #chat-instant>.avatar>.status-icon,#chat-wrapper.full-screen #chat-content>.message>.avatar>.status-icon {background:unset;}.CMD-message-unread{display:block;border-radius:6px;padding:1px 6px 1px 6px;background:#53b6ef;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;color:#FFF;font:bold 16px sans-serif;cursor:pointer}.CMDtime{position:absolute;right:3px;top:3px;background: #101314;border: 1px solid black;border-radius: 6px;padding: 1px 6px;}#chat-instant>.avatar>div>img,#CMD-chat-content>.message>.avatar>div>img{position:relative;height:100%;left:-7px}.message>#system_user{background:linear-gradient(0deg,rgb(0, 19, 29)0%,rgba(0, 0, 0, 0.85)50%,rgba(0, 0, 0, 0.72)100%);border: 1px solid black;border-radius: 6px;padding: 1px 6px 1px 6px;word-wrap: break-word;font-weight: 600;font-size: 16px;color: #FFF;text-decoration: none;overflow: hidden;text-overflow: ellipsis;}.message{color:#FFF;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font-family:sans-serif;font-weight:300;font-size:20px;white-space:pre-line;word-wrap:break-word}.message a, .message a:visited, .message a:hover, .message a:active{position:relative;transition:0.5s color ease;text-decoration:none;color:#53b6ef}.message a:hover{text-decoration:underline;}#chat{will-change: transform;min-height:unset;}#CMD-chat-content{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}#CMD-chat-content>.message{padding:3px 3px;background:#101314a8;position:relative;left:0;margin-bottom:3px;border-radius:6px}#CMD-chat-content>.message.highlight,.message.common.highlight{background:rgba(0, 0, 0, 0.5);-webkit-box-shadow: inset 0 0 20px #000000;box-shadow: inset 0 0 20px 0 #000000;}#CMD-chat-content>.message.common{min-height: 50px;padding:3px 3px 3px 50px;box-sizing:border-box;text-align:left}#chat-instant>.avatar,#CMD-chat-content>.message>.avatar{position:absolute;height:40px;width:40px;top:3px;left:3px;-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);pointer-events:none;}#chat-instant>.avatar>div,#CMD-chat-content>.message>.avatar>div{position:absolute;height:100%;width:100%;top:0;left:0;border-radius:100%;overflow:hidden}#notification-content .nickname{border-radius:6px;padding:1px 6px 1px 6px}.notification{padding:1px 0 1px 0;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black}.time{position:absolute;right:5px}.notifbtn:hover{background:linear-gradient(0deg,rgb(0, 135, 186)0%,rgba(0, 49, 64, 0.94)75%,rgba(0, 172, 255, 0.6)100%);}.notifbtn{cursor: pointer;border-radius: 0 0 12px 12px;outline: none;background:linear-gradient(0deg,rgba(0, 0, 0, 0)0%,rgba(37, 37, 37, 0.32)75%,rgba(255, 255, 255, 0.6)100%);border: none;color: white;width: 100%;}#notification-content.large{height:50%;}#notification-content{will-change: transform;top:0;position:relative;scrollbar-width:none;background:#101314;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;height:20%;min-height:38px;font:bold 16px sans-serif;color:#FFF;overflow-y:scroll;overflow-wrap:break-word;padding:0 6px 0 6px}#notification-content::-webkit-scrollbar{width:0;background:transparent}#CMD-chat-content{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}#chat-instant>.avatar>.status-icon,#CMD-chat-content>.message>.avatar>.status-icon{left:0!important}#chat-instant>.nickname{color:#53b6ef;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font-size: 20px;font-weight: 800;} nm#chat-instant::after{background:none;}.on-white-scroll{scrollbar-width: none;overflow-wrap: break-word;}.on-white-scroll::-webkit-scrollbar{width:0;background:transparent}#CMD-chat-content>.message>.nickname{border:1px solid black;border-radius:6px;padding:1px 6px 1px 6px;word-wrap:break-word;max-width:calc(100% - 115px);font-weight:600;font-size:16px;color:#FFF;display:inline-block;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#input{padding-top:0}:host,#input>.waiting{background:#20262870}#input:before,#input:after{content:unset}#input>textarea::placeholder{color:#FFF}#input>textarea::-webkit-input-placeholder{color:#fff}#input>textarea:-moz-placeholder{color:#fff}#input>textarea{width: calc(100% - 57px);line-height:unset;min-height:65px;max-height:65px;border-radius:6px;scrollbar-width:none;background:#101314;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;color:#FFF;font-size:" + (CMD.FontSize - 4) + "px;font-family:sans-serif;font-weight:300;}#chat-position{top:22px;left:6px;right:6px;bottom:5px;}.on-white-scroll::webkit-scrollbar{width:0;background:transparent;}"+ChatBot.css;
        MainCSS = "#modal,#videos-footer-submenu{z-index:999999}#mobile-app.show{display:none;}html{background:rgba(0,0,0,1);}#menu-icon{display:none;}body{background:" + CMD.MainBackground + ";background-position: center!important;background-size:cover!important;overflow:hidden;}#nav-static-wrapper {display:none;}#content{padding:0!important;}";
        VideoCSS = "#modal,#videos-footer-submenu{z-index:999999}#videolist[data-mode=\"dark\"]{background-color:unset;}@media screen and (max-width: 1200px){#videos-footer{right: unset!important;bottom: -22px!important;top: unset!important;}}#modal,#videos-footer-submenu{z-index:999999}#videos-footer-broadcast-wrapper{z-index: 9999; margin-top:16px;}#youtube.video > div > .overlay, .video > div > .overlay{display:block!important}.tcsettings{display:none}#videos-header{background:#101314;}#videos-footer-broadcast-wrapper.active>#videos-footer-broadcast,#videos-footer-broadcast-wrapper.active>#videos-footer-submenu-button,#videos-footer-broadcast-wrapper.active>#videos-footer-submenu-button:focus{background-color:#2d373a!important;}.js-video.broken{display:none;}.videos-header-volume {z-index:99999; border-color:#202627;}.tcsettings:hover{background:#008cda;}.tcsettings{cursor: pointer;outline: none;background:#101314;border: none;color: white;}.music-radio-info>.description{cursor:default;overflow-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}.music-radio-info>.volume{bottom: 0;position: absolute;background: #2a6a89;height: 6px;width: 100%;line-height: 24px;overflow-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis}.music-radio-info{top: -50px;position: absolute;background: #071c19f0;height: 50px;width: 336px;line-height: 24px;}.CMDdrop{z-index:99900;position:fixed;display:inline-block;top:3px;left:4px;min-width: 46px;}.CMDdrop-content{z-index:99900;position:absolute;top:28px;right:0;background:#101314;min-width:46px;width: 46px;padding:0;display:none;}.CMDdrop:hover .CMDdrop-content{z-index:99900;display:block;}.CMDoptions:hover{background:#53b6ef}.CMDoptions{width:46px;height:28px;z-index: 2;cursor: pointer;top: 4px;background: #10131475;border: none;padding: 5% 0;display: inline-block;}#youtube{padding: unset}#grab{left: 0;background:#2d373a;border-radius: 12px;visibility: hidden;top: -36px;position: absolute;display: flex}#videos-footer #music-radio .music-radio-playpause{position:absolute;top:0;left:30px;height:100%;width:60px;}#videos-footer #music-radio .music-radio-vol{position: absolute;right: 0;top: 0;}#videos-footer #music-radio button{line-height: 14px;background: #101314;border: none;font-size: 18px;color: white;height: 50%;display: block;width: 30px;}#videos-footer #videos-footer-youtube{left: 120px;border-radius: 0;display:none;}#videos-footer #videos-footer-soundcloud{display:none;border-radius: 0;left: 240px}#videos-footer #videos-footer-youtube,#videos-footer #videos-footer-soundcloud,#videos-footer #music-radio{transition: .2s;line-height: 33px;bottom: -64px;visibility: hidden;height: 36px;margin: unset;width: 120px;position: absolute;z-index: 1;}#videos-footer-push-to-talk{border-radius: unset}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{border-radius: unset;}#videos-footer-broadcast-wrapper.moderation>#videos-footer-broadcast{padding: unset}#videos-footer #music-radio button:hover{background: #53b6ef;cursor: pointer;}#videos-footer #music-radio{left: 0;border-radius: 12px;background: #101314;}#videos-footer:hover #videos-footer-youtube,#videos-footer:hover #videos-footer-soundcloud,#videos-footer:hover #music-radio{visibility: visible}#videos-footer:hover{background:linear-gradient(0deg,rgba(255, 255, 255, 0)0%,rgba(24, 60, 62, 0.29)50%,rgb(83, 182, 239)100%);}#videos-footer{background: linear-gradient(0deg,rgba(255, 255, 255, 0)0%,rgba(24, 60, 62, 0.29)50%,rgba(200, 200, 200, 0.26)100%);cursor:pointer;top:0;display:block;padding: 2px 0 0 11px;text-shadow: -1px 0 black,0 1px black,1px 0 black,0 -1px black;font: 800 14px sans-serif;color: #FFFFFF;left: unset;right: -70px;height: 22px;min-height: 22px;z-index: 2;width: 70px;position: absolute}#videos-footer-broadcast{border-radius:unset;z-index: 9999;padding: unset!important;white-space: pre}span[title=\"Settings\"]>svg{padding:4px;height:24px;width:24px}#seek-duration{pointer-events: none;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font: 600 20px sans-serif}#videos{bottom: 0;left: 0;right: 0;top: 0}:host,#videolist{background:unset!important;}.video:after{content: unset;border:unset;}#videos-header-mic>svg{padding: 2px 10px;}#videos-header>span{display:block;}#videos-header-sound>svg{padding: 4px}#videos-header-fullscreen > svg {padding: 7px 8px;}";
        RoomCSS = "#modal,#videos-footer-submenu{z-index:999999}tc-title{display:flex!important;}#room-content{padding-top:0!important;background:unset!important;}#videos-footer-broadcast-wrapper{ z-index: 9999; }";
        TitleCSS = "#room-header-avatar{display:none}#room-header-gifts{display:none}#room-header-info-text{display:none}#room-header-info-details{display:none}#room-header-mobile-button{display:none}#room-header{display:none;}";
        SideMenuCSS = "#sidemenu{left:0;}@media screen and (max-width: 1000px){#sidemenu{left:-270px;}}#sidemenu.full-screen{left:-270px;}#user-info{display:none;}#top-buttons-wrapper{display:none;}#sidemenu-content{scrollbar-width:none;padding-top:unset;}#sidemenu-wider:before{margin: -4px 0 0 -4px;border-width: 6px 6px 6px 0;border-color: transparent #ffffff;}#sidemenu-wider{-webkit-box-shadow: 0 0 6px #53b6ef;box-shadow: 0 0 6px #53b6ef;z-index: 2;display:block;background-color: #000000;}#sidemenu-content::-webkit-scrollbar{display: none;}#sidemenu.wider {left: -270px;}";
        NotificationCSS = "#videos-header > span {background-color: unset!important;line-height: unset;}.PMTime{display:inline-block;padding:0 6px 0 0;margin:0 8px 0 0;border-right:4px groove #797979;}.PMName{display:inline-block;}#popup div{word-break:break-word;user-select: text;-webkit-user-select: text;-moz-user-select: text;color:#FFFFFF;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font-weight: 300;font-size: 18px;font-family: sans-serif;z-index:1;}.PMOverlay{height: calc(100% - 92px);overflow: hidden;pointer-events:none;position:absolute;padding-top:12px;top:0;bottom:0;left:0;right:0;visibility:visible;}.PMPopup{pointer-events:all;margin:5px auto;width:50%;position:relative;color: #FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}.PMPopup a, .PMPopup a:visited, .PMPopup a:hover, .PMPopup a:active{position:relative;transition:0.5s color ease;text-decoration:none;color:#53b6ef}.PMPopup a:hover{color:#FFFFFF;text-decoration:underline;}.PMPopup h2{border-radius:5px 5px 0 0;background:linear-gradient(0deg,rgb(24, 29, 30) 0%,rgb(24, 29, 30) 52%,rgb(60, 117, 148) 100%);margin:0;padding:5px;font-size:16px;}.PMPopup .PMContent {border-radius: 0 0 5px 5px;padding:5px;max-height:30%;overflow:hidden;word-break:break-all;background:#202628;}";
        UserListCSS = ".list-item>span>span{padding: 0 8px;top:-2px}.list-item > span:hover > span{background-color:unset;box-shadow:unset;}#userlist{background: #00000075;}.js-user-list-item{background: linear-gradient(0deg,rgb(0, 0, 0) 2px,rgba(0, 0, 0, 0.25) 2px,rgba(0, 0, 0, 0.59) 32%);}.list-item>span>span[data-cam=\"1\"]:after{height:15px;width:15px;background-image:url(https://i.imgur.com/QKSbq8d.png);}.list-item>span>span[data-moderator=\"1\"]:before{margin-right:3px;width:15px;height:15px;background-image:url(https://i.imgur.com/CEA9aro.png);}.list-item>span>span{background:transparent;box-shadow:none;}.list-item>span>span>.send-gift{top:5px;}.list-item>span>img{top:6px;}#button-banlist{border-radius:unset;top:-1px;right:10px;}.list-item>span[data-status=\"gold\"]:before,.list-item>span[data-status=\"extreme\"]:before,.list-item>span[data-status=\"pro\"]:before{top:5px;}#userlist>div{height:22px;}#userlist>div>span{font-weight: 600;color:#FFFFFF;height:22px;line-height:22px;}#userlist>#header{height:40px;top:10px;}";
        ModeratorCSS = ".video{min-width: 114px;max-width: 114px;}#moderatorlist:after{right:5px;color:#FFFFFF;background:#53b6ef;}#moderatorlist>#header>span>button>svg path{fill:#FFFFFF;}#moderatorlist>#header>span>button{top:-2px;background: #20262870;}#moderatorlist.show>#header>span>button>svg path{fill:#FFFFFF;}#moderatorlist{max-height:60px;background: #00000075;}#moderatorlist>#header{height:60px;font-size:16px;font-weight:600;font-family:sans-serif;color:#FFFFFF;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}#moderatorlist.show[data-videos-count=\"1\"], #moderatorlist.show[data-videos-count=\"2\"] {max-height:205px;}#moderatorlist.show[data-videos-count=\"3\"], #moderatorlist.show[data-videos-count=\"4\"] {max-height:290px;}#moderatorlist.show[data-videos-count=\"5\"], #moderatorlist.show[data-videos-count=\"6\"] {max-height:400px;}#moderatorlist.show[data-videos-count=\"7\"], #moderatorlist.show[data-videos-count=\"8\"] {max-height:460px;}#moderatorlist.show[data-videos-count=\"9\"], #moderatorlist.show[data-videos-count=\"10\"] {max-height:545px;}#moderatorlist.show[data-videos-count=\"11\"], #moderatorlist.show[data-videos-count=\"12\"] {max-height:630px;}";
    } else {
        //OG CMD
        FeaturedCSS = "#modal,#videos-footer-submenu{z-index:999999}#videos.column>.videos-items{background:#0000003b;height:20%}#videos.column>.videos-items+.videos-items{background:none;height:80%}#videos.row>.videos-items{background:#0000003b;width:20%}#videos.row>.videos-items+.videos-items{background:none;width:80%}#videos.row.featured-2>.videos-items{width:20%}#videos.row.featured-2>.videos-items+.videos-items{width:80%}#videos.column.featured-2>.videos-items{height:20%}#videos.column.featured-2>.videos-items+.videos-items{height:80%}#videos.row.featured-3>.videos-items{width:20%}#videos.row.featured-3>.videos-items+.videos-items{width:80%}#videos.column.featured-3>.videos-items{height:20%}#videos.column.featured-3>.videos-items+.videos-items{height:80%}";
        VideoCSS = "#modal,#videos-footer-submenu{z-index:999999}#videolist[data-mode=\"dark\"]{background-color:unset;}#youtube.video > div > .overlay, .video > div > .overlay{display:block!important}.js-video.broken{display:none;}#videos-footer-broadcast-wrapper.show-ptt > #videos-footer-submenu{right:0;}#videos-footer-submenu{z-index:99999;width: calc(100% - 14px);right:0;bottom:-2px;}.videos-header-volume {z-index:99999;top: auto; bottom: 2px;border-color:#202627;}.tcsettings:hover{background:#008cda;}.tcsettings{cursor: pointer;outline: none;background:#101314;border: none;color: white;}.music-radio-info>.description{cursor:default;overflow-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}.music-radio-info>.volume{bottom: 0;position: absolute;background: #2a6a89;height: 6px;width: 100%;line-height: 24px;overflow-wrap: break-word;white-space: nowrap;overflow: hidden;text-overflow: ellipsis}.music-radio-info{top: -50px;position: absolute;background: #071c19f0;height: 50px;width: 336px;line-height: 24px;}.CMDdrop{z-index:99900;position:fixed;display:inline-block;top:3px;right:4px;min-width: 46px;}.CMDdrop-content{z-index:99900;position:absolute;top:28px;right:0;background:#101314;min-width:46px;width: 46px;padding:0;display:none;}.CMDdrop:hover .CMDdrop-content{z-index:99900;display:block;}.CMDoptions:hover{background:#53b6ef}.CMDoptions{width:46px;height:28px;z-index: 2;cursor: pointer;top: 4px;background: #101314;border: none;padding: 5% 0;display: inline-block;}#youtube{padding: unset}#grab{left: 0;background:#2d373a;border-radius: 12px;visibility: hidden;top: -36px;position: absolute;display: flex}#videos-footer-broadcast-wrapper>.video{position: fixed;display: none;width: 5%;top: 0;left: 0}#videos-footer-broadcast-wrapper.active>#videos-footer-submenu-button:hover{background: #1f2223!important}#videos-footer-broadcast-wrapper.active>#videos-footer-submenu-button{background: #2d373a!important}#videos-footer #music-radio .music-radio-playpause{position:absolute;top:0;left:30px;height:100%;width:60px;}#videos-footer #music-radio .music-radio-vol{position: absolute;right: 0;top: 0;}#videos-footer #music-radio button{line-height: 14px;background: #101314;border: none;font-size: 18px;color: white;height: 50%;display: block;width: 30px;}#videos-footer #videos-footer-youtube{left: 120px;border-radius: 0;display:none;}#videos-footer #videos-footer-soundcloud{display:none;border-radius: 0;left: 240px}#videos-footer #videos-footer-youtube,#videos-footer #videos-footer-soundcloud,#videos-footer #music-radio{transition: .2s;line-height: 33px;bottom: 21px;visibility: hidden;height: 36px;margin: unset;width: 120px;position: absolute;z-index: 1;}#videos-footer-push-to-talk{border-radius: unset}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{border-radius: unset;}#videos-footer-broadcast-wrapper.moderation>#videos-footer-broadcast{padding: unset}#videos-footer #music-radio button:hover{background: #53b6ef;cursor: pointer;}#videos-footer #music-radio{left: 0;border-radius: 12px;background: #101314;}#videos-footer:hover #videos-footer-youtube,#videos-footer:hover #videos-footer-soundcloud,#videos-footer:hover #music-radio{visibility: visible}#videos-footer:hover{background:linear-gradient(0deg,rgba(255, 255, 255, 0)0%,rgba(24, 60, 62, 0.29)50%,rgb(83, 182, 239)100%);}#videos-footer{background: linear-gradient(0deg,rgba(255, 255, 255, 0)0%,rgba(24, 60, 62, 0.29)50%,rgba(200, 200, 200, 0.26)100%);cursor:pointer;top: calc(30% + 119px);display:block;padding: 2px 0 0 11px;text-shadow: -1px 0 black,0 1px black,1px 0 black,0 -1px black;font: 800 14px sans-serif;color: #FFFFFF;left: unset;right: -70px;height: 22px;min-height: 22px;z-index: 2;width: 70px;position: absolute}#videos-footer-broadcast{border-radius:unset;z-index: 9999;padding: unset!important;white-space: pre}#videos-footer-broadcast-wrapper{z-index: 9999;visibility: visible;height: 50px;min-height: 50px;width: 400px;padding: unset;right: 0;left: unset;position: fixed;top: calc(30% + 34px)}span[title=\"Settings\"]>svg{padding:4px;height:24px;width:24px}#seek-duration{pointer-events: none;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font: 600 20px sans-serif}#videos{bottom: 0;left: 0;right: 0;top: 0}:host,#videolist{background:unset!important;}.video:after{content: unset;border:unset;}#videos-header-mic>svg{padding: 2px 10px;}#videos-header{z-index: 3;background:#101314;transition: none;left: unset;right: 0;width: 400px;top: calc(30%);position: fixed;max-height: 34px;min-height: 34px;}#videos-header>span{display:block;line-height: unset;}#videos-header-sound>svg{padding: 4px}#videos-header-fullscreen > svg {padding: 7px 8px;}";
        SideMenuCSS = "#close-users{display:none!important;}#user-info{display:none;}#top-buttons-wrapper{display:none;}@media screen and (max-width: 600px) {#sidemenu {top:unset;z-index:2;padding-bottom:0;margin-top:0;}}#sidemenu-wider{display:none;}#sidemenu-content::-webkit-scrollbar{width:0;background:transparent;}#sidemenu{text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font:300 20px sans-serif;left:unset!important;right:0!important;padding-bottom:0;height:30%!important;min-width:400px;max-width:400px;}#sidemenu-content{scrollbar-width:none;padding-top:unset;}";
        MainCSS = "#modal,#videos-footer-submenu{z-index:999999}#mobile-app.show{display:none;}html{background:rgba(0,0,0,1);}#users-icon{display:none;}#menu-icon{display:none;}body{background:" + CMD.MainBackground + ";background-position: center!important;background-size:cover!important;overflow:hidden;}#content{width:calc(100% - 400px);padding:0!important;}#nav-static-wrapper, #nav-fixed-wrapper{display:none;}";
        RoomCSS = "#modal,#videos-footer-submenu{z-index:999999}tc-title{display:flex!important;}#room{padding:0!important;}#room-content{padding-top:0!important;background:unset!important;}#modal,#videos-footer-submenu{z-index:999999}#videos-footer-broadcast-wrapper{ z-index: 9999; }";
        TitleCSS = "#room-header-avatar{display:none}#room-header-gifts{display:none}#room-header-info-text{display:none}#room-header-info-details{display:none}#room-header-mobile-button{display:none}#room-header{border:unset;z-index:1;min-height:36px!important;max-height:36px!important;min-width:400px;max-width:400px;top:calc(30% + 84px);right:0;position:fixed;background: linear-gradient(0deg,rgb(0, 19, 29)0%,rgba(0, 0, 0, 0.85)50%,rgb(9, 41, 57)100%);}#room-header-info>h1{height:100%;top: unset;left: unset;right: unset;text-transform:uppercase;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font:600 20px sans-serif;color:#FFFFFF;}#room-header-info>h1:after{content:unset;}#room-header-info {padding: 7px 0 0 6px!important;box-sizing: border-box;width: 100%!important;top: 0!important;left: 0!important;right: 0!important;}#room-he#room-header-info>span{right: 8px;position: absolute;top:7px;margin-top:0!important;}";
        ContextMenuCSS = ".context.show{height:100%;}.context:after{content:unset;}.context>span{text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font:800 14px sans-serif;color:#FFFFFF;display:inline-block;padding:1px 1%;line-height:17px;height:17px;}.context{background:#101314;position:unset;padding:0;height:0;transition:.25s;}";
        ModeratorCSS = ".video{min-width: 114px;max-width: 114px;}#moderatorlist:after{right:5px;color:#FFFFFF;background:#53b6ef;}#moderatorlist>#header>span>button>svg path{fill:#FFFFFF;}#moderatorlist>#header>span>button{top:-2px;background: #20262870;}#moderatorlist.show>#header>span>button>svg path{fill:#FFFFFF;}#moderatorlist{max-height:60px;}#moderatorlist>#header{height:60px;font-size:16px;font-weight:600;font-family:sans-serif;color:#FFFFFF;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}#moderatorlist.show[data-videos-count=\"1\"], #moderatorlist.show[data-videos-count=\"2\"] {max-height:205px;}#moderatorlist.show[data-videos-count=\"3\"], #moderatorlist.show[data-videos-count=\"4\"] {max-height:290px;}#moderatorlist.show[data-videos-count=\"5\"], #moderatorlist.show[data-videos-count=\"6\"] {max-height:400px;}#moderatorlist.show[data-videos-count=\"7\"], #moderatorlist.show[data-videos-count=\"8\"] {max-height:460px;}#moderatorlist.show[data-videos-count=\"9\"], #moderatorlist.show[data-videos-count=\"10\"] {max-height:545px;}#moderatorlist.show[data-videos-count=\"11\"], #moderatorlist.show[data-videos-count=\"12\"] {max-height:630px;}";
        UserListCSS = "#userlist{padding-bottom:40px;}.list-item>span>span[data-cam=\"1\"]:after{height:15px;width:15px;background-image:url(https://i.imgur.com/QKSbq8d.png);}.list-item>span>span[data-moderator=\"1\"]:before{margin-right:3px;width:15px;height:15px;background-image:url(https://i.imgur.com/CEA9aro.png);}.list-item>span>span{background:transparent;box-shadow:none;}.list-item>span>span>.send-gift{top:4px;}.list-item>span>img{top:6px;}#button-banlist{color:#53b6ef;transition:none;top:calc(30% + 89px);right:3px;position:fixed;}.list-item>span[data-status=\"gold\"]:before,.list-item>span[data-status=\"extreme\"]:before,.list-item>span[data-status=\"pro\"]:before{top:5px;}#userlist>div{height:22px;}#userlist>div>span{color:#FFFFFF;font:bold 16px sans-serif;height:22px;line-height:22px;}#userlist>#header{height:40px;top:10px;}#contextmenu {top:unset!important;bottom:0!important;right:0!important;left:0!important;}";
        ChatListCSS = ".list-item>span>img{top:6px;}.list-item>span.active>span{transition:none;box-shadow:none;background:transparent;visibility:hidden;}.list-item>span>span{top:-4px;background:transparent;box-shadow:none;}.list-item>span>span[data-messages]:before{background:#53b6ef;}.list-item>span[data-status=\"gold\"]:before,.list-item>span[data-status=\"extreme\"]:before,.list-item>span[data-status=\"pro\"]:before{top:5px;}#chatlist>#header>.list-item>span.active{background:#53b6ef;}#chatlist>#header{height:60px;top:30px}#chatlist>div>span{color:#FFFFFF;font:bold 16px sans-serif;height:22px;line-height:22px;}#chatlist>div{height:22px;line-height:22px;}";
        NotificationCSS = "#videos-header > span {background-color: unset!important;line-height: unset;}.PMTime{display:inline-block;padding:0 6px 0 0;margin:0 8px 0 0;border-right:4px groove #797979;}.PMName{display:inline-block;}#popup div{word-break:break-word;user-select: text;-webkit-user-select: text;-moz-user-select: text;color:#FFFFFF;text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font-weight: 300;font-size: 18px;font-family: sans-serif;z-index:1;}.PMOverlay{height: calc(100% - 92px);overflow: hidden;pointer-events:none;position:absolute;padding-top:12px;top:0;bottom:0;left:0;right:0;visibility:visible;}.PMPopup{pointer-events:all;margin:5px auto;width:50%;position:relative;color: #FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}.PMPopup a, .PMPopup a:visited, .PMPopup a:hover, .PMPopup a:active{position:relative;transition:0.5s color ease;text-decoration:none;color:#53b6ef}.PMPopup a:hover{color:#FFFFFF;text-decoration:underline;}.PMPopup h2{border-radius:5px 5px 0 0;background:linear-gradient(0deg,rgb(24, 29, 30) 0%,rgb(24, 29, 30) 52%,rgb(60, 117, 148) 100%);margin:0;padding:5px;font-size:16px;}.PMPopup .PMContent {border-radius: 0 0 5px 5px;padding:5px;max-height:30%;overflow:hidden;word-break:break-all;background:#202628;}";
        ChatboxCSS = "#chat-download:hover{cursor: pointer;-webkit-box-shadow: inset 0 0 20px #53b6ef;box-shadow: inset 0 0 20px 0 #53b6ef;}#chat-download{position: absolute;right: 0;height: 22px;width: 22px;background: url(\"https://i.imgur.com/Bb3fr6Q.png\") center;background-size: 22px;}#chatlog-button{display:none!important;}#chat-instant.show{background:linear-gradient(0deg,rgb(0, 19, 29)0%,rgba(0, 0, 0, 0.85)50%,rgb(25, 29, 32)100%)!important;}#chat-wider{display:none;}#fav-opt{display: inline-block;cursor: pointer;padding: 12px;background: #10131494;}#input-user:checked ~ #user-menu{display:inline-block;}#user-menu > a:hover #user-menu > span > a:hover{color: #FFFFFF}#user-menu > a, #user-menu > span > a {font-weight: 600;position: relative;display: inline-block;width:calc(100% - 30px);padding: 6px;box-sizing: border-box;font-size: 18px;color: #53b6ef;cursor: pointer;transition: .2s;}#user-menu {position: absolute;display: none;bottom: 50px;right: 0;border: 1px solid rgba(0, 0, 0, .06);box-sizing: border-box;border-radius: 3px;color: #FFFFFF;background: #101314;line-height: 1;box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .09);z-index: 1;}#user-menu > span {display: inline-block;width: 100%;padding: 12px;box-sizing: border-box;font-size: 16px;font-weight: 500;white-space: nowrap;text-overflow: ellipsis;cursor: default;overflow: hidden;}#label-user > img {position: absolute;height: 100%;left: -8px;vertical-align: top;}#label-user{position: relative;display: inline-block;height: 48px;width: 48px;border-radius: 100%;overflow: hidden;cursor: pointer;}#header-user{text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;position: absolute;top: 10px;right: 0;}#chat-wrapper.full-screen #chat-instant, #chatf-wrapper.full-screen #chat-instant>.avatar>.status-icon,#chat-wrapper.full-screen #chat-content>.message>.avatar>.status-icon {background:unset;}.CMD-message-unread{display:block;border-radius:6px;padding:1px 6px 1px 6px;background:#53b6ef;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;color:#FFF;font:bold 16px sans-serif;cursor:pointer}.CMDtime{position:absolute;right:3px;top:3px;background: #101314;border: 1px solid black;border-radius: 6px;padding: 1px 6px;}#chat-instant>.avatar>div>img,#CMD-chat-content>.message>.avatar>div>img{position:relative;height:100%;left:-7px}.message>#system_user{background:linear-gradient(0deg,rgb(0, 19, 29)0%,rgba(0, 0, 0, 0.85)50%,rgba(0, 0, 0, 0.72)100%);border: 1px solid black;border-radius: 6px;padding: 1px 6px 1px 6px;word-wrap: break-word;font-weight: 600;font-size: 16px;color: #FFF;text-decoration: none;overflow: hidden;text-overflow: ellipsis;}.message{color:#FFF;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font-family:sans-serif;font-weight:300;font-size:20px;white-space:pre-line;word-wrap:break-word}.message a, .message a:visited, .message a:hover, .message a:active{position:relative;transition:0.5s color ease;text-decoration:none;color:#53b6ef}.message a:hover{text-decoration:underline;}#chat{will-change: transform;min-height:unset;}#CMD-chat-content{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}#CMD-chat-content>.message{padding:3px 3px;background:#101314a8;position:relative;left:0;margin-bottom:3px;border-radius:6px}#CMD-chat-content>.message.highlight,.message.common.highlight{background:rgba(0, 0, 0, 0.5);-webkit-box-shadow:inset 0 0 20px #000000;box-shadow: inset 0 0 20px 0 #000000;}#CMD-chat-content>.message.common{min-height: 50px;padding:3px 3px 3px 50px;box-sizing:border-box;text-align:left}#chat-instant>.avatar,#CMD-chat-content>.message>.avatar{position:absolute;height:40px;width:40px;top:3px;left:3px;-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);pointer-events:none;}#chat-instant>.avatar>div,#CMD-chat-content>.message>.avatar>div{position:absolute;height:100%;width:100%;top:0;left:0;border-radius:100%;overflow:hidden}#notification-content .nickname{border-radius:6px;padding:1px 6px 1px 6px}.notification{padding:1px 0 1px 0;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black}.time{position:absolute;right:5px}.notifbtn:hover{background:linear-gradient(0deg,rgb(0, 135, 186)0%,rgba(0, 49, 64, 0.94)75%,rgba(0, 172, 255, 0.6)100%);}.notifbtn{cursor: pointer;border-radius: 0 0 12px 12px;outline: none;background:linear-gradient(0deg,rgba(0, 0, 0, 0)0%,rgba(37, 37, 37, 0.32)75%,rgba(255, 255, 255, 0.6)100%);border: none;color: white;width: 100%;}#notification-content.large{height:50%;}#notification-content{will-change: transform;top:0;position:relative;scrollbar-width:none;background:#101314;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;height: 15%;min-height:38px;font:bold 16px sans-serif;color:#FFF;overflow-y:scroll;overflow-wrap:break-word;padding:0 6px 0 6px}#notification-content::-webkit-scrollbar{width:0;background:transparent}#CMD-chat-content{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}#chat-instant>.avatar>.status-icon,#CMD-chat-content>.message>.avatar>.status-icon{left:0!important}#chat-instant>.nickname{color:#53b6ef;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;font-size: 20px;font-weight: 800;}#chat-instant::after{background:none;}.on-white-scroll{scrollbar-width: none;overflow-wrap: break-word;}.on-white-scroll::-webkit-scrollbar{width:0;background:transparent}#CMD-chat-content>.message>.nickname{border:1px solid black;border-radius:6px;padding:1px 6px 1px 6px;word-wrap:break-word;max-width:calc(100% - 115px);font-weight:600;font-size:16px;color:#FFF;display:inline-block;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#input{padding-top:0}:host,#input>.waiting{background:#20262870}#input:before,#input:after{content:unset}#input>textarea::placeholder{color:#FFF}#input>textarea::-webkit-input-placeholder{color:#fff}#input>textarea:-moz-placeholder{color:#fff}#input>textarea{width: calc(100% - 57px);line-height:unset;min-height:65px;max-height:65px;border-radius:6px;scrollbar-width:none;background:#101314;text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;color:#FFF;font-size:" + (CMD.FontSize - 4) + "px;font-family:sans-serif;font-weight:300;}#chat-wrapper{border:none;transition:none;bottom:0;right:0!important;max-height:calc(70% - 119px)!important;min-height:calc(70% - 119px)!important;position:fixed!important;min-width:400px;max-width:400px;}#chat-position{top:22px;left:6px;right:6px;bottom:5px;}.on-white-scroll::webkit-scrollbar{width:0;background:transparent;}"+ChatBot.css;
    }
    CMDInit();
    function CMDInit() {
        var err_out=0;
        CMD.ScriptLoading = setInterval(function() {
            err_out++;
            if (Bot.querySelector("tinychat-webrtc-app")) {
                if (Bot.querySelector("tinychat-webrtc-app").shadowRoot) CMDRoomInject();
                debug("TINYCHAT::LOAD", "ROOM");
            } else if (Bot.querySelector("#welcome-wrapper")) {
                CMDHomeInject();
                debug("TinyChat::LOAD", "HOME");
            } else {
                err_out++;
            }
            if (err_out == 50) {
                clearInterval(CMD.ScriptLoading);
                clearInterval(CMD.FullLoad);
            }
        }, 200);
        if (!Bot.URL.match(/^https:\/\/tinychat.com(\/$|\/#)/i)) {
            new MutationObserver(function() {
                this.disconnect();
                CMDWebSocket();
            }).observe(Bot, {
                subtree: true,
                childList: true
            });
        }
        CMD.FullLoad = setInterval(function() {
            if (CMD.ScriptInit && CMD.SocketConnected) {
                clearInterval(CMD.FullLoad);
                if (CMD.Me.mod) {
                    if (CMD.Bot) CheckHost();
                    if (CMD.Room.YT_ON) VideoListElement.querySelector("#videos-footer>#videos-footer-youtube").style.cssText = "display:block;";
                    if (CMD.Room.YT_ON && CMD.Project.isTouchScreen) VideoListElement.querySelector("#videos-footer>#videos-footer-youtube").classList.toggle("hidden");
                }
                if (CMD.Room.PTT) {
                    VideoListElement.querySelector("#videos-footer-push-to-talk").addEventListener("mouseup", function(e) {
                        if (e.which == 1) CMD.AutoMicrophone = false;
                        if (e.which == 1 && e.ctrlKey === true) CMD.AutoMicrophone = !CMD.AutoMicrophone;
                        if (e.which == 2) CMD.AutoMicrophone = !CMD.AutoMicrophone;
                    }, {
                        passive: true
                    });
                }
                var favorited_rooms = "",
                    len = CMD.Favorited.length,
                    script = Bot.createElement("script"),
                    elem = Bot.getElementsByTagName("script")[0];
                script.text = 'function AddFavorite(obj, index) {\n var val = JSON.parse(localStorage.getItem("' + CMD.Project.Storage + 'Favorited"));\n val[index]=["' + CMD.Room.Name + '","' + CMD.Room.Avatar + '"];\n localStorage.setItem("' + CMD.Project.Storage + 'Favorited", JSON.stringify(val));\n obj.href ="https://tinychat.com/room/' + CMD.Room.Name + '";\n obj.innerText = "' + CMD.Room.Name + '";\n obj.onclick = null;\n return false;\n}';
                elem.parentNode.insertBefore(script, elem);
                for (var i = 0; i < len; i++) favorited_rooms += CMD.Favorited[i] !== null ? "#" + (i + 1) + '<a href="https://tinychat.com/room/' + CMD.Favorited[i][0] + '">' + CMD.Favorited[i][0] + "</a>" : "#" + (i + 1) + '<a href="#" onclick="return AddFavorite(this,' + i + ');">ADD ROOM</a>';
                ChatLogElement.querySelector("#input").insertAdjacentHTML("afterbegin", '<div id="header-user"><label id="label-user" for="input-user"><img class="switcher" src="' + (CMD.Me.avatar ? CMD.Me.avatar : "https://avatars.tinychat.com/standart/small/eyePink.png") + '"></label><input type="checkbox" id="input-user" hidden=""><div id="user-menu"><span id="nickname">FAVORITED ROOMS</span>' + favorited_rooms + '<span id="nickname">' + CMD.Me.username + '</span><a href="https://tinychat.com/settings/gifts"> My Gifts</a><a href="https://tinychat.com/settings/profile">Profile</a><a href="https://tinychat.com/room/' + CMD.Me.username + '">My Room</a><a href="https://tinychat.com/#">Directory</a></div></div>');
                var recent_gifts = "\n";
                for (var g = 0; g < CMD.Room.Recent_Gifts.length; g++) recent_gifts += "<img src=\""+CMD.Room.Recent_Gifts[g]+"\" />";
                Settings("<center><u>" + CMD.Room.Name.toUpperCase() + "</u>" + (CMD.Room.Avatar ? '\n<img src="' + CMD.Room.Avatar + '">' : "") + "\n" + CMD.Room.Bio + '\n<a href="' + CMD.Room.Website + '" target="_blank">' + CMD.Room.Website + "</a>"+((recent_gifts!="")?recent_gifts:"")+"\n\nROOM CONFIGURATION:\nYouTube Mode: " + ((CMD.Room.YT_ON) ? "ON" : "OFF") + "\n\n</center>");
                CMD.ShowedSettings = true;
                AddUserNotification(2, CMD.Me.namecolor, CMD.Me.nick, CMD.Me.username, false);
                SoundMeter();
                Reminder();
            }
        }, 500);
    }
    function CMDHomeInject() {
        var HomeCSS = '@media screen and (max-width: 1000px){.nav-menu {background-color: #181e1f;}}.nav-sandwich-menu-button{background-color:unset;}#modalfree-wrapper{display: none;}.tile-header > img {transition:unset;}.tile-favroom-opt{cursor:pointer;position: absolute;right: 0;top: 0;padding: 1px;background:#10131494;}.tile-favroom-opt:hover{background:#ff00008c;}#content{padding-bottom:unset;}.tile-content{height:180px;}.CMD-footer-contents .tile-info{height:20px}.CMD-footer-contents .tile-header>img{cursor:pointer;height: 220px;}.tile-header>img{height: 230px;width: 100%;max-width: 100%;}.CMD-footer:hover .CMD-footer-contents .tile{font-size: 18px;font-weight: 800;width:20%;display:inline-block;}.CMD-footer-contents .tile {background: #00a2ff;text-align: center;border:unset;height:unset;display:none;margin: unset;}.CMD-footer {background:#10131494;width: 100%;position: fixed;bottom: 0;left: 0;}#catalog > div {display: inline-block;padding: 5px;box-sizing: border-box;}.tile[data-status="pro"], .tile[data-status="extreme"], .tile[data-status="gold"] {margin-top: 12px;}.tile-header {border-radius: 12px 12px 0 0;}#promoted .tile-header > img{width:100%;}#navigation > label{border-radius:12px;}#welcome>div{padding-top:0}.tile-statistic{padding-top:0;padding-bottom:4px;background: #000000a6;}.tile-name{padding-top:unset;}#promote-button{border-radius: 12px 12px 0 0;}tile-name{padding-top:unset;}.tile-info{bottom:unset;top:0;height:28px;}.CMD-footer > h2, #promoted-wrapper > h2, #trended-wrapper > h2, #header-for-all{text-align: center;font-size: 30px;font-weight: 800;}body{background:' + CMD.MainBackground + ';background-size:cover;background-attachment: fixed;}.tile-content-info-icon > img {display:none;}.tile-content-info{font-size: 14px;font-weight: 600;}#promoted .tile-content-info-text{word-break: break-word;max-height:95px;}.tile{border:2px solid #fff;margin-top: 13px;height:425px;}#loadmore-no-more {background:#101314;}.tile-content > img{display:none;}#welcome-wrapper{background: #10131494;border-bottom:unset;}#loadmore{background: #00a2ff;font-weight: 600;}#user-menu{background: #101314;}#nav-static-wrapper {-webkit-box-shadow: 0 0 20px 17px #53b6ef;box-shadow: 0 0 20px 17px #53b6ef;background:#101314;}#up-button:hover > #up-button-content {background: #10131459;}#nav-fixed{border-bottom:unset;}#nav-fixed-wrapper{-webkit-box-shadow: 0 0 20px 17px #53b6ef;box-shadow: 0 0 20px 17px #53b6ef;background: #101314;}#nav-static {border-bottom:unset;}#welcome{padding:12px 30px 24px;}.tile{border-radius: 12px;background: #101314b3;}div, span, a, h1, h2, h3, h4, h5, h6, p {text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;color: #FFFFFF!important;}#promoted-wrapper > div, #trended-wrapper > div {background: #00a2ff;border-radius: 12px;}.tile-content-info-text {word-break: break-word;width:100%;}.tile-content-info.with-icon {display: contents;}#navigation > label:not([for="input-catalog-navigation"]) {font-weight:600;background: #000000;}';
        Bot.body.querySelector("style").insertAdjacentHTML("beforeend", HomeCSS);
        Bot.body.insertAdjacentHTML("beforeend", '<div class="CMD-footer"><h2>FAVORITED ROOMS</h2><div class="CMD-footer-contents"></div></div>');
        var script = Bot.createElement("script"),
            elem = Bot.getElementsByTagName("script")[0];
        script.text = 'function RemoveFavorite(obj, index) {\n	var val = JSON.parse(localStorage.getItem("' + CMD.Project.Storage + 'Favorited"));\n	val[index]=null;\n	localStorage.setItem("' + CMD.Project.Storage + 'Favorited", JSON.stringify(val));\n	return obj.parentNode.parentNode.remove();\n}';
        elem.parentNode.insertBefore(script, elem);
        var len = CMD.Favorited.length;
        for (var i = 0; i < len; i++) Bot.body.querySelector(".CMD-footer-contents").insertAdjacentHTML("beforeend", CMD.Favorited[i] !== null ? '<div class="tile" data-room-name="' + CMD.Favorited[i][0] + '">Favorite #' + (i + 1) + ' <div class="tile-header"><img id="tile-header-image" src="' + (CMD.Favorited[i][1] ? CMD.Favorited[i][1] : "https://i.imgur.com/VnVFEv7.png") + '" onclick="locationTo(\'/room/' + CMD.Favorited[i][0] + '\');"><div class="tile-info"><div class="tile-favroom-opt" onclick="RemoveFavorite(this,' + i + ')">X</div><div class="tile-name">' + CMD.Favorited[i][0] + '</div></div></div></div>' : '<div class="tile">Favorite #' + (i + 1) + "</div>");
        clearInterval(CMD.ScriptLoading);
        CMD.ScriptInit = true;
        CMDHomePrepare();
    }
    function CMDHomePrepare() {
        ChatBot.ModalFreeTrialPro = function() {};
        Remove(Bot, "#footer");
        Remove(Bot, ".nav-logo");
    }
    function CMDRoomInject() {
        ChatBot.CMDImages = [
            "https://i.imgur.com/8M0NPCv.png", "https://i.imgur.com/E4Ovb80.jpg", "https://i.imgur.com/QdOTqIR.jpg", "https://i.imgur.com/qqFsein.jpg", "https://i.imgur.com/vVD5pUb.jpg", "https://i.imgur.com/Sux2Age.jpg", "https://i.imgur.com/cIKznlf.jpg", "https://i.imgur.com/iEMP5I6.jpg", "https://i.imgur.com/rEGy1tK.jpg", "https://i.imgur.com/JR6Ped5.jpg", "https://i.imgur.com/m3dX7yn.jpg", "https://i.imgur.com/2cJqV1K.jpg", "https://i.imgur.com/QL1M4yG.jpg", "https://i.imgur.com/Syy1mUU.jpg", "https://i.imgur.com/sRpDOp3.jpg", "https://i.imgur.com/Im7dWdM.jpg", "https://i.imgur.com/9uCdYyq.png", "https://i.imgur.com/X9Kp6ka.jpg", "https://i.imgur.com/TOZTx1M.jpg", "https://i.imgur.com/wcjxVjk.png", "https://i.imgur.com/UZfmih9.png", "https://i.imgur.com/mkauZUT.jpg", "https://i.imgur.com/GfPqv7d.jpg", "https://i.imgur.com/R7AOtjV.jpg", "https://i.imgur.com/Qso6n8k.jpg", "https://i.imgur.com/vVfj23z.jpg", "https://i.imgur.com/BYPsShX.jpg", "https://i.imgur.com/1EWYBQw.jpg", "https://i.imgur.com/Oaq0eip.jpg", "https://i.imgur.com/HVHaJ1r.jpg", "https://i.imgur.com/SImcSc2.png", "https://i.imgur.com/CgRDCdy.jpg", "https://i.imgur.com/VMtXsES.png", "https://i.imgur.com/oxHz9un.jpg", "https://i.imgur.com/VN6x9QA.jpg", "https://i.imgur.com/9KhjWvW.jpg", "https://i.imgur.com/fu0eiv4.jpg", "https://i.imgur.com/QgcvxZf.jpg", "https://i.imgur.com/2kz8Roz.jpg", "https://i.imgur.com/A2AdQd8.jpg", "https://i.imgur.com/zuNUJ4J.jpg", "https://i.imgur.com/CW4mVWE.jpg", "https://i.imgur.com/0NGecGX.jpg", "https://i.imgur.com/4IEcVlr.jpg", "https://i.imgur.com/JDnQzF4.jpg", "https://i.imgur.com/Ye6iIrw.jpg", "https://i.imgur.com/DVlwQFN.jpg", "https://i.imgur.com/G6Oa9s6.jpg", "https://i.imgur.com/cXpEHvX.jpg", "https://i.imgur.com/ANXRz54.jpg", "https://i.imgur.com/i7KvpAf.jpg", "https://i.imgur.com/kJ44IQQ.jpg", "https://i.imgur.com/5ONal5c.jpg", "https://i.imgur.com/nWuC5FK.jpg", "https://i.imgur.com/ZYNsEN6.jpg", "https://i.imgur.com/C3aVnBq.jpg", "https://i.imgur.com/8Kts9t7.jpg", "https://i.imgur.com/QiaDx3C.jpg", "https://i.imgur.com/wrt6zBN.jpg", "https://i.imgur.com/3YgGoV0.jpg", "https://i.imgur.com/HPsbhiF.jpg", "https://i.imgur.com/X4wSs8f.jpg", "https://i.imgur.com/cqeMox0.jpg", "https://i.imgur.com/apNgmSO.jpg", "https://i.imgur.com/YjYcyCn.jpg", "https://i.imgur.com/2hUFTDv.png", "https://i.imgur.com/7lDQKff.jpg", "https://i.imgur.com/yuQTkOy.png", "https://i.imgur.com/7zvCOpV.jpg", "https://i.imgur.com/L5v6bcs.jpg", "https://i.imgur.com/5h3N2HY.jpg", "https://i.imgur.com/AvhrIcv.jpg", "https://i.imgur.com/DsAMAG1.jpg", "https://i.imgur.com/dDvOwXi.jpg", "https://i.imgur.com/ii00Lnl.jpg",
            "https://i.imgur.com/vHDQY7N.jpg", "https://i.imgur.com/czfeyXQ.jpg", "https://i.imgur.com/pHEAee2.jpg", "https://i.imgur.com/txu4z7B.jpg", "https://i.imgur.com/NOapG69.jpg", "https://i.imgur.com/cxA4ist.jpg", "https://i.imgur.com/2keIszu.jpg", "https://i.imgur.com/q2Kpinf.jpg", "https://i.imgur.com/nDiFD2D.jpg", "https://i.imgur.com/Lvk0Lql.jpg", "https://i.imgur.com/QcRIeBr.jpg", "https://i.imgur.com/GlBONNB.jpg", "https://i.imgur.com/jVmJ9Iz.jpg", "https://i.imgur.com/9h2N288.png", "https://i.imgur.com/q0Rm3dS.jpg", "https://i.imgur.com/1tTKfKM.png", "https://i.imgur.com/nEwJBan.jpg", "https://i.imgur.com/NgE4lXY.jpg", "https://i.imgur.com/I4Pv5Zc.jpg", "https://i.imgur.com/QVDBSEm.jpg", "https://i.imgur.com/N9KfkgT.jpg", "https://i.imgur.com/mLIDP8a.jpg", "https://i.imgur.com/C8fAtMn.jpg", "https://i.imgur.com/e2Pubr3.jpg", "https://i.imgur.com/6drF4lG.jpg", "https://i.imgur.com/JcFhmPT.jpg", "https://i.imgur.com/wQQlX06.jpg", "https://i.imgur.com/qPTFnVp.jpg", "https://i.imgur.com/KWto7ab.jpg", "https://i.imgur.com/DHEdXnE.jpg", "https://i.imgur.com/49vqbrB.jpg", "https://i.imgur.com/TK4I9DI.jpg", "https://i.imgur.com/o5QNrcQ.jpg", "https://i.imgur.com/49adw4l.jpg", "https://i.imgur.com/vyYOZkE.jpg", "https://i.imgur.com/sBaXCoY.jpg", "https://i.imgur.com/dH0M8aN.png", "https://i.imgur.com/aqZ4VDh.jpg", "https://i.imgur.com/hMpMR84.jpg", "https://i.imgur.com/5zR2i8W.jpg", "https://i.imgur.com/oUPXbGf.jpg", "https://i.imgur.com/YW5tv1t.jpg", "https://i.imgur.com/JgKwHXs.jpg", "https://i.imgur.com/2k9JihV.jpg", "https://i.imgur.com/V5MUGj4.jpg", "https://i.imgur.com/3dUgoAf.jpg", "https://i.imgur.com/Q6aJgBM.jpg", "https://i.imgur.com/gRSmljE.jpg", "https://i.imgur.com/nkhsbE9.jpg", "https://i.imgur.com/I6LMqZq.jpg", "https://i.imgur.com/7OzdeRk.jpg", "https://i.imgur.com/wW94Pvc.jpg", "https://i.imgur.com/jQrTdv2.jpg", "https://i.imgur.com/UDgQ2Fh.jpg", "https://i.imgur.com/qjdMmPf.jpg", "https://i.imgur.com/yh7QoUN.jpg", "https://i.imgur.com/XchwuKo.jpg", "https://i.imgur.com/fdPaQbz.jpg", "https://i.imgur.com/zNfKy8I.jpg", "https://i.imgur.com/TaOf7dX.jpg", "https://i.imgur.com/bZxfyu8.jpg", "https://i.imgur.com/ccZRfsA.jpg", "https://i.imgur.com/wlbmT74.jpg", "https://i.imgur.com/29ffHeU.jpg", "https://i.imgur.com/30HbBAA.jpg", "https://i.imgur.com/4pO8b0B.jpg", "https://i.imgur.com/kD6BveQ.jpg", "https://i.imgur.com/LrCsiQj.jpg", "https://i.imgur.com/QN5NcXK.jpg", "https://i.imgur.com/MWW5cOv.jpg", "https://i.imgur.com/7LvskAH.jpg", "https://i.imgur.com/S7kLNct.jpg", "https://i.imgur.com/rL0olge.jpg", "https://i.imgur.com/0Apm59C.jpg", "https://i.imgur.com/ZMRBVvO.jpg",
            "https://i.imgur.com/xFNZTwS.jpg", "https://i.imgur.com/iqq8ECW.jpg", "https://i.imgur.com/xEth2qp.jpg", "https://i.imgur.com/8ijIZMj.jpg", "https://i.imgur.com/zSB1DOw.jpg", "https://i.imgur.com/6TzjZSd.jpg", "https://i.imgur.com/Gf9yAwP.jpg", "https://i.imgur.com/u5ifVZy.jpg", "https://i.imgur.com/4ibO4FN.jpg", "https://i.imgur.com/bDCygo7.jpg", "https://i.imgur.com/lqktMar.jpg", "https://i.imgur.com/b2jAXiC.jpg", "https://i.imgur.com/oPE32ni.jpg", "https://i.imgur.com/YRjfPjP.jpg", "https://i.imgur.com/1FRwNEb.jpg", "https://i.imgur.com/dzgvlEx.jpg", "https://i.imgur.com/3FCAMiu.jpg", "https://i.imgur.com/wF5k6Ux.jpg", "https://i.imgur.com/mkuNYYa.jpg", "https://i.imgur.com/Y2Yu3yA.jpg", "https://i.imgur.com/Zchlast.jpg", "https://i.imgur.com/2FbH2jq.jpg", "https://i.imgur.com/Bb4iyy0.jpg", "https://i.imgur.com/7rjAtTt.jpg", "https://i.imgur.com/g1rNC8Z.jpg", "https://i.imgur.com/nOVCUTy.png", "https://i.imgur.com/qloc683.jpg", "https://i.imgur.com/irmzqz7.jpg", "https://i.imgur.com/pvmhbwL.jpg", "https://i.imgur.com/Xti1aEf.jpg", "https://i.imgur.com/FqFYows.jpg", "https://i.imgur.com/92zz2Zu.jpg", "https://i.imgur.com/jWrqBga.jpg", "https://i.imgur.com/OMSQsDe.jpg", "https://i.imgur.com/bvTtaLQ.jpg", "https://i.imgur.com/vxt6B7Y.jpg", "https://i.imgur.com/siw7Ipn.jpg", "https://i.imgur.com/paQsmXk.jpg", "https://i.imgur.com/VLHs9cT.png", "https://i.imgur.com/6VSxbJY.jpg", "https://i.imgur.com/C3Xn1WD.jpg", "https://i.imgur.com/d6BBFfS.jpg", "https://i.imgur.com/HyK1BFP.jpg", "https://i.imgur.com/2InicOt.jpg", "https://i.imgur.com/IVM4luE.jpg", "https://i.imgur.com/VLE0zNA.jpg", "https://i.imgur.com/rfgwqVI.jpg", "https://i.imgur.com/GsTMYfk.jpg", "https://i.imgur.com/yMEdYBN.jpg", "https://i.imgur.com/LvrO8oB.jpg", "https://i.imgur.com/1VBNkJP.jpg", "https://i.imgur.com/beuJiKd.jpg", "https://i.imgur.com/61h9Twq.jpg", "https://i.imgur.com/mnszrZ3.jpg", "https://i.imgur.com/He8K7kF.jpg", "https://i.imgur.com/id5BSLh.jpg", "https://i.imgur.com/huazhWL.jpg", "https://i.imgur.com/ttc4EYq.jpg", "https://i.imgur.com/HTO5tGy.jpg", "https://i.imgur.com/Pg1NrT1.jpg", "https://i.imgur.com/HEubZeG.jpg", "https://i.imgur.com/yk4XVVu.jpg", "https://i.imgur.com/Q6xqV8U.jpg", "https://i.imgur.com/ROTOMPV.jpg", "https://i.imgur.com/5DBP49J.jpg", "https://i.imgur.com/1pafkRu.jpg", "https://i.imgur.com/ZYJW79s.jpg", "https://i.imgur.com/5hJnezu.jpg", "https://i.imgur.com/LHRwsur.jpg", "https://i.imgur.com/858hMb9.jpg", "https://i.imgur.com/WOtpN81.jpg", "https://i.imgur.com/ITCxNl1.jpg", "https://i.imgur.com/OvXfe6w.jpg", "https://i.imgur.com/EVYKONX.jpg", "https://i.imgur.com/9nP4KwW.jpg",
            "https://i.imgur.com/1SaESYp.jpg", "https://i.imgur.com/xBQlQKh.jpg", "https://i.imgur.com/yonFqV5.jpg", "https://i.imgur.com/go0xMSw.png", "https://i.imgur.com/jJhFpGw.jpg", "https://i.imgur.com/fcULcZq.jpg", "https://i.imgur.com/66l2lHM.jpg", "https://i.imgur.com/bujMfoQ.jpg", "https://i.imgur.com/JdbenHz.jpg", "https://i.imgur.com/merXbme.jpg", "https://i.imgur.com/ogrqxoQ.jpg", "https://i.imgur.com/fCstr3I.jpg", "https://i.imgur.com/t4d6ngW.jpg", "https://i.imgur.com/QzTlCSw.png", "https://i.imgur.com/CjrvvRI.jpg", "https://i.imgur.com/Du0abK6.jpg", "https://i.imgur.com/fZxRbtq.jpg", "https://i.imgur.com/zJB8VZc.jpg", "https://i.imgur.com/5lFG1Bf.jpg", "https://i.imgur.com/hvGzGNb.png", "https://i.imgur.com/UHZ8gC6.jpg", "https://i.imgur.com/ZIlJIIZ.png", "https://i.imgur.com/H7SjU1N.jpg", "https://i.imgur.com/yxxQsmf.jpg", "https://i.imgur.com/1TBkVzd.jpg", "https://i.imgur.com/3WffDw4.jpg", "https://i.imgur.com/XQU3W19.png", "https://i.imgur.com/2YxUgbQ.jpg", "https://i.imgur.com/8TVSB7D.jpg", "https://i.imgur.com/lNfEZwF.jpg", "https://i.imgur.com/2CgZewR.jpg", "https://i.imgur.com/ZJMFXGM.jpg", "https://i.imgur.com/9pZLYVF.jpg", "https://i.imgur.com/i9KaWdK.jpg", "https://i.imgur.com/X0hUxMg.jpg", "https://i.imgur.com/cWNLBLC.jpg", "https://i.imgur.com/oVQ1qmK.jpg", "https://i.imgur.com/MFa4WPr.jpg", "https://i.imgur.com/QalYWeA.png", "https://i.imgur.com/bLAlVzX.jpg", "https://i.imgur.com/OEXO2kT.jpg", "https://i.imgur.com/MnK5lmL.jpg", "https://i.imgur.com/dVMdMZh.jpg", "https://i.imgur.com/nNfOFvX.png", "https://i.imgur.com/yzoTLrK.jpg", "https://i.imgur.com/b1mTB58.jpg", "https://i.imgur.com/uWMQpMV.jpg", "https://i.imgur.com/TVGqTdH.jpg", "https://i.imgur.com/GFfZk0L.jpg", "https://i.imgur.com/aS5RCaX.jpg", "https://i.imgur.com/TTWYjDg.png", "https://i.imgur.com/OKUbuLl.jpg", "https://i.imgur.com/FyIJb7S.jpg", "https://i.imgur.com/KVTNHKB.jpg", "https://i.imgur.com/G9cpqNM.jpg", "https://i.imgur.com/cFf5e30.jpg", "https://i.imgur.com/1Nok0ho.jpg", "https://i.imgur.com/ozEWuPz.jpg", "https://i.imgur.com/QhHTLxc.jpg", "https://i.imgur.com/YYto1AX.jpg", "https://i.imgur.com/1THGvEA.jpg", "https://i.imgur.com/Rt3mp6H.jpg", "https://i.imgur.com/M2tiiNS.jpg", "https://i.imgur.com/lRtAxDM.jpg", "https://i.imgur.com/dlqkyFg.jpg", "https://i.imgur.com/lSLHeHM.png", "https://i.imgur.com/wKBOEof.png", "https://i.imgur.com/0aF2Si4.jpg", "https://i.imgur.com/bPDtdqH.jpg", "https://i.imgur.com/wZ08FwN.jpg", "https://i.imgur.com/gEtlvpr.jpg", "https://i.imgur.com/sTrwc9U.jpg", "https://i.imgur.com/nPEjErr.png", "https://i.imgur.com/bRaK26l.jpg", "https://i.imgur.com/vwJe85N.jpg",
            "https://i.imgur.com/F8RFA5t.jpg", "https://i.imgur.com/M08DwfB.jpg", "https://i.imgur.com/gvF4hmM.jpg", "https://i.imgur.com/vINAgNJ.jpg", "https://i.imgur.com/ZzIHnk7.png", "https://i.imgur.com/IaYE1SA.png", "https://i.imgur.com/h3uA809.jpg", "https://i.imgur.com/uSxy1TH.jpg", "https://i.imgur.com/ihUpL67.jpg", "https://i.imgur.com/JA5pSwV.jpg", "https://i.imgur.com/S5PaNRb.jpg", "https://i.imgur.com/vPKxrIj.jpg", "https://i.imgur.com/Zb2vtPA.jpg", "https://i.imgur.com/uUkxBYp.jpg", "https://i.imgur.com/fpsAui6.jpg", "https://i.imgur.com/Ns5gM3Y.jpg", "https://i.imgur.com/qUFLtvX.jpg", "https://i.imgur.com/JsVmBaH.jpg", "https://i.imgur.com/DUFEeDG.jpg", "https://i.imgur.com/VkT9WNe.jpg", "https://i.imgur.com/7rHa1t1.jpg", "https://i.imgur.com/6rt4Xsc.jpg", "https://i.imgur.com/1woJRNz.jpg", "https://i.imgur.com/DZizgSe.jpg", "https://i.imgur.com/WcPkq2p.jpg", "https://i.imgur.com/FWgshWM.jpg", "https://i.imgur.com/ce28KTw.jpg", "https://i.imgur.com/Z1kgLE9.jpg", "https://i.imgur.com/qmTDbVf.jpg", "https://i.imgur.com/Glfmlwk.jpg", "https://i.imgur.com/1ZlA3eI.jpg", "https://i.imgur.com/FyY9zQB.jpg", "https://i.imgur.com/5vION1i.jpg", "https://i.imgur.com/GN8VSLo.jpg", "https://i.imgur.com/fMHj9aD.png", "https://i.imgur.com/AZKVqlm.jpg", "https://i.imgur.com/N6yrNAp.jpg", "https://i.imgur.com/mzfGu1K.jpg", "https://i.imgur.com/PbDAvp8.jpg", "https://i.imgur.com/PeKxWNd.png", "https://i.imgur.com/q6HucmK.jpg", "https://i.imgur.com/PcpoEr9.jpg", "https://i.imgur.com/m8MKD34.jpg", "https://i.imgur.com/rEfHYFj.png", "https://i.imgur.com/YOnQC7m.jpg", "https://i.imgur.com/IKZ1dnz.png", "https://i.imgur.com/7dKl6GR.jpg", "https://i.imgur.com/7QTdYyC.jpg", "https://i.imgur.com/VY6CRU9.jpg", "https://i.imgur.com/JbbTXGZ.jpg", "https://i.imgur.com/LiWognc.jpg", "https://i.imgur.com/lAlCmCS.jpg", "https://i.imgur.com/tuoVfDz.jpg", "https://i.imgur.com/jDtr7VV.jpg", "https://i.imgur.com/Fmq1w0x.jpg", "https://i.imgur.com/SW9tEby.jpg", "https://i.imgur.com/OIeGtF1.jpg", "https://i.imgur.com/y28VX6l.jpg", "https://i.imgur.com/SmN01pH.jpg", "https://i.imgur.com/pYIHV3V.jpg", "https://i.imgur.com/4mefbZJ.jpg", "https://i.imgur.com/CrnksCn.jpg", "https://i.imgur.com/DqdQHU5.jpg", "https://i.imgur.com/Kyp7Mrq.jpg", "https://i.imgur.com/5uUI0FK.jpg", "https://i.imgur.com/nYyKnjc.jpg", "https://i.imgur.com/8yngY9r.png", "https://i.imgur.com/LXTztRk.jpg", "https://i.imgur.com/YW9f04H.jpg", "https://i.imgur.com/VEOTdF4.jpg", "https://i.imgur.com/CNcnljn.jpg", "https://i.imgur.com/cVyPQRQ.jpg", "https://i.imgur.com/QVnisWP.jpg", "https://i.imgur.com/xkOmSt2.jpg", "https://i.imgur.com/OWqkrGA.jpg",
            "https://i.imgur.com/407ypHE.jpg", "https://i.imgur.com/q7CBMPA.jpg", "https://i.imgur.com/jLgvLEB.jpg", "https://i.imgur.com/ZgRybJZ.jpg", "https://i.imgur.com/BCiqZoY.jpg", "https://i.imgur.com/C4FCE08.jpg", "https://i.imgur.com/mwQMddH.jpg", "https://i.imgur.com/c9Na9m7.jpg", "https://i.imgur.com/rvkOyhW.jpg", "https://i.imgur.com/fXikj5n.jpg", "https://i.imgur.com/B9nwfN2.jpg", "https://i.imgur.com/NitZTxZ.jpg", "https://i.imgur.com/4U7Wc6E.jpg", "https://i.imgur.com/wk2byhf.jpg", "https://i.imgur.com/kmeF9zK.jpg", "https://i.imgur.com/fpOurZh.jpg", "https://i.imgur.com/A6t86N6.jpg", "https://i.imgur.com/CnGthdb.jpg", "https://i.imgur.com/FgCA3uK.jpg", "https://i.imgur.com/sCYYhqf.jpg", "https://i.imgur.com/2NopGqw.jpg", "https://i.imgur.com/fzYZGdC.jpg", "https://i.imgur.com/nZufx8p.jpg", "https://i.imgur.com/IjMMreD.jpg", "https://i.imgur.com/HEpf4Eb.jpg", "https://i.imgur.com/jZeIfAc.jpg", "https://i.imgur.com/ZxaX4j0.jpg", "https://i.imgur.com/DXetwFt.jpg", "https://i.imgur.com/euIXHlP.jpg", "https://i.imgur.com/U4Mo2Hn.jpg", "https://i.imgur.com/w4pR6Hp.jpg", "https://i.imgur.com/79GciEk.jpg", "https://i.imgur.com/WpDbcAA.jpg", "https://i.imgur.com/YODAe6Z.jpg", "https://i.imgur.com/4It1NIe.jpg", "https://i.imgur.com/ALkfNHF.jpg", "https://i.imgur.com/xJOaHZP.jpg", "https://i.imgur.com/nFCIuJo.jpg", "https://i.imgur.com/oXgFh2K.jpg", "https://i.imgur.com/Vcs3jXT.jpg", "https://i.imgur.com/XGtJE58.jpg", "https://i.imgur.com/q4WalQY.jpg", "https://i.imgur.com/WFIyruV.jpg", "https://i.imgur.com/sItJMKv.jpg", "https://i.imgur.com/LAQ3Wpl.jpg", "https://i.imgur.com/C64XPAR.jpg", "https://i.imgur.com/hyehxek.jpg", "https://i.imgur.com/4XYBWKu.jpg", "https://i.imgur.com/KU1adf4.jpg", "https://i.imgur.com/L3sbodb.png", "https://i.imgur.com/JPMfbL9.jpg", "https://i.imgur.com/ieae2zo.jpg", "https://i.imgur.com/VVswQpo.jpg", "https://i.imgur.com/fWUr6ic.jpg", "https://i.imgur.com/juRIj2L.jpg", "https://i.imgur.com/2Mq8ZR8.jpg", "https://i.imgur.com/ibC5gSl.jpg", "https://i.imgur.com/63uHgyR.jpg", "https://i.imgur.com/xs3yEut.jpg", "https://i.imgur.com/0SYzA7u.jpg", "https://i.imgur.com/hRKhVTS.jpg", "https://i.imgur.com/IGv4V1p.jpg", "https://i.imgur.com/hmlxgXG.jpg", "https://i.imgur.com/q97Z7Nc.jpg", "https://i.imgur.com/1A6NPKj.jpg", "https://i.imgur.com/y97L14a.jpg", "https://i.imgur.com/DPohLPu.jpg", "https://i.imgur.com/JvXJ74s.jpg", "https://i.imgur.com/mA5b8Y1.jpg", "https://i.imgur.com/FVNerO1.jpg", "https://i.imgur.com/KNsh665.jpg", "https://i.imgur.com/Z9b0Gme.jpg", "https://i.imgur.com/z90LZmp.jpg", "https://i.imgur.com/tfXYXr7.png", "https://i.imgur.com/atHkjXl.jpg",
            "https://i.imgur.com/u1l34Vi.jpg", "https://i.imgur.com/X0yROLr.jpg", "https://i.imgur.com/EpHkJZI.jpg", "https://i.imgur.com/TIKipWb.jpg", "https://i.imgur.com/Lq4qnDF.jpg", "https://i.imgur.com/N1KmzQo.jpg", "https://i.imgur.com/pAReFTB.jpg", "https://i.imgur.com/ZKMQwxk.jpg", "https://i.imgur.com/aSDE7i4.jpg", "https://i.imgur.com/kabITqS.jpg", "https://i.imgur.com/W7oaDNe.jpg", "https://i.imgur.com/VHYmth8.jpg",
        ];
        ChatBot.CMDEightBall = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As  I see it, yes.", "Most Likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
        ChatBot.CMDWelcomes = ["Hey ", "What's crackin ", "Hello ", "Good to see you ", "Howdy ", "Hey there ", "Yo ", "What's up ", "Greetings ", "What's hangin' "];
        ChatBot.CMDSound = {
            C: new Audio("https://media.vocaroo.com/mp3/e3VIvvFqdHe"),
            HIGHLIGHT: new Audio("https://media.vocaroo.com/mp3/mjS6tza4Tu4"),
            GREET: new Audio("https://media.vocaroo.com/mp3/mjS6tza4Tu4"),
            MENTION: new Audio("https://media.vocaroo.com/mp3/gsrjQNCdhlX"),
            MSG: new Audio("https://tinychat.com"+ChatBot.rootDir+"/sound/pop.mp3"),
            GIFT: new Audio("https://tinychat.com"+ChatBot.rootDir+"/sound/magic.mp3"),
            PVTMSG: new Audio("https://media.vocaroo.com/mp3/1eX3L752VdQ")
        };
        ChatBot.CMDRadioStations = [
            ["Flex 98.5FM", "https://edge1-b.exa.live365.net/a23768"],
            ["The Loop 97.9", "https://16883.live.streamtheworld.com/WLUPFMAAC.aac"],
            ["HOT899", "https://newcap.leanstream.co/CIHTFM"],
            ["chillstep.info", "https://chillstep.info/listen.ogg"],
            ["HOT997", "https://ice5.securenetsystems.net/KHHK"],
            ["Dance365", "https://edge1-b.exa.live365.net/a93720"],
            ["kexp.org", "https://kexp-mp3-128.streamguys1.com/kexp128.mp3"],
            ["Classic Deep Cuts", "https://edge1-b.exa.live365.net/a72496"],
            ["Divas Hustle Radio", "https://edge1-b.exa.live365.net/a72972"],
            ["Retro 8089", "https://edge1-b.exa.live365.net/a53202"],
            ["Teerex Radio Teerex", "https://edge1-b.exa.live365.net/a74387"],
            ["NGI Radio", "https://edge1-b.exa.live365.net/a24650"],
            ["Legend Oldies", "https://edge1-b.exa.live365.net/a88135"],
            ["Music City Roadhouse", "https://edge1-b.exa.live365.net/a73754"],
            ["Mashrup Reggae Radio", "https://edge1-b.exa.live365.net/a00564"],
            ["97.5 Dance Hits", "https://edge1-b.exa.live365.net/a50365"]
        ];
        ChatBot.CMDNameColor = ["#3f69c0", "#b63fc0", "#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#26a635", "#00b34d", "#e6c700", "#FF851B", "#FF4136", "#c81e70", "#f00fbb", "#B10DC9", "#111111", "#AAAAAA", "#cc6600", "#009933", "#003366", "#660033", "#804000"];
        ChatBot.CMDChatCSS = [
            [ //STYLE #0
                ["#chat-wrapper{background:linear-gradient(0deg,rgba(32,38,40,0.59)0%,rgba(16,14,14,0.76)calc(100% - 62px),rgba(45,55,58,0.72)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #1
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(255,255,255)0%,rgba(99,99,99)calc(100% - 62px),rgba(255,255,255)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(58, 58, 58)8px,rgb(30, 30, 30)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(25,25,25)8px,rgb(76,76,76)100%);}"]
            ],
            [ //STYLE #2
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(121,24,188)0%,rgb(36,15,45)calc(100% - 62px),rgb(121,24,188)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(83, 17, 128)8px,rgb(68, 15, 103)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#7918bc;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#7918bc!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#460b6f!important;}#videos-footer-push-to-talk{background:#7918bc}#videos-footer-push-to-talk:hover{background:#460b6f}#videos-footer-broadcast:hover{background:#460b6f}#videos-footer-broadcast{background:#7918bc;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(13,5,15)8px,rgb(121,24,188)100%);}"]
            ],
            [ //STYLE #3
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(248,5,5)0%,rgb(81,22,22)calc(100% - 62px),rgba(204,0,0)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(121, 3, 3)8px,rgb(176, 2, 2)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#c10101;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#c10101!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#6b0f0f!important;}#videos-footer-push-to-talk{background:#c10101}#videos-footer-push-to-talk:hover{background:#6b0f0f}#videos-footer-broadcast:hover{background:#6b0f0f}#videos-footer-broadcast{background:#c10101;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(15,5,5)8px,rgb(193,1,1)100%);}"]
            ],
            [ //STYLE #4
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(65,144,219)0%,rgb(7,69,97)calc(100% - 62px),rgb(37,179,222)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(26, 59, 75)8px,rgb(59, 130, 170)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(5,14,15)8px,rgb(83,182,239)100%);}"]
            ],
            [ //STYLE #5
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(0,158,5)0%,rgb(5,15,5)calc(100% - 62px),rgb(13,181,0)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(13, 96, 7)8px,rgb(8, 48, 6)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#0cae00;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#0cae00!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#054c00!important;}#videos-footer-push-to-talk{background:#0cae00}#videos-footer-push-to-talk:hover{background:#054c00}#videos-footer-broadcast:hover{background:#054c00}#videos-footer-broadcast{background:#0cae00;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(5,15,5)8px,rgb(14,104,7)100%);}"]
            ],
            [ //STYLE #6
                ["#chat-wrapper{background:linear-gradient(0deg,rgba(0, 0, 0, 0.69)0%,rgba(0, 0, 0, 0.56)calc(100% - 62px),rgb(13, 179, 0)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(13, 96, 7)8px,rgb(8, 48, 6)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#0cae00;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#0cae00!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#054c00!important;}#videos-footer-push-to-talk{background:#0cae00}#videos-footer-push-to-talk:hover{background:#054c00}#videos-footer-broadcast:hover{background:#054c00}#videos-footer-broadcast{background:#0cae00;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(5, 15, 5, 0.72)8px,rgba(0, 0, 0, 0.42)100%);}"]
            ],
            [ //STYLE #7
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(255, 255, 255)0%,rgba(255, 255, 255, 0.82)calc(100% - 62px),rgb(255, 255, 255)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(255, 255, 255, 0.72)8px,rgba(255, 255, 255, 0.81)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(255, 255, 255, 0.72)8px,rgba(255, 255, 255, 0.81)100%);}"]
            ],
            [ //STYLE #8
                ["#chat-wrapper{background: linear-gradient(0deg,rgba(255, 255, 0, 1)0%,rgba(255, 255, 0, 0.82)calc(100% - 62px),rgba(255, 255, 0, 1)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(234, 236, 5)8px,rgb(180, 187, 15)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(56, 50, 6)0%,rgb(149, 158, 22)8px,rgba(255, 255, 0, 1)100%);}"]
            ],
            [ //STYLE #9
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(119, 45, 2) 0%,rgb(24, 29, 30) 52%,rgb(234, 129, 38) 100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(226, 92, 19)8px,rgb(158, 73, 16)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(154, 51, 1)0%,rgba(255, 125, 0, 1)8px,rgba(255, 125, 0, 1)100%);}"]
            ],
            [ //STYLE #10
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(141, 36, 95)0%,rgba(191, 0, 255, 0.82)calc(100% - 62px),rgb(255, 0, 202)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(150, 0, 175)8px,rgb(176, 0, 226)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(94, 3, 62)0%,rgb(191, 0, 255)8px,rgb(71, 0, 20)100%);}"]
            ],
            [ //STYLE #11
                ["#CMD-chat-content>.message{background:#101314;}#chat-wrapper{background: repeating-linear-gradient(-45deg,rgb(0, 0, 0)1px,rgb(0, 186, 255)3px,rgba(0, 115, 255, 0.49)15px)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:repeating-linear-gradient(-45deg,rgb(0, 0, 0)1px,rgb(0, 186, 255)3px,rgba(0, 115, 255, 0.49)15px);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: repeating-linear-gradient(-45deg,rgb(0, 0, 0)1px,rgb(0, 186, 255)3px,rgba(0, 115, 255, 0.49)15px);}"]
            ],
            [ //STYLE #12
                ["#chat-wrapper{background: #fff!important;}.message>#system_user{color:#FFFFFF}#CMD-chat-content>.message{background:#00000000}.message{color:#000000;text-shadow: unset;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(255, 255, 255, 0.72)8px,rgba(255, 255, 255, 0.81)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: #2d373a;}"]
            ],
            [ //STYLE #13
                ["#chat-wrapper{background: url(https://i.imgur.com/ek4TEsz.jpg)!important;}#CMD-chat-content>.message{background:#17951a8c;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(37, 101, 27)8px,rgb(36, 98, 25)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: url(https://i.imgur.com/LCOulGB.png) repeat-x bottom;}"]
            ],
            [ //STYLE #14
                ["#chat-wrapper{background:linear-gradient(0deg,rgba(32,38,40,0.59)0%,rgba(16,14,14,0.76)calc(100% - 62px),rgba(45,55,58,0.72)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #14
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(255,255,255)0%,rgba(99,99,99)calc(100% - 62px),rgba(255,255,255)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(58, 58, 58)8px,rgb(30, 30, 30)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #15
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(121,24,188)0%,rgb(36,15,45)calc(100% - 62px),rgb(121,24,188)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(83, 17, 128)8px,rgb(68, 15, 103)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#7918bc;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#7918bc!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#460b6f!important;}#videos-footer-push-to-talk{background:#7918bc}#videos-footer-push-to-talk:hover{background:#460b6f}#videos-footer-broadcast:hover{background:#460b6f}#videos-footer-broadcast{background:#7918bc;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #16
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(248,5,5)0%,rgb(81,22,22)calc(100% - 62px),rgba(204,0,0)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(121, 3, 3)8px,rgb(176, 2, 2)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#c10101;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#c10101!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#6b0f0f!important;}#videos-footer-push-to-talk{background:#c10101}#videos-footer-push-to-talk:hover{background:#6b0f0f}#videos-footer-broadcast:hover{background:#6b0f0f}#videos-footer-broadcast{background:#c10101;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #17
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(65,144,219)0%,rgb(7,69,97)calc(100% - 62px),rgb(37,179,222)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(26, 59, 75)8px,rgb(59, 130, 170)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #18
                ["#chat-wrapper{background:linear-gradient(0deg,rgb(0,158,5)0%,rgb(5,15,5)calc(100% - 62px),rgb(13,181,0)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(13, 96, 7)8px,rgb(8, 48, 6)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#0cae00;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#0cae00!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#054c00!important;}#videos-footer-push-to-talk{background:#0cae00}#videos-footer-push-to-talk:hover{background:#054c00}#videos-footer-broadcast:hover{background:#054c00}#videos-footer-broadcast{background:#0cae00;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #19
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(255, 255, 255)0%,rgba(255, 255, 255, 0.82)calc(100% - 62px),rgb(255, 255, 255)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background:#2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(255, 255, 255, 0.72)8px,rgba(255, 255, 255, 0.81)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #20
                ["#chat-wrapper{background: linear-gradient(0deg,rgba(255, 255, 0, 1)0%,rgba(255, 255, 0, 0.82)calc(100% - 62px),rgba(255, 255, 0, 1)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(234, 236, 5)8px,rgb(180, 187, 15)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #21
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(119, 45, 2) 0%,rgb(24, 29, 30) 52%,rgb(234, 129, 38) 100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(226, 92, 19)8px,rgb(158, 73, 16)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #22
                ["#chat-wrapper{background: linear-gradient(0deg,rgb(141, 36, 95)0%,rgba(191, 0, 255, 0.82)calc(100% - 62px),rgb(255, 0, 202)100%)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:linear-gradient(0deg,rgb(0, 0, 0)0%,rgb(150, 0, 175)8px,rgb(176, 0, 226)100%);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ],
            [ //STYLE #23
                ["#CMD-chat-content>.message{background:#101314;}#chat-wrapper{background: repeating-linear-gradient(-45deg,rgb(0, 0, 0)1px,rgb(0, 186, 255)3px,rgba(0, 115, 255, 0.49)15px)!important;}#CMD-chat-content>.message{background:#101314a8;}.message{color:#FFF;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}"],
                [".PMPopup .PMContent{background: #2d373ADB;}.PMPopup h2{background:repeating-linear-gradient(-45deg,rgb(0, 0, 0)1px,rgb(0, 186, 255)3px,rgba(0, 115, 255, 0.49)15px);}#videos-footer-broadcast-wrapper>.waiting{background:#53b6ef;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button{background:#53b6ef!important;}#videos-footer-broadcast-wrapper>#videos-footer-submenu-button:hover{background:#3d89b5!important;}#videos-footer-push-to-talk{background:#53b6ef}#videos-footer-push-to-talk:hover{background:#3d89b5}#videos-footer-broadcast:hover{background:#3d89b5}#videos-footer-broadcast{background:#53b6ef;}"],
                ["#sidemenu{background: linear-gradient(0deg,rgb(0, 0, 0)0%,rgba(19,19,19,0.73)8px,rgba(0,0,0,0.34)100%);}"]
            ]
        ];
        var script = Bot.createElement("script"),
            elem = Bot.getElementsByTagName("script")[0];
        script.text = 'var StationSelected = 0,\n	StationPlay = false,\n	StationVol = 1;\nfunction VolStation(elem, vol){\n	var StationElem = elem.parentElement.nextSibling;\n	var StationVolElem = elem.parentElement.querySelector(".music-radio-info>.volume");\nStationVol += vol;\n	if (StationVol < 0){\n		StationVol = 0;\n	} else if (StationVol > 1) {\n		StationVol = 1.0;\n	}\n	StationElem.volume = StationVol;\nStationVolElem.style.width=((StationVol * 100)+"%");}\nfunction PlayPauseStation(elem) {\n	var StationPlayPauseBtn = elem.parentElement.querySelector(".music-radio-playpause");\n var StationElem=elem.parentElement.nextSibling;\nvar StationDescElem=elem.parentElement.querySelector(".music-radio-info>.description");\n	StationPlay=!StationPlay;\n	if (StationPlay) {\n		StationElem.volume = StationVol;\n		StationElem.play();\n StationPlayPauseBtn.innerText="❚❚";	StationDescElem.innerText = ("Playing: "+ChatBot.CMDRadioStations[StationSelected][0]+"\\nURL: "+ChatBot.CMDRadioStations[StationSelected][1]);\n} else {\n		StationElem.pause();\nStationPlayPauseBtn.innerText="▶";\n	StationDescElem.innerText = ("Paused: "+ChatBot.CMDRadioStations[StationSelected][0]+"\\nURL: "+ChatBot.CMDRadioStations[StationSelected][1]);}\n}\nfunction SeekStation(elem, direction) {\n	var StationElem = elem.parentElement.nextSibling;\n	var StationDescElem = elem.parentElement.querySelector(".music-radio-info>.description");\nvar StationPlayPauseBtn = elem.parentElement.querySelector(".music-radio-playpause");\n	StationPlay = true;\n	StationSelected += direction;\n	\n	if (StationSelected > ChatBot.CMDRadioStations.length-1) {\n		StationSelected = 0;\n	} else if (StationSelected < 0){\n		StationSelected = ChatBot.CMDRadioStations.length-1;\n	}\n	StationElem.pause();\n	StationElem.setAttribute("src", ChatBot.CMDRadioStations[StationSelected][1]);\n	StationElem.load();\n	StationElem.volume = StationVol;\nStationPlayPauseBtn.innerText="❚❚";\n	StationElem.play();\nStationDescElem.innerText = ("Playing: "+ChatBot.CMDRadioStations[StationSelected][0]+"\\nURL: "+ChatBot.CMDRadioStations[StationSelected][1]);\n}';
        elem.parentNode.insertBefore(script, elem);
        CMD.enablePMs = (ChatBot.localStorage.tinychat_settings) ? JSON.parse(ChatBot.localStorage.tinychat_settings).enablePMs : true;
        CMD.enableSound = (ChatBot.localStorage.tinychat_settings) ? JSON.parse(ChatBot.localStorage.tinychat_settings).enableSound : true;
        if (CMD.enableSound === true && "speechSynthesis" in ChatBot) {
            CMD.TTS.synth = ChatBot.speechSynthesis;
            CMD.TTS.voices = CMD.TTS.synth.getVoices();
        }
        MainElement = Bot.querySelector("tinychat-webrtc-app").shadowRoot;
        ChatLogElement = MainElement.querySelector("tc-chatlog").shadowRoot;
        VideoListElement = MainElement.querySelector("tc-videolist").shadowRoot;
        MicrophoneElement = Bot.createEvent("MouseEvent");
        SideMenuElement = MainElement.querySelector("tc-sidemenu").shadowRoot;
        TitleElement = MainElement.querySelector("tc-title").shadowRoot;
        UserListElement = SideMenuElement.querySelector("tc-userlist").shadowRoot;
        ModerationListElement = SideMenuElement.querySelector("tc-video-moderation").shadowRoot;
        ChatListElement = SideMenuElement.querySelector("tc-chatlist").shadowRoot;
        UserContextElement = UserListElement.querySelector("tc-user-contextmenu").shadowRoot;
        var insert = TitleElement.querySelector('span[title="Settings"]');
        VideoListElement.querySelector("#videos-header").appendChild(insert);
        if (!CMD.Project.isTouchScreen) {
            insert = VideoListElement.querySelector("#videos-footer-broadcast-wrapper");
            VideoListElement.querySelector("#videolist").appendChild(insert);
            VideoListElement.querySelector("#videos-footer").insertAdjacentHTML("afterbegin", "Media");
            VideoListElement.querySelector("#videos-footer").insertAdjacentHTML("beforeend", '<div id="music-radio"><div class="music-radio-info"><div class="description">Playing: None<br>URL: None</div><div class="volume"></div></div><button class="music-radio-seek" onclick="SeekStation(this,-1);">&#8592;</button><button class="music-radio-seek" onclick="SeekStation(this,1);">&#8594;</button><button class="music-radio-playpause" onclick="PlayPauseStation(this);">&#9654;</button><button class="music-radio-vol" onclick="VolStation(this,.05);">&#43;</button><button class="music-radio-vol" style="top:50%" onclick="VolStation(this,-.05);">&#45;</button></div><audio id="music-radio-audio" src="' + ChatBot.CMDRadioStations[0][1] + '"></audio>');
            TitleCSS +="span[title=\"Follow\"], span[title=\"Share room\"]{display:none!important;}";
        } else {
            VideoCSS = "#videos-footer-broadcast{border-radius:unset!important;}videos-footer-submenu{z-index:99999;}#videos-footer-broadcast-wrapper > #videos-footer-submenu-button{border-radius:unset;}#videos-footer-push-to-talk{margin-left:0!important;border-radius:unset;}#videos-footer-youtube, #videos-footer-soundcloud{min-width:35px;border-radius:unset;margin-right: 0;}@media screen and (max-width: 600px){#videos-footer-broadcast, #videos-footer-broadcast-wrapper.hide-submenu > #videos-footer-broadcast {height:50px;line-height:50px;}#videos-footer{min-height: 50px;padding:0}}span[title=\"Settings\"]>svg{padding:7px 10px;height:24px;width:24px;}#videolist[data-mode=\"dark\"]{background-color:unset;}#videos-footer-broadcast-wrapper{display:contents;}.video:after{content: unset;border:unset;}#videos-header{padding:0;background:#181d1e;}.CMDdrop{z-index:99900;position:fixed;display:inline-block;top:3px;left:4px;min-width: 46px;}.CMDdrop-content{z-index:99900;position:absolute;top:28px;right:0;background:#181d1e;min-width:46px;width: 46px;padding:0;display:none;}.CMDdrop:hover .CMDdrop-content{z-index:99900;display:block;}.CMDoptions:hover{background:#53b6ef}.CMDoptions{width:46px;height:28px;z-index: 2;cursor: pointer;top: 4px;background: #181d1e75;border: none;padding: 5% 0;display: inline-block;}";
            MainCSS += "body{overflow:auto;}";
            ContextMenuCSS = ".context.show{height:100%;}.context:after{content:unset;}.context>span{text-shadow:-1px 0 black,0 1px black,1px 0 black,0 -1px black;font:800 14px sans-serif;color:#FFFFFF;display:inline-block;padding:1px 1%;line-height:17px;height:17px;}.context{background:#101314;position:unset;padding:0;height:0;transition:.25s;}";
            UserListCSS += "#contextmenu{top:unset;bottom:0;left:0;}";
        }
        ChatLogElement.querySelector("style").insertAdjacentHTML("beforeend", ChatboxCSS);
        StyleSet();
        Bot.body.querySelector("style").insertAdjacentHTML("beforeend", MainCSS);
        MainElement.querySelector("style").insertAdjacentHTML("beforeend", RoomCSS);
        VideoListElement.querySelector("style").insertAdjacentHTML("beforeend", NotificationCSS);
        VideoListElement.querySelector("style").insertAdjacentHTML("beforeend", VideoCSS);
        SideMenuElement.querySelector("style").insertAdjacentHTML("beforeend", SideMenuCSS);
        UserListElement.querySelector("style").insertAdjacentHTML("beforeend", UserListCSS);
        ChatListElement.querySelector("style").insertAdjacentHTML("beforeend", ChatListCSS);
        ModerationListElement.querySelector("style").insertAdjacentHTML("beforeend", ModeratorCSS);
        UserContextElement.querySelector("style").insertAdjacentHTML("beforeend", ContextMenuCSS);
        TitleElement.querySelector("style").insertAdjacentHTML("beforeend", TitleCSS);
        UserListElement.querySelector("#button-banlist").insertAdjacentHTML("beforebegin", "<span>1</span>");
        VideoListElement.querySelector("#videos-header").insertAdjacentHTML("afterbegin", "<button style=\"display:"+((CMD.Project.isTouchScreen)?"none":"block")+"\" class=\"tcsettings\">⯇</button>");
        VideoListElement.querySelector("#videos-content").insertAdjacentHTML("beforeend", '<div id="popup" class="PMOverlay"></div>');
        VideoListElement.querySelector("#videolist").insertAdjacentHTML("afterbegin", '<div class="CMDdrop"><button class="CMDoptions" title="CMD Options"><img src="https://i.imgur.com/nvr9FjM.png" /></button><div class="CMDdrop-content"><div style="height:6px;background:#624482;"></div><button id="BackgroundUpdateRight" class="CMDoptions" title="Background"><img src="https://i.imgur.com/Zn97vqS.png" /></button><button id="BackgroundUpdateLeft" class="CMDoptions" title="Background"><img src="https://i.imgur.com/OAcfZRy.png" /></button><div style="height:6px;background:#624482;"></div><button id="FontSizeUpdate" class="CMDoptions" title="Font Size"><img src="https://i.imgur.com/eVc0N5A.png" /></button><div style="height:6px;background:#624482;"></div><button id="ChatColor" class="CMDoptions" title="Chat Style"><img src="https://i.imgur.com/62jpRbt.png" /></button><button id="CameraBorderToggled" class="CMDoptions" title="Camera Border"><img src="https://i.imgur.com/BXK3MR2.png" /></button><button id="FeaturedToggled" class="CMDoptions" title="YouTube/Featured Resize"><img src="https://i.imgur.com/u8mBZYJ.png" /></button>' + ((!CMD.ThemeChange) ? '<button id="ChatWidthToggled" class="CMDoptions" title="Chat Resize"><img src="https://i.imgur.com/G95jVFI.png" /></button><button id="ChatHeightToggled" class="CMDoptions" title="Chat Resize"><img src="https://i.imgur.com/AGc7mLN.png" /></button><div style="height:6px;background:#624482;"></div>' : '')+ '<button id="PerformanceModeToggled" class="CMDoptions" title="Performance Mode"><img src="https://i.imgur.com/qoKTU4y.png" /></button>' + ((!CMD.Project.isTouchScreen)?'<div style="height:6px;background:#624482;"></div><button id="ThemeChange" class="CMDoptions" title="Switch CMD Theme Mode"><img src="https://i.imgur.com/NF6U3Us.png" /></button></div></div>':''));
        ChatLogElement.querySelector("#chat-position").insertAdjacentHTML("afterbegin", '<div id="notification-content"></div><button class="notifbtn">▼</button>');
        ChatLogElement.querySelector("#chat").insertAdjacentHTML("beforeend", '<div id="CMD-chat-content"></div>');
        ChatLogElement.querySelector("#chat").insertAdjacentHTML("afterend", '<div class="CMD-message-unread" style="display:none;">There are unread messages!</div>');
        clearInterval(CMD.ScriptLoading);
        CMD.ScriptInit = true;
        CMDRoomPrepare();
    }

    var CMDRoomPrepare = () => {
        ChatBot.TinychatApp.BLL.Videolist.prototype.blurOtherVids = function() {};
        ChatBot.TinychatApp.BLL.SoundPlayer.playMessage = function() {};
        ChatBot.TinychatApp.BLL.SoundPlayer.playGift = function() {};
        ChatBot.TinychatApp.BLL.User.isSubscription = function() {return true;};
        ChatBot.TinychatApp.BLL.User.canUseFilters = function() {return true;};
        ChatBot.TinychatApp.BLL.MediaConnection.prototype.Close = function() {RTC(this);};
        ChatBot.TinychatApp.BLL.ChatRoom.prototype.sendPushForUnreadPrivateMessage = function() {};
        if (!CMD.Project.isTouchScreen) {
            ChatBot.TinychatApp.BLL.ChatRoom.prototype.BroadcastStart = function(a) {
                var b = this,
                    d = this.settings.getSettings();
                if (d.video === null) {
                    return void this.app.MediaSettings(() => {
                        this.BroadcastStart();
                    });
                }
                this.videolist.AddingVideoSelf(this.self_handle);
                var e = {};
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    e.audio = true;
                    e.video = {width: {min: 320,max: 4096},height: {min: 240,max: 2160},frameRate: {min: 15,ideal: 30,max: 60}};
                } else {
                    navigator.mediaDevices.enumerateDevices().then(g => {
                        var h = false;
                        var len = g.length;
                        for (var c = 0; c < len; c++) {
                            if (g[c].kind === "videoinput") {
                                if (e.video === void 0) e.video = {width: {min: 320,max: 4096},height: {min: 240,max: 2160},frameRate: {min: 15,ideal: 30,max: 60}};
                                if (h) {
                                    d.video = g[c];
                                    h = false;
                                    this.settings.saveSettings(d);
                                } else if (d.video === null) {
                                    d.video = g[c];
                                    this.settings.saveSettings(d);
                                } else if (d.video !== null && typeof d.video == "object" && d.video.deviceId == g[c].deviceId && d.video.deviceId !== a) {
                                    e.video.deviceId = {
                                        exact: d.video.deviceId
                                    };
                                } else if (d.video.deviceId === a) {
                                    h = true;
                                }
                            }
                            if (g[c].kind === "audioinput") {
                                if (e.audio === void 0) e.audio = {};
                                if (d.audio !== null && typeof d.audio == "object" && d.audio.deviceId == g[c].deviceId) {
                                    e.audio = {
                                        deviceId: {
                                            exact: d.audio.deviceId
                                        },
                                    };
                                }
                            }
                        }
                        if (e.video !== null && d.video !== null && d.video.deviceId == b.id__miconly) delete e.video;
                        let i = navigator.mediaDevices.getSupportedConstraints();
                        for (let a in i) {
                            if (i.hasOwnProperty(a) && "echoCancellation" == a && e.audio) e.audio[a] = this.settings.isAcousticEchoCancelation();
                        }
                        if (!(e.audio || e.video)) {
                            b.onMediaFailedCallback(new Error("No media devices to start broadcast."));
                        } else if ("https:" === location.protocol || this.app.isDebug()) {
                            debug("BROADCAST", "Initiating Media...");
                            var m = new ChatBot.TinychatApp.BLL.BroadcastProgressEvent(ChatBot.TinychatApp.BLL.BroadcastProgressEvent.MEDIA_START);
                            this.EventBus.broadcast(ChatBot.TinychatApp.BLL.BroadcastProgressEvent.ID, m);
                            b.mediaLastConstraints = e;
                            navigator.mediaDevices.getUserMedia(e).then(m => {
                                b.onMediaSuccessCallback(m);
                            });
                        }
                    }).catch(er => {
                        debug("CAMERA::ERROR", er);
                    });
                }
            };
        }
        ChatBot.TinychatApp.BLL.Userlist.prototype.ignore = function(a) {
            var b = a.isUsername ? a.username : a.nickname;
            if (this.isIgnored(a) || this.ignored.push(b)) {
                var c = new ChatBot.TinychatApp.BLL.IgnorelistUpdateUserEvent(a);
                this.EventBus.broadcast(ChatBot.TinychatApp.BLL.IgnorelistUpdateUserEvent.ID, c);
                this.app.showToast(b + " ignored successfully till they leave or you refresh❛❗❜");
                CMD.TempIgnoreList.push(b.toUpperCase());
                Cameras();
            }
        };
        ChatBot.TinychatApp.BLL.Userlist.prototype.unignore = function(a) {
            var b = a.isUsername ? a.username : a.nickname,
                len = this.ignored.length;
            for (var TI = 0; TI < len; TI++) {
                if (CMD.TempIgnoreList[TI] === b.toUpperCase()) {
                    this.ignored.splice(TI, 1);
                    break;
                }
            }
            len = CMD.TempIgnoreList.length;
            for (TI = 0; TI < len; TI++) {
                if (CMD.TempIgnoreList[TI] === b.toUpperCase()) {
                    CMD.TempIgnoreList.splice(TI, 1);
                    break;
                }
            }
            var e = new ChatBot.TinychatApp.BLL.IgnorelistUpdateUserEvent(a);
            this.EventBus.broadcast(ChatBot.TinychatApp.BLL.IgnorelistUpdateUserEvent.ID, e);
            this.app.showToast(a.username + " unignored");
        };
        Remove(ChatLogElement, 'span[id="input-unread"]');
        Remove(ChatLogElement, "#chat-content");
        if (CMD.enablePMs === false) Remove(ChatListElement, "#chatlist");
        CMDRoomLoad();
    };
    function CMDRoomLoad() {
        if (!CMD.ThemeChange) {
            var finishoff = false;
            while (CMD.OGStyle.SavedHeight !== CMD.OGStyle.HeightCounter || CMD.OGStyle.SavedWidth !== CMD.OGStyle.WidthCounter) {
                if (CMD.OGStyle.SavedHeight !== CMD.OGStyle.HeightCounter) {
                    ChatHeightToggled();
                } else {
                    finishoff = true;
                }
                if (CMD.OGStyle.SaveWidth !== CMD.OGStyle.WidthCounter && finishoff) ChatWidthToggled();
            }
            VideoListElement.querySelector("#ChatHeightToggled").addEventListener("click", function() {
                ChatHeightToggled();
                Save("OGStyleHeight", CMD.OGStyle.HeightCounter);
            }, {
                passive: true
            });
            VideoListElement.querySelector("#ChatWidthToggled").addEventListener("click", function() {
                ChatWidthToggled();
                Save("OGStyleWidth", JSON.stringify(CMD.OGStyle.WidthCounter));
            }, {
                passive: true
            });
        } else {
            if (!CMD.Project.isTouchScreen) {
                ChatLogElement.querySelector("#chat-wider").insertAdjacentHTML("beforebegin", "<div id=\"chat-hide\"></div>");
                ChatLogElement.querySelector("#chat-hide").addEventListener("click", function() {
                    ChatHide();
                }, {
                    passive: true
                });
            }
        }
        if (!CMD.Project.isTouchScreen) {
            ChatLogElement.querySelector("#chat-wrapper").insertAdjacentHTML("afterbegin", "<div id=\"chat-download\"></div>");
            ChatLogElement.querySelector("#chat-download").title = 'Save Logs';
            ChatLogElement.querySelector("#chat-download").addEventListener("click", function() {
                var len = CMD.UserList.length,
                    t = "Users : "+len+"\n",
                    c;
                for (c = 0; c < len; c++) {
                    if (c){
                        t+= ", ";
                        if (c % 10 === 0) t += "\n";
                    }
                    t += CMD.UserList[c].username +" ("+CMD.UserList[c].nick+")";
                }
                t += "\n\n";
                len = CMD.Message[CMD.ActiveMessage].length;
                for (c = 0; c < len; c++) t += "["+CMD.Message[CMD.ActiveMessage][c].time+"]["+CMD.Message[CMD.ActiveMessage][c].username+"("+CMD.Message[CMD.ActiveMessage][c].nick+")]: "+(CMD.Message[CMD.ActiveMessage][c].msg.replace(/(\r\n|\n|\r)/gm,"")+"\n");
                Download("TinyChat_"+CMD.Room.Name.toUpperCase()+" "+DateTime()+".log", "Room : "+CMD.Room.Name+"\n"+t);
            }, {
                passive: true
            });
            VideoListElement.querySelector("#ThemeChange").addEventListener("click", function() {
                CMD.ThemeChange = !CMD.ThemeChange;
                Save("ThemeChange", JSON.stringify(CMD.ThemeChange));
                location.reload();
            }, {
                passive: true
            });
        }
        VideoListElement.querySelector("#PerformanceModeToggled").addEventListener("click", function() {
            if (CMD.ChatDisplay) {
                CMD.PerformanceMode = !CMD.PerformanceMode;
                PerformanceModeInit(CMD.PerformanceMode);
            }
        }, {
            passive: true
        });
        VideoListElement.querySelector("#FeaturedToggled").addEventListener("click", function() {
            CMD.Featured = !CMD.Featured;
            Save("Featured", JSON.stringify(CMD.Featured));
            FeaturedCameras(CMD.Featured);
            Resize();
        }, {
            passive: true
        });
        VideoListElement.querySelector("#CameraBorderToggled").addEventListener("click", function() {
            CMD.CameraBorderToggle = !CMD.CameraBorderToggle;
            Save("CameraBorderToggle", JSON.stringify(CMD.CameraBorderToggle));
            Cameras();
            Resize();
        }, {
            passive: true
        });
        VideoListElement.querySelector("#ChatColor").addEventListener("click", function() {
            CMD.ChatStyleCounter++;
            Remove(VideoListElement, "style[id=\"" + (CMD.ChatStyleCounter - 1) + "\"]");
            Remove(ChatLogElement, "style[id=\"" + (CMD.ChatStyleCounter - 1) + "\"]");
            Remove(SideMenuElement, "style[id=\"" + (CMD.ChatStyleCounter - 1) + "\"]");
            var len = ChatBot.CMDChatCSS.length - 1;
            if (CMD.ChatStyleCounter > len) CMD.ChatStyleCounter = 0;
            StyleSet();
            Save("ChatStyle", CMD.ChatStyleCounter);
        }, {
            passive: true
        });
        ChatLogElement.querySelector(".CMD-message-unread").addEventListener("click", function() {
            UpdateScroll(1, true);
            CheckUnreadMessage();
        }, {
            passive: true
        });
        ChatLogElement.querySelector("#chat").addEventListener("scroll", function(event) {
            var element = event.target;

            if (Math.floor(element.scrollTop + 50) >= (element.scrollHeight - element.offsetHeight)) CheckUnreadMessage(true);
        }, {
            passive: true
        });
        ChatLogElement.querySelector("#notification-content").addEventListener("scroll", function(event) {
            var element = event.target;
            if (Math.floor(element.scrollTop + 50) >= (element.scrollHeight - element.offsetHeight)) CMD.NotficationScroll = true;
        }, {
            passive: true
        });
        if (CMD.NotificationToggle === 0) {
            ChatLogElement.querySelector(".notifbtn").addEventListener("click", NotificationResize, {
                passive: true
            });
        }
        VideoListElement.querySelector(".tcsettings").addEventListener("click", function(event) {
            var arg;
            if (this.innerText === "⯈") {
                this.innerText = "⯇";
                arg = "block";
            } else {
                this.innerText = "⯈";
                arg = "none";
            }
            VideoListElement.querySelector("#videos-header-sound").style.display = arg;
            if (CMD.Room.PTT === false) VideoListElement.querySelector("#videos-header-mic").style.display = arg;
            VideoListElement.querySelector("#videos-header-fullscreen").style.display = arg;
            VideoListElement.querySelector("span[title=\"Settings\"]").style.display = arg;
        }, {
            passive: true
        });
        VideoListElement.querySelector("button[id=\"BackgroundUpdateLeft\"]").addEventListener("click", function() {
            if (!Addon.active("BGIMG")) {
                CMD.MainBackgroundCounter++;
                if (CMD.MainBackgroundCounter === ChatBot.CMDImages.length) CMD.MainBackgroundCounter = 0;
                var background = "url(\"" + ChatBot.CMDImages[CMD.MainBackgroundCounter] + "\") rgb(0, 0, 0) no-repeat";
                Bot.body.style.background = background;
                Save("MainBackground", background);
            }
        }, {
            passive: true
        });
        VideoListElement.querySelector("button[id=\"BackgroundUpdateRight\"]").addEventListener("click", function() {
            if (!Addon.active("BGIMG")) {
                CMD.MainBackgroundCounter--;
                if (CMD.MainBackgroundCounter === -1) CMD.MainBackgroundCounter = ChatBot.CMDImages.length - 1;
                var background = "url(\"" + ChatBot.CMDImages[CMD.MainBackgroundCounter] + "\") rgb(0, 0, 0) no-repeat";
                Bot.body.style.background = background;
                Save("MainBackground", background);
            }
        }, {
            passive: true
        });
        VideoListElement.querySelector("button[id=\"FontSizeUpdate\"]").addEventListener("click", function() {
            CMD.FontSize += 5;
            if (CMD.FontSize >= 40) CMD.FontSize = 15;
            Save("FontSize", CMD.FontSize);
            ChatLogElement.querySelector("#textarea").style.fontSize = (CMD.FontSize - 4) + "px";
        }, {
            passive: true
        });
        new MutationObserver(function() {
            LoadMessage();
        }).observe(ChatLogElement.querySelector("#chat-instant"), {
            attributes: true,
            attributeFilter: ["class"],
            childList: false,
            characterData: false
        });
        new MutationObserver(function() {
            Cameras();
        }).observe(VideoListElement.querySelector(".videos-items:first-child"), {
            childList: true
        });
        new MutationObserver(function() {
            Cameras();
        }).observe(VideoListElement.querySelector(".videos-items:last-child"), {
            childList: true
        });
        new MutationObserver(function() {
            if (CMD.AutoMicrophone) {
                OpenMicrophone();
            }
        }).observe(VideoListElement.querySelector("#videos-footer-broadcast-wrapper"), {
            attributes: true,
            attributeFilter: ["class"]
        });
        NotificationDisplay();
        FeaturedCameras(CMD.Featured);
        Cameras();
    }
    function CheckHost() {
        if (CMD.Host === 0) {
            Send("msg", "!whoisbot");
            CMD.HostAttempt = 0;
            CMD.HostWaiting = true;
        }
    }
    function SetBot() {
        if (arguments[0]) CMD.Game.NoReset = true;
        Send("msg", "!bot");
        CMD.HostWaiting = false;
    }
    function CheckYouTube() {
        if (arguments[3] === undefined) arguments[3] = true;
        CMD.YouTube.XHR.type = arguments[1];
        var videoid = arguments[0].match(/http(?:s)?(?:\:\/\/)(?:w{1,3}\.)?(?:youtu(?:\.be|be.com))(?:\/v\/|\/)?(?:watch\?|playlist\?|embed\/|user\/|v\/|\/)(list\=[a-z0-9\-\_]{1,34}|(?:v\=)?[a-z0-9\-\_]{1,11})/i);
        if (videoid !== null) {
            videoid = videoid[1].replace(/v\=/g, "");
            if (videoid.match(/list\=/i)) {
                if (arguments[3]) {
                    videoid = videoid.replace(/list\=/, "");
                    debug("YOUTUBE::PLAYLIST LINK GATHERER", videoid);
                    CMD.YouTube.XHR.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + videoid + "&part=snippet&maxResults=25" + ((arguments[2] !== undefined) ? "&pageToken=" + arguments[2] : "") + "&type=video&eventType=completed&key=" + CMD.YouTube.API_KEY);
                    CMD.YouTube.XHR.send();
                }
            } else {
                CMD.YouTube.XHR.videoid = videoid;
                CMD.YouTube.VideoReturn = true;
                CMD.YouTube.XHR.open("GET", "https://www.googleapis.com/youtube/v3/videos?id=" + CMD.YouTube.XHR.videoid + "&type=video&eventType=completed&part=contentDetails,snippet&fields=items/snippet/title,items/snippet/thumbnails/medium,items/contentDetails/duration&eventType=completed&key=" + CMD.YouTube.API_KEY);
                CMD.YouTube.XHR.send();
                debug("YOUTUBE::LINK SEARCH", CMD.YouTube.XHR.videoid);
            }
        } else {
            if (CMD.YouTube.MessageQueueList.length <= 0) {
                arguments[0] = arguments[0].replace(/^(!yt )/, "");
                CMD.YouTube.SearchReturn = true;
                CMD.YouTube.XHR.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + CMD.YouTube.API_KEY + "&maxResults=1&q=" + encodeURI(arguments[0]) + "&type=video&part=snippet");
                CMD.YouTube.XHR.send();
                debug("YOUTUBE::KEYWORD SEARCH", arguments[0]);
            }
        }
    }
    function YouTubePlayList() {
        CMD.YouTube.ShowQueue = (arguments[0] !== undefined) ? true : false;
        if ((!CMD.YouTube.Playing && CMD.Host == CMD.Me.handle) || CMD.YouTube.Clear === true || CMD.YouTube.ShowQueue === true) Send("yut_playlist");
    }
    function YouTubeTrackAdd() {
        if (CMD.YouTube.MessageQueueList[0] !== undefined) {
            if (CMD.YouTube.Busy === false) {
                if (CMD.YouTube.MessageQueueList.length > 0) {
                    debug("YOUTUBE::ID", CMD.YouTube.MessageQueueList[0].snippet.resourceId.videoId);
                    CMD.YouTube.XHR.open("GET", "https://www.googleapis.com/youtube/v3/videos?id=" + CMD.YouTube.MessageQueueList[0].snippet.resourceId.videoId + "&type=video&eventType=completed&part=contentDetails,snippet&fields=items/snippet/title,items/snippet/thumbnails/medium,items/contentDetails/duration&eventType=completed&key=" + CMD.YouTube.API_KEY);
                    CMD.YouTube.XHR.videoid = CMD.YouTube.MessageQueueList[0].snippet.resourceId.videoId;
                    CMD.YouTube.XHR.send();
                    CMD.YouTube.MessageQueueList.shift();
                }
            }
        }
    }
    function YouTubePlayListItems() {
        var len = arguments[0].length;
        for (var i = 0; i < len; i++) {
            if (CMD.YouTube.NotPlayable.includes(arguments[0][i].snippet.title) === false) {
                CMD.YouTube.MessageQueueList.push(arguments[0][i]);
            }
        }
    }
    function YouTubeTimeConvert() {
        var a = arguments[0].match(/\d+/g);
        if (arguments[0].indexOf("M") >= 0 && arguments[0].indexOf("H") == -1 && arguments[0].indexOf("S") == -1) a = [0, a[0], 0];
        if (arguments[0].indexOf("H") >= 0 && arguments[0].indexOf("M") == -1) a = [a[0], 0, a[1]];
        if (arguments[0].indexOf("H") >= 0 && arguments[0].indexOf("M") == -1 && arguments[0].indexOf("S") == -1) a = [a[0], 0, 0];
        var len = a.length;
        arguments[0] = 0;
        if (len == 3) {
            arguments[0] = arguments[0] + parseInt(a[0]) * 3600;
            arguments[0] = arguments[0] + parseInt(a[1]) * 60;
            arguments[0] = arguments[0] + parseInt(a[2]);
        }
        if (len == 2) {
            arguments[0] = arguments[0] + parseInt(a[0]) * 60;
            arguments[0] = arguments[0] + parseInt(a[1]);
        }
        if (len == 1) arguments[0] = arguments[0] + parseInt(a[0]);
        return arguments[0];
    }
    function BotCommandCheck() {
        if (isCommand(arguments[1])) {
            if (arguments[1].match(/^!whoisbot$/i)) BotCommand(5, arguments[0]);
            if (arguments[1].match(/^!vote\s/i)) Vote(arguments[0], arguments[1]);
            if (CMD.PublicCommandToggle) {
                if (arguments[1].match(/^!8ball\s.*\??/i)) Send("msg", "🎱 " + ChatBot.CMDEightBall[Rand(0, ChatBot.CMDEightBall.length - 1)]);
                if (arguments[1].match(/^!coin$/i)) Send("msg", "🎭 The coin landed on " + ((Rand(0, 1) == 1) ? "heads" : "tails") + "❛❗❜");
                if (arguments[1].match(/^!chuck$/i)) Chuck();
                if (arguments[1].match(/^!urb\s/i)) Urb(arguments[1]);
                if (arguments[1].match(/^!dad$/i)) Dad();
                if (arguments[1].match(/^!advice$/i)) Advice();
            }
            if (CMD.BotModList.includes(CMD.UserList[arguments[0]].username) || CMD.UserList[arguments[0]].mod) {
                if (arguments[1].match(/^!kick\s/i)) ModCommand("kick", arguments[1]);
                if (arguments[1].match(/^!ban\s/i)) ModCommand("ban", arguments[1]);
                if (arguments[1].match(/^!close\s/i)) ModCommand("stream_moder_close", arguments[1]);
                if (arguments[1].match(/^!idle\s/i)) { Send("msg", "⏱ Closed for Idling or being AFK❛❗❜"); ModCommand("stream_moder_close", arguments[1]); };
                if (arguments[1].match(/^!cheers\s/i)) Send("msg", "🍻Cheers 💨 ❛❗❜");
            }
            if (CMD.Room.YT_ON) {
                if (arguments[1].match(/^!play$/i)) YouTubePlayList();
                if (arguments[1].match(/^!yt\s/i)) BotCommand(1, arguments[0], arguments[1]);
                if (arguments[1].match(/^!ytbypass\s/i)) BotCommand(6, arguments[0], arguments[1]);
                if (arguments[1].match(/^!ytclear$/i)) BotCommand(2, arguments[0]);
                if (arguments[1].match(/^!ytskip$/i)) BotCommand(3, arguments[0]);
                if (arguments[1].match(/^!ytqueue$/i)) BotCommand(4, arguments[0]);
            }
        }
        if (CMD.UserList[arguments[0]].canGame) FishCommandCheck(arguments[0], arguments[1]);
    }
    function BotCheck() {
        if (CMD.UserList[arguments[0]].mod) {
            if (arguments[1].match(/^!bot$/i)) {
                CMD.Host = arguments[2].handle;
                CMD.HostWaiting = false;
                if (CMD.Host != CMD.Me.handle && CMD.Game.NoReset) CMD.Game.NoReset = false;
                if (arguments[2].handle === CMD.Host && CMD.HostWaiting === false && !CMD.Game.NoReset) {
                    if (CMD.Me.handle !== arguments[2].handle) {
                        CMD.Game.NoReset = false;
                        Fish.reset(true);
                    }
                }
                if (CMD.Me.handle == arguments[2].handle && CMD.Room.YT_ON) YouTubePlayList();
            } else if (CMD.HostWaiting === true) {
                CMD.HostAttempt++;
                if (CMD.HostAttempt == 1) {
                    setTimeout(function() {
                        if (CMD.HostWaiting === true && CMD.Host === 0) SetBot(false);
                    }, 9500);
                }
                if (CMD.HostAttempt == 10) SetBot(false);
            }
        }
    }
    function Chuck() {
        CMD.Chuck.XHR.open("GET", "https://api.chucknorris.io/jokes/random");
        CMD.Chuck.XHR.send();
    }
    function Urb() {
        var urban = arguments[0].match(/\!urb\s(.*)/i);
        if (urban !== null) {
            CMD.Urb.XHR.open("GET", "https://api.urbandictionary.com/v0/define?term=" + urban[1]);
            CMD.Urb.XHR.send();
        }
    }
    function Dad() {
        CMD.Dad.XHR.open("GET", "https://icanhazdadjoke.com/");
        CMD.Dad.XHR.setRequestHeader("Accept", "application/json");
        CMD.Dad.XHR.send();
    }
    function Advice() {
        CMD.Advice.XHR.open("GET", "https://api.adviceslip.com/advice");
        CMD.Advice.XHR.setRequestHeader("Accept", "application/json");
        CMD.Advice.XHR.send();
    }
    function CreateMessage() {
        CheckUnreadMessage();
        if (arguments[7] == GetActiveChat()) ChatLogElement.querySelector("#CMD-chat-content").insertAdjacentHTML("beforeend", "<div class=\"message" + ((CMD.Avatar) ? " common " : " ") + ((CMD.HighlightList.includes(arguments[3]) || arguments[6]) ? "highlight" : "") + "\" " + ((arguments[2] === "") ? "style=\"padding-left:3px;\"" : "") + ">" + ((arguments[2]=="")?"":((CMD.Avatar) ? "<a href=\"#\" class=\"avatar\"><div><img src=\"" + arguments[2] + "\"></div></a>" : "")) + "<div class=\"nickname\" style=\"background:" + arguments[1] + ";\">" + arguments[4] + (CMD.TimeStampToggle ? "<div class=\"CMDtime\"> " + arguments[0] + " </div>" : "") + "</div><div class=\"content\"><CMD-message-html><span id=\"html\" class=\"message common\"style=\"font-size:" + CMD.FontSize + "px;\">" + arguments[5] + "</span></CMD-message-html></div></div>");
        var Chat = ChatLogElement.querySelectorAll("#CMD-chat-content>.message");
        var len = Chat.length;
        if (len > CMD.ChatLimit + 50) {
            CMD.ChatScroll = true;
            len = Chat.length - CMD.ChatLimit;
            var ChatIndex = 0;
            for (ChatIndex; ChatIndex < len; ChatIndex++) {
                Chat[ChatIndex].parentNode.removeChild(Chat[ChatIndex]);
                CMD.Message[arguments[7]].shift();
                ChatBot.TinychatApp.getInstance().defaultChatroom._chatlog.items = [];
            }
        }
        UpdateScroll(1, false);
    }
    function AKB() {
        if ((CMD.AutoKick === false && CMD.AutoBan === false) && arguments[0] === true) {
            CMD.WatchList.push([arguments[2], arguments[1], new Date()]);
            debug("WATCHLIST::ADDED", arguments[2] + ":" + arguments[1]);
        } else {
            if (CMD.Me.mod) {
                if (CMD.AutoKick === true) {
                    CMD.NoGreet = true;
                    Send("kick", arguments[1]);
                } else if (CMD.AutoBan === true) {
                    CMD.NoGreet = true;
                    Send("ban", arguments[1]);
                }
            }
        }
    }
    function AKBS() {
        if (arguments[0].username !== "") {
            var temp = [];
            if (Addon.active("AKB")) temp = Addon.get("AKB");
            if (!isSafeListed(arguments[0].username.toUpperCase())) {
                if (arguments[0].giftpoints > 0 || arguments[0].subscription > 0 || arguments[0].mod === true) {
                    if (CMD.SafeList.length < 2500) {
                        CMD.SafeList.push(arguments[0].username.toUpperCase());
                        Save("AKB", JSON.stringify(CMD.SafeList));
                        debug("SAFELIST::ADDED", arguments[0].username.toUpperCase() + ":" + arguments[0].handle);
                    }
                } else {
                    if (arguments[0].lurker === false) {
                        AKB(true, arguments[0].handle, arguments[0].username.toUpperCase());
                    } else {
                        AKB(false, arguments[0].handle);
                    }
                }
            }
        } else {
            AKB(false, arguments[0].handle);
        }
    }
    function CheckSafeList() {
        var target = User(arguments[0]);
        if (target !== -1) {
            var a = CMD.SafeList.indexOf(CMD.UserList[target].username);
            if (a !== -1) {
                if (arguments[1]) {
                    debug("SAFELIST::", "REMOVE USER " + CMD.UserList[target].username + " FROM SAFELIST");
                    Alert(GetActiveChat(), "❛✔❜Removing "+CMD.UserList[target].username+" from safelist❛❗❜");
                    CommandList.saferemove(a);
                } else {
                    return a;
                }
            }
        }
    }
    function LoadMessage() {
        var ChatIndex, index, Chat = ChatLogElement.querySelector("#CMD-chat-content");
        CMD.ChatScroll = true;
        if (!CMD.MessageCallback[CMD.ActiveMessage]) CMD.MessageCallback[CMD.ActiveMessage] = [];
        CMD.MessageCallback[CMD.ActiveMessage].html = Chat.innerHTML;
        CMD.MessageCallback[CMD.ActiveMessage].len = (Chat.innerHTML === "") ? 0 : CMD.Message[CMD.ActiveMessage].length;
        Chat.innerHTML = "";
        CheckUnreadMessage();
        CMD.ActiveMessage = GetActiveChat();
        if (CMD.Message[CMD.ActiveMessage]) {
            index = (CMD.MessageCallback[CMD.ActiveMessage]) ? CMD.MessageCallback[CMD.ActiveMessage].len : 0;
            if (index > 0) Chat.innerHTML = CMD.MessageCallback[CMD.ActiveMessage].html;
            var len = CMD.Message[CMD.ActiveMessage].length;
            for (ChatIndex = index; ChatIndex < len; ChatIndex++) ChatLogElement.querySelector("#CMD-chat-content").insertAdjacentHTML("beforeend", "<div class=\"message" + ((CMD.Avatar) ? " common " : " ") + ((CMD.HighlightList.includes(CMD.Message[CMD.ActiveMessage][ChatIndex].username) || CMD.Message[CMD.ActiveMessage][ChatIndex].mention) ? "highlight" : "") + "\" " + ((CMD.Message[CMD.ActiveMessage][ChatIndex].avatar === "") ? "style=\"padding-left:3px;\"" : "") + ">" + ((CMD.Avatar) ? "<a href=\"#\" class=\"avatar\"><div><img src=\"" + (CMD.Message[CMD.ActiveMessage][ChatIndex].avatar) + "\"></div></a>" : "") + "<div class=\"nickname\" style=\"-webkit-box-shadow: 0 0 6px " + CMD.Message[CMD.ActiveMessage][ChatIndex].namecolor + ";box-shadow: 0 0 6px " + CMD.Message[CMD.ActiveMessage][ChatIndex].namecolor + ";background:" + CMD.Message[CMD.ActiveMessage][ChatIndex].namecolor + ";\">" + CMD.Message[CMD.ActiveMessage][ChatIndex].nick + (CMD.TimeStampToggle ? "<div class=\"CMDtime\"> " + CMD.Message[CMD.ActiveMessage][ChatIndex].time + " </div>" : "") + "</div><div class=\"content\"><CMD-message-html><span id=\"html\" class=\"message common\" style=\"font-size:" + CMD.FontSize + "px;\">" + CMD.Message[CMD.ActiveMessage][ChatIndex].msg + "</span></CMD-message-html></div></div>");
        } else {
            CMD.Message[CMD.ActiveMessage] = [];
        }
        UpdateScroll(1, false);
        UpdateScroll(2, false);
    }
    function CheckUnreadMessage() {
        if ((Math.floor(ChatLogElement.querySelector("#chat").scrollTop + 50) >= (ChatLogElement.querySelector("#chat").scrollHeight - ChatLogElement.querySelector("#chat").offsetHeight)) || arguments[0] !== undefined) {
            CMD.MissedMsg = 0;
            CMD.ChatScroll = true;
            ChatLogElement.querySelector(".CMD-message-unread").style.display = "none";
        } else {
            CMD.MissedMsg++;
            CMD.ChatScroll = false;
            ChatLogElement.querySelector(".CMD-message-unread").style.display = "block";
            ChatLogElement.querySelector(".CMD-message-unread").innerHTML = "There are " + CMD.MissedMsg + " unread message(s)❛❗❜";
        }
    }
    function GetActiveChat() {
        var elem = ChatListElement.querySelector(".active");
        if (elem) return elem.getAttribute("data-chat-id");
        return 0;
    }
    function CheckImgur() {
        if (CMD.imgur) {
            var i = arguments[0].match(/https?:\/\/i\.imgur\.com\/[a-zA-Z0-9]*\.(jpeg|jpg|gif|png|mp4)/);
            if (i !== null) {
                arguments[0] = (i[1] == "mp4") ? "<center>(Video Below)\n<video onclick=\"if (this.paused) {this.play();}else{this.pause();}\" oncontextmenu=\"return false;\" width=\"288px\" height=\"162px\"><source src=\"" + i[0] + "\" type=\"video/mp4\" /><source src=\"https://i.imgur.com/1gaRIf4.mp4\" type=\"video/mp4\" /></video>\n<a href=\"" + i[0] + "\" target=\"_blank\">Direct Link</a></center>" : "<center><img src=\"" + i[0] + "\" width=\"320px\" height=\"240px\" />\n<a href=\"" + i[0] + "\" target=\"_blank\">Direct Link</a></center>";
            }
        }
        return arguments[0];
    }
    function TTS() {
        var utter = new ChatBot.SpeechSynthesisUtterance(arguments[0]);
        utter.voice = CMD.TTS.voices[0];
        utter.rate = 1.0;
        utter.pitch = 0.5;
        CMD.TTS.synth.speak(utter);
    }
    function isCommand() {
        return arguments[0].match(/^!/);
    }
    function RoomUsers() {
        if (CMD.ScriptInit) UserListElement.querySelector("#header>span>span").innerText = " : " + CMD.UserList.length;
    }
    function SpamPrevention() {
        var LineBreaks = (arguments[0].match(/\n|\r/g) || []).length;
        if (LineBreaks >= 14 && arguments[1] === false) return true;
        return false;
    }
    function GamePrevention() {
        if (!CMD.CanSeeGames && arguments[1] && arguments[0].match(/^\[(?:FISHING\sBOAT)\]/i)) return false;
        return true;
    }
    function UpdateScroll() {
        if (arguments[0] === 1 && (CMD.ChatScroll || arguments[1] === true)) ChatLogElement.querySelector("#chat").scrollTop = ChatLogElement.querySelector("#chat").scrollHeight;
        if (arguments[0] === 2 && (CMD.NotificationScroll || arguments[1] === true) && CMD.NotificationToggle == 0) ChatLogElement.querySelector("#notification-content").scrollTop = ChatLogElement.querySelector("#notification-content").scrollHeight;
    }
    function DecodeTXT() {
        var txt = Bot.createElement("textarea");
        txt.innerHTML = arguments[0];
        return txt.value;
    }
    function HTMLtoTXT() {
        var p = Bot.createElement("p");
        p.appendChild(Bot.createTextNode(arguments[0]));
        return p.innerHTML.replace(/(?:(?:(?:https?|ftps?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?/igm, "<a href=\"$&\" target=\"_blank\">$&</a>").replace(/[\u2680-\u2685]/g, "<span style=\"font-size:275%;\">$&</span>").replace(/\n|\r/g,"<br>");
    }
    function IgnoreText() {
        if (arguments[0] !== "") {
            if (arguments[0].match(/^(\r|\n|\s).*/)) return false;
            return true;
        }
    }
    function TimeToDate() {
        if (arguments[1] === undefined) arguments[1] = new Date();
        var match = arguments[0].trim().match(/(\d+):(\d+)\s?((am|AM|aM|Am)|(pm|PM|pM|Pm))/);
        var t = {
            hours: parseInt(match[1]),
            minutes: parseInt(match[2]),
            period: match[3].toLowerCase()
        };
        if (t.hours === 12) {
            if (t.period === "am") arguments[1].setHours(t.hours - 12, t.minutes, 0);
            if (t.period === "pm") arguments[1].setHours(t.hours, t.minutes, 0);
        } else {
            if (t.period === "am") arguments[1].setHours(t.hours, t.minutes, 0);
            if (t.period === "pm") arguments[1].setHours(t.hours + 12, t.minutes, 0);
        }
        return arguments[1];
    }
    function PushPM() {
        var list = (arguments[2] !== undefined) ? CMD.UserList[arguments[2]] : CMD.Me;

        CMD.Message[arguments[0]].push({
            "time": Time(),
            "namecolor": list.namecolor,
            "avatar": list.avatar,
            "username": list.username,
            "nick": list.nick,
            "msg": CheckImgur(HTMLtoTXT(arguments[1])),
            "mention": false
        });

        if (arguments[0] == GetActiveChat()) {
            var msg = CMD.Message[arguments[0]][CMD.Message[arguments[0]].length - 1];
            CreateMessage(msg.time, list.namecolor, list.avatar, list.username, list.nick, msg.msg, msg.mention, arguments[0]);
            UpdateScroll(1, false);
        }
    }
    function Time() {
        return (new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        }));
    }
    function DateTime() {
        return (new Date().toLocaleString("en-US", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        }));
    }
    function Download() {
        var element = Bot.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(arguments[1]));
        element.setAttribute('download', arguments[0]);
        element.style.display = 'none';
        Bot.body.appendChild(element);
        element.click();
        Bot.body.removeChild(element);
    }
    function StyleSet() {
        var style = Bot.createElement('style');
        style.setAttribute('id', CMD.ChatStyleCounter);
        style.innerHTML = ChatBot.CMDChatCSS[CMD.ChatStyleCounter][0]+":host, #videolist {background-color:unset;}";
        ChatLogElement.appendChild(style);

        style = Bot.createElement('style');
        style.setAttribute('id', CMD.ChatStyleCounter);
        style.innerHTML = ChatBot.CMDChatCSS[CMD.ChatStyleCounter][1]+":host, #videolist {background-color:unset;}";
        VideoListElement.appendChild(style);

        style = Bot.createElement('style');
        style.setAttribute('id', CMD.ChatStyleCounter);
        style.innerHTML = ChatBot.CMDChatCSS[CMD.ChatStyleCounter][2]+":host, #videolist {background-color:unset;}";
        SideMenuElement.appendChild(style);
    }
    function ChatHeightToggled() {
        CMD.OGStyle.HeightCounter++;
        if (!CMD.ChatDisplay) {
            CMD.ChatWidth += 5;
            CMD.ChatDisplay = true;
        }
        CMD.ChatHeight -= 5;
        CMD.UserListDisplay = true;
        if (CMD.ChatHeight == 20) {
            CMD.ChatHeight = 45;
            CMD.UserListDisplay = false;
            CMD.OGStyle.HeightCounter = 0;
        }

        ChatLogElement.querySelector("#chat-wrapper").style.cssText = "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%);" + (CMD.UserListDisplay ? "top:unset;min-height:calc(100% - " + CMD.ChatHeight + "% - 119px)!important;max-height:calc(100% - " + CMD.ChatHeight + "% - 119px)!important;" : "bottom:0;min-height:calc(100% - 120px)!important;max-height: calc(100% - 120px)!important;");
        TitleElement.querySelector("#room-header").style.cssText = "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%)!important;top:" + (CMD.UserListDisplay ? "calc(" + CMD.ChatHeight + "% + 84px);" : "84px;");
        VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.cssText = "bottom:unset;min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%);top:" + (CMD.UserListDisplay ? "calc(" + CMD.ChatHeight + "% + 34px);" : "unset;top:34px;");
        VideoListElement.querySelector("#videos-header").style.cssText = !CMD.UserListDisplay ? "top:0;right: 54px;" : "bottom:unset;top:" + CMD.ChatHeight + "%;";
        SideMenuElement.querySelector("#sidemenu").style.cssText = !CMD.UserListDisplay ? "display:none" : "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%)!important;height:" + CMD.ChatHeight + "%!important;";
        UserListElement.querySelector("#button-banlist").style.cssText = "top:calc(" + CMD.ChatHeight + "% + 89px);";
        Bot.querySelector("#content").style.cssText = "width:calc(100% " + (CMD.ChatDisplay ? "- (400px + " + CMD.ChatWidth + "%)" : "") + ")";
        VideoListElement.querySelector("#videos-footer").style.cssText = "display:block;top:" + (CMD.UserListDisplay ? "calc(" + CMD.ChatHeight + "% + 119px);" : "119px;") + "right:-70px;display:block;";
        PerformanceModeInit(CMD.PerformanceMode);
        UpdateScroll(1, true);
        UpdateScroll(2, true);
        Resize();
    }
    function ChatWidthToggled() {
        CMD.OGStyle.WidthCounter++;
        CMD.ChatWidth += 5;
        CMD.ChatDisplay = true;
        if (CMD.ChatWidth == 25) {
            CMD.ChatWidth = -5;
            CMD.ChatDisplay = false;
            CMD.OGStyle.WidthCounter = 0;
        }
        ChatLogElement.querySelector("#chat-wrapper").style.cssText = (!CMD.ChatDisplay) ? "display:none" : "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%);" + ((CMD.UserListDisplay) ? "top:unset;min-height:calc(100% - " + CMD.ChatHeight + "% - 119px)!important;max-height:calc(100% - " + CMD.ChatHeight + "% - 119px)!important;" : "bottom:0;;min-height:calc(100% - 120px)!important;max-height: calc(100% - 120px)!important;");
        TitleElement.querySelector("#room-header").style.cssText = (!CMD.ChatDisplay) ? "display:none" : "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%)!important;top:" + ((CMD.UserListDisplay) ? "calc(" + CMD.ChatHeight + "% + 84px);" : "84px;");
        VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.cssText = (!CMD.ChatDisplay) ? "bottom:0;top:unset;width:100%;position:relative;" : "bottom:unset;min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%);top:" + ((CMD.UserListDisplay) ? "calc(" + CMD.ChatHeight + "% + 34px);" : "34px;bottom:unset;");
        VideoListElement.querySelector("#videos-header").style.cssText = (!CMD.ChatDisplay) ? "display:none" : ((CMD.UserListDisplay) ? "bottom:unset;top:" + CMD.ChatHeight + "%;" : "bottom:unset;top: 0;right: 54px;");
        SideMenuElement.querySelector("#sidemenu").style.cssText = (!CMD.ChatDisplay || !CMD.UserListDisplay) ? "display:none" : "min-width:400px;width:calc(400px + " + CMD.ChatWidth + "%);max-width:calc(400px + " + CMD.ChatWidth + "%)!important;height:" + CMD.ChatHeight + "%!important;";
        UserListElement.querySelector("#button-banlist").style.cssText = (!CMD.ChatDisplay) ? "display:none" : "top:calc(" + CMD.ChatHeight + "% + 89px);";
        Bot.querySelector("#content").style.cssText = "width:calc(100% " + ((CMD.ChatDisplay) ? "- (400px + " + CMD.ChatWidth + "%)" : "") + ")";
        VideoListElement.querySelector("#videos-footer").style.cssText = "display:block;top:" + ((CMD.UserListDisplay) ? "calc(" + CMD.ChatHeight + "% + 119px);" : "119px;") + "right:-70px;display:block;";
        CMD.PerformanceMode = false;
        PerformanceModeInit(CMD.PerformanceMode);
        UpdateScroll(1, true);
        UpdateScroll(2, true);
        Resize();
    }
    function ChatHide() {
        CMD.NormalStyle.ChatHide = !CMD.NormalStyle.ChatHide;
        ChatLogElement.querySelector("#chat-wrapper").style.display = (CMD.NormalStyle.ChatHide ? "none" : "block");
        UpdateScroll(1, true);
        UpdateScroll(2, true);
        Resize();
    }
    function SoundMeter() {
        setTimeout(function() {
            var Camera = VideoListElement.querySelectorAll(".videos-items tc-video-item"),
                Featured = VideoListElement.querySelectorAll(".videos-items:first-child tc-video-item"),
                TCCameraList = ChatBot.TinychatApp.getInstance().defaultChatroom._videolist.items.length,
                CameraLen = Camera.length,
                users;
            if (Featured.length > 0) {
                for (var x = 0; x < TCCameraList; x++) {
                    if (CameraLen < 1) break;
                    for (users = 0; users < CameraLen; users++) {
                        if (Camera[users].shadowRoot.querySelector(".video > div > video").getAttribute("data-video-id") == ChatBot.TinychatApp.getInstance().defaultChatroom._videolist.items[x].userentity.path) {
                            Camera[users].shadowRoot.querySelector(".video > div > .overlay").setAttribute("data-mic-level", ChatBot.TinychatApp.getInstance().defaultChatroom._videolist.items[x].audiolevel);
                            Camera[users].shadowRoot.querySelector(".video > div > svg").setAttribute("data-mic-level", 0);
                            break;
                        }
                    }
                }
            } else {
                for (users = 0; users < CameraLen; users++) {
                    Camera[users].shadowRoot.querySelector(".video > div > .overlay").setAttribute("data-mic-level", ChatBot.TinychatApp.getInstance().defaultChatroom._videolist.items[users].audiolevel);
                    Camera[users].shadowRoot.querySelector(".video > div > svg").setAttribute("data-mic-level", 0);
                }
            }
            SoundMeter();
        }, 200);
    }
    function RTC() {
        if (null != arguments[0].rtc) {
            let a = arguments[0].rtc;
            arguments[0].rtc = null;
            MS(arguments[0], a);
        }
    }
    function Vote() {
        var ChecksOut = CMD.VoteSystem,
            len = CMD.WaitToVoteList.length;
        if (len > 0 && ChecksOut) {
            for (var i = 0; i < len; i++) {
                if (CMD.WaitToVoteList[i][0] === CMD.UserList[arguments[0]].username.toUpperCase()) {
                    Send("msg", "Please wait several minutes till you can cast your vote again❛❗❜");
                    ChecksOut = false;
                    break;
                }
            }
        }
        if (ChecksOut) {
            if (isSafeListed(CMD.UserList[arguments[0]].username.toUpperCase())) {
                var targetname = arguments[1].match(/\!vote\s(guest-[0-9]{1,26}|[a-z0-9_]{1,32})$/i);
                if (targetname !== null) {
                    var Target = UsernameToUser(targetname[1].toUpperCase());
                    if (Target !== -1) {
                        if (CMD.UserList[Target].broadcasting) {
                            if (CMD.Me.owner || !CMD.UserList[Target].mod) {
                                Send("msg", "Your vote has been cast, you may vote again shortly❛❗❜");
                                CMD.WaitToVoteList.push([CMD.UserList[arguments[0]].username.toUpperCase(), new Date()]);
                                CMD.UserList[Target].vote += 1;
                                if (CMD.UserList[Target].vote === 3) {
                                    CMD.UserList[Target].vote = 0;
                                    Send("msg", CMD.UserList[Target].nick + "❛❗❜\nYou've been voted off camera❛❗❜");
                                    Send("stream_moder_close", CMD.UserList[Target].handle);
                                }
                            } else Send("msg", "I cannot do that❛❗❜");
                        }
                    } else Send("msg", "The user is not broadcasting...");
                } else Send("msg", "The nickname or username does not exist❛❗❜");
            }
        }
    }
    function MessagePopUp() {
        if (CMD.Popups) {
            var push = false;
            if (arguments[0] != -1) {
                if (ChatListElement.querySelector(".list-item .active")) {
                    if (ChatListElement.querySelector(".active").innerHTML.includes(CMD.UserList[arguments[0]].nick) && !ChatListElement.querySelector(".active").innerHTML.includes("(offline)")) {
                        if (arguments[2]) push = true;
                    } else push = true;
                } else if (!arguments[2]) push = true;
            }
            if (arguments[3]) push = true;
            if (push || !CMD.ChatDisplay) {
                if (VideoListElement.querySelector(".PMOverlay .PMPopup:nth-child(5)")) {
                    Remove(VideoListElement, ".PMOverlay .PMPopup:first-child");
                    clearTimeout(CMD.NotificationTimeOut[0]);
                    CMD.NotificationTimeOut.shift();
                }
                VideoListElement.querySelector(".PMOverlay").insertAdjacentHTML("beforeend", "<div class=\"PMPopup\"><h2><div class=\"PMTime\">" + Time() + "</div><div class=\"PMName\">" + ((arguments[3]) ? "YouTube" : (CMD.UserList[arguments[0]].nick + " in " + ((arguments[2]) ? "Main" : "PM"))) + "</div></h2><div class=\"PMContent\"style=\"font-size:" + CMD.FontSize + "px\">" + arguments[1] + "</div></div>");
                CMD.NotificationTimeOut.push(setTimeout(function() {
                    if (VideoListElement.querySelector(".PMOverlay .PMPopup")) {
                        Remove(VideoListElement, ".PMOverlay .PMPopup:first-child");
                        CMD.NotificationTimeOut.shift();
                    }
                }, 11100));
            }
        }
    }
    function Reminder() {
        var temp,
            i,
            len = CMD.ReminderServerInList.length;
        for (i = 0; i < len; i++) clearTimeout(CMD.ReminderServerInList[i]);
        CMD.ReminderServerInList = [];
        if (CMD.Reminder === true) {
            var OffsetTime;
            len = CMD.ReminderList.length;
            for (i = 0; i < len; i++) {
                temp = TimeToDate(CMD.ReminderList[i][0]);
                CMD.RecentTime = new Date();
                if (temp < CMD.RecentTime) temp.setDate(temp.getDate() + 1);
                OffsetTime = temp - CMD.RecentTime;
                CMD.ReminderServerInList.push(setTimeout(AddReminder, OffsetTime, CMD.ReminderList[i][1]));
            }
            if (Addon.active("ReminderList")) {
                len = Addon.get("ReminderList").length;
                for (i = 0; i < len; i++) {
                    temp = TimeToDate(Addon.get("ReminderList")[i][0]);
                    CMD.RecentTime = new Date();
                    if (temp < CMD.RecentTime) temp.setDate(temp.getDate() + 1);
                    OffsetTime = temp - CMD.RecentTime;
                    CMD.ReminderServerInList.push(setTimeout(AddReminder, OffsetTime, Addon.get("ReminderList")[i][1]));
                }
            }
        }
    }
    function AddReminder() {
        Send("msg", "🕬 " + arguments[0]);
        setTimeout(Reminder, 5000);
    }
    var timer = (what) => {
        var dateWithouthSecond = new Date();
        dateWithouthSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        Send("msg", "🕬 " + arguments[0]);
    };
    function NotificationDisplay() {
        ChatLogElement.querySelector("#notification-content").style.cssText = "display:" + ((CMD.NotificationToggle == 0) ? "block" : "none") + ";";
        ChatLogElement.querySelector(".notifbtn").style.cssText = "display:" + ((CMD.NotificationToggle == 0) ? "block" : "none") + ";";
        if (CMD.NotificationToggle == 0) {
            ChatLogElement.querySelector(".notifbtn").addEventListener("click", NotificationResize, {
                passive: true
            });
        } else ChatLogElement.querySelector(".notifbtn").removeEventListener("click", NotificationResize, { passive: true });
        UpdateScroll(1, true);
        UpdateScroll(2, true);
    }
    function NotificationResize() {
        ChatLogElement.querySelector("#notification-content").classList.toggle("large");
        if (ChatLogElement.querySelector(".notifbtn").innerText === "▼") {
            ChatLogElement.querySelector(".notifbtn").innerText = "▲";
            ChatLogElement.querySelector("#chat").style.height = "50%%";
        } else {
            ChatLogElement.querySelector(".notifbtn").innerText = "▼";
            ChatLogElement.querySelector("#chat").style.height = "100%";
        }
        UpdateScroll(1, false);
        UpdateScroll(2, true);
    }
    function Dice() {
        return String.fromCharCode("0x268" + Rand(0, 5));
    }
    function Rand() {
        arguments[0] = Math.ceil(arguments[0]);
        arguments[1] = Math.floor(arguments[1]);
        return Math.floor(Math.random() * (arguments[1] - arguments[0] + 1)) + arguments[0];
    }
    function OpenMicrophone() {
        MicrophoneElement.initMouseEvent("mousedown");
        VideoListElement.querySelector("#videos-footer-push-to-talk").dispatchEvent(MicrophoneElement);
    }
    function Cameras() {
        var Camera = VideoListElement.querySelectorAll(".videos-items tc-video-item"),
            Len = Camera.length;
        for (var user = 0; user < Len; user++) {
            var isIgnored = User(Camera[user].shadowRoot.querySelector(".video > div > video").getAttribute("data-video-id"));
            if (CheckUserIgnore(isIgnored) || CheckUserTempIgnore(isIgnored) && !Camera[user].shadowRoot.querySelector(".not-visible")) Camera[user].shadowRoot.querySelector("button[class=\"icon-visibility\"]").click();
            Camera[user].shadowRoot.querySelector(".video").style.padding = (CMD.CameraBorderToggle) ? "5px" : "0";
            if (!Camera[user].shadowRoot.querySelector(".video #fixed")) Camera[user].shadowRoot.querySelector(".video").insertAdjacentHTML("afterbegin", "<style id=\"fixed\">@media screen and (max-width: 1827px){.video.large{width:100%!important;}}.video.large{position: absolute;left:0;top: 0;z-index: 2;max-width: 1827px;}.video>div>.overlay[data-mic-level=\"1\"] {-webkit-box-shadow: inset 0 0 2px 3px #53b6ef;box-shadow: inset 0 0 2px 3px #53b6ef;}.video>div>.overlay[data-mic-level=\"2\"] {-webkit-box-shadow: inset 0 0 4px 3px #53b6ef;box-shadow: inset 0 0 4px 3px #53b6ef;}.video>div>.overlay[data-mic-level=\"3\"],.video>div>.overlay[data-mic-level=\"4\"], .video>div>.overlay[data-mic-level=\"5\"], .video>div>.overlay[data-mic-level=\"6\"], .video>div>.overlay[data-mic-level=\"7\"], .video>div>.overlay[data-mic-level=\"8\"], .video>div>.overlay[data-mic-level=\"9\"], .video>div>.overlay[data-mic-level=\"10\"] {-webkit-box-shadow: inset 0 0 6px 3px #53b6ef;box-shadow: inset 0 0 6px 3px #53b6ef;}.video:after{content:unset;}</style>");
        }
        Resize();
    }
    function FeaturedCameras() {
        if (arguments[0] === true) {
            if (VideoListElement.querySelector("#SmallFTYT")) {
                Remove(VideoListElement, "#SmallFTYT");
            }
        } else {
            var node = Bot.createElement("style");
            node.appendChild(Bot.createTextNode(FeaturedCSS));
            node.setAttribute("id", "SmallFTYT");
            VideoListElement.appendChild(node);
        }
    }
    function Resize() {
        ChatBot.dispatchEvent(new Event("resize"));
    }
    function PerformanceModeInit() {
        if (!CMD.ThemeChange) {
            var value = ((arguments[0]) ? "100%" : "calc(400px + " + CMD.ChatWidth + "%)");
            ChatLogElement.querySelector("#chat-wrapper").style.minWidth = value;
            ChatLogElement.querySelector("#chat-wrapper").style.maxWidth = value;
            ChatLogElement.querySelector("#chat-wrapper").style.width = value;
            TitleElement.querySelector("#room-header").style.minWidth = value;
            TitleElement.querySelector("#room-header").style.maxWidth = value;
            TitleElement.querySelector("#room-header").style.width = value;
            VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.minWidth = ((!CMD.ChatDisplay) ? "100%" : value);
            VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.maxWidth = ((!CMD.ChatDisplay) ? "100%" : value);
            VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.width = ((!CMD.ChatDisplay) ? "100%" : value);
            VideoListElement.querySelector("#videos-header").style.minWidth = ((!CMD.UserListDisplay) ? "calc(" + value + " - 54px)" : value);
            VideoListElement.querySelector("#videos-header").style.maxWidth = ((!CMD.UserListDisplay) ? "calc(" + value + " - 54px)" : value);
            VideoListElement.querySelector("#videos-header").style.width = ((!CMD.UserListDisplay) ? "calc(" + value + " - 54px)" : value);
            SideMenuElement.querySelector("#sidemenu").style.minWidth = value;
            SideMenuElement.querySelector("#sidemenu").style.maxWidth = value;
            SideMenuElement.querySelector("#sidemenu").style.width = value;
            Bot.querySelector("#content").style.width = ((!arguments[0]) ? "calc(100% " + (CMD.ChatDisplay ? "- (400px + " + CMD.ChatWidth + "%)" : "") + ")" : "0%");
            VideoListElement.querySelector("#videos").style.display = ((!arguments[0]) ? "block!important" : "none!important");

        } else {
            if (arguments[0]) {
                VideoListElement.querySelector("#videos-content").style.display = "none";
                ChatLogElement.querySelector("#chat-wrapper").style.width ="100%";
                ChatLogElement.querySelector("#chat-wrapper").style.position = "fixed";
                ChatLogElement.querySelector("#chat-wrapper").style.left = "0";
                ChatLogElement.querySelector("#chat-wrapper").style.bottom = "0";
                ChatLogElement.querySelector("#chat-wrapper").style.minHeight = "100%";
                VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.display = "none";
                VideoListElement.querySelector("#videos-header").style.display = "none";
                VideoListElement.querySelector("#videos-footer").style.display = "none";
            } else {
                VideoListElement.querySelector("#videos-content").style.removeProperty("display");
                ChatLogElement.querySelector("#chat-wrapper").style.removeProperty("width");
                ChatLogElement.querySelector("#chat-wrapper").style.removeProperty("position");
                ChatLogElement.querySelector("#chat-wrapper").style.removeProperty("left");
                ChatLogElement.querySelector("#chat-wrapper").style.removeProperty("bottom");
                ChatLogElement.querySelector("#chat-wrapper").style.removeProperty("min-height");
                VideoListElement.querySelector("#videos-footer-broadcast-wrapper").style.removeProperty("display");
                VideoListElement.querySelector("#videos-header").style.removeProperty("display");
                VideoListElement.querySelector("#videos-footer").style.removeProperty("display");
            }
        }
        UpdateScroll(1, true);
        UpdateScroll(2, true);
        Resize();
    }
    function OwnerCommand() {
        if (isCommand(arguments[1])) {
            if (CMD.UserList[arguments[0]].owner) {
                if (arguments[1].match(/^!closeall$/i)) {
                     for (var a = 0; a < CMD.Camera.List.length; a++) {
                         if (CMD.Me.handle !== CMD.Camera.List[a]) Send("stream_moder_close", CMD.Camera.List[a]);
                     }
                 }
                 if (arguments[1].match(/^!kickall$/i)) {
                     for (var b = 0; b < CMD.UserList.length; b++) {
                        if (CMD.Me.handle !== CMD.UserList[b].handle) Send("kick", CMD.UserList[b].handle);
                    }
                }
            }
        }
    }
    function Command() {
        var UserCommand = arguments[0].match(/^!([a-z0-9]*)(?:\s?)(.*)/i);
        if (UserCommand) {
            if (typeof CommandList[UserCommand[1].toLowerCase()] == "function") {
                debug("COMMAND::" + ((arguments[1]) ? "PM" : "MAIN"), UserCommand[1] + ":" + UserCommand[2]);
                CommandList[UserCommand[1].toLowerCase()](UserCommand[2], arguments[1]);
            }
        }
    }
    function Settings() {
        Alert(GetActiveChat(), ((arguments[0] !== undefined) ? arguments[0] : "") + "<center>CMD BOT CONFIGURATION:\nBot Mode: " + ((CMD.Bot) ? "ON" : "OFF") + "\nOperator Mode: " + ((CMD.UserYT) ? "ON" : "OFF") + "\nPublic Command Mode: " + ((CMD.PublicCommandToggle) ? "ON" : "OFF") + "\nGreen Room Mode:\n" + ((CMD.GreenRoomToggle) ? "AUTO ALLOW" : "MANUAL") + "\nReminder Mode: " + ((CMD.Reminder) ? "ON" : "OFF") + "\nGame View: " + ((CMD.CanSeeGames) ? "ON" : "OFF") + "\nGame Host: " + ((CMD.CanHostGames) ? "ON" : "OFF") + "\n\nAvatar Display: " + ((CMD.Avatar) ? "SHOW" : "HIDE") + "\nNotification Display: " + ((CMD.NotificationToggle != 2) ? "SHOW("+CMD.NotificationToggle+")" : "HIDE") + "\nPopup Display: " + ((CMD.Popups) ? "SHOW" : "HIDE") + "\nFont Size: " + CMD.FontSize + "PX\n\nFOR LIST OF COMMANDS:\n!help</center>");
    }
    function Alert() {
        CMD.Message[arguments[0]].push({
            "time": Time(),
            "namecolor": (arguments[2] !== undefined) ? "#000000" : "#3f69c0",
            "avatar": (arguments[2] !== undefined) ? ("") : ("https://i.redd.it/eibw84uh0m051.jpg"),
            "username": "",
            "nick": (arguments[2] !== undefined) ? (arguments[2]) : ("CMD Version: " + ChatBot.version),
            "msg": ((arguments[2] !== undefined) ? ("<div id=\"system_user\">" + arguments[1] + "</div>") : arguments[1]),
            "mention": ((arguments[2] !== undefined) ? false : true)
        });
        var len = CMD.Message[arguments[0]].length - 1;
        arguments[1] = CMD.Message[arguments[0]][len];
        CreateMessage(arguments[1].time, arguments[1].namecolor, arguments[1].avatar, arguments[1].username, arguments[1].nick, arguments[1].msg, arguments[1].mention, arguments[0]);
    }
    function AddUserNotification() {
        if (CMD.FullLoad && CMD.ShowedSettings) {
            var chat = ChatLogElement.querySelector("#notification-content"),
                Notification;
            CMD.NotificationScroll = (Math.floor(chat.scrollTop) + 5 >= (chat.scrollHeight - chat.offsetHeight)) ? true : false;
            if (arguments[0] == 1) {
                Notification = arguments[3] + ((arguments[4]) ? " is " : " has stopped ") + "broadcasting❛❗❜";
            } else if (arguments[0] == 2) {
                Notification = arguments[3] + " has " + ((!arguments[4]) ? "joined❛❗❜" : "left❛❗❜");
            } else if (arguments[0] == 3) {
                Notification = arguments[2] + "has mentioned you❛❗❜";
                if (CMD.NotificationToggle == 0) {
                    ChatBot.alerted();
                    ChatLogElement.querySelector("#notification-content").insertAdjacentHTML("beforeend", "<div class=\"list-item\"><div class=\"notification\"><span style=\"background:" + arguments[1] + "\" class=\"nickname\">" + arguments[2] + "</span>"+((CMD.TimeStampToggle)?"<span class=\"time\"> " + Time() + " </span>":"")+"<br/> has mentioned you.</div></div>");
                }
                UpdateScroll(2, true);
            } else if (arguments[0] == 4) {
                Notification = "with the account name " + arguments[3] + " changed their name to " + arguments[5];
            }
            if (arguments[0] != 3 && CMD.NotificationToggle == 0) {
                ChatBot.alerted();
                ChatLogElement.querySelector("#notification-content").insertAdjacentHTML("beforeend", "<div class=\"list-item\"><div class=\"notification\"><span class=\"nickname\" style=\"background:" + arguments[1] + ";\">" + arguments[2] + "</span>"+((CMD.TimeStampToggle)?"<span class=\"time\"> " + Time() + " </span>":"")+"<br/>" + Notification + "</div></div>");
            }
            if (CMD.NotificationToggle == 1) Alert(0, Notification, arguments[2]);
            if (CMD.TTS.synth !== undefined && (CMD.TTSList.includes(arguments[2].toUpperCase()) || CMD.TTSList.includes(arguments[3]) || CMD.TTSList.includes("-ALL") || CMD.TTSList.includes("-EVENT"))) TTS(arguments[2] + ((arguments[0] == 4) ? " " : "as ") + Notification);
            UpdateScroll(2, false);
            var Notifications = ChatLogElement.querySelectorAll(".notification");
            if (Notifications.length > CMD.NotificationLimit + 25) {
                for (var NotificationIndex = 0; NotificationIndex < Notifications.length - CMD.NotificationLimit; NotificationIndex++) Notifications[NotificationIndex].parentNode.removeChild(Notifications[NotificationIndex]);
            }
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        }
    }
    function AddSystemNotification() {
        if (CMD.FullLoad && CMD.ShowedSettings) {
            if (CMD.NotificationToggle == 0) {
                ChatBot.alerted();
                ChatLogElement.querySelector("#notification-content").insertAdjacentHTML("beforeend", "<div class=\"list-item\"><span class=\"nickname\"style=\"background:#F00\">SYSTEM</span>"+((CMD.TimeStampToggle)?"<span class=\"time\"> " + Time() + " </span>":"")+"<br/>" + arguments[0] + "</div>");
            } else if (CMD.NotificationToggle == 1) {
                Alert(0, arguments[0], "SYSTEM");
            }
            if (CMD.TTS.synth !== undefined && (CMD.TTSList.includes("-ALL") || CMD.TTSList.includes("-EVENT"))) TTS(arguments[0]);
            UpdateScroll(2, false);
        }
    }
    function AddUser() {
        CMD.UserList.push({
            "handle": arguments[0],
            "username": arguments[5],
            "nick": arguments[4],
            "owner": arguments[7],
            "mod": arguments[1],
            "namecolor": arguments[2],
            "avatar": arguments[3],
            "canGame": arguments[6],
            "broadcasting": false,
            "vote": 0
        });
        if (CMD.ScriptInit) AddUserNotification(2, arguments[2], arguments[4], arguments[5], false);
    }
    function User() {
        for (var user = 0; user < CMD.UserList.length; user++) {
            if (CMD.UserList[user].handle == arguments[0]) return user;
        }
        return -1;
    }
    function UsernameToHandle() {
        for (var user = 0; user < CMD.UserList.length; user++) {
            if (CMD.UserList[user].username.toUpperCase() == arguments[0] || CMD.UserList[user].nick.toUpperCase() == arguments[0]) return CMD.UserList[user].handle;
        }
        return -1;
    }
    function UsernameToUser() {
        for (var user = 0; user < CMD.UserList.length; user++) {
            if (CMD.UserList[user].username.toUpperCase() == arguments[0] || CMD.UserList[user].nick.toUpperCase() == arguments[0]) return user;
        }
        return -1;
    }
    function NicknameToAccount() {
        for (var user = 0; user < CMD.UserList.length; user++) {
            if (CMD.UserList[user].nick.toUpperCase() == arguments[0]) return user;
        }
        return -1;
    }
    function CheckUserListSafe() {
        var len = CMD.UserList.length;
        var temp = [];
        if (Addon.active("AKB")) temp = Addon.get("AKB");
        for (var user = 0; user < len; user++) {
            if (!CMD.UserList[user].mod && !isSafeListed(CMD.UserList[user].username)) {
                CMD.KBQueue.push(CMD.UserList[user].handle);
            }
        }
        len = CMD.KBQueue.length;
        for (var kb = 0; kb < len; kb++) {
            Send(arguments[0], CMD.KBQueue[kb]);
        }
        CMD.KBQueue = [];
    }
    function isSafeListed() {
        var temp = [];
        if (Addon.active("AKB")) temp = Addon.get("AKB");
        return (CMD.SafeList.includes(arguments[0]) || temp.includes(arguments[0]));
    }
    function CheckUserTempIgnore() {
        if (CMD.TempIgnoreList.includes(CMD.UserList[arguments[0]].username) || CMD.TempIgnoreList.includes(CMD.UserList[arguments[0]].nick.toUpperCase())) return true;
        return false;
    }
    function CheckUserIgnore() {
        if (CMD.IgnoreList.includes(CMD.UserList[arguments[0]].username) || CMD.IgnoreList.includes(CMD.UserList[arguments[0]].nick.toUpperCase())) return true;
        return false;
    }
    function CheckUserTouchScreen() {
        if (/Mobi|Android/i.test(navigator.userAgent) || 'ontouchstart' in Bot.documentElement) {
            CMD.Project.isTouchScreen = true;
            CMD.ThemeChange = true;
        }
    }
    function CheckUserAbuse() {
        var action = false;
        if (CMD.Me.mod) {
            if ((CMD.KickList.includes(arguments[1]) || CMD.KickList.includes(arguments[2]))) {
                CMD.NoGreet = true;
                Send("kick", arguments[0]);
                action = true;
            }
            if (!action) {
                if ((CMD.BanList.includes(arguments[1]) || CMD.BanList.includes(arguments[2]))) {
                    CMD.NoGreet = true;
                    Send("ban", arguments[0]);
                }
            }
        }
    }
    function CheckUserWordAbuse() {
        if (CMD.UserList[arguments[0]].handle != CMD.Me.handle && !CMD.UserList[arguments[0]].mod) {
            var action = false;
            var len = CMD.KickKeywordList.length;
            for (var i = 0; i < len; i++) {
                if (arguments[1].includes(CMD.KickKeywordList[i])) {
                    Send("kick", CMD.UserList[arguments[0]].handle);
                    action = true;
                    break;
                }
            }
            if (!action) {
                len = CMD.BanKeywordList.length;
                for (i = 0; i < len; i++) {
                    if (arguments[1].includes(CMD.BanKeywordList[i])) {
                        Send("ban", CMD.UserList[arguments[0]].handle);
                        break;
                    }
                }
            }
        }
    }
    function RemoveUserCamera() {
        var len = CMD.Camera.List.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (CMD.Camera.List[i] === arguments[0]) {
                    CMD.Camera.List.splice(i, 1);
                    clearTimeout(CMD.Camera.clearRandom);
                    break;
                }
            }
        }
    }
    function CheckUserStream() {
        if (CMD.Me.mod) {
            var user = User(arguments[0]);
            if (user != -1) {
                if (arguments[1]) {
                    CMD.Camera.List.push(CMD.UserList[user].handle);
                    CMD.UserList[user].broadcasting = true;
                    var len = CMD.Camera.List.length;
                    if (CMD.UserList[user].username !== "GUEST" && !CMD.GreenRoomList.includes(CMD.UserList[user].username)) {
                        CMD.GreenRoomList.push(CMD.UserList[user].username);
                        Save("GreenRoomList", JSON.stringify(CMD.GreenRoomList));
                    }
                    clearTimeout(CMD.Camera.clearRandom);
                    if (len >= 12 && CMD.Me.handle === CMD.Host && CMD.Camera.Sweep) {
                        CMD.Camera.clearRandom = setTimeout(function() {
                            var rand = Rand(0, len - 1);
                            if (CMD.Camera.List[rand] !== CMD.Me.handle && CMD.Camera.Sweep) {
                                var target = User(CMD.Camera.List[rand]);
                                if (CMD.Me.owner || !CMD.UserList[target].mod) {
                                    Send("msg", "[Camera Clear]\n" + CMD.UserList[target].nick + "❛❗❜\nYou've been randomly selected. You win, a cam close❛❗❜");
                                    Send("stream_moder_close", CMD.Camera.List[rand]);
                                    CMD.Camera.List.splice(rand, 1);
                                }
                            }
                        }, CMD.Camera.SweepTimer * 60000);
                    }
                } else {
                    clearTimeout(CMD.Camera.clearRandom);
                    RemoveUserCamera(CMD.UserList[user].handle);
                    CMD.UserList[user].broadcasting = false;
                }
                CMD.UserList[user].broadcasting = arguments[1];
                if (CMD.ScriptInit) AddUserNotification(1, CMD.UserList[user].namecolor, CMD.UserList[user].nick, CMD.UserList[user].username, arguments[1]);
            }
        }
    }
    function CheckUserName() {
        return arguments[0].match(/^(-all|[a-z0-9_]{1,32})$/i);
    }
    function CheckUserNameStrict() {
        return arguments[0].match(/^([a-z0-9_]{1,32})$/i);
    }
    function MSR() {
        if (arguments[0]) {
            arguments[1].videolist.RemoveVideoRemote(arguments[1].handle);
        } else {
            arguments[1].mediaStream.stop();
            arguments[1].mediaStream = null;
        }
    }
    function MS() {
        if (arguments[0].mediaStream !== null) {
            if (arguments[0].mediaStream.active && arguments[1].signalingState !== "closed" && typeof arguments[1].removeStream === "function" && arguments[1].removeStream(arguments[0].mediaStream)) MSR(false, arguments[0]);
        } else {
            MSR(true, arguments[0]);
        }
        if (arguments[1].signalingState !== "closed" && arguments[1].close());
    }
    function Load() {
        var val = localStorage.getItem(CMD.Project.Storage + arguments[0]);
        if (null === val && "undefined" != typeof arguments[1]) {
            Save(arguments[0], arguments[1]);
            return arguments[1];
        }
        return val;
    }
    function Save() {
        localStorage.setItem(CMD.Project.Storage + arguments[0], arguments[1]);
    }
    function CMDWebSocket() {
        if (ChatBot.Proxy === undefined) return;
        var handler = {
            set: function(Target, prop, value) {
                if (prop == "onmessage") {
                    var oldMessage = value;
                    value = function(event) {
                        ServerMsg(JSON.parse(event.data), Target);
                        oldMessage(event);
                    };
                }
                return (Target[prop] = value);
            },
            get: function(Target, prop) {
                var value = Target[prop];
                if (prop == "send") {
                    value = function(event) {
                        ClientMsg(JSON.parse(event), Target);
                        Target.send(event);
                    };
                } else if (typeof value == 'function') {
                    value = value.bind(Target);
                }
                return value;
            }
        };
        var WebSocketProxy = new ChatBot.Proxy(ChatBot.WebSocket, {
            construct: function(Target, args) {
                CMD.SocketTarget = new Target(args[0]);
                debug("SOCKET::CONNECTING", args[0]);
                return new ChatBot.Proxy(CMD.SocketTarget, handler);
            }
        });
        ChatBot.WebSocket = WebSocketProxy;
    }
    function ModCommand() {
        var name = arguments[1].match(/\!(?:kick|ban|close)\s(guest-[0-9]{1,26}|[a-z0-9_]{1,32})$/i);
        if (name !== null) {
            var target = UsernameToUser(name[1].toUpperCase());
            if (target != -1) {
                if (CMD.UserList[target].handle !== CMD.Me.handle && !CMD.BotModList.includes(CMD.UserList[target].username) && !CMD.UserList[target].mod) {
                    if (arguments[0] === "stream_moder_close") {
                        if (CMD.UserList[target].broadcasting) Send(arguments[0], CMD.UserList[target].handle);
                    } else {
                        Send(arguments[0], CMD.UserList[target].handle);
                    }
                } else {
                    Send("msg", "This users authorization is similar or above yours❛❗❜");
                }
            }
        }
    }
    function BotCommand() {
        var len = CMD.YouTube.MessageQueueList.length;
        if (len <= 0) {
            if (CMD.UserList[arguments[1]].mod) {
                if (arguments[0] == 2) {
                    if (CMD.YouTube.CurrentTrack.ID !== undefined) {
                        CMD.YouTube.Clear = true;
                        YouTubePlayList();
                    }
                }
                if (arguments[0] == 5) SetBot(true);
            }
            if ((CMD.UserYT && CMD.SafeList.includes(CMD.UserList[arguments[1]].username) && (CMD.BotOPList.includes(CMD.UserList[arguments[1]].username) || CMD.BotOPList.includes("-ALL"))) || CMD.UserList[arguments[1]].mod || CMD.BotModList.includes(CMD.UserList[arguments[1]].username)) {
                if (arguments[0] == 1) CheckYouTube(arguments[2], true, undefined, CMD.UserList[arguments[1]].mod);
                if (arguments[0] == 4) YouTubePlayList(true);
                if (arguments[0] == 6) {
                    if (CMD.UserList[arguments[1]].mod || CMD.BotModList.includes(CMD.UserList[arguments[1]].username)) {
                        var videoid = arguments[2].match(/http(?:s)?(?:\:\/\/)(?:w{1,3}\.)?(?:youtu(?:\.be|be.com))(?:\/v\/|\/)?(?:watch\?|embed\/|user\/|v\/|\/)(?:v\=)?([a-z0-9\-\_]{1,11})/i);
                        if (videoid !== null) {
                            CMD.SocketTarget.send(JSON.stringify({
                                "tc": "yut_play",
                                "item": {
                                    "id": videoid[1],
                                    "duration": 7200,
                                    "offset": 0,
                                    "title": "YOUTUBE IS BYPASSED - MODS ONLY"
                                }
                            }));
                            debug("YOUTUBE::LINK BYPASS", videoid[1]);
                        }
                    } else {
                        Send("msg", "Ask a moderator to play your request.");
                    }
                }
                if (arguments[0] == 3) {
                    if (CMD.YouTube.CurrentTrack.ID !== undefined) {
                        Send("yut_stop", [CMD.YouTube.CurrentTrack.ID, CMD.YouTube.CurrentTrack.duration, CMD.YouTube.CurrentTrack.title, CMD.YouTube.CurrentTrack.thumbnail, 0]);
                        Send("msg", "❛🎵❜" + CMD.YouTube.CurrentTrack.title + " has been skipped❛❗❜");
                    }
                }
            }
        } else {
            if (CMD.YouTube.ListBuilt === false) {
                Send("msg", "❛🎵❜ Playlist search is happening, please wait❛❗❜\n" + CMD.YouTube.MessageQueueList.length + " tracks found.");
            } else {
                Send("msg", "❛🎵❜ Playlist items are being added,a please wait❛❗❜\n" + CMD.YouTube.MessageQueueList.length + " tracks remaining.");
            }
        }
    }
    function ServerMsg() {
        if (typeof ServerInList[arguments[0].tc] == "function") {
            debug(("SERVER::" + arguments[0].tc.toUpperCase()), arguments[0]);
            ServerInList[arguments[0].tc](arguments[0]);
        }
    }
    function ClientMsg() {
        if (typeof ServerOutList[arguments[0].tc] == "function") {
            debug(("CLIENT::" + arguments[0].tc.toUpperCase()), arguments[0]);
            ServerOutList[arguments[0].tc](arguments[0]);
        }
    }
    function Send() {
        ServerSendList[arguments[0]](arguments[0], arguments[1], arguments[2]);
        if (arguments[1] === undefined) arguments[1] = "Open Request";
        debug(("CLIENT::SEND::" + arguments[0].toUpperCase()), arguments[1]);
    }
    function FishUpgradeStatus(playerExist, type) {
        var msg = "[FISHING BOAT]\n";
        if (type != 7) msg += playerExist.Nickname + ":\n";
        if (type == 0 || type == 1) msg += "[NET]Lv. " + playerExist.Upgrades.Net + "\n" + ((playerExist.Upgrades.Net >= 10) ? "[MAXED]" : "[COSTS $" + Fish.pricelist(playerExist, 0) + " to UPGRADE]\n\n");
        if (type == 0 || type == 2) msg += "[RADAR]Lv. " + playerExist.Upgrades.Radar + "\n" + ((playerExist.Upgrades.Radar >= 20) ? "[MAXED]" : "[COSTS $" + Fish.pricelist(playerExist, 1) + " to UPGRADE]") + "\n\n";
        if (type == 0 || type == 3) msg += "[INSURANCE]\n" + ((playerExist.Upgrades.Insurance) ? "[OWNED]" : "[COSTS $" + Fish.pricelist(playerExist, 3) + " per ROUND]") + "\n\n";
        if (type == 0 || type == 4) msg += "[SHOP]Lv. " + playerExist.Upgrades.Store + "\n" + ((playerExist.Upgrades.Store >= 6) ? "[MAXED]" : "[COSTS $" + Fish.pricelist(playerExist, 2) + " to UPGRADE]") + "\n\n";
        if (type == 6) msg += "HELP:\n!fish\n!fishbank\n!fishsplit user|nick\n!fishgamble\n[COSTS $" + Fish.pricelist(playerExist, 6) + "]\n!fishrob user|nick\n[COSTS $" + Fish.pricelist(playerExist, 4) + "]\n!fishslap user|nick\n[COSTS $" + Fish.pricelist(playerExist, 5) + "]\n!fishupgrade\n!fishupgrade\n[Net|Radar|Insurance|Shop]\n\n";
        Send("msg", msg);
    }
    function FishTimerCheck(playerExist) {
        if (new Date() - playerExist.LastCheck >= 5000) {
            playerExist.LastCheck = new Date();
            return true;
        }
        return false;
    }
    function FishCommandCheck() {
        var command,
            playerExist = Fish.getPlayer(CMD.UserList[arguments[0]].handle, false, true),
            FishCommand = arguments[1].match(/^\!(fish(?:rob|slap|split|help|upgrade)?)\s?(?:([a-z0-9_]*)|net|shop|radar|insurance)?$/i);
        if (FishCommand) {
            if (FishCommand[1] === "fishslap" || FishCommand[1] === "fishrob" || FishCommand[1] === "fishsplit") {
                if (FishCommand[2] !== undefined) {
                    if (typeof FishList[FishCommand[1].toLowerCase()] == "function") FishList[FishCommand[1].toLowerCase()](playerExist, FishCommand[2]);
                }
            } else {
                command = ((FishCommand[2] !== undefined) ? FishCommand[1] + FishCommand[2] : FishCommand[1]);
                if (typeof FishList[command.toLowerCase()] == "function") FishList[command.toLowerCase()](playerExist, CMD.UserList[arguments[0]]);
            }
        }
    }
    function FishTransfer(playerExist, target, cost, deduct, rob) {
        if (target !== undefined && target !== -1) {
            if (playerExist.Points > cost) {
                if (rob) {
                    playerExist.Points -= cost;
                    if (target.Points <= deduct) {
                        deduct = target.Points;
                        target.Points -= deduct;
                        playerExist.Points += deduct;
                        Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " destroyed " + target.Nickname + "\nMoney made $" + deduct + "❛❗❜");
                        Fish.getPlayer(target.Handle, true);
                    } else {
                        target.Points -= deduct;
                        playerExist.Points += deduct;
                        Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " robbed " + target.Nickname + " for $" + deduct + "❛❗❜");
                    }
                } else {
                    playerExist.Points = deduct;
                    target.Points += deduct;
                    Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " split their money with " + target.Nickname + "❛❗❜");
                }
            } else {
                Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " are you kidding me?\nTalk to me when you have money❛❗❜");
            }
        }
    }
    function FishTransaction(playerExist, cost, status) {
        if (playerExist.Points > cost) {
            playerExist.Points -= cost;
            return true;
        } else {
            Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + ", are you kidding me?\nTalk to me when you have money❛❗❜");
            return false;
        }
    }
    var UnicodeConversionList = {
        convert: function() {
            return this.numerical(arguments[0]).replace(/[A-Za-z]/g, this.alphabet);
        },
        alphabet: function() {
            return String.fromCodePoint(arguments[0].codePointAt(0) + ((/[A-Z]/.test(arguments[0])) ? "𝗔".codePointAt(0) - "A".codePointAt(0) : "𝗮".codePointAt(0) - "a".codePointAt(0)));
        },
        numerical: function() {
            return arguments[0].replace(/\d/g, function(c) {
                return String.fromCodePoint(0x1D79E + c.charCodeAt(0));
            });
        }
    };
    var CommandList = {
        CMD: function() {
            Alert(GetActiveChat(), "<b style=\"color:#ee3636;\">Owner Commands:</b>\n!closeall\n!kickall\n!version\n\n<b style=\"color:#ee3636;\">Moderator Commands:</b>\n!whoisbot\n!bot\n!bottoggle\n!greenroomtoggle\n!publiccommandtoggle\n!camsweep\n!votetoggle\n!autokick (be careful!)\n!autoban (be careful!)\n\n!ytbypass <b style=\"color:#ffff00;\">link (no playlists)</b>\n!yt <b style=\"color:#ffff00;\">link | keyword</b>\n!ytclear\n\n!banlist\n!banlistclear\n!banadd <b style=\"color:#ffff00;\">user | nick</b>\n!banremove <b style=\"color:#ffff00;\">#</b>\n\n!bankeywordlist\n!bankeywordlistclear\n!bankeywordadd <b style=\"color:#ffff00;\">keyword | phrase</b>\n!bankeywordremove <b style=\"color:#ffff00;\">#</b>\n\n!kicklist\n!kicklistclear\n!kickadd <b style=\"color:#ffff00;\">user | nick</b>\n!kickremove <b style=\"color:#ffff00;\">#</b>\n\n!kickkeywordlist\n!kickkeywordlistclear\n!kickkeywordadd <b style=\"color:#ffff00;\">keyword | phrase</b>\n!kickkeywordremove <b style=\"color:#ffff00;\">#</b>\n\n!oplist\n!oplistclear\n!opadd <b style=\"color:#ffff00;\">user | -all</b>\n!opremove <b style=\"color:#ffff00;\">#</b>\n!optoggle\n\n<b style=\"color:#ee3636;\">Jr. Moderator Commands:</b>\n!ban <b style=\"color:#ffff00;\">user | nick</b>\n!kick <b style=\"color:#ffff00;\">user | nick</b>\n!close <b style=\"color:#ffff00;\">user | nick</b>\n\n<b style=\"color:#ee3636;\">User Commands:</b>\n!yt <b style=\"color:#ffff00;\">link | keyword</b>\n!ytskip\n!ytqueue\n\n!mentionlist\n!mentionlistclear\n!mentionadd <b style=\"color:#ffff00;\">keyword</b>\n!mentionremove <b style=\"color:#ffff00;\">#</b>\n\n!ignorelist\n!ignorelistclear\n!ignoreadd <b style=\"color:#ffff00;\">user | nick</b>\n!ignoreremove <b style=\"color:#ffff00;\">#</b>\n\n!greetlist\n!greetlistclear\n!greetadd <b style=\"color:#ffff00;\">user | nick | -all</b>\n!greetremove <b style=\"color:#ffff00;\">#</b>\n\n!ttslist\n!ttslistclear\n!ttsadd <b style=\"color:#ffff00;\">user | nick | -all | -event</b>\n!ttsremove <b style=\"color:#ffff00;\">#</b>\n\n!highlightlist\n!highlightlistclear\n!highlightadd <b style=\"color:#ffff00;\">user | nick</b>\n!highlightremove <b style=\"color:#ffff00;\">#</b>\n\n!reminderlist\n!reminderlistclear\n!reminderadd <b style=\"color:#ffff00;\">user | nick</b>\n!reminderremove <b style=\"color:#ffff00;\">#</b>\n!remindertoggle\n\n!safelist\n!safelistclear\n!safeadd <b style=\"color:#ffff00;\">user</b>\n!saferemove <b style=\"color:#ffff00;\">#</b>\n\n!greenroomlist\n!greenroomlistclear\n!greenroomadd <b style=\"color:#ffff00;\">user</b>\n!greenroomremove <b style=\"color:#ffff00;\">#</b>\n\n!greenroomignorelist\n!greenroomignorelistclear\n!greenroomignoreadd <b style=\"color:#ffff00;\">user</b>\n!greenroomignoreremove <b style=\"color:#ffff00;\">#</b>\n\n!lists\n!listsclear\n\n!greetmode\n!imgurtoggle\n!avatartoggle\n!notificationtoggle <b style=\"color:#ffff00;\"></b>\n!popuptoggle\n!timestamptoggle\n\n!coin\n!advice\n!8ball <b style=\"color:#ffff00;\">question</b>\n!roll <b style=\"color:#ffff00;\">#</b>\n!chuck\n!dad\n\n!vote <b style=\"color:#ffff00;\">user | nick</b>\n\n!clr\n!settings\n!share\n\n<b style=\"color:#ee3636;\">Game Commands:</b>\n!gamehost\n!gameview\n!fish");
        },
        help: function() {
            this.CMD();
        },
        mentionadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.MentionList.push(arguments[0].toUpperCase());
                    Save("MentionList", JSON.stringify(CMD.MentionList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        mentionremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.MentionList[arguments[0]] !== undefined) {
                    CMD.MentionList.splice(arguments[0], 1);
                    Save("MentionList", JSON.stringify(CMD.MentionList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        mentionlistclear: function() {
            CMD.MentionList = [];
            Save("MentionList", JSON.stringify(CMD.MentionList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        mentionlist: function() {
            Alert(GetActiveChat(), SettingsList.MentionList());
        },
        ignoreadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.IgnoreList.push(arguments[0].toUpperCase());
                    Cameras();
                    Save("IgnoreList", JSON.stringify(CMD.IgnoreList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        ignoreremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.IgnoreList[arguments[0]] !== undefined) {
                    CMD.IgnoreList.splice(arguments[0], 1);
                    Save("IgnoreList", JSON.stringify(CMD.IgnoreList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        ignorelistclear: function() {
            CMD.IgnoreList = [];
            Save("IgnoreList", JSON.stringify(CMD.IgnoreList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        ignorelist: function() {
            Alert(GetActiveChat(), SettingsList.IgnoreList());
        },
        banadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.BanList.push(arguments[0].toUpperCase());
                    Save("BanList", JSON.stringify(CMD.BanList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    var check = UsernameToHandle(arguments[0].toUpperCase());
                    if (check != -1 && CMD.Me.mod) Send("ban", check);
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        banremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.BanList[arguments[0]] !== undefined) {
                    CMD.BanList.splice(arguments[0], 1);
                    Save("BanList", JSON.stringify(CMD.BanList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        banlistclear: function() {
            CMD.BanList = [];
            Save("BanList", JSON.stringify(CMD.BanList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        banlist: function() {
            Alert(GetActiveChat(), SettingsList.BanList());
        },
        kickadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.KickList.push(arguments[0].toUpperCase());
                    Save("KickList", JSON.stringify(CMD.KickList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    var check = UsernameToHandle(arguments[0].toUpperCase());
                    if (check != -1 && CMD.Me.mod) Send("kick", check);
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        kickremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.KickList[arguments[0]] !== undefined) {
                    CMD.KickList.splice(arguments[0], 1);
                    Save("KickList", JSON.stringify(CMD.KickList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        kicklistclear: function() {
            CMD.KickList = [];
            Save("KickList", JSON.stringify(CMD.KickList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        kicklist: function() {
            Alert(GetActiveChat(), SettingsList.KickList());
        },
        bankeywordadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                CMD.BanKeywordList.push(arguments[0]);
                Save("BanKeywordList", JSON.stringify(CMD.BanKeywordList));
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
            }
        },
        bankeywordremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.BanKeywordList[arguments[0]] !== undefined) {
                    CMD.BanKeywordList.splice(arguments[0], 1);
                    Save("BanKeywordList", JSON.stringify(CMD.BanKeywordList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        bankeywordlistclear: function() {
            CMD.BanKeywordList = [];
            Save("BanKeywordList", JSON.stringify(CMD.BanKeywordList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        bankeywordlist: function() {
            Alert(GetActiveChat(), SettingsList.BanKeywordList());
        },
        kickkeywordadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                CMD.KickKeywordList.push(arguments[0]);
                Save("KickKeywordList", JSON.stringify(CMD.KickKeywordList));
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
            }
        },
        kickkeywordremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.KickKeywordList[arguments[0]] !== undefined) {
                    CMD.KickKeywordList.splice(arguments[0], 1);
                    Save("KickKeywordList", JSON.stringify(CMD.KickKeywordList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        kickkeywordlistclear: function() {
            CMD.KickKeywordList = [];
            Save("KickKeywordList", JSON.stringify(CMD.KickKeywordList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        kickkeywordlist: function() {
            Alert(GetActiveChat(), SettingsList.KickKeywordList());
        },
        greetadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserName(arguments[0])) {
                    CMD.GreetList.push(arguments[0].toUpperCase());
                    Save("GreetList", JSON.stringify(CMD.GreetList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        greetremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.GreetList[arguments[0]] !== undefined) {
                    CMD.GreetList.splice(arguments[0], 1);
                    Save("GreetList", JSON.stringify(CMD.GreetList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        greetlistclear: function() {
            CMD.GreetList = [];
            Save("GreetList", JSON.stringify(CMD.GreetList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        greetlist: function() {
            Alert(GetActiveChat(), SettingsList.GreetList());
        },
        highlightadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.HighlightList.push(arguments[0].toUpperCase());
                    Save("HighlightList", JSON.stringify(CMD.HighlightList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        highlightremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.HighlightList[arguments[0]] !== undefined) {
                    CMD.HighlightList.splice(arguments[0], 1);
                    Save("HighlightList", JSON.stringify(CMD.HighlightList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        highlightlistclear: function() {
            CMD.HighlightList = [];
            Save("HighlightList", JSON.stringify(CMD.HighlightList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        highlightlist: function() {
            Alert(GetActiveChat(), SettingsList.HighlightList());
        },
        opadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserName(arguments[0])) {
                    CMD.BotOPList.push(arguments[0].toUpperCase());
                    Save("BotOPList", JSON.stringify(CMD.BotOPList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        opremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.BotOPList[arguments[0]] !== undefined) {
                    CMD.BotOPList.splice(arguments[0], 1);
                    Save("BotOPList", JSON.stringify(CMD.BotOPList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        oplistclear: function() {
            CMD.BotOPList = [];
            Save("BotOPList", JSON.stringify(CMD.BotOPList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        oplist: function() {
            Alert(GetActiveChat(), SettingsList.BotOPList());
        },
        modadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    CMD.BotModList.push(arguments[0].toUpperCase());
                    Save("BotModList", JSON.stringify(CMD.BotModList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        modremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.BotModList[arguments[0]] !== undefined) {
                    CMD.BotModList.splice(arguments[0], 1);
                    Save("BotModList", JSON.stringify(CMD.BotModList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        modlistclear: function() {
            CMD.BotModList = [];
            Save("BotModList", JSON.stringify(CMD.BotModList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        modlist: function() {
            Alert(GetActiveChat(), SettingsList.BotModList());
        },
        ttsadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (arguments[0].match(/^(-all|-event|[a-z0-9_]){1,32}$/i)) {
                    CMD.TTSList.push(arguments[0].toUpperCase());
                    Save("TTSList", JSON.stringify(CMD.TTSList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        ttsremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.TTSList[arguments[0]] !== undefined) {
                    CMD.TTSList.splice(arguments[0], 1);
                    Save("TTSList", JSON.stringify(CMD.TTSList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        ttslistclear: function() {
            CMD.TTSList = [];
            Save("TTSList", JSON.stringify(CMD.TTSList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        ttslist: function() {
            Alert(GetActiveChat(), SettingsList.TTSList());
        },
        reminderadd: function() {
            if (arguments[0] === "") {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                var reminder = arguments[0].match(/^((?:1[0-2]|0?[1-9]):(?:[0-5][0-9])\s?(?:[AaPp][Mm]))\s(.*)/);
                if (reminder === null) {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\n!reminderadd 4:18 PM This is an example you can try❛❗❜");
                } else {
                    CMD.ReminderList.push([reminder[1], reminder[2]]);
                    Save("ReminderList", JSON.stringify(CMD.ReminderList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    Reminder();
                }
            }
        },
        reminderremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.ReminderList[arguments[0]] !== undefined) {
                    CMD.ReminderList.splice(arguments[0], 1);
                    Save("ReminderList", JSON.stringify(CMD.ReminderList));
                    Reminder();
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        reminderlistclear: function() {
            CMD.ReminderList = [];
            Save("ReminderList", JSON.stringify(CMD.ReminderList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        reminderlist: function() {
            Alert(GetActiveChat(), SettingsList.ReminderList());
        },
        remindertoggle: function() {
            CMD.Reminder = !CMD.Reminder;
            Save("Reminder", JSON.stringify(CMD.Reminder));
            Reminder();
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.Reminder) ? "Reminders are now on❛❗❜\n" : "Reminders are now off❛❗❜\n "));
        },
        timestamptoggle: function() {
            CMD.TimeStampToggle = !CMD.TimeStampToggle;
            Save("TimeStampToggle", JSON.stringify(CMD.TimeStampToggle));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.TimeStampToggle) ? "Timestamps are now on❛❗❜\n" : "Timestamps are now off\n "));
        },
        safeadd: function() {
            if (arguments[0] === "" || arguments[0].toUpperCase() === "GUEST") { // Can't protect guests;
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    if (!CMD.SafeList.includes(arguments[0].toUpperCase())) {
                        CMD.SafeList.push(arguments[0].toUpperCase());
                        Save("AKB", JSON.stringify(CMD.SafeList));
                        Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    } else {
                        Alert(GetActiveChat(), "❛✖❜Name already exists❛❗❜");
                    }
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        saferemove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.SafeList[arguments[0]] !== undefined) {
                    CMD.SafeList.splice(arguments[0], 1);
                    Save("AKB", JSON.stringify(CMD.SafeList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        safelistclear: function() {
            CMD.SafeList = [];
            Save("AKB", JSON.stringify(CMD.SafeList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        safelist: function() {
            Alert(GetActiveChat(), SettingsList.SafeList());
        },
        greenroomadd: function() {
            if (arguments[0] === "" || arguments[0].toUpperCase() === "GUEST") { // Can't protect guests;
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    if (!CMD.GreenRoomList.includes(arguments[0].toUpperCase())) {
                        CMD.GreenRoomList.push(arguments[0].toUpperCase());
                        Save("GreenRoomList", JSON.stringify(CMD.GreenRoomList));
                        Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    } else {
                        Alert(GetActiveChat(), "❛✖❜Name already exists❛❗❜");
                    }
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        greenroomremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.GreenRoomList[arguments[0]] !== undefined) {
                    CMD.GreenRoomList.splice(arguments[0], 1);
                    Save("GreenRoomList", JSON.stringify(CMD.GreenRoomList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        greenroomlistclear: function() {
            CMD.GreenRoomList = [];
            Save("GreenRoomList", JSON.stringify(CMD.GreenRoomList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        greenroomlist: function() {
            Alert(GetActiveChat(), SettingsList.GreenRoomList());
        },
        greenroomignoreadd: function() {
            if (arguments[0] === "" || arguments[0].toUpperCase() === "GUEST") { // Can't protect guests;
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CheckUserNameStrict(arguments[0])) {
                    if (!CMD.GreenRoomIgnoreList.includes(arguments[0].toUpperCase())) {
                        CMD.GreenRoomIgnoreList.push(arguments[0].toUpperCase());
                        Save("GreenRoomIgnoreList", JSON.stringify(CMD.GreenRoomIgnoreList));
                        Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                    } else {
                        Alert(GetActiveChat(), "❛✖❜Name already exists❛❗❜");
                    }
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nArgument passed didn't match criteria❛❗❜");
                }
            }
        },
        greenroomignoreremove: function() {
            if (arguments[0] === "" || isNaN(arguments[0])) {
                Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nParameter was missing/incorrect\nUse <b>!CMD</b> for help.");
            } else {
                if (CMD.GreenRoomIgnoreList[arguments[0]] !== undefined) {
                    CMD.GreenRoomIgnoreList.splice(arguments[0], 1);
                    Save("GreenRoomIgnoreList", JSON.stringify(CMD.GreenRoomIgnoreList));
                    Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
                } else {
                    Alert(GetActiveChat(), "❛✖❜Command Rejected❛❗❜\nID was not found❛❗❜");
                }
            }
        },
        greenroomignorelistclear: function() {
            CMD.GreenRoomIgnoreList = [];
            Save("GreenRoomIgnoreList", JSON.stringify(CMD.GreenRoomIgnoreList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜");
        },
        greenroomignorelist: function() {
            Alert(GetActiveChat(), SettingsList.GreenRoomIgnoreList());
        },
        optoggle: function() {
            CMD.UserYT = !CMD.UserYT;
            Save("UserYT", JSON.stringify(CMD.UserYT));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.UserYT) ? "Operators can now use YouTube.\n" : "Operators cannot use YouTube.\n"));
        },
        avatartoggle: function() {
            CMD.Avatar = !CMD.Avatar;
            Save("Avatar", JSON.stringify(CMD.Avatar));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.Avatar) ? "Avatars from now on will be visible❛❗❜\n " : "Avatars from now on will hidden❛❗❜\n"));
        },
        popuptoggle: function() {
            CMD.Popups = !CMD.Popups;
            Save("Popups", JSON.stringify(CMD.Popups));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.Popups) ? "Popups from now on will be visible❛❗❜\n " : "Popups from now on will hidden❛❗❜\n"));
        },
        notificationtoggle: function() {
            CMD.NotificationToggle++;
            if (CMD.NotificationToggle >= 3) CMD.NotificationToggle = 0;
            Save("NotificationToggle", JSON.stringify(CMD.NotificationToggle));
            NotificationDisplay();
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\nNotifications " + ((CMD.NotificationToggle==0) ? "above chat enabled" : (CMD.NotificationToggle==1)?"in chat enabled":"disabled")+".");
        },
        greetmode: function() {
            CMD.GreetMode = !CMD.GreetMode;
            Save("GreetMode", JSON.stringify(CMD.GreetMode));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.GreetMode) ? "Server like greet is enabled." : "Server like greet is disabled."));
        },
        imgurtoggle: function() {
            CMD.imgur = !CMD.imgur;
            Save("imgur", JSON.stringify(CMD.imgur));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.imgur) ? "Imgur preview is enabled." : "Imgur preview is disabled."));
        },
        publiccommandtoggle: function() {
            CMD.PublicCommandToggle = !CMD.PublicCommandToggle;
            Save("PublicCommandToggle", JSON.stringify(CMD.PublicCommandToggle));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.PublicCommandToggle) ? "Public commands (8Ball,  Advice, Chuck, Coin, Dad, Urb) are enabled." : "Public commands (8Ball,  Advice, Chuck, Coin, Dad, Urb) are disabled."));
        },
        greenroomtoggle: function() {
            CMD.GreenRoomToggle = !CMD.GreenRoomToggle;
            Save("GreenRoomToggle", JSON.stringify(CMD.GreenRoomToggle));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.GreenRoomToggle) ? "Green Room Auto Allow ON❛❗❜" : "Green Room Auto Allow OFF❛❗❜"));
        },
        clr: function() {
            CMD.MessageCallback = [];
            CMD.Message = [];
            CMD.Message[0] = [];
            ChatBot.TinychatApp.getInstance().defaultChatroom._chatlog.items = [];
            ChatLogElement.querySelector("#CMD-chat-content").innerHTML = "";
        },
        autokick: function() {
            if (arguments[1] === false && CMD.Me.mod) {
                CMD.AutoKick = !CMD.AutoKick;
                CMD.AutoBan = false;
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.AutoKick) ? "AUTO KICK IS NOW ON❛❗❜" : "AUTO KICK IS NOW OFF❛❗❜"));
                if (CMD.AutoKick === true) CheckUserListSafe("kick");
            }
        },
        autoban: function() {
            if (arguments[1] === false && CMD.Me.mod) {
                CMD.AutoBan = !CMD.AutoBan;
                CMD.AutoKick = false;
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.AutoBan) ? "AUTO BAN IS NOW ON❛❗❜" : "AUTO BAN IS NOW OFF❛❗❜"));
                if (CMD.AutoBan === true) CheckUserListSafe("ban");
            }
        },
        camsweep: function() {
            if (CMD.Me.mod && CMD.Host === CMD.Me.handle) {
                CMD.Camera.SweepTimer = arguments[0] === "" || isNaN(arguments[0]) ? 5 : (arguments[0] > 30) ? 30 : (arguments[0] < 1) ? 1 : parseInt(arguments[0]);
                CMD.Camera.Sweep = !CMD.Camera.Sweep;
                clearTimeout(CMD.Camera.clearRandom);
                Settings();
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.Camera.Sweep) ? "Camera sweep is now on❛❗❜\nTime set: " + CMD.Camera.SweepTimer + "min(s)" : "Camera sweep is now off❛❗❜"));
            }
        },
        bottoggle: function() {
            CMD.Bot = !CMD.Bot;
            Save("Bot", JSON.stringify(CMD.Bot));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.Bot) ? "You'll now ask !bot bypass on load." : "You'll not !bot bypass on load."));
        },
        votetoggle: function() {
            if (CMD.Me.mod) {
                CMD.VoteSystem = !CMD.VoteSystem;
                CMD.WaitToVoteList = [];
                var len = CMD.UserList.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) CMD.UserList[i].vote = 0;
                }
                Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.VoteSystem) ? "VOTING IS NOW ON❛❗❜" : "VOTING IS NOW OFF❛❗❜"));
            }
        },
        bot: function() {
            if (arguments[1] === false && CMD.Me.mod) Alert(0, "❛✔❜Command Accepted❛❗❜\nBot bypass was called❛❗❜");
        },
        share: function() {
            var msg = "ChatBot ->\nInstall...\n1. (Tamper Monkey Link)\nhttps://www.tampermonkey.net/\n2. (Create New Script)\nhttps://greasyfork.org/en/scripts/404440-chatbot\n3. (Commands)\nhttps://pastebin.com/X2StDFh4";
            if (GetActiveChat() !== 0) {
                PushPM(GetActiveChat(), msg);
                Send("pvtmsg", msg, GetActiveChat());
            } else {
                Send("msg", msg);
            }
        },
        gameview: function() {
            CMD.CanSeeGames = !CMD.CanSeeGames;
            Save("CanSeeGames", JSON.stringify(CMD.CanSeeGames));
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.CanSeeGames) ? "GAME VIEW IS NOW ON❛❗❜" : "GAME VIEW IS NOW OFF❛❗❜"));
        },
        gamehost: function() {
            CMD.CanHostGames = !CMD.CanHostGames;
            Save("CanHostGames", JSON.stringify(CMD.CanHostGames));
            Fish.reset(true, true);
            Settings();
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\n" + ((CMD.CanHostGames) ? "GAME HOSTING IS NOW ON❛❗❜" : "GAME HOSTING IS NOW OFF❛❗❜"));
        },
        version: function() {
            var msg = "ChatBot "+ChatBot.version+"v ->\nhttps://greasyfork.org/en/scripts/404440-chatbot";
            if (GetActiveChat() !== 0) {
                PushPM(GetActiveChat(), msg);
                Send("pvtmsg", msg, GetActiveChat());
            } else {
                Send("msg", msg);
            }
        },
        roll: function() {
            var dice,
                msg = "";
            dice = (arguments[0] === "" || isNaN(arguments[0])) ? 1 : (arguments[0] < 12) ? arguments[0] : 12;
            for (var i = 0; i < dice; i++) msg += Dice();
            if (GetActiveChat() !== 0) {
                Send("pvtmsg", msg, GetActiveChat());
                PushPM(GetActiveChat(), msg);
            } else {
                Send("msg", msg);
            }
        },
        coin: function() {
            if (CMD.Host == 0 || GetActiveChat() !== 0) {
                var msg = "The coin landed on " + ((Rand(0, 1) == 1) ? "heads" : "tails") + "❛❗❜";
                if (GetActiveChat() !== 0) {
                    Send("pvtmsg", msg, GetActiveChat());
                } else {
                    Send("msg", msg);
                }
            }
        },
        settings: function() {
            Settings();
        },
        lists: function() {
            Alert(GetActiveChat(), SettingsList.BanList() + SettingsList.BanKeywordList() + SettingsList.KickList() + SettingsList.KickKeywordList() + SettingsList.BotOPList() + SettingsList.BotModList() + SettingsList.MentionList() + SettingsList.IgnoreList() + SettingsList.GreetList() + SettingsList.TTSList() + SettingsList.HighlightList() + SettingsList.ReminderList());
        },
        listsclear: function() {
            CMD.MentionList = [];
            CMD.IgnoreList = [];
            CMD.BanList = [];
            CMD.KickList = [];
            CMD.BanKeywordList = [];
            CMD.KickKeywordList = [];
            CMD.GreetList = [];
            CMD.HighlightList = [];
            CMD.ReminderList = [];
            CMD.TTSList = [];
            CMD.BotOPList = [];
            CMD.BotModList = [];
            Save("MentionList", JSON.stringify(CMD.MentionList));
            Save("IgnoreList", JSON.stringify(CMD.IgnoreList));
            Save("BanList", JSON.stringify(CMD.BanList));
            Save("KickList", JSON.stringify(CMD.KickList));
            Save("BanKeywordList", JSON.stringify(CMD.BanKeywordList));
            Save("KickKeywordList", JSON.stringify(CMD.KickKeywordList));
            Save("GreetList", JSON.stringify(CMD.GreetList));
            Save("HighlightList", JSON.stringify(CMD.HighlightList));
            Save("ReminderList", JSON.stringify(CMD.ReminderList));
            Save("TTSList", JSON.stringify(CMD.TTSList));
            Save("BotModList", JSON.stringify(CMD.BotModList));
            Save("BotOPList", JSON.stringify(CMD.BotOPList));
            Alert(GetActiveChat(), "❛✔❜Command Accepted❛❗❜\nItems Mentionlist, igore");
        },
        ytqueue: function() {},
        ytclear: function() {},
        ytskip: function() {},
        yt: function() {},
        ytbypass: function() {}
    };
    var SettingsList = {
        BanList: function() {
            var index,
                msg,
                len = CMD.BanList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Ban list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.BanList[index] + "\n";
            return msg;
        },
        BanKeywordList: function() {
            var index,
                msg,
                len = CMD.BanKeywordList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Ban Keyword list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + HTMLtoTXT(CMD.BanKeywordList[index]) + "\n";
            return msg;
        },
        KickList: function() {
            var index,
                msg,
                len = CMD.KickList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Kick list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.KickList[index] + "\n";
            return msg;
        },
        KickKeywordList: function() {
            var index,
                msg,
                len = CMD.KickKeywordList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Kick Keyword list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + HTMLtoTXT(CMD.KickKeywordList[index]) + "\n";
            return msg;
        },
        BotOPList: function() {
            var index,
                msg,
                len = CMD.BotOPList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Bot OP list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.BotOPList[index] + "\n";
            return msg;
        },
        BotModList: function() {
            var index,
                msg,
                len = CMD.BotModList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Bot Mod list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.BotModList[index] + "\n";
            return msg;
        },
        MentionList: function() {
            var index,
                msg,
                len = CMD.MentionList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Mention list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + HTMLtoTXT(CMD.MentionList[index]) + "\n";
            return msg;
        },
        IgnoreList: function() {
            var index,
                msg,
                len = CMD.IgnoreList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Ignore list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.IgnoreList[index] + "\n";
            return msg;
        },
        GreetList: function() {
            var index,
                msg,
                len = CMD.GreetList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Greet list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.GreetList[index] + "\n";
            return msg;
        },
        TTSList: function() {
            var index,
                msg,
                len = CMD.TTSList.length;
            msg = "<b style=\"color:#ee3636;\"><u>TTS list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.TTSList[index] + "\n";
            return msg;
        },
        HighlightList: function() {
            var index,
                msg,
                len = CMD.HighlightList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Highlight list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + " : " + CMD.HighlightList[index] + "\n";
            return msg;
        },
        ReminderList: function() {
            var index,
                msg,
                len = CMD.ReminderList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Reminder list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + ": [" + CMD.ReminderList[index][0] + "] " + HTMLtoTXT(CMD.ReminderList[index][1]) + "\n";
            return msg;
        },
        SafeList: function() {
            var index,
                msg,
                len = CMD.SafeList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Safe list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + ": " + CMD.SafeList[index] + "\n";
            return msg;
        },
        GreenRoomList: function() {
            var index,
                msg,
                len = CMD.GreenRoomList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Green Room list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + ": " + CMD.GreenRoomList[index] + "\n";
            return msg;
        },
        GreenRoomIgnoreList: function() {
            var index,
                msg,
                len = CMD.GreenRoomIgnoreList.length;
            msg = "<b style=\"color:#ee3636;\"><u>Green Room Ignore list:</u></b>\n" + ((!len) ? "empty\n" : "");
            for (index = 0; index < len; index++) msg += index + ": " + CMD.GreenRoomIgnoreList[index] + "\n";
            return msg;
        }
    };
    var MessageQueueList = {
        add: function() {
            CMD.SendQueue.push(arguments[0]);
            MessageQueueList.run();
        },
        run: function() {
            if (CMD.SendQueue !== undefined && CMD.SendQueue.length > 0) {
                setTimeout(function() {
                    var temp = new Date();
                    var OffsetTime = temp - CMD.LastMessage;
                    if (OffsetTime >= 1500) {
                        CMD.LastMessage = new Date();
                        CMD.SocketTarget.send(CMD.SendQueue[0]);
                        CMD.SendQueue.shift();
                    }
                    MessageQueueList.run();
                }, 1600, CMD.LastMessage);
            }
        }
    };
    var ServerSendList = {
        msg: function() {
            var obj = {
                "tc": arguments[0]
            };
            if (arguments[2] !== undefined) {
                obj.handle = arguments[1];
                CMD.SocketTarget.send(JSON.stringify(obj));
            } else {
                if (arguments[1] !== undefined) {
                    obj.text = arguments[1];
                    MessageQueueList.add(JSON.stringify(obj));
                } else {
                    CMD.SocketTarget.send(JSON.stringify(obj));
                }
            }
        },
        pvtmsg: function() {
            var obj = {
                "tc": arguments[0],
                "text": arguments[1],
                "handle": Number(arguments[2])
            };
            MessageQueueList.add(JSON.stringify(obj));
        },
        kick: function() {
            CheckSafeList(arguments[1], true);
            ServerSendList.msg(arguments[0], arguments[1], "kick");
        },
        ban: function() {
            CheckSafeList(arguments[1], true);
            ServerSendList.msg(arguments[0], arguments[1], "ban");
        },
        nick: function() {
            var obj = {
                "tc": "nick",
                "nick": arguments[1]
            };
            CMD.SocketTarget.send(JSON.stringify(obj));
        },
        stream_moder_close: function() {
            CheckSafeList(arguments[1], true);
            ServerSendList.msg(arguments[0], arguments[1], "stream_moder_close");
        },
        stream_moder_allow: function() {
            ServerSendList.msg(arguments[0], arguments[1], "stream_moder_allow");
        },
        yut_playlist_add: function() {
            var obj = {
                "tc": arguments[0],
                "item": {
                    "id": arguments[1][0],
                    "duration": arguments[1][1] + 10,
                    "title": arguments[1][2],
                    "image": arguments[1][3]
                }
            };
            if (arguments[1][4] !== undefined) obj.item.offset = arguments[1][4];
            CMD.SocketTarget.send(JSON.stringify(obj));
        },
        yut_playlist_remove: function() {
            ServerSendList.yut_playlist_add(arguments[0], arguments[1]);
        },
        yut_stop: function() {
            ServerSendList.yut_playlist_add(arguments[0], arguments[1]);
        },
        yut_play: function() {
            ServerSendList.yut_playlist_add(arguments[0], arguments[1]);
        },
        yut_playlist: function() {
            ServerSendList.msg("yut_playlist");
        },
        yut_playlist_clear: function() {
            ServerSendList.msg("yut_playlist_clear");
        }
    };
    var ServerInList = {
        joined: function() {
            Reset();
            CMD.Me = {
                "handle": arguments[0].self.handle,
                "username": (arguments[0].self.username === "") ? "GUEST" : arguments[0].self.username.toUpperCase(),
                "nick": arguments[0].self.nick,
                "owner": arguments[0].self.owner,
                "mod": arguments[0].self.mod,
                "namecolor": ChatBot.CMDNameColor[Rand(0, ChatBot.CMDNameColor.length - 1)],
                "avatar": arguments[0].self.avatar
            };
            if (CMD.Me.nick.match(/^guest(?:\-[0-9]{1,10})?/i) && CMD.Me.username !== "GUEST") Send("nick", CMD.Me.username); //AUTO CORRECT NAME
            if (CMD.Me.mod && CMD.Bot && CMD.ScriptInit && CMD.SocketConnected) CheckHost();
            CMD.Room = {
                "Avatar": arguments[0].room.avatar,
                "Bio": arguments[0].room.biography,
                "Name": arguments[0].room.name,
                "PTT": arguments[0].room.pushtotalk,
                "Website": arguments[0].room.website,
                "YT_ON": arguments[0].room.youtube_enabled,
                "Recent_Gifts": arguments[0].room.recent_gifts
            };
            CMD.SocketConnected = true;
        },
        userlist: function() {
            var len = arguments[0].users.length;
            for (var user = 0; user < len; user++) {
                AKBS(arguments[0].users[user]);
                var username = (arguments[0].users[user].username === "") ? "GUEST" : arguments[0].users[user].username.toUpperCase();
                CheckUserAbuse(arguments[0].users[user].handle, username, arguments[0].users[user].nick.toUpperCase());
                CMD.UserList.push({
                    "handle": arguments[0].users[user].handle,
                    "username": username,
                    "nick": arguments[0].users[user].nick,
                    "owner": arguments[0].users[user].owner,
                    "mod": arguments[0].users[user].mod,
                    "namecolor": ChatBot.CMDNameColor[Rand(0, ChatBot.CMDNameColor.length - 1)],
                    "avatar": (arguments[0].users[user].avatar === "") ? "https://avatars.tinychat.com/standart/small/eyePink.png" : arguments[0].users[user].avatar,
                    "canGame": (arguments[0].users[user].username !== "GUEST") ? true : false,
                    "broadcasting": false,
                    "vote": 0
                });
            }
            RoomUsers();
            debug();
        },
        join: function() {
            AKBS(arguments[0]);
            var user = (arguments[0].username === "") ? "GUEST" : arguments[0].username.toUpperCase();
            CheckUserAbuse(arguments[0].handle, user, arguments[0].nick.toUpperCase());
            if (CMD.HighlightList.includes(user) || CMD.HighlightList.includes(arguments[0].nick.toUpperCase())) {
                if (CMD.enableSound === true) ChatBot.CMDSound.HIGHLIGHT.play();
            }
            if ((CMD.GreetList.includes(user) || CMD.GreetList.includes(arguments[0].nick.toUpperCase()) || (CMD.Host == CMD.Me.handle && CMD.GreetList.includes("-ALL"))) && CMD.NoGreet === false) {
                /*
                var msg;
                if(ChatBot.greetmsg && user != "GUEST") {
                    msg = ChatBot.greetmsg.replace('%r', room);
                    msg = msg.replace('%n', nick);
                    msg = msg + ' ' + nick + "❛❗❜";
                }
                else msg = UnicodeConversionList.convert(((ChatBot.CMDWelcomes[Rand(0, ChatBot.CMDWelcomes.length - 1)] + arguments[0].nick.toUpperCase()) + ((CMD.GreetMode) ? ".\n" + (((user != "GUEST") ? "You are signed in as " + user : "You are not signed in") + ".\nWelcome to the room❛❗❜") : "❛❗❜")));
                Send("msg", msg);
                */
                Send("msg", UnicodeConversionList.convert(((ChatBot.CMDWelcomes[Rand(0, ChatBot.CMDWelcomes.length - 1)] + arguments[0].nick.toUpperCase()) + ((CMD.GreetMode) ? ".\n" + (((user != "GUEST") ? "You are signed in as " + user : "You are not signed in") + ".\nWelcome to the room❛❗❜") : "❛❗❜"))));
                if (CMD.enableSound === true) ChatBot.CMDSound.GREET.play();
            }
            CMD.NoGreet = false;
            AddUser(arguments[0].handle, arguments[0].mod, ChatBot.CMDNameColor[Rand(0, ChatBot.CMDNameColor.length - 1)], (arguments[0].avatar === "") ? "https://avatars.tinychat.com/standart/small/eyePink.png" : arguments[0].avatar, arguments[0].nick, user, ((user !== "GUEST") ? true : false), arguments[0].owner);
            RoomUsers();
            debug();
        },
        sysmsg: function() {
            if (CMD.Me.mod) {
                var action = arguments[0].text.match(/^([a-z0-9_]{1,32}):?\s(closed|banned|kicked)\s([a-z0-9_]{1,32})$/i);
                if (action !== null) {
                    var user;
                    if (action[2] == "closed" || action[2] == "banned" || action[2] == "kicked") {
                        user = NicknameToAccount(action[3].toUpperCase());
                        if (user != -1) {
                            var a = CMD.GreenRoomList.indexOf(CMD.UserList[user].username);
                            if (a !== -1) {
                                debug("GREENROOMLIST::", "REMOVE USER " + CMD.UserList[user].username + " FROM GREENROOMLIST");
                                Alert(GetActiveChat(), "❛✔❜Removing "+CMD.UserList[user].username+" from greenroomlist❛❗❜");
                                CommandList.greenroomremove(a);
                            }
                        }
                    }
                }
            }
            AddSystemNotification(HTMLtoTXT(arguments[0].text));
            debug();
        },
        nick: function() {
            var user = User(arguments[0].handle);
            if (user != -1) {
                AddUserNotification(4, CMD.UserList[user].namecolor, CMD.UserList[user].nick, CMD.UserList[user].username, true, arguments[0].nick);
                if ((CMD.GreetList.includes(CMD.UserList[user].username) || CMD.GreetList.includes(CMD.UserList[user].nick.toUpperCase()) || (CMD.Host == CMD.Me.handle && CMD.GreetList.includes("-ALL"))) && CMD.NoGreet === false) {
                    Send("msg", UnicodeConversionList.convert(CMD.UserList[user].nick + "\nwith the account name " + CMD.UserList[user].username + " changed their name to " + arguments[0].nick));
                    if (CMD.enableSound === true) ChatBot.CMDSound.GREET.play();
                }

                CMD.UserList[user].nick = arguments[0].nick;
                if (CMD.Me.handle == arguments[0].handle) CMD.Me.nick = arguments[0].nick;
            }
            debug();
        },
        stream_connected: function() {
            if (CMD.Host === CMD.Me.handle && CMD.GreenRoomToggle && arguments[0].publish == false && CMD.Me.handle !== arguments[0].handle && !CMD.Camera.List.includes(arguments[0].handle)) {
                var user = User(arguments[0].handle);
                if (user != -1) {
                    debug("CAMERA::WAITING", "nickname:" + CMD.UserList[user].nick);
                    if (!CMD.GreenRoomIgnoreList.includes(CMD.UserList[user].username) && CMD.GreenRoomList.includes(CMD.UserList[user].username)) Send("stream_moder_allow", CMD.UserList[user].handle);
                }
            }
            debug();
        },
        stream_closed: function() {
            debug();
        },
        publish: function() {
            CheckUserStream(arguments[0].handle, true);
            debug();
        },
        unpublish: function() {
            CheckUserStream(arguments[0].handle, false);
            debug();
        },
        ping: function() {
            if (CMD.ScriptInit) {
                var verify;
                if (CMD.WatchList.length > 0) {
                    verify = new Date() - CMD.WatchList[0][2];
                    debug("WATCHLIST::LIST", CMD.WatchList);
                    debug("WATCHLIST::VERIFYING", CMD.WatchList[0][0] + " " + verify + "/600000");
                    if (CMD.SafeList.indexOf(CMD.WatchList[0][0]) === -1) {
                        if (verify > 600000) {
                            debug("WATCHLIST::VERIFIED", CMD.WatchList[0][0] + " " + verify + "/600000");
                            CMD.SafeList.push(CMD.WatchList[0][0]);
                            CMD.WatchList.shift();
                        }
                    } else {
                        CMD.WatchList.shift();
                    }
                }
                if (CMD.WaitToVoteList.length > 0) {
                    verify = new Date() - CMD.WaitToVoteList[0][1];
                    debug("VOTE::LIST", CMD.WaitToVoteList);
                    debug("VOTE::WAIT", CMD.WaitToVoteList[0][0] + " " + verify + "/300000");
                    if (verify > 300000) {
                        debug("VOTE::READY", CMD.WaitToVoteList[0][0] + " " + verify + "/300000");
                        CMD.WaitToVoteList.shift();
                    }
                }
            }
            ChatBot.TinychatApp.getInstance().defaultChatroom.packetWorker.queue = {};
            debug();
        },
        quit: function() {
            if (CMD.ScriptInit) {
                if (CMD.WatchList.length > 0) {
                    var len = CMD.WatchList.length;
                    for (var i = 0; i < len; i++) {
                        if (CMD.WatchList[i][1] == arguments[0].handle) {
                            CMD.WatchList.splice(i, 1);
                            break;
                        }
                    }
                }
                if (CMD.Me.mod) RemoveUserCamera(arguments[0].handle);
                var user = User(arguments[0].handle);
                if (user != -1) {
                    if (CMD.Me.handle === CMD.Host) {
                        if (Fish.getPlayer(arguments[0].handle, true, false)) {
                            Send("msg", CMD.Game.Fish.UserQuitLast + ", has slipped off the boat; I don't think we should look back.");
                        }
                    }
                    AddUserNotification(2, CMD.UserList[user].namecolor, CMD.UserList[user].nick, CMD.UserList[user].username, true);
                    CMD.UserList.splice(user, 1);
                }
                RoomUsers();
                if (CMD.Host == arguments[0].handle) {
                    CMD.Host = 0;
                    CMD.Camera.Sweep = false;
                    if (CMD.Me.mod && CMD.Bot) {
                        setTimeout(function(handle) {
                            if (CMD.Host == 0) SetBot(false);
                        }, (Rand(10, 30) * 1000), arguments[0].handle);
                    }
                }
            }
            debug();
        },
        msg: function() {
            if (CMD.ScriptInit) {
                var user = User(arguments[0].handle);
                if (user != -1) {
                    if (!SpamPrevention(arguments[0].text, CMD.UserList[user].mod)) {
                        if (GamePrevention(arguments[0].text, CMD.UserList[user].mod)) {
                            var text = HTMLtoTXT(arguments[0].text);
                            OwnerCommand(user, arguments[0].text);
                            BotCheck(user, text, arguments[0]);
                            if (CMD.Me.mod) {
                                if (CMD.Host == CMD.Me.handle) BotCommandCheck(user, text);
                                CheckUserWordAbuse(user, arguments[0].text);
                            }

                            if (!CheckUserIgnore(user) && !CheckUserTempIgnore(user) && IgnoreText(text)) {
                                CMD.Message[0].push({
                                    "time": Time(),
                                    "namecolor": CMD.UserList[user].namecolor,
                                    "avatar": CMD.UserList[user].avatar,
                                    "username": CMD.UserList[user].username,
                                    "nick": CMD.UserList[user].nick,
                                    "msg": CheckImgur(text),
                                    "mention": false
                                });
                                var msg = CMD.Message[0][CMD.Message[0].length - 1];
                                if (CMD.Me.handle !== arguments[0].handle) {
                                    if (CMD.UserList[user].mod && (text.match(/^!autokick$/i) || text.match(/^!autoban$/i))) {
                                        Alert(GetActiveChat(), "❛✔❜AntiSpam Watch List CLEARED❛❗❜\nAnother user has initiated autokick/autoban.");
                                        CMD.AutoKick = false;
                                        CMD.AutoBan = false;
                                    }
                                    if (CMD.enableSound === true) {
                                        if (CMD.UserList.length <= 14) ChatBot.CMDSound.MSG.play();
                                        if (CMD.TTS.synth !== undefined && (CMD.TTSList.includes(CMD.UserList[user].username) || CMD.TTSList.includes(CMD.UserList[user].nick.toUpperCase()) || CMD.TTSList.includes("-ALL"))) TTS(CMD.UserList[user].nick + ((!text.match(/(?:^\!)|(?:https?|www|\uD83C\uDFB5)/gim)) ? " said, " + text : "is box banging❛❗❜"));
                                    }
                                    var len = CMD.MentionList.length;
                                    for (var i = 0; i < len; i++) {
                                        if (text.toUpperCase().includes(CMD.MentionList[i])) {
                                            if (CMD.enableSound === true) ChatBot.CMDSound.MENTION.play();
                                            msg.mention = true;
                                            AddUserNotification(3, CMD.UserList[user].namecolor, CMD.UserList[user].nick, CMD.UserList[user].username, true);
                                        }
                                    }
                                }
                                if (GetActiveChat() === 0) CreateMessage(msg.time, msg.namecolor, msg.avatar, msg.username, msg.nick, msg.msg, msg.mention, 0);
                                MessagePopUp(user, text, true, false);
                            }
                        }
                    } else {
                        if (CMD.Me.mod) Send("kick", arguments[0].handle);
                    }
                }
            }
            debug();
        },
        pvtmsg: function() {
            if (CMD.ScriptInit) {
                if (CMD.enablePMs === true) {
                    if (arguments[0].handle != CMD.Me.handle) {
                        var user = User(arguments[0].handle);
                        if (user != -1) {
                            if (!SpamPrevention(arguments[0].text, CMD.UserList[user].mod)) {
                                if (GamePrevention(arguments[0].text, CMD.UserList[user].mod)) {
                                    var text = arguments[0].text;
                                    if (CMD.Me.mod) CheckUserWordAbuse(user, arguments[0].text);
                                    if (!CheckUserIgnore(user) && !CheckUserTempIgnore(user) && IgnoreText(text)) {
                                        if (!CMD.Message[arguments[0].handle]) CMD.Message[arguments[0].handle] = [];
                                        PushPM(arguments[0].handle, text, user);
                                        if (CMD.enableSound === true) {
                                            ChatBot.CMDSound.PVTMSG.play();
                                            if (CMD.TTS.synth !== undefined && (CMD.TTSList.includes(CMD.UserList[user].username) || CMD.TTSList.includes(CMD.UserList[user].nick.toUpperCase()) || CMD.TTSList.includes("-ALL"))) TTS(CMD.UserList[user].nick + ((!text.match(/(?:^\!)|(?:https?|www)/gim)) ? " said, " + text : "is box banging❛❗❜"));
                                        }
                                        MessagePopUp(user, CheckImgur(HTMLtoTXT(text)), false, false);
                                    }
                                }
                            } else {
                                if (CMD.Me.mod) Send("kick", arguments[0].handle);
                            }
                        }
                    }
                }
            }
            debug();
        },
        gift: function(parse) {
            ChatBot.DebugClear = false;
            Alert(GetActiveChat(), "USER HAS SENT A GIFT--CHECK PACKET OUT!!❛❗❜\n");
            console.log(parse);
            debug();
        },
        yut_playlist_add: function() {
            if (CMD.ScriptInit) {
                if (!CMD.YouTube.Playing) {
                    if (CMD.PlayListStart === true) CMD.PlayListStart = false;
                    if (CMD.Host != CMD.Me.handle) {
                        Send("msg", "!play");
                    } else {
                        YouTubePlayList();
                    }
                }
            }
            debug();
        },
        yut_playlist: function() {
            if (CMD.ScriptInit) {
                if (CMD.Me.mod && CMD.Me.handle == CMD.Host) {
                    if (CMD.YouTube.Clear === true) {
                        if (arguments[0].items !== null) Send("yut_playlist_clear");
                        CMD.YouTube.MessageQueueList = [];
                        Send("msg", "❛🎵❜YouTube cleared❛❗❜");
                        CMD.YouTube.Clear = false;
                    } else {
                        if (arguments[0].items === null) {
                            CMD.PlayListStart = true;
                        } else {
                            CMD.YouTube.PlayListCount = arguments[0].items.length;
                            CMD.PlayListStart = false;
                            if (CMD.YouTube.ShowQueue === true) {
                                var msg = "❛🎵❜" + CMD.YouTube.PlayListCount + " track(s) in queue❛❗❜";
                                for (var i = 0; i < 3; i++) {
                                    if (arguments[0].items[i] === undefined) break;
                                    msg = msg + "\n" + (i + 1) + ": " + arguments[0].items[i].title + "\n[" + Math.floor(arguments[0].items[i].duration / 60) + "M" + (arguments[0].items[i].duration % 60) + "S]";
                                }
                                Send("msg", msg);
                            }
                        }
                        if (arguments[0].items !== null && CMD.Host == CMD.Me.handle && CMD.YouTube.Playing === false) CheckYouTube("https://www.youtube.com/watch?v=" + arguments[0].items[0].id, false);
                    }
                    CMD.YouTube.ShowQueue = false;
                }
            }
            debug();
        },
        yut_play: function() {
            if (CMD.ScriptInit) {
                if (CMD.YouTube.CurrentTrack.ID != arguments[0].item.id) {
                    CMD.YouTube.CurrentTrack.ID = arguments[0].item.id;
                    CMD.YouTube.CurrentTrack.duration = arguments[0].item.duration;
                    CMD.YouTube.CurrentTrack.title = arguments[0].item.title;
                    CMD.YouTube.CurrentTrack.thumbnail = arguments[0].item.image;
                    MessagePopUp(-1, CMD.YouTube.CurrentTrack.title + " is now playing❛❗❜", true, true);
                }
                CMD.YouTube.Playing = true;
                YouTubePlayList();
            }
            debug();
        },
        yut_stop: function() {
            if (CMD.ScriptInit) {
                CMD.YouTube.CurrentTrack.ID = undefined;
                CMD.YouTube.CurrentTrack.duration = undefined;
                CMD.YouTube.CurrentTrack.title = undefined;
                CMD.YouTube.CurrentTrack.thumbnail = undefined;
                CMD.YouTube.Playing = false;
                YouTubePlayList();
            }
            debug();
        }
    };
    var ServerOutList = {
        pvtmsg: function() {
            if (CMD.ScriptInit) {
                Command(arguments[0].text, true);
                var text = arguments[0].text;
                if (!CMD.Message[arguments[0].handle]) CMD.Message[arguments[0].handle] = [];
                PushPM(arguments[0].handle, text);
            }
            debug();
        },
        msg: function() {
            if (CMD.ScriptInit) {
                CMD.LastMessage = new Date();
                Command(arguments[0].text, false);
            }
            debug();
        },
        ban: function() {
            CheckSafeList(arguments[0].handle, true);
            debug();
        },
        kick: function() {
            CheckSafeList(arguments[0].handle, true);
            debug();
        },
        stream_moder_close: function() {
            CheckSafeList(arguments[0].handle, true);
            debug();
        }
    };
    var Addon = {
        active: function() {
            if (ChatBot.CMDAddon !== undefined) {
                if (ChatBot.CMDAddon[arguments[0]] !== undefined) {
                    return true;
                }
            }
            return false;
        },
        get: function() {
            return ChatBot.CMDAddon[arguments[0]];
        }
    };
    CMD.YouTube.XHR.onload = function() {
        var response = JSON.parse(CMD.YouTube.XHR.responseText);
        if (response.error) {
            Send("msg", "❛⛔❜" + ((response.error.errors[0].reason) ? response.error.errors[0].reason : "Track could not be added❛❗❜"));
        } else {
            if (response.kind == "youtube#playlistItemListResponse" && response.nextPageToken === undefined && response.items.length === 0) {
                CMD.YouTube.ListBuilt = true;
                Send("msg", "❛🎵❜Found " + CMD.YouTube.MessageQueueList.length + " tracks❛❗❜\nThis may take a few moments to add, requests can be made shortly.");
                CMD.YouTube.DataReady = true;
                CMD.YouTube.Busy = false;
                YouTubeTrackAdd();
            }
            CMD.YouTube.DataReady = false;
            if (response.items[0]) {
                CMD.YouTube.Busy = true;
                if (response.items[0].id) {
                    if (response.kind == "youtube#playlistItemListResponse") {
                        YouTubePlayListItems(response.items);
                    } else {
                        CMD.YouTube.VideoID = response.items[0].id.videoId;
                        CMD.YouTube.XHR.open("GET", "https://www.googleapis.com/youtube/v3/videos?id=" + CMD.YouTube.VideoID + "&type=video&eventType=completed&part=contentDetails,snippet&fields=items/snippet/title,items/snippet/thumbnails/medium,items/contentDetails/duration&eventType=completed&key=" + CMD.YouTube.API_KEY);
                        CMD.YouTube.XHR.send();
                    }
                } else if (response.items[0].contentDetails.duration) {
                    CMD.YouTube.DataReady = true;
                }
                if (CMD.YouTube.DataReady === false) {
                    CMD.YouTube.Busy = false;
                    if (response.kind == "youtube#searchListResponse") CMD.YouTube.XHR.videoid = response.items[0].id.videoId;
                    if (response.kind == "youtube#playlistItemListResponse") {
                        CMD.YouTube.ListBuilt = true;
                        Send("msg", "❛🎵❜Adding " + CMD.YouTube.MessageQueueList.length + " track(s) to queue❛❗❜");
                        CMD.YouTube.Busy = false;
                    }
                } else {
                    CMD.YouTube.VideoID = (CMD.YouTube.XHR.videoid) ? CMD.YouTube.XHR.videoid : CMD.YouTube.MessageQueueList[0].snippet.resourceId.videoId;
                    if (CMD.YouTube.Playing === true) {
                        MessagePopUp(-1, "Added " + ((response.items[0] === undefined) ? response.items.snippet.title : response.items[0].snippet.title), true, true);
                        Send("yut_playlist_add", [CMD.YouTube.VideoID, YouTubeTimeConvert(response.items[0].contentDetails.duration), ((response.items[0] === undefined) ? response.items.snippet.title : response.items[0].snippet.title), (response.items[0] === undefined) ? response.items.snippet.thumbnails.medium.url : response.items[0].snippet.thumbnails.medium.url]);
                        CMD.YouTube.Busy = false;
                    } else {
                        if (response.items[0].snippet.title !== undefined) {
                            Send("yut_play", [CMD.YouTube.VideoID, YouTubeTimeConvert(response.items[0].contentDetails.duration), response.items[0].snippet.title, response.items[0].snippet.thumbnails.medium.url, 0]);
                            Send("yut_playlist_remove", [CMD.YouTube.XHR.videoid, YouTubeTimeConvert(response.items[0].contentDetails.duration), response.items[0].snippet.title, response.items[0].snippet.thumbnails.medium.url]);
                            CMD.YouTube.Playing = true;
                        }
                        CMD.YouTube.Busy = false;
                    }
                }
            }
            if (CMD.YouTube.SearchReturn === true || (CMD.YouTube.SearchReturn === false && CMD.YouTube.VideoReturn === true && CMD.YouTube.XHR.type === true)) {
                var title = "";
                CMD.YouTube.SearchReturn = false;
                CMD.YouTube.VideoReturn = false;
                if (response.items[0] !== undefined) {
                    if (response.items[0].length > 0) title = response.items[0].snippet.title;
                }
                if (response.items !== undefined) {
                    if (response.items.length > 0) title = response.items[0].snippet.title;
                }
                Send("msg", ((title === "") ? "❛⛔❜Track could not be added❛❗❜" : "❛❛🎵❜❜Added " + DecodeTXT(title) + " to queue❛❗❜"));
            }
            if (CMD.YouTube.MessageQueueList.length > 0) YouTubeTrackAdd();
        }
    };
    CMD.Chuck.XHR.onload = function() {
        var resp = JSON.parse(CMD.Chuck.XHR.responseText),
            msg = "[CHUCK NORRIS]\n" + resp.value;
        if (resp !== null) Send("msg", msg.substr(0, 499));
    };
    CMD.Urb.XHR.onload = function() {
        var resp = JSON.parse(CMD.Urb.XHR.responseText),
            msg = "[URBAN DICTIONARY]\n" + ((resp.list[0] !== undefined) ? resp.list[0].word + "\n" + resp.list[0].definition : "Nothing was found❛❗❜");
        if (resp !== null) Send("msg", msg.substr(0, 499));
    };
    CMD.Dad.XHR.onload = function() {
        var resp = JSON.parse(CMD.Dad.XHR.responseText),
            msg = "[DAD JOKE]\n" + resp.joke;
        if (resp !== null) Send("msg", msg.substr(0, 499));
    };
    CMD.Advice.XHR.onload = function() {
        var resp = JSON.parse(CMD.Advice.XHR.responseText),
            msg = "[ADVICE]\n" + resp.slip.advice;
        if (resp !== null) Send("msg", msg.substr(0, 499));
    };
    var Fish = {
        init: function() {
            if (CMD.Me.handle == CMD.Host && CMD.CanHostGames === true) {
                Send("msg", "[FISH]\n!fish at any time and upgrade your way up❛❗❜\n\n!gameview to show/hide game.\n\nRemember there's a five second delay for all commands, don't spam❛❗❜\nFor commands type !fishhelp❛❗❜");
                CMD.Game.Fish.StartTimeout = setTimeout(function(g) {
                    g.cast();
                }, 5000, this);
            }
        },
        addPlayer: function(handle, username, nickname) {
            if (!this.getPlayer(handle, false, false) && CMD.CanHostGames === true) {
                if (isSafeListed(username)) {
                    CMD.Game.Fish.Player.push({
                        Handle: handle,
                        Username: username,
                        Nickname: nickname,
                        LastCheck: new Date() - 5000,
                        Points: 5000,
                        Upgrades: {
                            Net: 1,
                            Store: 1,
                            Radar: 1,
                            Insurance: false
                        },
                    });
                    Send("msg", "[FISHING BOAT]\n" + nickname.substr(0, 16) + "...\n has jumped aboard.\nType !fishhelp for commands if you don't already know❛❗❜");
                    if (this.getPlayer() == 0) this.init();
                }
            }
        },
        getPlayer: function(handle, del, exists) {
            var len = CMD.Game.Fish.Player.length;
            if (handle !== undefined) {
                for (var player = 0; player < len; player++) {
                    if (CMD.Game.Fish.Player[player].Handle == handle) {
                        if (exists) return CMD.Game.Fish.Player[player];
                        if (del) {
                            CMD.Game.Fish.UserQuitLast = CMD.Game.Fish.Player[player].Nickname;
                            CMD.Game.Fish.Player.splice(player, 1);
                        }
                        if (!exists) return true;
                    }
                }
                if (!exists) {
                    return false;
                } else {
                    return -1;
                }
            } else {
                return len - 1;
            }
        },
        listPlayers: function() {
            var msg = "[FISHING BOAT]\nTOP 5 PLAYERS:\n",
                place = 0;
            for (var u = arguments[0]; u >= 0; u--) {
                place++;
                if (u < 5) {
                    msg += place + ":" + CMD.Game.Fish.Player[u].Nickname + "[$" + CMD.Game.Fish.Player[u].Points + "]\n";
                }
                CMD.Game.Fish.Player[u].Upgrades.Insurance = false;
                CMD.Game.Fish.Player[u].Points += 10000;
            }
            Send("msg", msg);
        },
        winner: function() {
            CMD.Game.Fish.Player.sort(function(a, b) {
                return a.Points - b.Points;
            });
            if (CMD.Game.Fish.HighScore[1] < CMD.Game.Fish.Player[0].Points) {
                Send("msg", "[FISHING HIGH SCORE]\nNEW HIGH SCORE,\nKeep going " + CMD.Game.Fish.Player[0].Nickname + "❛❗❜");
                CMD.Game.Fish.HighScore = [CMD.Game.Fish.Player[0].Nickname, CMD.Game.Fish.Player[0].Points];
                Save("FishHighScore", JSON.stringify(CMD.Game.Fish.HighScore));
            }
            var len = CMD.Game.Fish.Player.length - 1;
            Send("msg", "[FISHING BOAT HIGH SCORE]\nHIGH SCORE:\n" + CMD.Game.Fish.HighScore[0] + " : $" + CMD.Game.Fish.HighScore[1] + "\n\nROUND WINNER:\n" + CMD.Game.Fish.Player[len].Nickname + " : $" + CMD.Game.Fish.Player[len].Points + "❛❗❜\n\nNext round will start in thirty seconds❛❗❜");
            this.listPlayers(len);
            CMD.Game.Fish.RestockTimeout = setTimeout(function(g) {
                g.reset(false, true);
            }, 30000, this);
        },
        pricelist: function(playerExist, item) {
            if (item == 0) {
                return (1000 * playerExist.Upgrades.Net * playerExist.Upgrades.Net * playerExist.Upgrades.Net);
            } else if (item == 1) {
                return (1000 * playerExist.Upgrades.Radar * 2) + 3500;
            } else if (item == 2) {
                return (playerExist.Upgrades.Store * playerExist.Upgrades.Store * 25000);
            } else if (item == 3) {
                return (20000);
            } else if (item == 4) {
                return (10000);
            } else if (item == 5) {
                return (50000);
            } else if (item == 6) {
                return (1000);
            }
        },
        cast: function() {
            clearTimeout(CMD.Game.Fish.StartTimeout);
            if (CMD.Host === CMD.Me.handle) {
                if (this.getPlayer() >= 0) {
                    if (CMD.Game.Fish.Round < 10) {
                        CMD.Game.Fish.Round++;
                        var playerlen,
                            fishlen = CMD.Game.Fish.TypesOfFish.length - 1,
                            id,
                            type,
                            handle,
                            eliminate = false,
                            msgeliminate,
                            value,
                            msg = "[FISHING BOAT]\n";
                        for (var cast = 0; cast <= 2; cast++) {
                            playerlen = this.getPlayer();
                            id = Rand(0, playerlen);
                            type = Rand(CMD.Game.Fish.Player[id].Upgrades.Radar, fishlen);
                            if (Rand(0, 100) <= Rand(10, 70)) {
                                var net = Rand(1, CMD.Game.Fish.Player[id].Upgrades.Net);
                                value = (net * CMD.Game.Fish.TypesOfFish[type][1] * 40 * CMD.Game.Fish.Player[id].Upgrades.Store);
                                if (CMD.Game.Fish.TypesOfFish[type][2] === true) {
                                    CMD.Game.Fish.Player[id].Points += value;
                                    msg += (CMD.Game.Fish.Player[id].Nickname.substr(0, 16) + "...[$" + CMD.Game.Fish.Player[id].Points + "]:\n❛✔❜" + net + " x " + CMD.Game.Fish.TypesOfFish[type][0] + " +$" + value + "\n");
                                } else {
                                    if (!CMD.Game.Fish.Player[id].Upgrades.Insurance) {
                                        CMD.Game.Fish.Player[id].Points -= value;
                                        msg += (CMD.Game.Fish.Player[id].Nickname.substr(0, 16) + "..." + ((CMD.Game.Fish.Player[id].Points < 0) ? "[broke]" : "[$" + CMD.Game.Fish.Player[id].Points + "]") + ":\n❛✖❜" + CMD.Game.Fish.TypesOfFish[type][0] + " -$" + value + "\n");
                                    } else {
                                        msg += (CMD.Game.Fish.Player[id].Nickname.substr(0, 16) + "...[$" + CMD.Game.Fish.Player[id].Points + "]:\n❛✔❜" + net + " x " + CMD.Game.Fish.TypesOfFish[type][0] + " -$0\n");
                                    }
                                }
                            } else {
                                cast--;
                            }
                            if (this.getPlayer() == -1) break;
                            if (CMD.Game.Fish.Player[id].Points < 0) {
                                eliminate = true;
                                handle = CMD.Game.Fish.Player[id].Handle;
                                msgeliminate = "[FISHING BOAT]\n" + (CMD.Game.Fish.Player[id].Nickname.substr(0, 16) + "...\nCan walk the plank for costing me my moneys❛❗❜");
                                CMD.Game.Fish.Player.splice(id, 1);
                                break;
                            }
                        }
                        if (msg !== "[FISHING BOAT]\n") Send("msg", msg);
                        if (eliminate) {
                            eliminate = false;
                            Send("msg", msgeliminate);
                        }
                        CMD.Game.Fish.ReCastTimeout = setTimeout(function(g) {
                            g.cast();
                        }, Rand(90000, 120000), this);
                    } else {
                        this.winner();
                    }
                } else {
                    Fish.stop();
                }
            }
        },
        reset: function(stop, bypass) {
            var get = this.getPlayer();
            if (get !== undefined) {
                if (get >= 0 && !CMD.Game.NoReset || bypass !== undefined) {
                    CMD.Game.Fish.Round = 0;
                    clearTimeout(CMD.Game.Fish.StartTimeout);
                    clearTimeout(CMD.Game.Fish.RestockTimeout);
                    clearTimeout(CMD.Game.Fish.ReCastTimeout);
                    clearTimeout(CMD.Game.Fish.NotEnoughTimeout);
                    if (!stop) {
                        this.init();
                    } else {
                        if (CMD.Game.Fish.Player.length > 0) Send("msg", "[FISHING BOAT]\nWelp... Boat sank! I'm not refunding anyone❛❗❜");
                        CMD.Game.Fish.Player = [];
                    }
                }
            }
        },
        stop: function() {
            CMD.Game.NoReset = false;
            this.reset(true, true);
        }
    };
    var FishList = {
        fish: function(playerExist, user) {
            Fish.addPlayer(user.handle, user.username, user.nick);
        },
        fishbank: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname.substr(0, 16) + ", you have $" + playerExist.Points + ".");
        },
        fishrob: function(playerExist, target) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                var CanEliminate = Fish.getPlayer(UsernameToHandle(target.toUpperCase()), false, true);
                FishTransfer(playerExist, CanEliminate, Fish.pricelist(playerExist, 4), Rand(5000, 20000), true);
            }
        },
        fishgamble: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                if (FishTransaction(playerExist, Fish.pricelist(playerExist, 6))) {
                    var winnings;
                    if (Rand(1, 10) === 7) {
                        winnings = Rand(1000, 25000);
                        playerExist.Points += winnings;
                        Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " you've won $" + winnings);
                    } else {
                        if (Rand(1, 7) === 4) {
                            winnings = Rand(1000, 5000);
                            playerExist.Points += winnings;
                            Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " you've won $" + winnings);
                        } else {
                            Send("msg", "[FISHING BOAT]\n" + playerExist.Nickname + " tough luck, you lost $1000❛❗❜");
                        }
                    }
                }
            }
        },
        fishslap: function(playerExist, target) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                var user = UsernameToUser(target.toUpperCase());
                if (user !== -1) {
                    if (CMD.UserList[user].broadcasting && CMD.UserList[user].handle !== CMD.Me.handle) {
                        if (CMD.Me.owner || !CMD.UserList[user].mod) {
                            if (FishTransaction(playerExist, Fish.pricelist(playerExist, 5))) {
                                Send("stream_moder_close", CMD.UserList[user].handle);
                                Send("msg", playerExist.Nickname + " has paid to close your camera " + CMD.UserList[user].nick + "❛❗❜");
                            }
                        } else {
                            Send("msg", "Cannot close moderator❛❗❜");
                        }
                    } else {
                        Send("msg", "Cannot close user❛❗❜");
                    }
                }
            }
        },
        fishsplit: function(playerExist, target) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                var CanEliminate = Fish.getPlayer(UsernameToHandle(target.toUpperCase()), false, true);
                FishTransfer(playerExist, CanEliminate, Fish.pricelist(playerExist, 6), Math.round(playerExist.Points / 2), false);
            }
        },
        fishupgrade: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) FishUpgradeStatus(playerExist, 0);
        },
        fishhelp: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) FishUpgradeStatus(playerExist, 6);
        },
        fishupgradenet: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                if (playerExist.Upgrades.Net >= 10) {
                    Send("msg", playerExist.Nickname + ", you own all upgrades.");
                } else {
                    if (FishTransaction(playerExist, Fish.pricelist(playerExist, 0))) {
                        playerExist.Upgrades.Net += 1;
                        FishUpgradeStatus(playerExist, 1);
                    }
                }
            }
        },
        fishupgradeshop: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                if (playerExist.Upgrades.Store >= 6) {
                    Send("msg", playerExist.Nickname + ", you own them all already❛❗❜");
                } else {
                    if (FishTransaction(playerExist, Fish.pricelist(playerExist, 2))) {
                        playerExist.Upgrades.Store += 1;
                        FishUpgradeStatus(playerExist, 4);
                    }
                }
            }
        },
        fishupgraderadar: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                if (playerExist.Upgrades.Radar >= 20) {
                    Send("msg", playerExist.Nickname + ", you own all upgrades.");
                } else {
                    if (FishTransaction(playerExist, Fish.pricelist(playerExist, 1))) {
                        playerExist.Upgrades.Radar += 5;
                        FishUpgradeStatus(playerExist, 2);
                    }
                }
            }
        },
        fishupgradeinsurance: function(playerExist) {
            if (playerExist !== -1 && FishTimerCheck(playerExist)) {
                if (playerExist.Upgrades.Insurance === true) {
                    Send("msg", playerExist.Nickname + ", you already have insurance❛❗❜");
                } else {
                    if (FishTransaction(playerExist, Fish.pricelist(playerExist, 3))) {
                        playerExist.Upgrades.Insurance = true;
                        FishUpgradeStatus(playerExist, 3);
                    }
                }
            }
        }
    };
    function debug() {
        if (ChatBot.DebugClear === false) {
            if (arguments[0] !== undefined) {
                var msg = "CMD::" + arguments[0];
                if (arguments[1]) msg = msg + "\n" + JSON.stringify(arguments[1]);
                console.log(msg);
            }
        } else {
            console.clear();
            console.log('%cEnjoy %cChatBot%c!', 'color: white; background: black;', 'color: white; background: black;', 'color: white; background: black;');
        }
    }
    function Reset() {
        CMD.UserList = [];
        CMD.Me = [];
        CMD.Room = [];
        CMD.SendQueue = [];
        CMD.Camera.List = [];
        CMD.Camera.List = [];
        CMD.WaitToVoteList = [];
        CMD.WatchList = [];
        CMD.Host = 0;
        CMD.HostAttempt = 0;
        CMD.HostWaiting = false;
        CMD.TempIgnoreList = [];
        Fish.stop();
    }
    function Remove() {
        return (arguments[1] !== undefined) ? arguments[0].querySelector(arguments[1]).parentNode.removeChild(arguments[0].querySelector(arguments[1])) : arguments[0].parentNode.removeChild(arguments[0]);
    }
})(window,document,
{
    Project: {Name: "CMD",Storage: "CMD_", isTouchScreen: false},
    Chuck: {XHR: new XMLHttpRequest()}, Urb: {XHR: new XMLHttpRequest()}, Dad: {XHR: new XMLHttpRequest()}, Advice: {XHR: new XMLHttpRequest()},
    Me: [], Room: [],
    ScriptInit: false,
    MainBackground: undefined,
    OGStyle: {HeightCounter: 3,WidthCounter: 1,SavedHeight: undefined,SavedWidth: undefined},NormalStyle: {ChatHide: false},FontSize: 20,ChatStyleCounter: 0,ChatHeight: 30,ChatWidth: 0,ChatDisplay: true,UserListDisplay: true,ChatStyles: undefined,MainBackgroundCounter: 0,
    ChatLimit: 650,NotificationLimit: 100,
    ChatScroll: true,NotificationScroll: true,NoGreet: false,Featured: true,Bot: true,AutoKick: false,AutoBan: false,GreetMode: false,PerformanceMode: false,CanTTS: false,VoteSystem: false,Popups: true,Avatar: true,Reminder: true,CanSeeGames: true,CanHostGames: false,imgur: true,Notification: true,UserYT: true,ThemeChange: true,TimeStampToggle: true,AutoMicrophone: false,GreenRoomToggle: true,PublicCommandToggle: true,
    Game: {NoReset: false,Fish: {HighScore: ["BadNintendo", 13337],StartTimeout: undefined,RestockTimeout: undefined,ReCastTimeout: undefined,NotEnoughTimeout: undefined,Round: 0,Player: [],TypesOfFish: [["frog", 1, true],["sunfish", 2, true],["goldfish", 3, true],["fish swollowed hook", 4, false],["family of sardine", 5, true],["catfish", 6, true],["spotted bass", 7, true],["largemouth bass", 8, true],["family of shrimp", 9, true],["it pays to not drink,\ncrazy night however❛❗❜", 10, false],["cisco", 11, true],["seaweed, still edible", 12, true],["snagged a tire and lost rod", 13, false],["snagged a tire and lost hook", 14, false],["lost their rod to a shark", 15, false],["rainbow trout", 16, true],["It's your turn for dinner", 80, false],["parrot fish", 17, true],["snagged a plastic bag,\n their hook is gone", 18, false],["walleye", 19, true],["Round Whitefish", 20, true],["family of clams", 21, true],["family of oyster", 22, true],["Round blackfish", 23, true],["dolphin", 24, true],["seagull,\n not a fish but will do", 25, true],["pufferfish", 26, true],["fined for smuggling\nmore than fish", 27, false],["lobster", 28, true],["tuna", 29, true],["electric eel", 30, true],["Eel electricuted you,\nrod is toast", 31, false],["swordfish", 32, true],["had bills at home to pay", 33, false],["slipped and lost equipment", 34, false],["bike, still good too", 35, true],["great white", 36, true],["octopus", 37, true],["serpeant", 38, true],["sea turtle", 39, true],["cleaned garbage from the lake", 40, true],["fined for capturing,\n a female whale", 41, false],["male whale", 42, true],["barracuda", 43, true],["pike", 44, true],["lochiness monster", 45, true],["anglerfish", 46, true],["small treasure chest", 47, true],["golden tuna", 48, true],["family of beautiful rims", 49, true],["red snapper", 50, true],["jaws", 51, true],["mermaid", 52, true],["holy grail,\nhow'd that get there?", 75, true],["secret formula", 100, true]]}},
    TTS: {synth: undefined,voices: undefined},
    hasGreetedWC: false,
    Host: 0,HostAttempt: 0,HostWaiting: false,
    WaitToVoteList: [],UserList: [],MentionList: [],TempIgnoreList: [],IgnoreList: [],BanList: [],KickList: [],BotOPList: [],BotModList: [],TTSList: [],BanKeywordList: [],KickKeywordList: [],HighlightList: [],GreetList: [],ReminderList: [],ReminderServerInList: [],Favorited: [],SafeList: [],GreenRoomIgnoreList: [],GreenRoomList: [],WatchList: [],KBQueue: [],
    MessageCallback: [],Message: [[]],LastMessage: new Date(),ShowedSettings: false,SendQueue: [],MissedMsg: 0, ActiveMessage: 0,
    Camera: {List: [],Sweep: false,SweepTimer: 5,clearRandom: undefined},
    NotificationTimeOut: []
},
{ title : '00b8d27c8e390f8b112cb4334d82', encrypt : '339a' });
