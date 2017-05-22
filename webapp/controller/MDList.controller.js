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
				this.custId = "";
		},

		_onObjectMatched: function(oEvent) {
				var sCustId = oEvent.getParameter("arguments").custId;
			this.custId = sCustId;
			var aFilter, mParameter, sCustomerId, sRating, oArguments;

			oArguments = oEvent.getParameter("arguments");
			sCustomerId = oArguments.custId;
			sRating = oArguments.objectId;
			aFilter = this._prepareFilter(sCustomerId, sRating);
			mParameter = {
				context: null,
				urlParameters: {
					$expand: 'LT_FEEDBACK'
				},
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
		fnSuccessMListLoad: function(oSuccessData) {
			var aManagerList = oSuccessData.results;
			for (var i = 0; i < aManagerList.length; i++) {
				aManagerList[i].FeedbackAvgFd = parseInt(aManagerList[i].FeedbackAvgFd, 10);
			}
			this.getModel("managerList").setProperty("/", aManagerList);
		},
		/**
		 * 
		 * 
		 */
		fnErrorMListLoad: function(oError) {

		},
		/**
		 * This function is used to prepare the filter object
		 * @param {string} sCustomerId Customer Id
		 * @param {string} sRating customer avg. rating
		 * @returns {object} oFilter
		 */
		_prepareFilter: function(sCustomerId, sRating) {
			var aFilter = [
				new Filter("Customerid", FilterOperator.EQ, sCustomerId),
				new Filter("FeedbackAvgFd", FilterOperator.EQ, sRating)
			];
			return aFilter;
		},

		/**
		 * 
		 * 
		 */
		onManagerExpand: function(oEvent) {
/*			var sContent, aFilter, mParameter, sProjectId, oSource;
			sContent = oEvent.getSource().getContent();
			if (sContent.length < 3) {
				oSource = oEvent.getSource();
				sProjectId = this.getModel("managerList").getProperty("Projectid", oEvent.getSource().getBindingContext("managerList"));
				aFilter = [new Filter("Projectid", FilterOperator.EQ, sProjectId)];

				mParameter = {
					context: null,
					filters: aFilter,
					success: jQuery.proxy(this.fnSuccessQuesList, this, oSource),
					error: jQuery.proxy(this.fnErrorQuesList, this)
				};

				this.getModel().read("/CustFeedbackSet", mParameter);
			}*/

		
				var managList = this.getModel("managerList").getData();
				var arr = [];
				for(var i = 0; i < managList.length; i++ )
			{
			
					 arr[i] = managList[i].LT_FEEDBACK;
					 
					 var ques_length =managList[i].LT_FEEDBACK.results.length;
					 	var ques =[];
					 for(var j=i;j<ques_length;j++){
    if(managList[i].Projectid == managList[i].LT_FEEDBACK.results[j].Projectid)
    {
    
        // ques[j] = managList[i].LT_FEEDBACK.results[j];
         ques.push( managList[i].LT_FEEDBACK.results[j]);
    }
    else{
    	continue;
    }
					 }				 
					 
			if(oEvent.getParameters().id === "application-Test-url-component---manager--idPanel-application-Test-url-component---manager--CompanyList-"+i) 
			{
					var quesSet = new JSONModel();
			quesSet.setData(ques);
			this.getView().byId(oEvent.getParameters().id).setModel(quesSet, "quesSet");

			}
			else{
				continue;
			}
			}
			
			
		},
		/**
		 * 
		 * 
		 */
		fnSuccessQuesList: function(oSource, oSuccessData) {
			var oTable, jsonModel, sFragId = this.createId("fragRatingId");
			if (oSuccessData.results.length !== 0) {
				if (!this.oFragRating) {
					this._initRatingFrag();
				}
				oSource.addContent(this.oFragRating);
				oTable = this.byId(sap.ui.core.Fragment.createId(sFragId, "ratingTable"));
				jsonModel = new JSONModel();
				jsonModel.setProperty("/", oSuccessData.results);
				oTable.setModel(jsonModel, "checkModel");
				
			}
		},
		/**
		 * 
		 * 
		 */
		_initRatingFrag: function() {
			var sFragId = this.createId("fragRatingId");
			this.oFragRating = sap.ui.xmlfragment(sFragId, "mana.survey.portal.fragments.ratingSet", this);
			this.getView().addDependent(this.oFragRating);
		},
		
				onNavBack1: function(evt) {
						 var managList = this.getModel("managerList").getData();
				for(var i = 0; i < managList.length; i++ )
			{
				var expand ;
				expand = "application-Test-url-component---manager--idPanel-application-Test-url-component---manager--CompanyList-"+i;
                this.getView().byId(expand).setExpanded(false);
		
			}
					
					
				var sCustomerId = this.getModel("managerList").getData()[0].Customerid;
                 this.getRouter().navTo("object",{
					objectId: this.custId
				});
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