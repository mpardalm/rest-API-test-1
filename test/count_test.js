/*
 * Created Date: Thursday, April 29th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = `http://localhost:${process.env.PORT || 8080}`;

describe('Get count from Redis', () => {
    it('Should return a 200 status', (done) => {
        chai.request(url)
            .get('/count')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return json as default data format', (done) => {
        chai.request(url)
            .get('/count')
            .end((err, res) => {
                expect('Content-Type', /json/);
                done();
            });
    });

    it('Should return one Object length', (done) => {
        chai.request(url)
            .get('/count')
            .end((err, res) => {
                expect(Object.keys(res.body).length).be.equal(1);
                done();
            });
    });

    it('Should return a String in the count value', (done) => {
        chai.request(url)
            .get('/count')
            .end((err, res) => {
                expect(res.body.count).to.satisfy((response) => {
                    return typeof response == 'string'
                });
                done();
            });
    });
});
