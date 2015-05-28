Template.card.rendered = function () {
	$('[data-toggle="tooltip"]').tooltip()
}

Template.card.helpers({
	getTranslation: function (originalText) {
		var card = Cards.getCardByOriginalText(originalText)
		return Cards.getCardTranslation(card);
	},
	isMarked: function() {
		var originalText = $('.card').attr('data-original-text');
		return Cards.isCardMarked(originalText)
	},
	hasWords: function() {
		if (Cards.find().fetch().length) {
			return true;
		}
	},
	allCardsMarked: function () {
		if (!Cards.getNextCard()) {
			return true;
		}
	}
});

Template.card.events({
    'click .card': function(event, template) {
		var $el = $(event.target).closest('.card');
		var isFlipped = $el.attr('data-is-fliped');
		if (!isFlipped) {
			$el.attr('data-is-fliped', true)
		} else {
			$el.removeAttr('data-is-fliped')
		}
    },
    'click .mark-card-btn': function () {
    	var originalText = $('.card').attr('data-original-text');
    	Cards.markCard(originalText);
    	$('[data-toggle="tooltip"]').tooltip('hide');
    }
});