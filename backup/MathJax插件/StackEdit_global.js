var objApp = WizExplorerApp;
var objWindow = objApp.Window;
var objDocument = objWindow.CurrentDocument;
if (objDocument) {
    objDocument.Type = "Mathjax";
    //
    objApp.AddGlobalScript(objApp.CurPluginAppPath + "MathjaxCurrentDocument.js");
}

function mj_addMathjaxScript(doc) {
    if (!doc)
        return;

    var elem = doc.createElement("script");
    elem.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    doc.body.appendChild(elem);
}

function mj_addMathjaxScriptToCurrentDocument() {
    var doc = objApp.CurrentDocumentHtmlDocument;
    mj_addMathjaxScript(doc);
}

function mj_onHtmlDocumentCompleted(doc) {
    try {
        var objDocument = objApp.Window.CurrentDocument;
        if (objDocument) {
            if (objDocument.Type == "Mathjax") {
                mj_addMathjaxScript(doc);
            }
        }
    }
    catch (err) {
    }
}

eventsHtmlDocumentComplete.add(mj_onHtmlDocumentCompleted);