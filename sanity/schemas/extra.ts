import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'extra',
  title: 'Extra',
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
      name: 'show',
      title: 'Show',
      type: 'reference',
      to: [{type: 'show'}],
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
      name: 'muxPlaybackId',
      title: 'Mux Playback ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This will be used for URLs. The frontend will construct paths like: show-name/extras/this-slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      showName: 'show.title',
      media: 'thumbnail',
    },
    prepare({title, showName, media}) {
      return {
        title: `${showName}: ${title}`,
        subtitle: '',
        media,
      }
    },
  },
}) 