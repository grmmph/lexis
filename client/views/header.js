Template.header.helpers({
	userDisplayName: function() {
		if (!Meteor.user()) {
			return;
		}
		var user = Meteor.user().profile || {};
		if (user.guest || !Meteor || !Meteor.user()) {
			return;
		}
		return 'again';
	},
	activeClass: function (arg) {
		if (Router.current().route._path.indexOf(arg) === -1) {
			return '';
		}
		return 'active';
	}
})