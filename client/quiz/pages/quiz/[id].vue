<template>
    <div>
        <p>Quiz details for {{ id }}</p>
        <!-- <h2>Quiz Title : {{ questions.title }}</h2>
         <select v-model="selected">
            <option v-for="question in questions">{{ question. }}</option>
        </select> -->
        <div v-for="question in questions.questions_list">
            <label :for="`${question.questionId}`"> {{ question.question }}</label>
                <select :name = "`${question.questionId}`">
                    <option v-for="option in question.options"> {{ option }}</option>
                </select>
        </div>
        <button type = "submit">Submit</button>
         
        <p>Working</p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params;
    const {data: questions} = await useFetch(`http://localhost:8000/quiz/${id}`);
    let res = [];

    // console.log(questions);
    export default{
        data() {
            return {
                {
                    questions.questionId = []
                }
            }
        },
        methods: {
            async submit() {
                await fetch(`http://localhost:8000/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: {
                        questionId: this.questionId,
                        answer: this.answer
                    }
                })
            }
        },
    }

</script>

<!-- <style scoped></style> -->