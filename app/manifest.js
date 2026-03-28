export default function manifest() {
  return {
    name: 'Resource Generation & International Affairs - MNNIT',
    short_name: 'MNNIT RGIA',
    description: 'The official portal for Resource Generation and International Affairs at Motilal Nehru National Institute of Technology Allahabad, Prayagraj',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/icon.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/icon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
      {
        src: '/mnnitlogo.jpg',
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
    ],
  }
}
