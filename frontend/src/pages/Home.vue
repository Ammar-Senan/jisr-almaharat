<template>
  <div class="mx-20">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-5xl font-black text-gray900">Lists</h2>
      <Button icon-left="plus">New List</Button>
    </div>

    <div class="mt-2">
      <Card title="organizations">
        <div>
          <ul>
            <li v-for="organization in organizations.data" :key="organization.organization_title">
              {{ organization.website }} - {{ organization.organization_name }}
            </li>
          </ul>
        </div>
      </Card>
    </div>
    <div><h1>hello</h1></div>
  </div>
</template>

<script setup>
import { Dialog, createListResource } from 'frappe-ui'

const organizations = createListResource({
  doctype: 'Organization',
  fields: ["organization_name","website"],
  limit: 10
})

organizations.reload()

</script>
