jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.require("sap.ui.test.Opa5");

jQuery.sap.require("mana.survey.portal.test.integration.pages.Common");
jQuery.sap.require("mana.survey.portal.test.integration.pages.Worklist");
jQuery.sap.require("mana.survey.portal.test.integration.pages.Object");
jQuery.sap.require("mana.survey.portal.test.integration.pages.NotFound");
jQuery.sap.require("mana.survey.portal.test.integration.pages.Browser");
jQuery.sap.require("mana.survey.portal.test.integration.pages.App");

sap.ui.test.Opa5.extendConfig({
	arrangements: new mana.survey.portal.test.integration.pages.Common(),
	viewNamespace: "mana.survey.portal.view."
});

// Start the tests
jQuery.sap.require("mana.survey.portal.test.integration.WorklistJourney");
jQuery.sap.require("mana.survey.portal.test.integration.ObjectJourney");
jQuery.sap.require("mana.survey.portal.test.integration.NavigationJourney");
jQuery.sap.require("mana.survey.portal.test.integration.NotFoundJourney");
jQuery.sap.require("mana.survey.portal.test.integration.FLPIntegrationJourney");