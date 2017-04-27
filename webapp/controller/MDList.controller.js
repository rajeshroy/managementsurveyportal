sap.ui.define([
	"mana/survey/portal/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function(Controller, History, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("mana.survey.portal.controller.MDList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mana.survey.portal.view.MDList
		 */
		onInit: function() {
			var oJSONModel = new JSONModel();
			this.setModel(new JSONModel(), "QuestionList");
			this.setModel(oJSONModel, "managerList");
			this.getRouter().getRoute("manager").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			var aFilter, mParameter, sCustomerId, sRating, oArguments;
			
			oArguments = oEvent.getParameter("arguments");
			sCustomerId = oArguments.custId;
			sRating = oArguments.objectId;
			aFilter = this._prepareFilter(sCustomerId, sRating);
			mParameter ={
			context: null,
			/*urlParameters: {
				expand:'CustFeedbackSet'
			},*/
			filters: aFilter,
			success: jQuery.proxy(this.fnSuccessMListLoad, this),
			error: jQuery.proxy(this.fnErrorMListLoad, this)
			};
			this.getModel().read("/CustAvgFeedbackSet", mParameter);

		},
		/**
		 * 
		 * 
		 */
		 fnSuccessMListLoad: function(oSuccessData){
			this.getModel("managerList").setProperty("/", oSuccessData.results);	
		 },
		 /**
		  * 
		  * 
		  */
		  fnErrorMListLoad: function(oError){
		  	
		  },
		/**
		 * This function is used to prepare the filter object
		 * @param {string} sCustomerId Customer Id
		 * @param {string} sRating customer avg. rating
		 * @returns {object} oFilter
		 */ 
		 _prepareFilter: function(sCustomerId, sRating){
		 	var aFilter =[ 
		 	new Filter("Customerid", FilterOperator.EQ, sCustomerId),
		 	new Filter("FeedbackAvgFd", FilterOperator.EQ, sRating)
		 	];
		 	return aFilter;
		 },
		 
		 /**
		  * 
		  * 
		  */
		  onManagerExpand: function(oEvent){
		  	var mParameter, sManagetId = oEvent.getSource().getHeaderText(),
		  	aFilter = [new Filter("Managerid", FilterOperator.EQ, sManagetId)],
		  	oModelManager = this.getModel("managerList").oData;
		  	mParameter ={
			context: null,
			/*urlParameters: {
				expand:'CustFeedbackSet'
			},*/
			filters: aFilter,
			success: jQuery.proxy(this.fnSuccessQuesList, this),
			error: jQuery.proxy(this.fnErrorQuesList, this)
			};
			this.getModel().read("/CustFeedbackSet", mParameter);
			
		
		  	
		  },
		  
		  /**
		   * 
		   * 
		   */
		   fnSuccessQuesList: function(oSuccessData){
		   	 this.getModel("QuestionList").setProperty("/", oSuccessData.results);
		   }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mana.survey.portal.view.MDList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mana.survey.portal.view.MDList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mana.survey.portal.view.MDList
		 */
		//	onExit: function() {
		//
		//	}

	});

});