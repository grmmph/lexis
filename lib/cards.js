Cards = new Mongo.Collection('cards');

Cards.insertCard = function (translationObject) {
	var lang = translationObject.lang;
	var languageFrom = lang.slice(0, lang.indexOf('-'));
	var languageTo = lang.slice(lang.indexOf('-')+1, lang.length);
	var cardData = {
		owner: Meteor.userId(),
		createdAt: new Date(),
		marked: [],
		translations: {}
	};

	cardData.translations[languageFrom] = translationObject.originalText;
	cardData.translations[languageTo] = translationObject.text.join(' ');

	console.log(cardData)

	this.insert(cardData)
};

Cards.getNextCard = function() {
	var cardsArray = _.map(this.find().fetch(), function(card) {
		if (Cards.isCardMarked(Cards.getCardOriginalText(card))) {
			return 0;
		}
		return card;
	});
	cardsArray = _.without(cardsArray, 0);
	var randomCardIndex = Math.round(Math.random()*(cardsArray.length - 1));
	return cardsArray[randomCardIndex];
}

Cards.goToNextCard = function() {
	if(this.getNextCard()) {
		Router.go('/practice/' + this.getNextCard().translations[Options.getCurrentLanguageFrom()]);
	} else {
		Router.go('/practice/allMarked');
	}
}

Cards.killAll = function () {
	var allIds = _.map(this.find().fetch(), function(card) {
		return card._id;
	});
	Meteor.call('removeAllCards')
}

Cards.getCardTranslation = function (card) {
	if (!Options.getCurrentStudy()) {
		return
	}
	return card.translations[Options.getCurrentStudy().languageTo];
}

Cards.getCardOriginalText = function (card) {
	if (!Options.getCurrentStudy()) {
		return
	}
	return card.translations[Options.getCurrentStudy().languageFrom];
}

Cards.getCardTexts = function (card) {
	var currentStudy = Options.getCurrentStudy();
	return {
		originalText: this.getCardOriginalText(card),
		translation: this.getCardTranslation(card)
	}
}

Cards.getCardByOriginalText = function (originalText) {
	return _.filter(Cards.find().fetch(), function(card) {
		return card.translations[Options.getCurrentLanguageFrom()] === originalText;
	})[0];
}

Cards.markCard = function (originalText) {
	var card = Cards.getCardByOriginalText(originalText);
	var markedStr = Options.getCurrentLanguageFrom() + "-" + Options.getCurrentLanguageTo();
	var marked = card.marked;
	marked.push(markedStr);
	Cards.update(card._id, {$set: {marked: marked}});
}

Cards.isCardMarked = function (originalText) {
	var card = Cards.getCardByOriginalText(originalText);
	var markedStrOne = Options.getCurrentLanguageFrom() + "-" + Options.getCurrentLanguageTo();
	var markedStrTwo = Options.getCurrentLanguageTo() + "-" + Options.getCurrentLanguageFrom();

	if (!card) {
		return;
	}

	if (_.indexOf(card.marked, markedStrOne) !== -1 || _.indexOf(card.marked, markedStrTwo) !== -1) {
		return true;
	}
}
Cards.removeCardByOriginalText = function (originalText) {
	Cards.remove(Cards.getCardByOriginalText(originalText)._id);
}
Cards.unmarkCard = function(originalText) {
	console.log(originalText)
	var card = Cards.getCardByOriginalText(originalText);
	var markedStr = Options.getCurrentLanguageFrom() + "-" + Options.getCurrentLanguageTo();
	var marked = card.marked;
	var markedStrOne = Options.getCurrentLanguageFrom() + "-" + Options.getCurrentLanguageTo();
	var markedStrTwo = Options.getCurrentLanguageTo() + "-" + Options.getCurrentLanguageFrom();

	marked = _.without(marked, markedStrOne);
	marked = _.without(marked, markedStrTwo);
	Cards.update(card._id, {$set: {marked: marked}});
}