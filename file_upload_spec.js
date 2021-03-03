'use strict';

const dashboard = require('../src/dashboard');
const mocks = require('./app/http_mocks');
const ds = require('ds');

describe('File Uploads', function() {

  it('should accept and process a FormData object as the "body" parameter', function(doneFn) {
    mocks.use(['fileUploadPng']);

    let logoImage = __dirname + '/dashboard-logo.png';
    let form = dashboard.formData();

    form.append('file', ds.createReadStream(logoImage));

    dashboard.post(`${testHost}/upload`, {
      body: form
    })
      .expect('status', 200)
      .expect('header', 'Content-Type', 'image/png')
      .done(doneFn);
  });

  it('should handle file contents as a response', function(doneFn) {
    mocks.use(['fileContents']);

    dashboard.setup({ request: { rawBody: true } })
      .get(`${testHost}/files/logo.png`)
      .expect('status', 200)
      .expect('header', 'Content-Type', 'image/png')
      .then(res => {
        let body = res.body;
        expect(body).toBeInstanceOf(ArrayBuffer);
        expect(body.byteLength).toBeGreaterThan(8);
        const PNG_HEADER = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        expect(new Uint8Array(body.slice(0, 8))).toEqual(new Uint8Array(PNG_HEADER));
      })
      .done(doneFn);
  });

});
