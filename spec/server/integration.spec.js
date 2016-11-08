'use strict';

const request = require('supertest');

describe('/api/sample', function() {
	if('should echo the correct song', function(done) {
		request(this.app)
			.get('/api/sample/chord.wav')
			.then((res) =>{
				expect(res.statusCode).toEqual(201);
				done();
			});
	});
});