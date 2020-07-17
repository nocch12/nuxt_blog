import client from '~/plugins/contentful'
import defaultEyeCatch from '~/assets/img/eyecatch.jpg'

export const state = () => ({
  posts: [],
})

export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields)
      return {
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title,
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
}

export const actions = {
  async getPosts({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate',
      })
      .then((res) => commit('setPosts', res.items))
      .catch((err) => console.error(err))
  },
}
