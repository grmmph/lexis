var translateApiKey = 'trnsl.1.1.20150226T201459Z.e366aa295860d2ca.363701ddc25c518ec3af0560b7687c1b4e94ac8d';

Meteor.methods({
	getTranslation: function (languageFrom, languageTo, text) {
		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + translateApiKey + '&lang='+languageFrom+'-'+languageTo+'&text=' + text;
		var res = HTTP.get(url);
		res.data.originalText = text;
		return res.data;
	},
	removeAllCards: function() {
		return Cards.remove({});
	},
	getImageForWord: function (image) {
		var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCzaIquLvFbs20CoWduCGD1sjPw7eKF9B0&q=flower&searchType=image&fileType=jpg&imgSize=small&alt=json'
	}
});
