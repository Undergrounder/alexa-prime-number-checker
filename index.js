/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const primality = require('primality');

const APP_ID = 'amzn1.ask.skill.914d239e-0207-4cdf-ad3e-3d7ac834074d';

const handlers = {
    'NewSession': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE') + ' '+  this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'CheckPrimeNumberIntent': function () {
        const numberSlot = this.event.request.intent.slots.Number;
        var number = null;
        if (numberSlot && numberSlot.value) {
            try {
                number = parseInt(numberSlot.value) || null;
            }catch(err) {

            }
        }

        if(typeof number == 'number'){
            if(primality(number)){
                this.attributes.speechOutput = this.t('NUMBER_IS_PRIME', number);
            }else{
                this.attributes.speechOutput = this.t('NUMBER_IS_NOT_PRIME', number);
            }
            this.attributes.speechOutput = this.attributes.speechOutput + ' ' + this.t('CHECK_ANOTHER_NUMBER');
        }else{
            this.attributes.speechOutput = this.t('NOT_A_NUMBER');
        }

        this.attributes.repromptSpeech = this.t('HELP_REPROMT');

        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
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
            NUMBER_IS_PRIME: 'The number %d is a prime number.',
            NUMBER_IS_NOT_PRIME: 'The number %d isn\'t a prime number.',
            NOT_A_NUMBER: 'I couldn\'t recognize any number. If you wan\'t to check a number ask for example, is 30 a prime number?',
            CHECK_ANOTHER_NUMBER: 'If you wan\'t to check another number ask for example, is 30 a prime number?',
            WELCOME_MESSAGE: "Welcome to the Prime Number Checker.",
            HELP_MESSAGE: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can check if a number is a prime number saying, is 20 a prime number, or, you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Prime Number Checker',
            NUMBER_IS_PRIME: 'The number %d is a prime number.',
            NUMBER_IS_NOT_PRIME: 'The number %d isn\'t a prime number.',
            NOT_A_NUMBER: 'I couldn\'t recognize any number. If you wan\'t to check a number ask for example, is 30 a prime number?',
            CHECK_ANOTHER_NUMBER: 'If you wan\'t to check another number ask for example, is 30 a prime number?',
            WELCOME_MESSAGE: "Welcome to the Prime Number Checker.",
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
