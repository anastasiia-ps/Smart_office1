sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/data/FlattenedDataset', 
    'sap/viz/ui5/controls/common/feeds/FeedItem',
    'sap/m/MessageToast'
 ], function (Controller, JSONModel, FlattenedDataset, FeedItem, MessageToast) {
    "use strict";
    return Controller.extend("com.quanto.solutions.ui.smartoffice.controller.mainPanel", {

        /* ============================================================ */
		/* Constants                                                    */
		/* ============================================================ */
		/**
		 * Constants used in the example.
		 *
		 * @private
		 * @property {String} sampleName Name of the chart container sample
		 * @property {Object} vizFrame Viz Frame used in the view
		 * @property {String} vizFrame.id Id of the Viz Frame
		 * @property {Object} vizFrame.dataset Config used for the Viz Frame Flattened data
		 * @property {Object[]} vizFrame.dataset.dimensions Flattened data dimensions
		 * @property {Object[]} vizFrame.dataset.measures Flattened data measures
		 * @property {Object} vizFrame.dataset.data Flattened data other config
		 * @property {Object} vizFrame.dataset.data.path Flattened data path
		 * @property {String} vizFrame.modulePath Path to the module's data
		 * @property {String} vizFrame.type Viz Frame Type
		 * @property {Object} vizFrame.properties Viz Frame properties
		 * @property {Object} vizFrame.properties.plotArea Viz Frame plot area property
		 * @property {Object} vizFrame.properties.plotArea.showGap Viz Frame plot area property
		 * @property {Object[]} vizFrame.feedItems Viz Frame feed items
		 */
		_constants: {
			sampleName: "com.quanto.solutions.ui.smartoffice",
            vizFrame: {
				id: "chartContainerVizFrame",
				dataset: {
					dimensions: [{
						name: 'Country',
						value: "{Country}"
					}],
					measures: [{
						group: 1,
						name: 'Profit',
						value: '{Revenue2}'
					}, {
						group: 1,
						name: 'Target',
						value: '{Target}'
					}, {
						group: 1,
						name: "Forcast",
						value: "{Forcast}"
					}, {
						group: 1,
						name: "Revenue",
						value: "{Revenue}"
					},
						{
							group: 1,
							name: 'Revenue2',
							value: '{Revenue2}'
						}, {
							group: 1,
							name: "Revenue3",
							value: "{Revenue3}"
						}],
					data: {
						path: "/Products"
					}
				},
                jsonfile: {
                    "Products": [
                        {
                            "Country": "China",
                            "Profit": 100,
                            "Forcast": 200,
                            "Target": 20,
                            "Revenue": 20,
                            "Revenue2": 20,
                            "Revenue3": 512
                        },
                        {
                            "Country": "Japan",
                            "Profit": 159,
                            "Forcast": 140,
                            "Target": 150,
                            "Revenue": 30,
                            "Revenue2": 100,
                            "Revenue3": 303
                        },
                        {
                            "Country": "India",
                            "Profit": 129,
                            "Forcast": 120,
                            "Target": 100,
                            "Revenue": 200,
                            "Revenue2": 222,
                            "Revenue3": 263
                        },
                        {
                            "Country": "France",
                            "Profit": 58,
                            "Forcast": 60,
                            "Target": 80,
                            "Revenue": 116,
                            "Revenue2": 152,
                            "Revenue3": 113
                        },
                        {
                            "Country": "Austrilia",
                            "Profit": 149,
                            "Forcast": 120,
                            "Target": 150,
                            "Revenue": 249,
                            "Revenue2": 292,
                            "Revenue3": 443
                        },
                        {
                            "Country": "Sweden",
                            "Profit": 49,
                            "Forcast": 60,
                            "Target": 55,
                            "Revenue": 1449,
                            "Revenue2": 242,
                            "Revenue3": 243
                        }
                    ]
                },
				modulePath: "/ChartContainerData.json",
				type: "line",
				properties: {
					plotArea: {
						showGap: true
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Revenue"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Country"]
				}, {
					'uid': "targetValues",
					'type': "Measure",
					'values': ["Target"]
				}]
			}
		},
		/* ============================================================ */
		/* Life-cycle Handling                                          */
		/* ============================================================ */
		/**
		 * Method called when the application is initalized.
		 *
		 * @public
		 */
		onInit: function() {
			var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			this._updateVizFrame(oVizFrame);
		},
		/* ============================================================ */
		/* Helper Methods                                               */
		/* ============================================================ */
		/**
		 * Updated the Viz Frame in the view.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame that needs to be updated
		 */
		_updateVizFrame: function(vizFrame) {
			var oVizFrame = this._constants.vizFrame;
			var oVizFramePath = sap.ui.require.toUrl("model/ChartContainerData.json");
            console.log(oVizFramePath);
			var oModel = new JSONModel(oVizFrame.jsonfile);
            
            oModel.attachRequestCompleted(function(oEvent){
                var ModelNEW= oEvent.getSource();  
                console.log(JSON.stringify(ModelNEW.getData()));
            });
            console.log(oModel);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
            console.log(oDataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		/**
		 * Adds the passed feed items to the passed Viz Frame.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
		 * @param {Object[]} feedItems Feed items to add
		 */
		_addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		},







 
       onShowHello : function () {
          // read msg from i18n model
          var oBundle = this.getView().getModel("i18n").getResourceBundle();
          var sRecipient = this.getView().getModel().getProperty("/recipient/name");
          var sMsg = oBundle.getText("helloMsg", [sRecipient]);
          // show message
          MessageToast.show(sMsg);
       }
    });
 });