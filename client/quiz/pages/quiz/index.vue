<template>
    <div>
        <p>All quizzes here</p>
        <div v-for="q in quizzes">
            <nuxt-link :to = "`/quiz/${q.quiz_id}`">{{ q.title }}</nuxt-link>
        </div>
    </div>
</template>

<script setup>
//fetching quizzes
    const {data: quizzes} = await useFetch('http://localhost:8000/quiz');
    console.log(quizzes);
</script>