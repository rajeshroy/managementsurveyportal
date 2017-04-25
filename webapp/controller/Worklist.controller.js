sap.ui.define([
		"mana/survey/portal/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"mana/survey/portal/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, JSONModel, History, formatter, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("mana.survey.portal.controller.Worklist", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
			/*	var a = new sap.m.Text({visible: false}).bindElement("/CustAvgFeedbackSet"); */
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			onGoPress: function(){
				var sCustomerId = this.byId("managCustID").getSelectedKey();
				/*var jsonModel =	this.getModel().getProperty("/CustomerDetSet(Mandt='001',Kunnr='" +sCustomerId +"')");
				
				var newModel = new JSONModel();
				
				newModel.setData(jsonModel);
				
				sap.ui.getCore().setModel(newModel, "newModel");*/
				
				var  mParameter, jsonModel = this.getModel();
		
			mParameter = {
				context: null,
				
				async: true,
			
				success: jQuery.proxy(
					),
				error: jQuery.proxy(
					)
			};
			jsonModel.read("/CustAvgFeedbackSet", mParameter);
			
		/*	var jsonModel =	this.getModel().getProperty("/CustAvgFeedbackSet(Mandt='001',Kunnr='" +sCustomerId +"')");*/
				
				var newModel = new JSONModel();
				
				newModel.setData(jsonModel);
				
				sap.ui.getCore().setModel(newModel, "newModel");
			
				
				this.getRouter().navTo("object",{
					objectId: sCustomerId
				});
			}

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */



		});
	}
);