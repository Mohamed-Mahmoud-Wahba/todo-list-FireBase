<template>
 <div class="body">
  <h1 class="text-center pt-5 text-success ">Todo List</h1>
  <form @submit.prevent="addTodo">
    <div class="form-group  justify-content-center d-flex pt-4 mb-4">
      <input v-model="newTodoContent" type="text" placeholder="Enter Your todos">
      <button type="button" :disabled="!newTodoContent" class="bg-danger" @click="addTodo">Enter</button>
    </div> 
  </form>
<div class="my-todos">
  <b-card class="loop mt-4" v-for="todo in todos" :key="todo"  :class="{ 'success' : todo.done}">
    <b-card-text :class="{'white linethrouth': todo.done}"> {{ todo.content }}</b-card-text>
    <div>
      <button class="btn my-button" @click="togleDone(todo.id)" :class="todo.done ? 'bg-info' : 'text-white'">
        &check;
      </button>
      <button class="btn button" @click="deleteTodo(todo.id)">
        &cross;
      </button>
    </div>
  </b-card> 
</div>


 </div> 
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc   } from "firebase/firestore";
 import { db } from '@/firebase'
const todos = ref([])
const todoCollectionRef = collection(db, 'todos')

onMounted(() => {
onSnapshot(todoCollectionRef, (querySnapshot) => {
  const fbTodos = [];
  querySnapshot.forEach((doc) => {
  const todo = {
    id: doc.id,
    content: doc.data().content,
    done: doc.data().done
  }
  fbTodos.push(todo)
  });
  todos.value = fbTodos
});
})

const newTodoContent = ref('')
const addTodo = () => {
 addDoc(todoCollectionRef, {
  content: newTodoContent.value,
  done: false,
  date: Date.now()
});
newTodoContent.value = ''

}


const deleteTodo = id => {
  deleteDoc(doc(todoCollectionRef, id));
}
const togleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id )
updateDoc( doc(todoCollectionRef, id), {
  done: !todos.value[index].done
});
}
</script>
<style lang="css" scoped>
.body{
font-family: sans-serif;
}
input{
  border: none;
  background-color: #eee;
  padding: 10px 15px 10px 15px;
  width: 20%;
  }
  input:focus-visible{
    outline: none;
  }
  button{
    border: none;
    background-color: #eee;
    padding: 10px 15px 10px 15px;
    width: 7%;
    color: #fff;
  }
  .button{
    background-color: #135213;
    width: 72px;
  }
  .card-text{
    justify-content: space-between;
    display: flex;
    
  }
  .my-button{
    width: 72px;
    background-color: brown;
  }
  .bg{
    background-color: #00f;
  }
  .loop{
    color: #000;
    box-shadow: 2px 2px 14px 6px #ccc;
    width: 500px;
  }
  .linethrouth{
    text-decoration: line-through;
    color: #1c7050;
  }
  p{
    font-size: 20px;
  }
  .success{
    background-color: #baedc6 !important;
  }
  .my-todos{
    justify-content: center;
    display: grid;
  }
  .card-body{
    display: flex;
    justify-content: space-between;
  }
</style>