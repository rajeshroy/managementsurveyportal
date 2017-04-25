/*global location*/
sap.ui.define([
	"mana/survey/portal/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Link",
	"sap/m/Text",
	"sap/ui/core/routing/History",
	"mana/survey/portal/model/formatter"
], function(
	BaseController,
	JSONModel,
	Filter,
	FilterOperator,
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
		onInit: function() {

			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				}),
				oLocalJSONModel = new JSONModel();
			this.setModel(oLocalJSONModel, "customerModel");
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
		},

		onPress: function(oEvent) {

			var dialog = new Dialog({
				title: 'Go to the link',

				content: new Link({
					text: "Google",
					href: ""
				}),
				beginButton: new Button({
					text: 'Cancel',
					press: function() {
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
		_onObjectMatched: function(oEvent) {
			var aFilterData, mParameter, sObjectId, oModel = this.getModel();
			sObjectId = oEvent.getParameter("arguments").objectId;
			aFilterData = this._getCustomerFilter(sObjectId);
			mParameter = {
				context: null,
				filters: aFilterData,
				sorters: null,
				success: jQuery.proxy(this.successCustomerDataLoad, this),
				error: jQuery.proxy(this.errorCustomerDataLoad, this)

			};
			oModel.read("/CustAvgFeedbackSet", mParameter);
		},
		/**
		 * Call back function used to handle the success of read call 
		 * @param {oSuccess} Success data
		 */
		successCustomerDataLoad: function(oSuccess) {
			var aEmpty = [],
				oModelData = oSuccess.results;
			for (var i = 0; i < oModelData.length; i++) {
				var oEmpty = {};
				if (aEmpty.length === 0) {
					oEmpty.FeedbackAvgFd = oModelData[i].FeedbackAvgFd;
					oEmpty.projectCount = 1;
					aEmpty.push(oEmpty);
				} else {
					for (var j = 0; j < aEmpty.length; j++) {
						var bCheck = false;
						if (aEmpty[j].FeedbackAvgFd === oModelData[i].FeedbackAvgFd) {
							aEmpty[j].projectCount += 1;
							bCheck = true;
							break;
						}
					}
					if(!bCheck){
						 	oEmpty.FeedbackAvgFd = oModelData[i].FeedbackAvgFd;
							oEmpty.projectCount = 1;
							aEmpty.push(oEmpty);
					}
				}
			}
			this.getModel("customerModel").setProperty("/", aEmpty);
			var oDataset, oModel = this.getModel("customerModel"),

				oVizFrame = this.getView().byId("idpiechart");
			oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'Rating',
					value: "{FeedbackAvgFd}"
				}],

				measures: [{
					name: 'Project',
					value: '{projectCount}'
				}],

				data: {
					path: "/"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizProperties({

				title: {
					text: "Report"
				},
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					drawingEffect: "glossy"
				}
			});

			var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "size",
					'type': "Measure",
					'values': ["Project"]
				}),
				feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["Rating"]
				});
			oVizFrame.addFeed(feedSize);
			oVizFrame.addFeed(feedColor);

		},
		/**
		 * Call back function used to handle the success of read call 
		 * @param {oError} Success data
		 */
		errorCustomerDataLoad: function(oError) {

		},
		/**
		 * function to return filter array
		 * @param {string} sCompanyId Company Id
		 * @returns {Array} afilterData array of filter 
		 */
		_getCustomerFilter: function(sCompanyId) {
			var afilterData = [
				new Filter("Customerid", FilterOperator.EQ, sCompanyId)
			];
			return afilterData;
		}

	});

});