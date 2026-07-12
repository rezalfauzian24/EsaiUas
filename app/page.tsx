"use client";
// @ts-nocheck
import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Star, Heart, X, Menu, Clock,
  CheckCircle2, ArrowLeft, Navigation2, UtensilsCrossed,
  Mountain, Landmark, Building2, ChevronDown, Send, Share2,
  AtSign, Globe, Map as MapIcon
} from "lucide-react";

/* =========================================================================
   1. MOCK DATA
   Struktur data dipisah di bagian atas file agar mudah dipindahkan ke
   database / API nyata nantinya (cukup ganti array ini dengan hasil fetch).
   ========================================================================= */

const DESTINASI_DATA = [
  {
    id: "d1",
    nama: "Kawah Putih",
    wilayah: "Bandung",
    kategori: "Alam",
    rating: 4.7,
    ulasanHitung: 3210,
    jamOperasional: "07.00 - 17.00 WIB (Setiap Hari)",
    deskripsiSingkat: "Danau kawah vulkanik berwarna putih kehijauan yang dikelilingi pasir belerang.",
    deskripsiLengkap:
      "Kawah Putih adalah danau kawah vulkanik hasil letusan Gunung Patuha ratusan tahun lalu. Airnya yang berwarna putih kehijauan berubah-ubah tergantung kadar belerang dan cuaca, menciptakan pemandangan yang terasa seperti negeri lain. Udara di sekitar kawah cukup dingin karena berada di ketinggian sekitar 2.400 mdpl, sehingga disarankan membawa jaket. Kawasan ini juga sering dipakai sebagai lokasi foto pre-wedding maupun syuting film.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Kawah_Putih_Bandung_Indonesia.jpg?width=800",
    fasilitas: ["Parkir", "Toilet", "Mushola", "Spot Foto", "Warung Makan", "Shuttle Kawasan"],
    koordinatMock: { lat: -7.1663, lng: 107.4025 },
    ulasanAwal: [
      { nama: "Rina A.", rating: 5, komentar: "Pemandangannya luar biasa, wajib bawa masker karena bau belerang cukup kuat.", tanggal: "2026-05-02" },
      { nama: "Daniel S.", rating: 4, komentar: "Udara dingin banget, tapi worth it. Sebaiknya datang pagi sebelum ramai.", tanggal: "2026-04-18" },
    ],
  },
  {
    id: "d2",
    nama: "Tangkuban Perahu",
    wilayah: "Bandung",
    kategori: "Alam",
    rating: 4.6,
    ulasanHitung: 4520,
    jamOperasional: "07.00 - 17.00 WIB (Setiap Hari)",
    deskripsiSingkat: "Gunung berapi aktif berbentuk perahu terbalik dengan legenda Sangkuriang.",
    deskripsiLengkap:
      "Gunung Tangkuban Perahu terkenal karena bentuknya yang menyerupai perahu terbalik jika dilihat dari kejauhan, serta legenda rakyat Sangkuriang yang melekat padanya. Wisatawan dapat melihat langsung kawah Ratu dari bibir kawah tanpa perlu mendaki jauh, menjadikannya destinasi yang ramah untuk keluarga maupun lansia. Suhu udara yang sejuk dan pemandangan asap belerang menambah suasana khas pegunungan Jawa Barat.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Indonesia_Bandung_Tangkuban_Perahu.JPG?width=800",
    fasilitas: ["Parkir", "Toilet", "Mushola", "Spot Foto", "Pemandu Lokal", "Toko Souvenir"],
    koordinatMock: { lat: -6.7597, lng: 107.6098 },
    ulasanAwal: [
      { nama: "Putri N.", rating: 5, komentar: "Aksesnya mudah, kawahnya besar dan megah dilihat langsung.", tanggal: "2026-06-01" },
      { nama: "Bimo K.", rating: 4, komentar: "Ramai saat weekend, datang pagi supaya dapat parkir dekat.", tanggal: "2026-03-22" },
    ],
  },
  {
    id: "d3",
    nama: "Kebun Raya Bogor",
    wilayah: "Bogor",
    kategori: "Alam",
    rating: 4.6,
    ulasanHitung: 8890,
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    deskripsiSingkat: "Taman botani bersejarah dengan ribuan koleksi flora tropis di jantung Kota Bogor.",
    deskripsiLengkap:
      "Didirikan sejak masa kolonial, Kebun Raya Bogor menyimpan ribuan koleksi tumbuhan tropis dari seluruh Nusantara, termasuk pohon-pohon raksasa berusia ratusan tahun dan koleksi anggrek yang beragam. Kawasan ini juga menjadi rumah bagi museum zoologi serta jembatan gantung yang populer sebagai spot foto. Suasananya yang teduh dan asri menjadikannya tempat favorit untuk piknik keluarga maupun jogging di akhir pekan.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Kebun_Raya_Bogor.jpg?width=800",
    fasilitas: ["Parkir", "Toilet", "Mushola", "Spot Foto", "Sepeda Sewaan", "Kafe"],
    koordinatMock: { lat: -6.5971, lng: 106.7973 },
    ulasanAwal: [
      { nama: "Salsa D.", rating: 5, komentar: "Adem dan rindang, cocok buat healing sambil olahraga ringan.", tanggal: "2026-05-14" },
      { nama: "Yoga P.", rating: 4, komentar: "Luas banget, sebaiknya sewa sepeda biar tidak capek jalan kaki.", tanggal: "2026-02-09" },
    ],
  },
  {
    id: "d4",
    nama: "Pantai Pangandaran",
    wilayah: "Pangandaran",
    kategori: "Alam",
    rating: 4.5,
    ulasanHitung: 6120,
    jamOperasional: "24 Jam (Loket Utama 06.00 - 18.00 WIB)",
    deskripsiSingkat: "Pantai populer dengan pasir putih, ombak tenang di sisi timur, dan sunset di sisi barat.",
    deskripsiLengkap:
      "Pantai Pangandaran unik karena memiliki dua sisi pantai dalam satu kawasan: sisi timur dengan ombak tenang cocok untuk berenang dan melihat matahari terbit, serta sisi barat yang menghadap ke arah matahari terbenam. Kawasan ini juga berdekatan dengan Cagar Alam Pananjung tempat wisatawan bisa melihat rusa dan monyet liar. Deretan warung seafood segar di sepanjang pantai menjadi daya tarik tersendiri bagi pecinta kuliner laut.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Pantai_Pangandaran.jpg?width=800",
    fasilitas: ["Parkir", "Toilet", "Mushola", "Spot Foto", "Penyewaan Alat Snorkeling", "Warung Seafood"],
    koordinatMock: { lat: -7.7008, lng: 108.6503 },
    ulasanAwal: [
      { nama: "Fadli R.", rating: 4, komentar: "Pantainya bersih, seafood-nya enak dan murah.", tanggal: "2026-04-30" },
      { nama: "Melisa T.", rating: 5, komentar: "Sunset di sisi barat cantik banget, wajib difoto.", tanggal: "2026-01-11" },
    ],
  },
  {
    id: "d5",
    nama: "Gunung Padang",
    wilayah: "Cianjur",
    kategori: "Sejarah",
    rating: 4.4,
    ulasanHitung: 1540,
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    deskripsiSingkat: "Situs megalitikum terbesar di Asia Tenggara dengan susunan batu punden berundak.",
    deskripsiLengkap:
      "Gunung Padang merupakan situs punden berundak yang disusun dari ribuan batu kolom vulkanik dan dipercaya sebagai salah satu situs megalitikum terbesar di Asia Tenggara. Untuk mencapai teras puncak, pengunjung akan menaiki ratusan anak tangga curam yang menyuguhkan pemandangan perbukitan hijau di sekelilingnya. Situs ini masih menjadi objek penelitian arkeologi sekaligus tempat yang dianggap sakral oleh masyarakat setempat.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Situs_Megalitikum_Gunung_Padang_Cianjur.jpg?width=800",
    fasilitas: ["Parkir", "Toilet", "Pemandu Lokal", "Spot Foto", "Warung Kecil"],
    koordinatMock: { lat: -6.9925, lng: 107.0538 },
    ulasanAwal: [
      { nama: "Andra W.", rating: 4, komentar: "Tangganya cukup menantang tapi sepadan dengan pemandangannya.", tanggal: "2026-03-05" },
      { nama: "Citra L.", rating: 5, komentar: "Situs bersejarah yang masih terasa asli dan terjaga.", tanggal: "2026-02-19" },
    ],
  },
  {
    id: "d6",
    nama: "Saung Angklung Udjo",
    wilayah: "Bandung",
    kategori: "Budaya",
    rating: 4.8,
    ulasanHitung: 5330,
    jamOperasional: "08.00 - 17.00 WIB (Pertunjukan 15.30 WIB)",
    deskripsiSingkat: "Sanggar seni yang menampilkan pertunjukan angklung, tari, dan wayang golek khas Sunda.",
    deskripsiLengkap:
      "Saung Angklung Udjo adalah pusat budaya Sunda yang menampilkan pertunjukan musik angklung, tari tradisional, hingga wayang golek dalam satu rangkaian acara interaktif. Pengunjung tidak hanya menonton, tetapi juga diajak ikut memainkan angklung bersama para penari dan pengunjung lain di akhir pertunjukan. Tempat ini juga memproduksi angklung secara langsung, sehingga wisatawan bisa melihat proses pembuatannya dari bambu mentah hingga menjadi alat musik.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Saung_Angklung_Udjo.JPG?width=800",
    fasilitas: ["Parkir", "Toilet", "Mushola", "Spot Foto", "Toko Souvenir", "Area Pertunjukan Indoor"],
    koordinatMock: { lat: -6.8898, lng: 107.6438 },
    ulasanAwal: [
      { nama: "Hana F.", rating: 5, komentar: "Pertunjukannya meriah, anak-anak diajak ikut main angklung.", tanggal: "2026-06-10" },
      { nama: "Reza M.", rating: 5, komentar: "Cocok untuk wisatawan asing yang mau kenal budaya Sunda.", tanggal: "2026-05-27" },
    ],
  },
];

