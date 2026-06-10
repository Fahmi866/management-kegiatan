<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <h2 class="text-2xl font-bold mb-2 text-slate-800">Selamat Datang</h2>
      <p class="text-slate-500 mb-6">Silakan login ke sistem kegiatan</p>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <input v-model="username" type="text" placeholder="Username" class="w-full p-3 border rounded-lg" required />
        </div>
        <div class="mb-6">
          <input v-model="password" type="password" placeholder="Password" class="w-full p-3 border rounded-lg" required />
        </div>
        <button class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '123') {
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  } else {
    alert('Username/Password salah!');
  }
};
</script>