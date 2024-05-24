// pages/api/sitemap.js

import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';

export default async function handler(req, res) {
  try {
    const smStream = new SitemapStream({ hostname: 'https://consumecare.site' });
    const pipeline = smStream.pipe(createGzip());

    // Tambahkan URL ke sitemap
    smStream.write({ url: '/', priority: 1.0 });
    smStream.write({ url: '/team', priority: 1.0 });
    smStream.write({ url: '/about', priority: 0.8 });
    smStream.write({ url: '/blog', priority: 0.8 });
    smStream.write({ url: '/quiz', priority: 0.8 });


    smStream.write({ url: '/blog/qedfCmD94NklWmtWbtay', changefreq: 'daily', priority: 0.8 });
    smStream.write({ url: '/blog/VpwipB6Dmt0eEIlGJbBO', changefreq: 'daily', priority: 0.8 });
    // Tambahkan URL lainnya sesuai kebutuhan

    smStream.end();

    // Set header untuk respons
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');

    // Pipe sitemap ke respons
    pipeline.pipe(res).on('error', (e) => { throw e; });

    // Konversi stream ke promise
    await streamToPromise(pipeline);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}