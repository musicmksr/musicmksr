'use strict';

const request = require('supertest-as-promised');

// test headers
describe('/*', function() {
	it('should have access control headers', function(done) {
		request(this.app)
			.get('/*')
			.then((res) =>{
				expect(res.header['access-control-allow-methods'])
					.toEqual('GET, POST, OPTIONS, PUT, PATCH, DELETE');
				expect(res.header['access-control-allow-credentials'])
					.toEqual('true');
				done();
			});
	});
});

// test that song can be sent to front end
describe('/api/song/bigkik.wav', function() {
	it('should echo the correct song', function(done) {
		request(this.app)
			.get('/api/sample/chord.wav')
			.then((res) =>{
				expect(res.statusCode).toEqual(200);
				expect(res.header['content-type']).toEqual('audio/wav');
				expect(res.buffered).toEqual(true);
				done();
			});
	});
});