import ImgixClient from '@imgix/js-core'

const client = new ImgixClient({
  domain: 'wataru86.imgix.net',
  secureURLToken: process.env.IMGIX_TOKEN,
})

const baseImageUrl = 'https://user-images.githubusercontent.com/34445284/170053649-3882bfb2-a8dc-49e5-80f4-c633186c7784.png'

export const buildOgImageUrl = (title: string) => {
  return client.buildURL(baseImageUrl, {
    mark64: client.buildURL('~text', {
      w: 1000,
      txt: title,
      'txt-size': 75,
      'txt-align': 'middle,center',
    }),
    'mark-x': 90,
    'mark-y': 180,
  })
}