const KULINER_DATA = [
  {
    id: "k1",
    nama: "Seblak",
    wilayah: "Bandung",
    deskripsiSingkat: "Kerupuk basah berkuah pedas dengan campuran telur, sosis, dan ceker.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Seblak_1.jpg?width=600",
  },
  {
    id: "k2",
    nama: "Batagor",
    wilayah: "Bandung",
    deskripsiSingkat: "Bakso tahu goreng yang disiram saus kacang, kecap, dan jeruk limau.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Batagor_dan_Bumbu_Kacang.jpg?width=600",
  },
  {
    id: "k3",
    nama: "Surabi",
    wilayah: "Bandung",
    deskripsiSingkat: "Kue tradisional dari tepung beras dengan topping oncom pedas atau kinca manis.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Surabi_pandan_polos.jpg?width=600",
  },
  {
    id: "k4",
    nama: "Karedok",
    wilayah: "Bandung",
    deskripsiSingkat: "Salad sayuran mentah khas Sunda dengan siraman bumbu kacang segar.",
    gambarUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Karedok.JPG?width=600",
  },
];

const WILAYAH_LIST = ["Semua", "Bandung", "Bogor", "Pangandaran", "Cianjur"];
const KATEGORI_LIST = [
  { label: "Alam", icon: Mountain },
  { label: "Kuliner", icon: UtensilsCrossed },
  { label: "Budaya", icon: Landmark },
  { label: "Sejarah", icon: Building2 },
];

