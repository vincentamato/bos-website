import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'muxPlaybackId',
      title: 'Mux Playback ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'show',
      title: 'Show',
      type: 'reference',
      to: [{type: 'show'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This will be automatically generated from the show and episode name. Format: show-name/episode-name',
      options: {
        source: 'title',
        maxLength: 128,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      showTitle: 'show.title',
      media: 'thumbnail',
      episodeNumber: 'episodeNumber',
    },
    prepare({title, showTitle, media, episodeNumber}) {
      return {
        title: `${showTitle} Ep ${episodeNumber}: ${title}`,
        subtitle: '',
        media,
      }
    },
  },
}) 