describe('Stackle homepage', function() {
	it("Test Login Button",function(){
		browser.get('http://localhost:9000/');
		element(by.buttonText('Login')).click();
	});
	it("Sign in through github and continue if returning",function(){
		browser.get('http://localhost:9000/');
		element(by.buttonText('Login')).click();
		browser.sleep(2500);
		var ifAlready = $('div.a0-github');
		if(browser.isElementPresent(ifAlready)){
			ifAlready.click();		
		} else {
			$('div.a0-guest').click();
		};
	});
	it("Loggin in with invalid credentials",function(){
		browser.get('http://localhost:9000/');
		element(by.buttonText('Login')).click();
		browser.sleep(5000);
		var ifAlready = $('div.a0-github');
		if(browser.isElementPresent(ifAlready)){
			$('div.a0-email div.a0-input-box input').clear().sendKeys('someone@mail.com');
			$('div.a0-password div.a0-input-box input').clear().sendKeys('incorrect');
			$('div.a0-action button').click();
			browser.sleep(2000);
			expect($('h2.a0-error').getText()).toEqual('Wrong email or password.');
		} else {
			$('div.a0-guest').click();
		};
	});
});
