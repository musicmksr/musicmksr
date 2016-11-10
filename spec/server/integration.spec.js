'use strict';

const request = require('supertest-as-promised');

// test that song can be sent to front end
describe('/api/song/bigkik.wav', function() {
	it('should echo the correct song', function(done) {
		request(this.app)
			.get('/api/sample/chord.wav')
			.then((res) =>{
				expect(res.statusCode).toEqual(200);
				expect(res.headers['content-type']).toEqual('audio/wav');
				expect(res.buffered).toEqual(true);
				done();
			});
	});
});