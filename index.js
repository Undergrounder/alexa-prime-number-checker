/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = null;

const handlers = {
    'NewSession': function () {
        //TODO
    },
    'CheckPrimeNumberIntent': function () {
        //TODO
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

const languageStrings = {
    'en-GB': {
        translation: {
            SKILL_NAME: 'Prime Number Checker',
            HELP_MESSAGE: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Prime Number Checker',
            HELP_MESSAGE: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
