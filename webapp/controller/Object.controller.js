/*global location*/
sap.ui.define([
		"mana/survey/portal/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		'sap/m/Button',
	      'sap/m/Dialog',
	      'sap/m/Link',
	      'sap/m/Text',
		"sap/ui/core/routing/History",
		"mana/survey/portal/model/formatter"
	], function (
		BaseController,
		JSONModel,
		History,
		Button,
		Dialog,
		Link, 
		Text, 
		formatter
	) {
		"use strict";

		return BaseController.extend("mana.survey.portal.controller.Object", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var iOriginalBusyDelay,
					oViewModel = new JSONModel({
						busy : true,
						delay : 0
					});

				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				// Store original busy indicator delay, so it can be restored later on
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
				this.setModel(oViewModel, "objectView");
				this.getOwnerComponent().getModel().metadataLoaded().then(function () {
						// Restore original busy indicator delay for the object view
						oViewModel.setProperty("/delay", iOriginalBusyDelay);
					}
				);
				
				var newModel = sap.ui.getCore().getModel("newModel");

		var getview = this.getView().byId("idpiechart");
		
		var oVizFrame = this.getView().byId("idpiechart");
   
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			
			
		
			dimensions : [{	
				    name : 'Rating',
					value : "{FeedbackAvgFd}"}],
					
		    measures : [{
			    name : 'ProjectId',
				value : '{Projectid}'} ],
				
				data : {
					path :"/CustAvgFeedbackSet"
				}
		    });		
		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(newModel);	
		oVizFrame.setVizProperties({
			
			title:{
				text : "Report"
			},
            plotArea: {
            	colorPalette : d3.scale.category20().range(),
            	drawingEffect: "glossy"
                }});
		
		var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "size",
		      'type': "Measure",
				'values': ["ProjectId"]
		    }), 
		    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "color",
		      'type': "Dimension",
				'values': ["Rating"]
		    });
		oVizFrame.addFeed(feedSize);
		oVizFrame.addFeed(feedColor);
	
				
			},
			
				onPress: function (oEvent) {
	
		var dialog = new Dialog({
			title: 'Go to the link',
			
				content: new Link({
					text: "Google",
					href:""
				}),
			beginButton: new Button({
				text: 'Cancel',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();

},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */



			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				 var sObjectId =  oEvent.getParameter("arguments").objectId;
				
			}
			

		});

	}
);