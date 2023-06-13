const joi = require('@hapi/joi');

module.exports = {
    'usernotifications': {
        'body': {
            'name': joi.string().required(),
            'email': joi.string().required(),
            'notifications': joi.object()
        }
    }
};