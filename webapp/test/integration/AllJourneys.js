jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"man/survey/portal/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"man/survey/portal/test/integration/pages/Worklist",
		"man/survey/portal/test/integration/pages/Object",
		"man/survey/portal/test/integration/pages/NotFound",
		"man/survey/portal/test/integration/pages/Browser",
		"man/survey/portal/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "man.survey.portal.view."
	});

	sap.ui.require([
		"man/survey/portal/test/integration/WorklistJourney",
		"man/survey/portal/test/integration/ObjectJourney",
		"man/survey/portal/test/integration/NavigationJourney",
		"man/survey/portal/test/integration/NotFoundJourney",
		"man/survey/portal/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});