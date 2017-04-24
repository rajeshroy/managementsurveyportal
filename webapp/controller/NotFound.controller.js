sap.ui.define([
		"mana/survey/portal/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("mana.survey.portal.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);