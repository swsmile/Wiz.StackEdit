/*
////定义一些全局的变量，在所有的脚本插件之前实现////
*/

/*
////WizExplorer内部对象，所有的全局插件脚本都可以使用////
*/
var objApp = WizExplorerApp;
var objDatabase = objApp.Database;
var objWindow = objApp.Window;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizAlert(msg) {
    objWindow.ShowMessage(msg, "Wiz", 0x00000040);
}

function WizConfirm(msg) {
    return objWindow.ShowMessage(msg, "Wiz", 0x00000020 | 0x00000001) == 1;
}


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


var eventsAccountChanged = new WizEventDispatcher();
var eventsClose = new WizEventDispatcher();
var eventsTabCreate = new WizEventDispatcher();
var eventsTabClose = new WizEventDispatcher();
var eventsHtmlDocumentComplete = new WizEventDispatcher();
var eventsDocumentBeforeEdit = new WizEventDispatcher();
var eventsDocumentBeforeChange = new WizEventDispatcher();

function WizOnAccountChnaged() {
    eventsAccountChanged.dispatch();
}


function WizOnClose() {
    eventsClose.dispatch();
}

function WizOnTabCreate(doc) {
    eventsTabCreate.dispatch1(doc);
}

function WizOnTabClose(objHtmlDocument, objWizDocument) {
    eventsTabClose.dispatch2(objHtmlDocument, objWizDocument);
}

function WizOnHtmlDocumentComplete(doc) {
    eventsHtmlDocumentComplete.dispatch1(doc);
}

function WizOnDocumentBeforeEdit(objHtmlDocument, objWizDocument) {
    return eventsDocumentBeforeEdit.dispatch2(objHtmlDocument, objWizDocument);
}
function WizOnDocumentBeforeChange(objHtmlDocument, objWizDocumentOld, objWizDocumentNew) {
    return eventsDocumentBeforeChange.dispatch3(objHtmlDocument, objWizDocumentOld, objWizDocumentNew);
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


/*
function myonclose() {
    WizAlert("onclose");
}
eventsClose.add(myonclose);

function myontabcreate(doc) {
    WizAlert("ontabcreate");
}
eventsTabCreate.add(myontabcreate);

function myontabclose(doc) {
    WizAlert("ontabclose");
}
eventsTabClose.add(myontabclose);

function myonhtmldocumentcomplete(doc) {
    WizAlert("onhtmldocumentcomplete");
}
eventsHtmlDocumentComplete.add(myonhtmldocumentcomplete);
*/