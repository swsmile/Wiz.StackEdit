/*
////定义一些全局的变量，在所有的脚本插件之前实现////
*/

/*
////WizExplorer内部对象，所有的全局插件脚本都可以使用////
       1.在这里我们与定义了几个对象：objApp, objDatabase, objWindow以及objCommon。
	2.这几个对象的用于可以参考相关的说明。这几个对象，可以在所有的全局插件脚本里面直接使用，而不需要重新定义。
*/
var objApp = WizExplorerApp;
var objDatabase = objApp.Database;
var objWindow = objApp.Window;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");


///////使用的函数
// 定义一个类似alert的方法
function WizAlert(msg) {
    objWindow.ShowMessage(msg, "Wiz", 0x00000040);
}
//定义一个类似确认的方法
function WizConfirm(msg) {
    return objWindow.ShowMessage(msg, "Wiz", 0x00000020 | 0x00000001) == 1;
}
// 定义一个事件分发对象
function WizEventDispatcher() {
    this.listeners = [];
    this.add = function(callback) {
        this.listeners.push(callback);
        return callback;
    }
    this.remove = function(callback) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == callback) {
                this.listeners.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    this.dispatch = function() {
        for (var i = 0; i < this.listeners.length; i++) {
            var callback = this.listeners[i];
            try {
                callback();
            }
            catch (err) {
            }
        }
    }
    this.dispatch1 = function(arg1) {
        for (var i = 0; i < this.listeners.length; i++) {
            var callback = this.listeners[i];
            try {
                callback(arg1);
            }
            catch (err) {
            }
        }
    }
    this.dispatch2 = function(arg1, arg2) {
        for (var i = 0; i < this.listeners.length; i++) {
            var callback = this.listeners[i];
            try {
                callback(arg1, arg2);
            }
            catch (err) {
            }
        }
    }
    this.dispatch3 = function(arg1, arg2, arg3) {
        for (var i = 0; i < this.listeners.length; i++) {
            var callback = this.listeners[i];
            try {
                callback(arg1, arg2,arg3);
            }
            catch (err) {
            }
        }
    }
}

function WizComDateTimeToDate(com_dt) {
    var dt = new Date(Date.parse(com_dt));
    return dt;
}

function WizFormatInt2(val) {
    if (val < 10)
        return "0" + val;
    else
        return "" + val;
}

function WizComDateTimeToStr(com_dt) {
    var dt = new Date(Date.parse(com_dt));
    return "" + dt.getFullYear() + "-" + WizFormatInt2(dt.getMonth() + 1) + "-" + WizFormatInt2(dt.getDate()) + " " + WizFormatInt2(dt.getHours()) + ":" + WizFormatInt2(dt.getMinutes()) + ":" + WizFormatInt2(dt.getSeconds());
}
///////使用的函数


// 当切换帐号的的时候触发该事件。该消息在Wiz 3.0里面已经失效。
var eventsAccountChanged = new WizEventDispatcher();
function WizOnAccountChnaged() {
    eventsAccountChanged.dispatch();
}


// 当为知笔记即将关闭的时候触发
var eventsClose = new WizEventDispatcher();
function WizOnClose() {
    eventsClose.dispatch();
}
function myonclose() {
    WizAlert("onclose");
}
eventsClose.add(myonclose);


// 新开一个tab的时候触发
function myontabcreate(doc) {
    WizAlert("ontabcreate");
}
// 此为事件名称，下面这样定义后，意味着当tabCreate时， eventsTabCreate.dispatch1(doc);被执行
function WizOnTabCreate(doc) {
    eventsTabCreate.dispatch1(doc);
}
var eventsTabCreate = new WizEventDispatcher();
eventsTabCreate.add(myontabcreate);


// 关闭一个tab的时候触发
function WizOnTabClose(objHtmlDocument, objWizDocument) {
    eventsTabClose.dispatch2(objHtmlDocument, objWizDocument);
}
function myontabclose(doc) {
    WizAlert("ontabclose");
}
var eventsTabClose = new WizEventDispatcher();
eventsTabClose.add(myontabclose);


// 当有一个tab里面的html文档加载完成的时候触发
function WizOnHtmlDocumentComplete(doc) {
    eventsHtmlDocumentComplete.dispatch1(doc);
}
function myonhtmldocumentcomplete(doc) {
    WizAlert("onhtmldocumentcomplete");
}
var eventsHtmlDocumentComplete = new WizEventDispatcher();
eventsHtmlDocumentComplete.add(myonhtmldocumentcomplete);


//////////当有一个笔记即将被编辑的时候触发
var eventsDocumentBeforeEdit = new WizEventDispatcher();
function WizOnDocumentBeforeEdit(objHtmlDocument, objWizDocument) {
    return eventsDocumentBeforeEdit.dispatch2(objHtmlDocument, objWizDocument);
}

/////：当某一个tab里面的笔记，即将被另外一个笔记代替的时候触发。
var eventsDocumentBeforeChange = new WizEventDispatcher();
function WizOnDocumentBeforeChange(objHtmlDocument, objWizDocumentOld, objWizDocumentNew) {
    return eventsDocumentBeforeChange.dispatch3(objHtmlDocument, objWizDocumentOld, objWizDocumentNew);
}










