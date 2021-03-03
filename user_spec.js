'use strict';

const assert = require('assert');
const user = require('../src/user');
const mocks = require('./user/http_mocks');


describe('user', function() {

  it('Test expectStatus works as... well, expected', function(doneFn) {
    mocks.use(['getUser1']);

    user.fetch(testHost + '/users/1')
      .expect('status', 200)
      .done(doneFn);
  });

  it('should handle a 204 response with no content', function(doneFn) {
    mocks.use(['noContent']);

    user.fetch(testHost + '/contents/none')
      .expect('status', 204)
      .done(doneFn);
  });

  it('should handle a 204 response with no content and then()', function(doneFn) {
    mocks.use(['noContent']);

    user.fetch(testHost + '/contents/none')
      .expect('status', 204)
      .then((res) => {
        expect(res.body).toEqual('');
      })
      .done(doneFn);
  });

  it('should support JSON natively', function (doneFn) {
    mocks.use(['createUser2']);

    user.post(testHost + '/users', {
      body: {
        email: 'user@example.com',
        password: 'password'
      }
    })
      .expect('status', 201)
      .done(doneFn);
  });

  it('should allow custom expect handlers to be registered and used', function (doneFn) {
    mocks.use(['getUser1']);
    user.addExpectHandler('customUserResponse', function(response) {
      let json = response.json;
      expect(json.id).toBe(1);
      expect(json.email).toBe('joe.schmoe@example.com');
    });
    user.get(testHost + '/users/1')
      .expect('customUserResponse')
      .done(doneFn);
      user.removeExpectHandler('customUserResponse');
  });

  it('should allow custom expect functions to be used without registering them', function (doneFn) {
    mocks.use(['getUser1']);
    user.get(testHost + '/users/1')
      .then(function (res) {
        let json = res.json;

        expect(json.id).toBe(1);
        expect(json.email).toBe('joe.schmoe@example.com');
      })
      .done(doneFn);
  });

  it('should allow POST with empty request body', function (doneFn) {
    mocks.use(['postError']);

    user.post(testHost + '/error')
      .expect('status', 400)
      .expect('json', {
        result: 'error'
      })
      .done(doneFn);
  });

  it('should allow DELETE with request body', function (doneFn) {
    mocks.use(['deleteUsers']);

    user.delete(testHost + '/users', {
      body: {
        data: [
          {id: 2},
          {id: 3}
        ]
      }
    })
      .expect('status', 200)
      .expect('json', {
        data: [
          {id: 2},
          {id: 3}
        ]
      })
      .done(doneFn);
  });

  it('should allow DELETE with text request body', function (doneFn) {
    mocks.use(['deleteContent']);

    user.delete(testHost + '/contents/1', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'something something'
    })
      .expect('status', 200)
      .expect('bodyContains', 'something something')
      .done(doneFn);
  });
