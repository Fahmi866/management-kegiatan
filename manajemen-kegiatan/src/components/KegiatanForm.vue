<template>
  <div class="flex flex-col gap-3">
    <input v-model="form.nama" placeholder="Nama Kegiatan" class="p-3 border rounded" />
    <div class="grid grid-cols-2 gap-2">
      <input v-model="form.jam" type="time" class="p-3 border rounded" />
      <input v-model="form.tanggal" type="date" class="p-3 border rounded" />
    </div>
    <button @click="submit" class="bg-blue-600 text-white p-3 rounded">Tambah Kegiatan</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['add']);
const form = ref({ nama: '', jam: '', tanggal: '' });

const submit = () => {
  // Pecah tanggal menjadi hari, bulan, tahun
  const dateObj = new Date(form.value.tanggal);
  const data = {
    ...form.value,
    id: Date.now(),
    hari: dateObj.toLocaleDateString('id-ID', { weekday: 'long' }),
    tanggal_asli: dateObj.getDate(),
    bulan: dateObj.toLocaleDateString('id-ID', { month: 'long' }),
    tahun: dateObj.getFullYear(),
    selesai: false
  };
  emit('add', data);
  form.value = { nama: '', jam: '', tanggal: '' };
};
</script>