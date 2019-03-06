'use strict'

const jsonApi = require('../../.')
const fsasHandler = require('../handlers/fsasHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'fsas',
  description: 'Sections.',
  handlers: fsasHandler,
  searchParams: { },
  attributes: {
    name: jsonApi.Joi.string()
      .description('The fsa name')
      .example('General Questions'),
    photos: jsonApi.Joi.belongsToMany({
      resource: 'photos',
      as: 'fsa'
    })
  },
  examples: [
    {
      id: '14',
      type: 'fsas',
      name: 'Other Questions',
    },
    {
      id: '13',
      type: 'fsas',
      name: 'General Questions',
    }
  ]
})
