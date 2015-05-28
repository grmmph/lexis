Template.myWords.rendered = function () {
	$('[data-toggle="tooltip"]').tooltip()
}

Template.myWords.helpers({
	cardsTexts: function () {
		return _.map(Cards.find().fetch(), function(card) {
			return Cards.getCardTexts(card);
		});
	},
	markedClass: function (originalText) {
		if (!Cards.isCardMarked(originalText)) {
			return;
		}
		return 'success';
	},
	isMarked: function (originalText) {
		return Cards.isCardMarked(originalText);
	},
	hasWords: function() {
		if (Cards.find().fetch().length) {
			return true;
		}
	}
});

Template.myWords.events({
	'click .remove-cards': function() {
      Cards.killAll();
	},

	'click .remove-word-btn': function(evt) {
		Cards.removeCardByOriginalText($(evt.target).attr('date-remove'));
	},
	'click .unmark': function(evt) {
		Cards.unmarkCard($(evt.target).attr('data-unmark'));
		$('[data-toggle="tooltip"]').tooltip('hide');
	}
});