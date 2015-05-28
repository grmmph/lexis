Template.translate.rendered = function () {
	$('[data-toggle="tooltip"]').tooltip()
}

Template.translate.helpers({
	translationText: function() {
		return Session.get('translationText');
	},
	languageFrom: function () {
		Session.set('languageFrom', Options.getCurrentLanguageFrom())
    	return Session.get('languageFrom');
	},
	languageTo: function () {
		return Options.getCurrentLanguageTo();
	},
	isSaved: function() {
		return Cards.getCardByOriginalText(Session.get('isSaved'));
	},
	prettyLang: function(lang) {
		return Options.languages[lang];
	}
});

Template.translate.events({
  	'keyup [name="text-to-translate"]': _.debounce(function(event, template) {
  		var langFrom = Options.getCurrentStudy().languageFrom;
  		var langTo = Options.getCurrentStudy().languageTo;
		Meteor.call('getTranslation', langFrom, langTo, $('[name="text-to-translate"]').val(), function (error, result) {
			Session.set('translationObject', result);
			Session.set('translationText', result.text[0]);
			Session.set('isSaved', $('[name="text-to-translate"]').val());
		});
	}, 500),

  	'click .btn-save-card': function(event, template) {
  		if ($('[name="text-to-translate"]').val() === "") {
  			return;
  		}
		var translationObject = Session.get('translationObject');
		Cards.insertCard(translationObject);
		Session.set('isSaved', $('[name="text-to-translate"]').val());
  	}
});