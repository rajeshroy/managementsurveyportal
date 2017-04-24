jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"mana/survey/portal/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"mana/survey/portal/test/integration/pages/Worklist",
		"mana/survey/portal/test/integration/pages/Object",
		"mana/survey/portal/test/integration/pages/NotFound",
		"mana/survey/portal/test/integration/pages/Browser",
		"mana/survey/portal/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "mana.survey.portal.view."
	});

	sap.ui.require([
		"mana/survey/portal/test/integration/WorklistJourney",
		"mana/survey/portal/test/integration/ObjectJourney",
		"mana/survey/portal/test/integration/NavigationJourney",
		"mana/survey/portal/test/integration/NotFoundJourney",
		"mana/survey/portal/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});