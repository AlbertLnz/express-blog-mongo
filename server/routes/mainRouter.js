import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

router.get('/', (_req, res) => {

  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with NodeJS, ExpressJS & MongoDB" 
  }

  res.render('index', locals)
})

function insertPostData() {

  Post.insertMany([
    {
      title: '10 Essential Tips for Beginner Bloggers',
      body: 'Learn valuable insights on how to kickstart your blogging journey with these expert tips.'
    },
    {
      title: 'The Power of Visual Content in Blogging',
      body: 'Discover why incorporating captivating visuals can significantly enhance the impact of your blog posts.'
    },
    {
      title: 'Mastering the Art of SEO: Boost Your Blogs Visibility',
      body: 'Explore advanced strategies and techniques to optimize your blog for search engines and attract more organic traffic.'
    },
    {
      title: 'Unleashing Creativity: Finding Your Unique Blogging Voice',
      body: 'Unlock your creative potential and learn how to develop a distinctive voice that resonates with your audience.'
    },
    {
      title: 'The Evolution of Blogging: Trends to Watch in 2024',
      body: 'Stay ahead of the curve by exploring the latest trends shaping the blogging landscape in the digital age.'
    },
    {
      title: 'From Passion to Profit: Monetization Strategies for Bloggers',
      body: 'Turn your passion for blogging into a lucrative venture with effective monetization strategies and revenue streams.'
    },
    {
      title: 'Navigating the Challenges of Blogging: Overcoming Writers Block',
      body: 'Discover practical tips and techniques to overcome writers block and maintain consistent productivity in your blogging journey.'
    },
    {
      title: 'The Importance of Community: Building Connections Through Blogging',
      body: 'Explore the benefits of fostering a supportive community around your blog and cultivating meaningful relationships with your audience.'
    },
    {
      title: 'Blogging for Social Change: Using Your Platform to Make a Difference',
      body: 'Learn how to leverage your blog as a powerful tool for advocacy and social impact in todays interconnected world.'
    },
    {
      title: 'The Science of Engaging Content: Strategies for Captivating Your Readers',
      body: 'Delve into the psychology behind creating compelling content that resonates with your audience and keeps them coming back for more.'
    },
  ])

}
insertPostData()


router.get('/about', (_req, res) => {
  res.render('about')
})

export default router 