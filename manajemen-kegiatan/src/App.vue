<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
    <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center">
      <div class="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-sm flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-center text-white mb-2">Login Sistem</h2>
        <div class="flex flex-col gap-3">
          <input v-model="user" type="text" placeholder="Username" class="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input v-model="pass" type="password" placeholder="Password" class="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button @click="doLogin" class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition">Masuk</button>
        </div>
        <div class="flex justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest mt-4">
          <div class="flex gap-1"><span>USER:</span><span class="text-slate-300 font-bold">admin</span></div>
          <div class="w-px h-3 bg-slate-700"></div>
          <div class="flex gap-1"><span>PASS:</span><span class="text-slate-300 font-bold">123</span></div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-black text-center mb-8 tracking-tighter text-white">WEB MANAGEMENT KEGIATAN</h1>
      
      <nav class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-700 mb-6">
        <span class="px-4 font-bold text-indigo-400">Dashboard Mahasiswa</span>
        <button @click="logout" class="px-4 py-2 bg-slate-800 hover:bg-red-900 rounded-lg text-sm transition">Logout</button>
      </nav>

      <section class="bg-slate-900 p-6 rounded-2xl border border-slate-700 mb-8 grid md:grid-cols-[2fr,1fr,1fr,auto] gap-4 items-center">
        <input v-model="form.nama" placeholder="Nama Kegiatan" class="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none focus:border-indigo-500" />
        <input v-model="form.jam" type="time" class="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none" />
        <input v-model="form.tanggal" type="date" class="p-3 bg-slate-950 border border-slate-700 rounded-lg outline-none" />
        <button @click="tambah" class="bg-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">Tambah Kegiatan</button>
      </section>

      <div class="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
        <table class="w-full text-center">
          <thead class="bg-slate-950 border-b border-slate-700">
            <tr>
              <th class="p-4 text-slate-400">Nama Kegiatan</th>
              <th class="p-4 text-slate-400">Hari</th>
              <th class="p-4 text-slate-400">Waktu & Tanggal</th>
              <th class="p-4 text-slate-400">Status</th>
              <th class="p-4 text-slate-400">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700">
            <tr v-for="k in list" :key="k.id" class="hover:bg-slate-800 transition">
              <td class="p-5 font-semibold">{{ k.nama }}</td>
              <td class="p-5 text-indigo-400 font-bold">{{ getHari(k.tanggal) }}</td>
              <td class="p-5 text-sm text-slate-400">
                <div class="font-bold text-slate-200">{{ k.jam }} WIB</div>
                <div>{{ k.tanggal }}</div>
              </td>
              <td class="p-5">
                <span :class="['px-3 py-1 rounded-full text-xs font-medium', k.selesai ? 'bg-emerald-900/30 text-emerald-300' : 'bg-amber-900/30 text-amber-300']">
                  {{ k.selesai ? 'Selesai' : 'Pending' }}
                </span>
              </td>
              <td class="p-5">
                <button v-if="!k.selesai" @click="selesaikan(k.id)" class="bg-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">Selesaikan</button>
                <span v-else class="text-slate-500 italic text-sm">Selesai</span>
              </td>
            </tr>
            <tr v-if="list.length === 0">
              <td colspan="5" class="p-8 text-slate-500 italic">Belum ada kegiatan.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isLoggedIn = ref(false);
const user = ref('');
const pass = ref('');
const list = ref([]);
const form = ref({ nama: '', jam: '', tanggal: '' });

// 1. Load Data dari LocalStorage
onMounted(() => {
  const savedList = localStorage.getItem('kegiatanList');
  if (savedList) list.value = JSON.parse(savedList);
});

// 2. Auto-save ke LocalStorage tiap list berubah
watch(list, (newList) => {
  localStorage.setItem('kegiatanList', JSON.stringify(newList));
}, { deep: true });

const doLogin = () => {
  if (user.value === 'admin' && pass.value === '123') isLoggedIn.value = true;
  else alert('Username atau Password salah!');
};

const logout = () => { isLoggedIn.value = false; };

const tambah = () => {
  if (form.value.nama && form.value.jam && form.value.tanggal) {
    list.value.push({ ...form.value, id: Date.now(), selesai: false });
    form.value = { nama: '', jam: '', tanggal: '' };
  } else alert('Mohon isi semua data!');
};

const selesaikan = (id) => {
  const item = list.value.find(k => k.id === id);
  if (item) item.selesai = true;
};

const getHari = (tanggal) => {
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return hari[new Date(tanggal).getDay()];
};
</script>