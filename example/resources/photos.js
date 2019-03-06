'use strict'

const jsonApi = require('../../.')
const photoHandler = require('../handlers/photoHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'photos',
  description: 'Used to represent all the images in the system.',
  handlers: photoHandler,
  searchParams: { },
  attributes: {
    title: jsonApi.Joi.string()
      .description('The photos title')
      .example('Summer in the Country'),
    url: jsonApi.Joi.string().uri()
      .description('A url that resolves to the photograph')
      .example('http://www.somewhere.com/image.png'),
    created: jsonApi.Joi.string().regex(/^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i)
      .description('The date on which the photo was created, ISO 8601')
      .example('2017-05-01T12:34:56Z'),
    height: jsonApi.Joi.number().min(1).max(10000).precision(0)
      .description('The photos height in pixels')
      .example(512),
    width: jsonApi.Joi.number().min(1).max(10000).precision(0)
      .description('The photos width in pixels')
      .example(512),
    raw: jsonApi.Joi.boolean()
      .default(false)
      .description('File in RAW format')
      .example(false),
    tags: jsonApi.Joi.array().items(jsonApi.Joi.string())
      .description('Tags for the photo'),
    photographer: jsonApi.Joi.one('people')
      .description('The person who took the photo'),
    articles: jsonApi.Joi.belongsToMany({
      resource: 'articles',
      as: 'photos'
    }),
    fsa: jsonApi.Joi.one('fsas')
  },
  examples: [
    {
      id: 'aab14844-97e7-401c-98c8-0bd5ec922d93',
      type: 'photos',
      title: 'Matrix Code',
      created: '2019-01-05T08:45:36Z',
      url: 'http://www.example.com/foobar',
      height: 1080,
      width: 1920,
      raw: true,
      tags: ['neo', 'morpheus'],
      photographer: { type: 'people', id: 'ad3aa89e-9c5b-4ac9-a652-6670f9f27587' },
      fsa: { type: 'fsas', id: '13' }
    },
    {
      id: '4a8acd65-78bb-4020-b9eb-2d058a86a2a0',
      type: 'photos',
      title: 'Cup of Tea',
      created: '2019-01-07T08:45:36Z',
      url: 'http://www.example.com/treat',
      height: 350,
      width: 350,
      tags: ['black', 'green'],
      photographer: { type: 'people', id: 'ad3aa89e-9c5b-4ac9-a652-6670f9f27587' },
      fsa: { type: 'fsas', id: '13' }
    },
    {
      id: '72695cbd-e9ef-44f6-85e0-0dbc06a269e8',
      type: 'photos',
      title: 'Penguins',
      created: '2019-01-06T22:15:46Z',
      url: 'http://www.example.com/penguins',
      height: 220,
      width: 60,
      tags: ['galapagos', 'emperor'],
      photographer: { type: 'people', id: 'd850ea75-4427-4f81-8595-039990aeede5' },
      fsa: { type: 'fsas', id: '14' }
    },
    {
      id: 'ed45eba1-15fe-41c7-93da-1df3dfa5289f',
      type: 'photos',
      title: 'Sunset Horizon',
      created: '2019-01-07T09:23:04Z',
      url: 'http://www.example.com/sunset',
      height: 450,
      width: 1050,
      raw: true,
      tags: ['orange', 'sky', 'sun'],
      photographer: { type: 'people', id: 'cc5cca2e-0dd8-4b95-8cfc-a11230e73116' },
      fsa: { type: 'fsas', id: '13' }
    }

  ]
})
