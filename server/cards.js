Meteor.publish('cards', function(userId) {
	Cards.allow({
    	'insert': function (userId,doc) {
      		return true;
    	},
    	'remove': function (userId,doc) {
      		return true;
    	},
    	update: function(userId, lugares, fields, modifier){
    	    return true
    	}
    });

  	return Cards.find({owner: userId});
});