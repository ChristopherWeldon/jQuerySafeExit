/**
 * Prompts users to confirm navigation away from the page if changes were detected without a save.
 * @author OHSU BMISR
 */
jQuery.safeExit = function(options) {
	var settings = $.extend({
		'message' : 'You may have edited content without saving, are you sure you want to exit?',
		'xPathForChange' : '.input',
		'xPathForSave' : '[type="submit"]'
	}, options);
	//TODO add logic to store default state?
	//Bool, tracks status of changes
	var isSafe = true;
	
	/**
	 * Encapsulates event binding (beforeunload) based on isSafe variable
	 */
	function updateExitStatus(isSafe) {
		if(isSafe) {
			$(window).unbind('beforeunload');
		} else {
			$(window).bind('beforeunload', function() {
				return '';
			});
		}
	}


	//Bind jQuery's “change” event to DOM Elements that match Xpath
	$(settings.xPathForChange).change(function(bindBeforeUnload) {
		isSafe = false;
		updateExitStatus(isSafe);
	});

	//bind click event to element(s) that indicate a “save” based on Xpath provided
	$(settings.xPathForSave).click(function(unBindBeforeUnload) {
		isSafe = true;
		updateExitStatus(isSafe);
	});
	
	//Set defaul status
	updateExitStatus(isSafe)
}