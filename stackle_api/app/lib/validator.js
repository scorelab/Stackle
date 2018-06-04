/**
 * pass the input from app
 * @param { Object } input 
 */
function Validator(input) {
  this.input = input;
};


Validator.prototype.validateAddingPost = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('title')) { throw new Error('Attribute title is missing'); }

  if (!!!~Object.keys(this.input).indexOf('description')) { throw new Error('Attribute description is missing'); }

  if (!!!~Object.keys(this.input).indexOf('repository')) { throw new Error('Attribute repository is missing'); }

  if (!!!~Object.keys(this.input).indexOf('org_name')) { throw new Error('Attribute org_name is missing'); }

  if (!!!~Object.keys(this.input).indexOf('tags')) { throw new Error('Attribute tags is missing'); }

  if (!!!~Object.keys(this.input).indexOf('link_issue')) { throw new Error('Attribute link_issue is missing'); }

  if (!!!~Object.keys(this.input).indexOf('user')) { throw new Error('Attribute user is missing'); }

  if (!!!~Object.keys(this.input).indexOf('date')) { throw new Error('Attribute date is missing'); }

  if (!!!~Object.keys(this.input).indexOf('votes')) { throw new Error('Attribute votes is missing'); }

  return this.input;
};


Validator.prototype.validateGetPost = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('postId')) { throw new Error('Attribute postId is missing'); }

  return this.input;
};


Validator.prototype.validateUserId = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('userId')) { throw new Error('Attribute userId is missing'); }

  return this.input;
};


Validator.prototype.validateDeletePost = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('postId')) { throw new Error('Attribute postId is missing'); }

  return this.input;
};

Validator.prototype.validatePostsByUser = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('user')) { throw new Error('Attribute user is missing'); }

  return this.input;
};

Validator.prototype.validatePostToOrganisation = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('organisationName')) { throw new Error('Attribute organisationName is missing'); }

  return this.input;
};

Validator.prototype.validateGetOrganisationDetails = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('organisationName')) { throw new Error('Attribute organisationName is missing'); }

  return this.input;
};


Validator.prototype.validateStackId = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('stackId')) { throw new Error('Attribute stackId is missing'); }

  return this.input;
};

//Validating PostId
Validator.prototype.validateCommentOnPost = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('postId')) { throw new Error('Attribute postId is missing'); }

  return this.input;
};

//Validating Comment Body
Validator.prototype.validateCommentBody = function(){
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('description')) { throw new Error('Attribute description is missing'); }

  if (!!!~Object.keys(this.input).indexOf('user')) { throw new Error('Attribute user is missing'); }

  if (!!!~Object.keys(this.input).indexOf('votes')) { throw new Error('Attribute votes is missing'); }

  if (!!!~Object.keys(this.input).indexOf('date')) { throw new Error('Attribute date is missing'); }

  return this.input;
}

//Validating commentId
Validator.prototype.validateCommentId = function(){
   if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('commentId')) { throw new Error('Attribute commentId is missing'); }

  return this.input;
}

//to Validate the Post Id while hitting endpoints of the APIs
Validator.prototype.validatePostId = function(){
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('postId')) { throw new Error('Attribute postId is missing'); }

  return this.input;
}

Validator.prototype.validateAddTag = function(){
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('tag')) { throw new Error('Attribute tag is missing'); }

  return this.input;
}

Validator.prototype.validateCreateStack = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('name')) { throw new Error('Attribute name is missing'); }

  if (!!!~Object.keys(this.input).indexOf('description')) { throw new Error('Attribute description is missing'); }

  if (!!!~Object.keys(this.input).indexOf('stackleUrl')) { throw new Error('Attribute stackleUrl is missing'); }

  // if (!!!~Object.keys(this.input).indexOf('githubUrl')) { throw new Error('Attribute githubUrl is missing'); }

  if (!!!~Object.keys(this.input).indexOf('createdUser')) { throw new Error('Attribute createdUser is missing'); }

  return this.input;
};

Validator.prototype.validateDeleteStack = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('stackId')) { throw new Error('Attribute stackId is missing'); }

  return this.input;
};

Validator.prototype.validateUserSubscribeStack = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('stackId')) { throw new Error('Attribute stackId is missing'); }

  if (!!!~Object.keys(this.input).indexOf('userId')) { throw new Error('Attribute userId is missing'); }

  return this.input;
};

Validator.prototype.validateGetUserSubscribeStack = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('userId')) { throw new Error('Attribute userId is missing'); }

  return this.input;
};

Validator.prototype.validateCreateNewUser = function() {
  if (!this.input) { throw new Error('Input is undefined'); }

  if (!Object.keys(this.input).length) { throw new Error('Empty Object has been passed'); }

  if (!!!~Object.keys(this.input).indexOf('token')) { throw new Error('Attribute token is missing'); }

  if (!!!~Object.keys(this.input).indexOf('userId')) { throw new Error('Attribute userId is missing'); }

  if (!!!~Object.keys(this.input).indexOf('email')) { throw new Error('Attribute email is missing'); }

  if (!!!~Object.keys(this.input).indexOf('name')) { throw new Error('Attribute name is missing'); }

  return this.input;
};

module.exports.Validator = Validator;