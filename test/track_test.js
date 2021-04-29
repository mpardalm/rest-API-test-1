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

describe('Post track', () => {
    it('Should return a 400 status', (done) => {
        chai.request(url)
            .post('/track')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equals('Empty body');
                done();
            });
    });

    it('Should return a 400 status on a string value body', (done) => {
        chai.request(url)
            .post('/track')
            .send('')
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equals('Empty body');
                done();
            });
    });

    it('Should return a 201 status', (done) => {
        chai.request(url)
            .post('/track')
            .send({ name: 'test' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('Should return a 201 status and not modify Redis value count', (done) => {
        chai.request(url).get('/count').end((err, res) => {
            const countInit = res.body.count;

            chai.request(url)
                .post('/track')
                .send({ name: 'test' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    chai.request(url).get('/count').end((err, res) => {
                        const countEnd = res.body.count;
                        expect(countInit).to.be.equals(countEnd);
                        done();
                    });
                });
        });
    });

    it('Should return a 201 status and Redis value count (number) must be modified', (done) => {
        chai.request(url).get('/count').end((err, res) => {
            const countInit = parseFloat(res.body.count);

            chai.request(url)
                .post('/track')
                .send({ name: 'test', count: 1 })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    chai.request(url).get('/count').end((err, res) => {
                        const countEnd = parseFloat(res.body.count);
                        expect(countEnd.toString()).to.be.equals((countInit + 1).toString());
                        done();
                    });
                });
        });
    });

    it('Should return a 201 status and Redis value count (string) must be modified', (done) => {
        chai.request(url).get('/count').end((err, res) => {
            const countInit = parseFloat(res.body.count);

            chai.request(url)
                .post('/track')
                .send({ name: 'test', count: '1' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    chai.request(url).get('/count').end((err, res) => {
                        const countEnd = parseFloat(res.body.count);
                        expect(countEnd.toString()).to.be.equals((countInit + 1).toString());
                        done();
                    });
                });
        });
    });
});