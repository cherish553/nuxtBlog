<template>
  <div>
    <el-button>{{ name }}</el-button>
  </div>
</template>
<script>
import { login } from '@/api'
const { visits, getVisits, addStar, getStar } = login
export default {
  data() {
    return {
      name: 'cherish'
    }
  },
  mounted() {
    console.log(process.env)
    this.getStar()
  },
  methods: {
    async index() {
      const data = await visits()
      console.log(data)
    },
    async getVisits() {
      await getVisits()
    },
    async addStar() {
      await addStar()
    },
    async getStar() {
      await getStar()
    }
  }
}
</script>
