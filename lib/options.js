Options = {};
Options.languages = {
	'de': "German",
	'en': "English"
};
Options.setCurrentStudyDefaults = function () {
	var defaults = {
		languageFrom: 'en',
		languageTo: 'de'
	};

	if (Options.getCurrentStudy() || !Meteor.users.findOne()) {
		return;
	}

	Meteor.users.update(Meteor.users.findOne()._id, {$set: {'profile.currentStudy': defaults} });
	return defaults;
}

Options.setCurrentStudy = function(side, val) {
	var options = {};
	var currentStudy = this.getCurrentStudy() || this.setCurrentStudyDefaults();
	var clone = _.clone(currentStudy);

	options.owner = Meteor.userId();
	currentStudy[side] = val;

	if (currentStudy.languageTo === currentStudy.languageFrom) {
		// Switch language logic
		if (side === 'languageFrom') {
			currentStudy.languageTo = clone.languageFrom
		} else {
			currentStudy.languageFrom = clone.languageTo
		}
	}

	options.currentStudy = currentStudy;

	Meteor.users.update(Meteor.users.findOne()._id, {$set: {'profile.currentStudy': currentStudy} });
},

Options.getCurrentStudy = function () {
	if (!Meteor.user() || !Meteor.user().profile) {
		return;
	}
	return Meteor.user().profile.currentStudy;
}

Options.getCurrentLanguageFrom = function () {
	if (!this.getCurrentStudy()) {
		return;
	}
	return this.getCurrentStudy().languageFrom;
}

Options.getCurrentLanguageTo = function () {
	if (!this.getCurrentStudy()) {
		return;
	}
	return this.getCurrentStudy().languageTo;
}