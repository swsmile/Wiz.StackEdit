var objApp = WizExplorerApp;
var objWindow = objApp.Window;
var objDocument = objWindow.CurrentDocument;
if (objDocument) {
    objDocument.Type = "Mathjax";
    //
    objApp.AddGlobalScript(objApp.CurPluginAppPath + "MathjaxCurrentDocument.js");
}