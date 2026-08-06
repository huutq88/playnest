"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  Mail,
  Heart,
  Star,
  CheckCircle2,
  Award,
  Truck,
  RotateCcw,
  BadgeCheck,
  Users,
  ChevronRight,
  PackageCheck,
} from "lucide-react";

export default function BaoTramKidsLandingPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tất Cả Mẫu" },
    { id: "girls", name: "Thời Trang Bé Gái" },
    { id: "boys", name: "Thời Trang Bé Trai" },
    { id: "shoes", name: "Giày Dép & Hàng Da" },
    { id: "wholesale", name: "Bán Buôn / Sỉ May Mặc" },
  ];

  const products = [
    // Bé Gái
    {
      id: 1,
      category: "girls",
      title: "Váy Đầm Công Chúa Bé Gái Premium",
      desc: "Chất liệu voan tơ cao cấp kết hợp lót cotton 100% thấm hút mồ hôi, nhẹ nhàng cho làn da bé.",
      price: "245.000đ",
      badge: "Best Seller",
      rating: 4.9,
      sold: "1.2k+",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      category: "girls",
      title: "Đầm Body Sơ Sinh Thêu Hoa Nhí",
      desc: "Vải dệt nỉ bông mỏng nhẹ, cúc bấm thông minh tiện lợi khi thay tã cho bé sơ sinh.",
      price: "155.000đ",
      badge: "Mới 2026",
      rating: 4.9,
      sold: "920+",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      category: "girls",
      title: "Bộ Áo Dài Cách Tân Bé Gái Thêu Tay",
      desc: "Áo dài gấm lụa mềm mịn kết hợp quần lụa suông thanh lịch, phù hợp lễ tết và sự kiện đặc biệt.",
      price: "320.000đ",
      badge: "Hot Trend",
      rating: 5.0,
      sold: "640+",
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      category: "girls",
      title: "Váy Xòe Vintage Cotton Hữu Cơ",
      desc: "Họa tiết caro cổ điển, dáng xòe phồng tự nhiên, 100% sợi bông hữu cơ an toàn tuyệt đối.",
      price: "195.000đ",
      badge: "Bán Chạy",
      rating: 4.8,
      sold: "1.5k+",
      image: "https://images.unsplash.com/photo-1502459526496-e30940c2dded?auto=format&fit=crop&w=600&q=80",
    },

    // Bé Trai
    {
      id: 5,
      category: "boys",
      title: "Bộ Đồ Hàn Quốc Năng Động Bé Trai",
      desc: "Áo thun cotton co giãn 4 chiều kết hợp quần short đốm thời trang. Thích hợp đi chơi, đi học.",
      price: "189.000đ",
      badge: "Mẫu Mới 2026",
      rating: 5.0,
      sold: "850+",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      category: "boys",
      title: "Áo Sơ Mi Công Tử Kèm Yếm Phong Cách",
      desc: "Chất liệu đũi xước xuất khẩu thoáng mát, đi kèm dây yếm phong cách lịch lãm cho bé.",
      price: "235.000đ",
      badge: "Cao Cấp",
      rating: 4.9,
      sold: "780+",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      category: "boys",
      title: "Bộ Đồ Thể Thao Cotton Co Giãn 4 Chiều",
      desc: "Chất liệu nỉ da cá thoáng khí, thấm hút mồ hôi cực tốt khi bé vận động thể thao ngoài trời.",
      price: "175.000đ",
      badge: "Khuyên Dùng",
      rating: 4.8,
      sold: "2.1k+",
      image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      category: "boys",
      title: "Áo Phông Polo Mẫu Mới Đi Học",
      desc: "Cổ bẻ thanh lịch, chất vải pique cotton dày dặn không xù lông sau nhiều lần giặt máy.",
      price: "145.000đ",
      badge: "Ưu Đãi",
      rating: 4.9,
      sold: "1.8k+",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80",
    },

    // Giày Dép & Hàng Da
    {
      id: 9,
      category: "shoes",
      title: "Giày Tập Đi Chống Trượt Da Mềm",
      desc: "Đế cao su dẻo uốn cong 1/3 tiêu chuẩn y khoa, chất liệu da nhân tạo cao cấp êm chân.",
      price: "165.000đ",
      badge: "Khuyên Dùng",
      rating: 4.8,
      sold: "2.4k+",
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      category: "shoes",
      title: "Sandal Da Bò Cao Cấp Bé Trai & Bé Gái",
      desc: "Quai dán linh hoạt điều chỉnh kích thước, quai da bò thật êm ái chống trầy xước gót chân.",
      price: "215.000đ",
      badge: "Mới 2026",
      rating: 5.0,
      sold: "1.1k+",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      category: "shoes",
      title: "Bốt Da Cổ Thấp Thời Trang Bé Gái",
      desc: "Chất liệu da tổng hợp chống nước nhẹ, khóa kéo bên sườn giúp bé dễ dàng tự đi và tháo.",
      price: "265.000đ",
      badge: "Nổi Bật",
      rating: 4.9,
      sold: "530+",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      category: "shoes",
      title: "Dép Quai Hậu Quai Ngang Đột Chỉ",
      desc: "Đế EVA siêu nhẹ chống trơn trượt, quai dán chống nước thích hợp đi mưa và đi biển.",
      price: "125.000đ",
      badge: "Giá Tốt",
      rating: 4.7,
      sold: "3.2k+",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    },

    // Bán Buôn / Sỉ May Mặc (Mã 4641)
    {
      id: 13,
      category: "wholesale",
      title: "Lô Sỉ Áo Thun Cotton Trẻ Em (100-500 Bộ)",
      desc: "Chiết khấu tận xưởng cho đại lý. Đủ size từ 8kg - 35kg, sẵn kho số lượng lớn giao ngay.",
      price: "Giá Sỉ Tận Xưởng",
      badge: "Dành Cho Đại Lý",
      rating: 5.0,
      sold: "50+ Đại Lý",
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      category: "wholesale",
      title: "Lô Sỉ Đầm Bé Gái Thiết Kế (50-200 Váy)",
      desc: "Mẫu mã thiết kế độc quyền, đường may tỉ mỉ, đầy đủ tem mác thương hiệu Bảo Trâm Kids.",
      price: "Báo Giá Theo Lô",
      badge: "Độc Quyền",
      rating: 5.0,
      sold: "35+ Shop",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      category: "wholesale",
      title: "Combo Sỉ Giày Dép & Hàng Da Trẻ Em",
      desc: "Số lượng tối thiểu 30 đôi/ri, đóng dây theo size chuẩn, giao hàng tận nơi trên toàn quốc.",
      price: "Chiết Khấu 45%",
      badge: "Hàng Da Sỉ",
      rating: 4.9,
      sold: "80+ Đơn Sỉ",
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 16,
      category: "wholesale",
      title: "Lô Sỉ Bộ Đồ Mặc Nhà Sơ Sinh Kháng Khuẩn",
      desc: "100% sợi tre tự nhiên, an toàn cho da sơ sinh. Đóng gói túi zipper đục lỗ xịn xốp.",
      price: "Liên Hệ Zalo Sỉ",
      badge: "Sỉ Sơ Sinh",
      rating: 5.0,
      sold: "120+ Lô",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-pink-600/30 via-purple-500/20 to-cyan-400/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-pink-500/30 text-xs font-bold text-pink-300 shadow-xl">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>HỘ KINH DOANH BẢO TRÂM KIDS • MÃ SỐ ĐKKD 040190008784</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Thời Trang Trẻ Em Cao Cấp & <span className="gradient-text">Bán Buôn May Mặc</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Chuyên sản xuất, phân phối sỉ & lẻ hàng may mặc trẻ em, váy đầm, bộ đồ bé trai bé gái, giày dép và hàng da cao cấp. Đảm bảo an toàn tuyệt đối cho làn da bé yêu.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#products"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-pink-900/40 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Xem Bộ Sưu Tập Mới 2026</span>
            </a>
            <a
              href="#wholesale"
              className="px-8 py-4 rounded-2xl glass-panel border border-white/20 hover:border-pink-500/50 text-white font-extrabold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all"
            >
              <PackageCheck className="w-5 h-5 text-pink-400" />
              <span>Đăng Ký Đại Lý Bán Buôn</span>
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-pink-400 shrink-0" />
              <div className="text-left">
                <h4 className="font-bold text-white text-xs">Cotton 100% Hữu Cơ</h4>
                <p className="text-[11px] text-gray-400">Kháng khuẩn, êm mịn</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-400 shrink-0" />
              <div className="text-left">
                <h4 className="font-bold text-white text-xs">Mã Ngành 4641 & 4771</h4>
                <p className="text-[11px] text-gray-400">Bán buôn & bán lẻ</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Truck className="w-8 h-8 text-cyan-400 shrink-0" />
              <div className="text-left">
                <h4 className="font-bold text-white text-xs">Giao Hàng Toàn Quốc</h4>
                <p className="text-[11px] text-gray-400">Kiểm tra trước khi nhận</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <RotateCcw className="w-8 h-8 text-pink-400 shrink-0" />
              <div className="text-left">
                <h4 className="font-bold text-white text-xs">Đổi Trả Dễ Dàng</h4>
                <p className="text-[11px] text-gray-400">Trong vòng 7 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOGUE SECTION */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-pink-400 uppercase tracking-wider">Danh Mục Sản Phẩm</span>
            <h2 className="text-3xl font-extrabold text-white">Sản Phẩm Nổi Bật Dành Cho Bé</h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 group hover:border-pink-500/50 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-pink-600/90 backdrop-blur-md text-[10px] font-black uppercase text-white shadow-lg">
                  {p.badge}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating}
                    </span>
                    <span>Đã bán {p.sold}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-white group-hover:text-pink-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-lg font-black text-pink-400">{p.price}</span>
                  <a
                    href="tel:0989987331"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-pink-600 text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Đặt Hàng</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHOLESALE & MANUFACTURING SECTION (MÃ 4641) */}
      <section id="wholesale" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-pink-500/30 bg-gradient-to-br from-purple-900/30 via-[#090d16] to-pink-900/20 relative overflow-hidden space-y-8">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
              <PackageCheck className="w-3.5 h-3.5 text-pink-400" />
              <span>Ngành 4641: Bán Buôn Vải, Hàng May Mặc, Giày Dép</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Chính Sách Bán Buôn / Sỉ Hàng May Mặc Toàn Quốc
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Hộ Kinh Doanh Bảo Trâm Kids tự hào là đơn vị cung cấp sỉ hàng may mặc thời trang trẻ em uy tín với hơn 500+ mẫu mã sẵn kho. Cam kết chiết khấu hấp dẫn nhất thị trường cho các cửa hàng, đại lý và nhà bán hàng Online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-extrabold text-white text-base">Giá Gốc Tận Xưởng</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Không qua trung gian, tối ưu chi phí giúp đại lý đạt biên lợi nhuận cao nhất.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-extrabold text-white text-base">Hỗ Trợ Hình Ảnh 4K</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Cung cấp bộ ảnh chụp thật 100%, video mẫu nhí chuyên nghiệp để đại lý bán hàng dễ dàng.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-extrabold text-white text-base">Bao Đổi Trả Mẫu Cũ</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Chính sách hỗ trợ quay vòng vốn linh hoạt cho các đại lý đối tác lâu năm.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-bold text-white">Hotline Bán Buôn / Zalo Sỉ: <strong className="text-pink-400 text-lg">0989987331</strong></span>
            </div>
            <a
              href="tel:0989987331"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-black text-xs text-center shadow-lg"
            >
              LIÊN HỆ NHẬN BÁO GIÁ SỈ
            </a>
          </div>
        </div>
      </section>

      {/* LEGAL & VERIFICATION SECTION (FACEBOOK BM VERIFICATION READY) */}
      <section id="legals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Thông Tin Đăng Ký Pháp Lý</span>
          <h2 className="text-3xl font-extrabold text-white">Uy Tín & Minh Bạch Pháp Lý Doanh Nghiệp</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Hộ Kinh Doanh Bảo Trâm Kids hoạt động hợp pháp dưới sự quản lý của UBND Phường Hà Đông, Thành phố Hà Nội.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 bg-[#0d1322] shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">HỘ KINH DOANH BẢO TRÂM KIDS</h3>
                  <span className="text-xs text-pink-400 font-semibold">Giấy Chứng Nhận Đăng Ký Hộ Kinh Doanh</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 divide-y divide-white/10">
                <li className="pt-2 flex items-start gap-2">
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Mã số hộ kinh doanh (MST):</strong> <strong className="text-white">040190008784</strong></span>
                </li>
                <li className="pt-3 flex items-start gap-2">
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Ngày đăng ký lần đầu:</strong> 12/08/2024</span>
                </li>
                <li className="pt-3 flex items-start gap-2">
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Đăng ký thay đổi lần thứ 1:</strong> 17/12/2025</span>
                </li>
                <li className="pt-3 flex items-start gap-2">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Đại diện pháp luật / Chủ hộ:</strong> <strong className="text-white">ĐẶNG THỊ NGUYÊN</strong></span>
                </li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>Trụ Sở & Ngành Nghề Kinh Doanh Chính</span>
              </h4>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-gray-300">
                <div>
                  <strong className="text-white block mb-1">Địa chỉ trụ sở đăng ký:</strong>
                  <p className="text-gray-300 leading-relaxed">
                    Số LK18-09, Khu Dọc Bún 2, Phường Hà Đông, Thành phố Hà Nội, Việt Nam
                  </p>
                </div>
                <div>
                  <strong className="text-white block mb-1">Điện thoại liên hệ:</strong>
                  <a href="tel:0989987331" className="text-pink-300 font-bold text-sm">0989987331</a>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <strong className="text-white block">Ngành nghề đăng ký kinh doanh:</strong>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-[11px] font-bold">Mã 4641</span>
                    <span>Bán buôn vải, hàng may mặc, giày dép (Chính)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[11px] font-bold">Mã 4771</span>
                    <span>Bán lẻ hàng may mặc, giày dép, hàng da & giả da</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-2xl font-black text-white">Bạn Cần Tư Vấn Mua Lẻ Hoặc Đặt Sỉ Số Lượng Độc Quyền?</h3>
          <p className="text-xs text-gray-300 max-w-lg mx-auto">
            Đội ngũ Bảo Trâm Kids luôn sẵn sàng phục vụ 24/7. Hãy gọi hotline hoặc nhắn tin để nhận ưu đãi ngay hôm nay.
          </p>
          <div className="pt-2">
            <a
              href="tel:0989987331"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span>GỌI TƯ VẤN: 0989987331</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
