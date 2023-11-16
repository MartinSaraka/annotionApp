import { describe, it } from 'mocha'
import request from 'supertest'

describe('GET /crop/{path} (one image)', () => {
  it('should return 200 with centered image 500x500px', (done) => {
    request('http://localhost:9090/crop')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE-500-500-500-500-1.vsi'
      )
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  it('should return 200 with centered image 2000x3000px', (done) => {
    request('http://localhost:9090/crop')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE-5000-5000-2000-3000-1.vsi'
      )
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  it('should return 200 with corner image 3000x3000px', (done) => {
    request('http://localhost:9090/crop')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE-5000-5000-3000-3000-0.vsi'
      )
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })
})
