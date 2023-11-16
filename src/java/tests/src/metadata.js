import { describe, it } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'

describe('GET /metadata/{path} (one image)', () => {
  let response = null

  it('should return 200 with metadata object', (done) => {
    request('http://localhost:9090/metadata')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE.vsi'
      )
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        response = res.body
        return done()
      })
  })

  it('should have correct structure', (done) => {
    expect(response).to.be.an('object')
    expect(response).to.have.property('path')
    return done()
  })
})

describe('GET /metadata/{path} (two images)', () => {
  let response1 = null
  let response2 = null

  it('should return 200 with first metadata object', (done) => {
    request('http://localhost:9090/metadata')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE.vsi'
      )
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        response1 = res.body
        return done()
      })
  })

  it('should return 200 with second metadata object', (done) => {
    request('http://localhost:9090/metadata')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/2_HE.vsi'
      )
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        response2 = res.body
        return done()
      })
  })

  it('should have correct structure', (done) => {
    expect(response1).to.be.an('object')
    expect(response2).to.be.an('object')
    expect(response1.path).to.not.equal(response2.path)
    return done()
  })
})
