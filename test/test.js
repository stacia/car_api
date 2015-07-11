var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:8080');

describe('Cars', function() {

  it('errors if no location passed', function(done) {
    api.get('/cars')
    .expect(500)
    .expect({error:"No location or bad input"}, done);
  });

  it('errors if bad location passed', function(done) {
    api.get('/cars').query({location : ""})
    .expect(500)
    .expect({error:"No location or bad input"}, done);
  });

  it('Returns closest car', function(done) {
    api.get('/cars').query({location : "51.521707,-0.166881"})
    .expect(200)
    .expect(
            {
                "cars": [
                    {
                        "description": "Edgware Road - Bell St E", 
                        "latitude": 51.521707, 
                        "longitude": -0.166881
                    }, 
                    {
                        "description": "Edgware Road - Bell St W", 
                        "latitude": 51.520855, 
                        "longitude": -0.169248
                    }, 
                    {
                        "description": "Marylebone - Harewood Ave", 
                        "latitude": 51.523457, 
                        "longitude": -0.164786
                    }, 
                    {
                        "description": "Marylebone - Broadley Tce", 
                        "latitude": 51.523791, 
                        "longitude": -0.165755
                    }, 
                    {
                        "description": "Edgware Road - Chapel St", 
                        "latitude": 51.519508, 
                        "longitude": -0.167815
                    }, 
                    {
                        "description": "Marylebone - Great Central St", 
                        "latitude": 51.521648, 
                        "longitude": -0.162181
                    }, 
                    {
                        "description": "Edgware Road - Crawford Pl", 
                        "latitude": 51.518378, 
                        "longitude": -0.165729
                    }, 
                    {
                        "description": "Marylebone - Ivor Pl", 
                        "latitude": 51.524061, 
                        "longitude": -0.162593
                    }, 
                    {
                        "description": "Paddington - Merchant Sq", 
                        "latitude": 51.519342, 
                        "longitude": -0.171862
                    }, 
                    {
                        "description": "Lisson Grove - Frampton St E", 
                        "latitude": 51.525771, 
                        "longitude": -0.171668
                    }
                ]
            }

      , done);
  });

});
