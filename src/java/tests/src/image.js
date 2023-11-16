import { describe, it } from 'mocha'
import request from 'supertest'

describe('GET /{path} (one image, one tile)', () => {
  it('should return 200 with tile image', (done) => {
    request('http://localhost:9090')
      .get(
        '/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE-1-0-0-512-512.vsi'
      )
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })
})

describe('GET /{path} (multiple images)', () => {
  it('should return 200 with tile images from one image', (done) => {
    for (let i = 1; i < 5; i++) {
      request('http://localhost:9090')
        .get(
          `/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/1_HE-${i}-0-0-512-512.vsi`
        )
        .expect(200)
        .end((err) => {
          if (err) return done(err)
        })
    }

    return done()
  })

  it('should return 200 with tile images from multiple images', (done) => {
    let completedRequests = 0

    const handleRequestCompletion = (err) => {
      if (err) return done(err)

      completedRequests++

      if (completedRequests === 5) {
        return done()
      }
    }

    for (const i of [1, 2, 3, 4, 5]) {
      const random = Math.random()
      const imagePath = `/Users/peterskriba/Documents/GitHub/school/histopathology-image-annotation-tool/test/images/`

      if (random < 0.5) {
        request('http://localhost:9090')
          .get(`${imagePath}1_HE-${i}-0-0-512-512.vsi`)
          .expect(200)
          .end(handleRequestCompletion)
      } else {
        request('http://localhost:9090')
          .get(`${imagePath}2_HE-${i}-0-0-512-512.vsi`)
          .expect(200)
          .end(handleRequestCompletion)
      }
    }
  })
})
