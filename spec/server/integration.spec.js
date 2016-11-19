'use strict';

const request = require('supertest');

// test headers
describe('/*', function() {
	it('should have access control headers', function(done) {
		request(this.app)
			.get('/*')
			.then((res) =>{
				console.log(res.header['access-control-allow-methods']);
				expect(res.header['access-control-allow-methods'])
					.toEqual('GET, POST, OPTIONS, PUT, PATCH, DELETE');
				expect(res.header['access-control-allow-credentials'])
					.toEqual('true');
				done();
			})
			.catch(done.fail);
	});
});

// test that song can be sent to front end
describe('/api/sample/bigkik.wav', function() {
	it('should echo the correct song', function(done) {
		request(this.app)
			.get('/api/sample/bigkik.wav')
			.then((res) =>{
				expect(res.statusCode).toEqual(200);
				expect(res.header['content-type']).toEqual('audio/wav');
				expect(res.buffered).toEqual(true);
				done();
			})
			.catch(done.fail);
	});
});

// test that user data cannot be grabbed from DB when not logged in
describe('/api/profile/:userId', function() {
	it('should stop user info lookup if not loggedIn', function(done) {
		request(this.app)
			.get(`/api/profile/1`)
			.then((res) =>{
				expect(res.statusCode).toEqual(500);
				done();
			})
			.catch(done.fail);
	});
});