sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, ResourceModel) {
        "use strict";

        return Controller.extend("com.quanto.solutions.ui.smartoffice.controller.View1", {
            onInit: function () {
                // set the data model on the view
                var oData = {
                    recipient : {
                        name : "UI5"
                    }
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
                // set i18n
                var i18nModel = new ResourceModel({
                    bundleName : "com.quanto.solutions.ui.smartoffice.i18n.i18n",
                    supportedLocales: [""],
                    fallbackLocale: ""
                });
                this.getView().setModel(i18nModel, "i18n");
            },
            onShowHello : function () {
                //read msg from i18nmodel
                 var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);

                // Show message
                MessageToast.show(sMsg);
            }
            
            
        });
    });
