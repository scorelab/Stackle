const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');


const stackSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    stackleUrl: { type: String, required: true, unique: true},
    githubUrl: String,
    createdUser: { type: String, required: true, unique: false}
});


//create a stack
stackSchema.statics.createStack = function(request, response){
	try {
			const validator = new Validator(request.body);
			const input = validator.validateCreateStack();
			console.log('Input : ', input);
			const stack = new Stack(input);
			stack.save((error, insertedStack) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedStack._id }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError.toString() }, response);
		}
}

//to get All stacks
stackSchema.statics.getAll = function(request, response){
	this.find({}, (error, stacksDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: stacksDetails }, response);
		});
}


//to get stack by ID
stackSchema.statics.getByName = function(request, response){
     try {
			const validator = new Validator(request.params);
			const input = validator.validateGetOrganisationDetails();
			Stack.findOne({ name: input.organisationName }, (error, organisationDetails) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: organisationDetails }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError.toString() }, response);
		}
}

stackSchema.statics.getById = function(request, response){
     try {
			const validator = new Validator(request.params);
			const input = validator.validateStackId();
			Stack.findOne({ _id: input.stackId }, (error, organisationDetails) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: organisationDetails }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError.toString() }, response);
		}
}



stackSchema.statics.deleteById = function(request, response){
	try {
			const validator = new Validator(request.params);
			const input = validator.validateStackId();
			
		 this.remove({_id: input.stackId}, function(err){
        	 if(err)
            	 return returnWithResponse.configureReturnData({ status: 400, success: false, result: err }, response);

        	 return returnWithResponse.configureReturnData({ status: 200, success: true, result: `Stack data removed with id : ${input.stackId}` }, response);
     
   			 });
		}
		catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError.toString() }, response);
		}
}


//to delete all post
stackSchema.statics.clearAll = function(request, response){
    this.remove({}, function(err){
         if(err)
             return returnWithResponse.configureReturnData({ status: 400, success: false, result: err }, response);
        

         return returnWithResponse.configureReturnData({ status: 200, success: true, result: `All Stack data removed.` }, response);
     
    });
}


const Stack = mongoose.model('Stack', stackSchema);
module.exports = Stack;