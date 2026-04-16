export default function sitemap() {
  const baseUrl = 'https://dean-rgia-mnnit.vercel.app'
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/resource-generation`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/publications`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mou`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/dean-rgia`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/souvenir`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/announcements`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