/* =========================================================================
   2. KOMPONEN KECIL
   ========================================================================= */

function StarRating({ value, size = 16 }) {
  // Menampilkan bintang penuh, setengah dianggap dibulatkan ke bawah agar sederhana
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(value) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function KategoriBadge({ kategori }) {
  const warna = {
    Alam: "bg-emerald-700 text-white",
    Kuliner: "bg-amber-500 text-white",
    Budaya: "bg-purple-700 text-white",
    Sejarah: "bg-stone-600 text-white",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${warna[kategori] || "bg-gray-600 text-white"}`}>
      {kategori}
    </span>
  );
}

/* =========================================================================
   3. NAVBAR
   ========================================================================= */

function Navbar({ favoritCount, onNavClick, activeNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ["Beranda", "Destinasi", "Rute Wisata", "Favorit"];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-900 flex items-center justify-center">
            <Mountain size={18} className="text-amber-400" />
          </div>
          <span className="font-display font-bold text-lg text-emerald-900">Jelajah Jabar</span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavClick(item)}
              className={`text-sm font-medium transition-colors relative ${
                activeNav === item ? "text-emerald-800" : "text-gray-600 hover:text-emerald-800"
              }`}
            >
              {item === "Favorit" ? `Favorit (${favoritCount})` : item}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border border-emerald-800 text-emerald-800 hover:bg-emerald-50 transition-colors">
            <MapIcon size={16} /> Peta Digital (Mock)
          </button>
        </div>

        <button className="md:hidden text-emerald-900" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                onNavClick(item);
                setMobileOpen(false);
              }}
              className="text-left text-sm font-medium text-gray-700 py-1"
            >
              {item === "Favorit" ? `Favorit (${favoritCount})` : item}
            </button>
          ))}
          <button className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border border-emerald-800 text-emerald-800 w-fit">
            <MapIcon size={16} /> Peta Digital (Mock)
          </button>
        </div>
      )}
    </header>
  );
}

/* =========================================================================
   4. HERO + SEARCH & FILTER
   ========================================================================= */

function HeroSection({ search, setSearch, wilayah, setWilayah, kategori, setKategori }) {
  const toggleKategori = (label) => {
    // Toggle: klik kategori yang sama akan menonaktifkan filter (tampil semua lagi)
    setKategori((prev) => (prev === label ? null : label));
  };

  return (
    <section className="relative">
      <div className="relative h-[520px] sm:h-[560px] overflow-hidden">
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Perkebunan_Teh_Ciwidey,_Bandung_2016_(2).jpg?width=1600"
          alt="Pemandangan alam Jawa Barat"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-950/50 to-emerald-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-center text-center">
          <span className="text-amber-400 font-semibold tracking-wide text-sm mb-3">
            EXPLORE JAWA BARAT
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white max-w-3xl leading-tight">
            Temukan Pesona Alam, Kuliner, dan Budaya Tanah Sunda
          </h1>
          <p className="text-emerald-50/90 mt-4 max-w-xl text-sm sm:text-base">
            Dari kawah vulkanik hingga panggung angklung — rencanakan perjalananmu
            menjelajahi Jawa Barat bersama Jelajah Jabar.
          </p>
        </div>
      </div>

      {/* Search bar mengambang di atas batas hero, memakai margin negatif */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama destinasi, mis. Kawah Putih..."
                className="bg-transparent outline-none text-sm w-full text-gray-700"
              />
            </div>

            <div className="relative sm:w-48 shrink-0">
              <select
                value={wilayah}
                onChange={(e) => setWilayah(e.target.value)}
                className="appearance-none w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none"
              >
                {WILAYAH_LIST.map((w) => (
                  <option key={w} value={w}>
                    {w === "Semua" ? "Semua Wilayah" : w}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter kategori berbentuk tombol ikon, mendukung active state */}
          <div className="flex flex-wrap gap-2 mt-4">
            {KATEGORI_LIST.map(({ label, icon: Icon }) => {
              const active = kategori === label;
              return (
                <button
                  key={label}
                  onClick={() => toggleKategori(label)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                    active
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-amber-400"
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. KARTU DESTINASI + GRID
   ========================================================================= */

function DestinationCard({ destinasi, isFavorit, onToggleFavorit, onOpenDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img src={destinasi.gambarUrl} alt={destinasi.nama} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <KategoriBadge kategori={destinasi.kategori} />
        </div>
        <button
          onClick={() => onToggleFavorit(destinasi.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart size={17} className={isFavorit ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-emerald-900">{destinasi.nama}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} /> {destinasi.wilayah}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <StarRating value={destinasi.rating} />
          <span className="text-sm text-gray-500">
            {destinasi.rating} ({destinasi.ulasanHitung})
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2 flex-1">{destinasi.deskripsiSingkat}</p>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => onOpenDetail(destinasi)}
            className="w-full text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-full transition-colors"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. SECTION KULINER (SCROLLABLE)
   ========================================================================= */

function KulinerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <span className="text-amber-600 font-semibold text-sm">CITA RASA SUNDA</span>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-emerald-900 mt-1 mb-6">
        Rekomendasi Kuliner Khas
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {KULINER_DATA.map((k) => (
          <div key={k.id} className="min-w-[240px] sm:min-w-[260px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden shrink-0">
            <img src={k.gambarUrl} alt={k.nama} className="w-full h-36 object-cover" />
            <div className="p-4">
              <h4 className="font-display font-bold text-emerald-900">{k.nama}</h4>
              <p className="text-xs text-gray-500 mt-0.5">Khas {k.wilayah}</p>
              <p className="text-sm text-gray-600 mt-2">{k.deskripsiSingkat}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   7. MODAL DETAIL DESTINASI
   ========================================================================= */

function DetailModal({ destinasi, isFavorit, onToggleFavorit, onClose }) {
  const [reviews, setReviews] = useState(destinasi.ulasanAwal);
  const [formNama, setFormNama] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formKomentar, setFormKomentar] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formNama.trim() || !formKomentar.trim() || formRating === 0) return;

    // Tambahkan ulasan baru ke state lokal (client-side), paling atas
    const ulasanBaru = {
      nama: formNama.trim(),
      rating: formRating,
      komentar: formKomentar.trim(),
      tanggal: new Date().toISOString().slice(0, 10),
    };
    setReviews((prev) => [ulasanBaru, ...prev]);
    setFormNama("");
    setFormRating(0);
    setFormKomentar("");
  };

  const mapsUrl = `https://www.google.com/maps?q=${destinasi.koordinatMock.lat},${destinasi.koordinatMock.lng}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full sm:max-w-5xl sm:rounded-3xl overflow-hidden">
        {/* Hero image modal */}
        <div className="relative h-64 sm:h-80">
          <img src={destinasi.gambarUrl} alt={destinasi.nama} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            <ArrowLeft size={18} className="text-emerald-900" />
          </button>
          <button
            onClick={() => onToggleFavorit(destinasi.id)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            <Heart size={18} className={isFavorit ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button>
          <div className="absolute bottom-4 left-4">
            <KategoriBadge kategori={destinasi.kategori} />
          </div>
        </div>

        <div className="p-5 sm:p-8 grid md:grid-cols-3 gap-8">
          {/* Kolom kiri: info utama */}
          <div className="md:col-span-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-emerald-900">{destinasi.nama}</h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
              <MapPin size={15} /> {destinasi.wilayah}, Jawa Barat
            </div>
            <div className="flex items-center gap-2 mt-2">
              <StarRating value={destinasi.rating} />
              <span className="text-sm text-gray-500">{destinasi.rating} ({destinasi.ulasanHitung} ulasan)</span>
            </div>

            <p className="text-gray-700 leading-relaxed mt-5">{destinasi.deskripsiLengkap}</p>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-700">
              <Clock size={16} className="text-emerald-700" />
              <span className="font-medium">Jam Operasional:</span> {destinasi.jamOperasional}
            </div>

            <h4 className="font-display font-semibold text-emerald-900 mt-6 mb-3">Fasilitas</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-3">
              {destinasi.fasilitas.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" /> {f}
                </div>
              ))}
            </div>

            {/* Ulasan pengguna */}
            <h4 className="font-display font-semibold text-emerald-900 mt-8 mb-3">Ulasan Pengguna</h4>
            <div className="space-y-4">
              {reviews.map((r, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">{r.nama}</span>
                    <span className="text-xs text-gray-400">{r.tanggal}</span>
                  </div>
                  <StarRating value={r.rating} size={13} />
                  <p className="text-sm text-gray-600 mt-2">{r.komentar}</p>
                </div>
              ))}
            </div>

            {/* Form tambah ulasan (state lokal, client-side) */}
            <form onSubmit={handleSubmitReview} className="mt-6 bg-gray-50 rounded-xl p-4 space-y-3">
              <h5 className="font-display font-semibold text-emerald-900 text-sm">Tulis Ulasan</h5>
              <input
                type="text"
                placeholder="Nama kamu"
                value={formNama}
                onChange={(e) => setFormNama(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button type="button" key={s} onClick={() => setFormRating(s)}>
                    <Star size={20} className={s <= formRating ? "fill-amber-500 text-amber-500" : "text-gray-300"} />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Bagaimana pengalamanmu di sini?"
                value={formKomentar}
                onChange={(e) => setFormKomentar(e.target.value)}
                rows={3}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-full transition-colors"
              >
                <Send size={14} /> Kirim Ulasan
              </button>
            </form>
          </div>

          {/* Kolom kanan: info tiket + CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-4 space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-1">
                  <Clock size={16} /> Jam Kunjungan
                </div>
                <p className="font-display font-bold text-base text-emerald-900">{destinasi.jamOperasional}</p>
                <p className="text-xs text-gray-500 mt-1">Halaman ini bersifat promosi pengenalan wisata, bukan tiket/jual-beli.</p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-3 rounded-full transition-colors"
              >
                <Navigation2 size={16} /> Buka Rute di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. FOOTER
   ========================================================================= */

function Footer({ onNavClick }) {
  const wilayahCepat = ["Bandung", "Bogor", "Pangandaran", "Cianjur"];
  return (
    <footer className="bg-emerald-950 text-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Mountain size={16} className="text-emerald-950" />
            </div>
            <span className="font-display font-bold">Jelajah Jabar</span>
          </div>
          <p className="text-sm text-emerald-100/70">
            Panduan wisata, kuliner, dan budaya Jawa Barat untuk wisatawan lokal & mancanegara.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="AtSign" className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800">
              <AtSign size={16} />
            </a>
            <a href="#" aria-label="Share2" className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800">
              <Share2 size={16} />
            </a>
            <a href="#" aria-label="Globe" className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800">
              <Globe size={16} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-display font-semibold mb-3 text-sm">Wilayah Wisata</h5>
          <ul className="space-y-2 text-sm text-emerald-100/70">
            {wilayahCepat.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display font-semibold mb-3 text-sm">Navigasi</h5>
          <ul className="space-y-2 text-sm text-emerald-100/70">
            {["Beranda", "Destinasi", "Rute Wisata", "Favorit"].map((item) => (
              <li key={item}>
                <button onClick={() => onNavClick(item)} className="hover:text-white transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-900 py-5 text-center text-xs text-emerald-100/60 px-4">
        © 2026 Jelajah Jabar. Seluruh hak cipta dilindungi. Data destinasi bersifat contoh (mock).
        <br className="sm:hidden" /> Foto: koleksi kontributor Wikimedia Commons (lisensi CC BY-SA).
      </div>
    </footer>
  );
}

/* =========================================================================
   9. APP UTAMA
   ========================================================================= */

export default function App() {
  const [search, setSearch] = useState("");
  const [wilayah, setWilayah] = useState("Semua");
  const [kategori, setKategori] = useState(null);
  const [favorit, setFavorit] = useState(new Set());
  const [selectedDestinasi, setSelectedDestinasi] = useState(null);
  const [showOnlyFavorit, setShowOnlyFavorit] = useState(false);
  const [activeNav, setActiveNav] = useState("Beranda");

  const toggleFavorit = (id) => {
    setFavorit((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Logika filter utama: gabungan pencarian nama, wilayah, kategori, dan mode favorit.
  // useMemo dipakai supaya perhitungan filter tidak diulang setiap render kecuali dependensinya berubah.
  const filteredDestinasi = useMemo(() => {
    return DESTINASI_DATA.filter((d) => {
      const cocokNama = d.nama.toLowerCase().includes(search.toLowerCase());
      const cocokWilayah = wilayah === "Semua" || d.wilayah === wilayah;
      const cocokKategori = !kategori || d.kategori === kategori;
      const cocokFavorit = !showOnlyFavorit || favorit.has(d.id);
      return cocokNama && cocokWilayah && cocokKategori && cocokFavorit;
    });
  }, [search, wilayah, kategori, favorit, showOnlyFavorit]);

  const handleNavClick = (item) => {
    setActiveNav(item);
    if (item === "Favorit") {
      setShowOnlyFavorit(true);
    } else {
      setShowOnlyFavorit(false);
    }
    const el = document.getElementById(
      item === "Beranda" ? "top" : item === "Rute Wisata" ? "destinasi" : "destinasi"
    );
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Navbar favoritCount={favorit.size} onNavClick={handleNavClick} activeNav={activeNav} />

      <HeroSection
        search={search}
        setSearch={setSearch}
        wilayah={wilayah}
        setWilayah={setWilayah}
        kategori={kategori}
        setKategori={setKategori}
      />

      <section id="destinasi" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <span className="text-amber-600 font-semibold text-sm">PILIHAN TERBAIK</span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-emerald-900 mt-1 mb-2">
          {showOnlyFavorit ? "Destinasi Favorit Kamu" : "Destinasi Populer"}
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          {filteredDestinasi.length} destinasi ditemukan
        </p>

        {filteredDestinasi.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">Belum ada destinasi yang cocok dengan pencarianmu.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinasi.map((d) => (
              <DestinationCard
                key={d.id}
                destinasi={d}
                isFavorit={favorit.has(d.id)}
                onToggleFavorit={toggleFavorit}
                onOpenDetail={setSelectedDestinasi}
              />
            ))}
          </div>
        )}
      </section>

      <KulinerSection />

      <Footer onNavClick={handleNavClick} />

      {selectedDestinasi && (
        <DetailModal
          destinasi={selectedDestinasi}
          isFavorit={favorit.has(selectedDestinasi.id)}
          onToggleFavorit={toggleFavorit}
          onClose={() => setSelectedDestinasi(null)}
        />
      )}
    </div>
  );
}
