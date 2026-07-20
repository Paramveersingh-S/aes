import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const SRC_DATA_DIR = path.resolve(process.cwd(), 'src/data');
const parser = new Parser({
  customFields: {
    item: ['itunes:subtitle', 'content:encoded']
  }
});

async function fetchSubstack() {
  try {
    const feed = await parser.parseURL('https://mlblueprints.substack.com/feed');
    const articles = feed.items.map(item => {
      // Find cover image from content
      let coverImage = null;
      const imgMatch = item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        coverImage = imgMatch[1];
      }

      // Find excerpt from content
      let excerpt = item.contentSnippet || "";
      if (excerpt.length > 220) {
        excerpt = excerpt.substring(0, 220) + '...';
      }

      return {
        title: item.title,
        subtitle: item['itunes:subtitle'] || excerpt.substring(0, 100),
        link: item.link,
        pubDate: item.pubDate,
        coverImage,
        excerpt,
        contentHtml: item['content:encoded'] || item.content
      };
    });

    // Sort newest first
    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    fs.writeFileSync(path.join(SRC_DATA_DIR, 'articles.json'), JSON.stringify(articles, null, 2));
    console.log('fetchSubstack complete.');
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
  }
}

fetchSubstack();
