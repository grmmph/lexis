Template.setLangs.helpers({
	languageFrom: function () {
    return Options.getCurrentLanguageFrom();
  },
  languageTo: function () {
		return Options.getCurrentLanguageTo();
  }
});

Template.setLangs.events({
  	'click .lang-switch': function(evt) {
  		var $el = $(evt.target);
  		var val = $el.closest('.lang-switch').attr('data-value');
  		var side = $el.closest('.dropdown-menu').attr('data-value');

  		Options.setCurrentStudy(side, val)
  	}
});