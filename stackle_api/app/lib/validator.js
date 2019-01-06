/**
 * pass the input from app
 * @param { Object } input 
 */
function Validator(input) {
    this.input = input;
    this.inputObjKeys = Object.keys(input)
};


Validator.prototype.validateAddingPost = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.title) {
        throw new Error('Attribute title is missing');
    }

    if (!this.input.description) {
        throw new Error('Attribute description is missing');
    }

    if (!this.input.repository) {
        throw new Error('Attribute repository is missing');
    }

    if (!this.input.org_name) {
        throw new Error('Attribute org_name is missing');
    }

    if (!this.input.tags) {
        throw new Error('Attribute tags is missing');
    }

    if (!this.input.linkIssue) {
        throw new Error('Attribute link_issue is missing');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    if (!this.input.date) {
        throw new Error('Attribute date is missing');
    }

    return this.input;
};


Validator.prototype.validateGetPost = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.postId) {
        throw new Error('Attribute postId is missing');
    }

    return this.input;
};


Validator.prototype.validateUserId = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.userId) {
        throw new Error('Attribute userId is missing');
    }

    return this.input;
};


Validator.prototype.validateDeletePost = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.postId) {
        throw new Error('Attribute postId is missing');
    }

    return this.input;
};

Validator.prototype.validatePostsByUser = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    return this.input;
};

Validator.prototype.validatePostToOrganisation = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.organisationName) {
        throw new Error('Attribute organisationName is missing');
    }

    return this.input;
};

Validator.prototype.validateGetOrganisationDetails = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.organisationName) {
        throw new Error('Attribute organisationName is missing');
    }

    return this.input;
};


Validator.prototype.validateStackId = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.stackId) {
        throw new Error('Attribute stackId is missing');
    }

    return this.input;
};

// To validate user while getting comments by user
Validator.prototype.validateCommentsByUser = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    return this.input;
}

//Validating PostId
Validator.prototype.validateCommentOnPost = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.postId) {
        throw new Error('Attribute postId is missing');
    }

    return this.input;
};

//Validating Comment Body
Validator.prototype.validateCommentBody = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.description) {
        throw new Error('Attribute description is missing');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    if (!this.input.date) {
        throw new Error('Attribute date is missing');
    }

    return this.input;
}

//Validating commentId
Validator.prototype.validateCommentId = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.commentId) {
        throw new Error('Attribute commentId is missing');
    }

    return this.input;
}

//to Validate the Post Id while hitting endpoints of the APIs
Validator.prototype.validatePostId = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.postId) {
        throw new Error('Attribute postId is missing');
    }

    return this.input;
}

Validator.prototype.validateAddTag = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.tag) {
        throw new Error('Attribute tag is missing');
    }

    return this.input;
}

Validator.prototype.validateCreateStack = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.name) {
        throw new Error('Attribute name is missing');
    }

    if (!this.input.description) {
        throw new Error('Attribute description is missing');
    }

    if (!this.input.stackleUrl) {
        throw new Error('Attribute stackleUrl is missing');
    }

    // if (!!!~this.inputObjKeys.indexOf('githubUrl')) { throw new Error('Attribute githubUrl is missing'); }

    if (!this.input.createdUser) {
        throw new Error('Attribute createdUser is missing');
    }

    return this.input;
};

Validator.prototype.validateDeleteStack = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.stackId) {
        throw new Error('Attribute stackId is missing');
    }

    return this.input;
};

Validator.prototype.validateUserSubscribeStack = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!!!~this.inputObjKeys.indexOf('stackId')) {
        throw new Error('Attribute stackId is missing');
    }

    if (!this.input.userId) {
        throw new Error('Attribute userId is missing');
    }

    return this.input;
};


Validator.prototype.validateGetUserSubscribeStack = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.userId) {
        throw new Error('Attribute userId is missing');
    }

    return this.input;
};

Validator.prototype.validateCreateNewUser = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.token) {
        throw new Error('Attribute token is missing');
    }

    if (!this.input.userId) {
        throw new Error('Attribute userId is missing');
    }

    if (!this.input.email) {
        throw new Error('Attribute email is missing');
    }

    if (!this.input.name) {
        throw new Error('Attribute name is missing');
    }

    return this.input;
};


//Validating Reply Body
Validator.prototype.validateReplyBody = function() {

    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.description) {
        throw new Error('Attribute description is missing');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    if (!this.input.date) {
        throw new Error('Attribute date is missing');
    }

    return this.input;

}

// To validate user while getting replies by user
Validator.prototype.validateRepliesByUser = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.user) {
        throw new Error('Attribute user is missing');
    }

    return this.input;
}

//Validating reply ID
Validator.prototype.validateReplyId = function() {
    if (!this.input) {
        throw new Error('Input is undefined');
    }

    if (!this.inputObjKeys.length) {
        throw new Error('Empty Object has been passed');
    }

    if (!this.input.replyId) {
        throw new Error('Attribute replyId is missing');
    }

    return this.input;
}

module.exports.Validator = Validator;