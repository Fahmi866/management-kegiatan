<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Dashboard Kegiatan</h1>
    
    <KegiatanForm @add="addKegiatan" />

    <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4 font-semibold">Kegiatan</th>
            <th class="p-4 font-semibold">Jadwal</th>
            <th class="p-4 font-semibold">Status</th>
            <th class="p-4 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in list" :key="k.id" class="border-t hover:bg-gray-50 transition">
            <td class="p-4 font-medium">{{ k.nama }}</td>
            <td class="p-4 text-sm text-gray-600">
              {{ k.jam }} | {{ k.hari }}, {{ k.bulan }} {{ k.tahun }}
            </td>
            <td class="p-4">
              <span :class="k.selesai ? 'text-green-600 font-bold' : 'text-red-500 font-semibold'">
                {{ k.selesai ? 'Selesai ✓' : 'Pending ⌛' }}
              </span>
            </td>
            <td class="p-4">
              <button 
                v-if="!k.selesai" 
                @click="tandaiSelesai(k.id)" 
                class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
              >
                Tandai Selesai
              </button>
            </td>
          </tr>
          <tr v-if="list.length === 0">
            <td colspan="4" class="p-8 text-center text-gray-400 italic">Belum ada kegiatan yang ditambahkan.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import KegiatanForm from './KegiatanForm.vue';

// 1. Inisialisasi State dengan data dari localStorage (jika ada)
const list = ref(JSON.parse(localStorage.getItem('kegiatanList')) || []);

// 2. Fungsi menambah kegiatan
const addKegiatan = (data) => {
  list.value.push(data);
};

// 3. Fungsi menandai selesai
const tandaiSelesai = (id) => {
  const item = list.value.find(k => k.id === id);
  if (item) {
    item.selesai = true;
  }
};

// 4. Watcher: Otomatis simpan ke localStorage setiap kali 'list' berubah
watch(list, (newList) => {
  localStorage.setItem('kegiatanList', JSON.stringify(newList));
}, { deep: true });

</script>