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
				
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			onGoPress: function(){
				var sCustomerId = this.byId("managCustID").getSelectedKey();
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