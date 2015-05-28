Template.login.helpers({
	isLoginTypeRegister: function() {
		return Session.get('loginType') === 'register';
	}
});

Template.login.events({
	'click .switch-register': function(evt) {
		evt.preventDefault();
		Session.set('loginType', $(evt.target).attr('data-value'));
		return false;
	},

	'submit #login-form' : function(e, t) {
		e.preventDefault();
		// retrieve the input field values
		var email = t.find('#login-email').value;
		var password = t.find('#login-password').value;
		if (!email || !password) {
			return;
		}
		function register () {
			Accounts.createUser({email: email, password : password}, function (err) {
				if (err) {
					console.log(err)
					return;
				}
				Router.go('/');
				Options.setCurrentStudyDefaults();
			});
		}

		function login() {
			Meteor.loginWithPassword(email, password, function(err){
				if (err) {
					console.log(err);
					return;
				}
				Router.go('/');
				Options.setCurrentStudyDefaults()
			});
		}

		if (Session.get('loginType') === 'register')  {
			register();
			return false;
		}
		login();
		return false;
	}
});