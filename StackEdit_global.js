function OnHelperButtonClicked() {
    WizAlert("您点击了助手按钮");
}

function InitHelperButton() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("StackEdit_global.js");
    var languangeFileName = pluginPath + "plugin.ini";
    var buttonText = objApp.LoadStringFromFile(languangeFileName, "strHelper");
    var iconFileName = pluginPath + "helper.ico";
    objWindow.AddToolButton("document", "HelperButton", buttonText, iconFileName, "OnHelperButtonClicked");
}
InitHelperButton();