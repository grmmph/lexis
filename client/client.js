Deps.autorun(function(){
  if(Meteor.userId()){
  	Options.setCurrentStudyDefaults();
    //do your stuff
  }
});