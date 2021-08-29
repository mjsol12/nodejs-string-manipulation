import supertest from 'supertest';
const request = supertest;
import * as app from '../server/server';

describe('POST /message', function() {
    it('return a response from message', function() {
        console.log(app)
        return true
    })
})