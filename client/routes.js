
var layoutYields = {
	'header': {to: 'header'},
	'footer': {to: 'footer'},
	'setLangs': {to: 'setLangs'}
};

Router.configure({
	layoutTemplate: 'layout',
	yieldTemplates: layoutYields
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home',
		yieldTemplates: _.extend(layoutYields, {
			'add': {to: 'add'},
		})
	});

	this.route('add', {
		path: 'add',
		template: 'add',
		yieldTemplates: _.extend(layoutYields, {
			'translate': {to: 'translate'},
			'myWords': {to: 'myWords'}
		})
	});

	this.route('login', {
		path: 'login',
		template: 'login',
		yieldTemplates: _.extend(layoutYields, {})
	});

	this.route('logout', function () {
		Meteor.logout();
		Router.go('/');
		Options.setCurrentStudyDefaults();
	});

	this.route('practice', function() {
		Cards.goToNextCard();
	});

	this.route('myWords', {
		path: 'my-words',
		template: 'myWords',
		yieldTemplates: _.extend(layoutYields, {})
	});

	this.route('help', {
		path: 'help',
		template: 'help',
		yieldTemplates: _.extend(layoutYields, {})
	});

	this.route('print', {
		path: 'print',
		template: 'print',
		yieldTemplates: _.extend(layoutYields, {})
	});

	this.route('practice/:languageFrom', function () {
		this.render('card', {
			data: function () {
				return {languageFrom: this.params.languageFrom};
			}
		});
		this.render('header', {
			to:'header'
		});
		this.render('footer', {
			to:'footer'
		});
	});
});

