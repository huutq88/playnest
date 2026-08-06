import type { Metadata } from "next";
import { ShieldCheck, Lock, FileText, Mail, Phone, MapPin, Building2, UserCheck, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính Sách Quyền Riêng Tư (Privacy Policy) | Hộ Kinh Doanh Bảo Trâm Kids",
  description: "Chính sách quyền riêng tư chi tiết của Hộ Kinh Doanh Bảo Trâm Kids. Cam kết bảo mật dữ liệu người dùng và tuân thủ các quy định hiện hành.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-pink-500/30 text-xs font-bold text-pink-300">
          <ShieldCheck className="w-4 h-4 text-pink-400" />
          <span>CHÍNH SÁCH BẢO MẬT & QUYỀN RIÊNG TƯ CHÍNH THỨC</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Chính Sách Quyền Riêng Tư <br className="hidden sm:inline" />
          <span className="gradient-text">(Privacy Policy)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
          Cập nhật lần cuối: Ngày 06 tháng 08 năm 2026. Áp dụng cho tất cả người dùng truy cập website và sử dụng các dịch vụ liên kết của Hộ Kinh Doanh Bảo Trâm Kids.
        </p>
      </div>

      {/* Main Legal Content */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#0d1322] space-y-8 text-sm text-gray-300 leading-relaxed">
        
        {/* Section 1: Data Controller */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-pink-400" />
            <span>1. Đơn vị chủ quản và kiểm soát dữ liệu (Data Controller)</span>
          </h2>
          <p>
            Chính sách quyền riêng tư này giải thích cách thức <strong className="text-white">HỘ KINH DOANH BẢO TRÂM KIDS</strong> (sau đây gọi tắt là "Chúng tôi") thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của người dùng khi bạn truy cập website hoặc tương tác qua ứng dụng/Fanpage chính thức của chúng tôi.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-gray-300">
            <p>• <strong>Tên đơn vị:</strong> HỘ KINH DOANH BẢO TRÂM KIDS</p>
            <p>• <strong>Mã số hộ kinh doanh / MST:</strong> 040190008784 (UBND Phường Hà Đông cấp)</p>
            <p>• <strong>Đại diện pháp luật:</strong> ĐẶNG THỊ NGUYÊN</p>
            <p>• <strong>Địa chỉ trụ sở:</strong> Số LK18-09, Khu Dọc Bún 2, Phường Hà Đông, Thành phố Hà Nội, Việt Nam</p>
            <p>• <strong>Hotline:</strong> 0989987331 | Email: contact@playnest.zone</p>
          </div>
        </section>

        {/* Section 2: Data Collection */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>2. Thông tin chúng tôi thu thập (Information We Collect)</span>
          </h2>
          <p>Tùy thuộc vào cách bạn tương tác, chúng tôi có thể thu thập các loại dữ liệu sau:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-300">
            <li><strong>Thông tin định danh cá nhân:</strong> Họ và tên, số điện thoại, địa chỉ giao hàng khi bạn đăng ký mua lẻ hoặc nhận báo giá sỉ.</li>
            <li><strong>Thông tin từ Meta Platform API (Nếu bạn đăng nhập bằng Facebook):</strong> Tên tài khoản, ID người dùng Facebook (User ID), email công khai để hỗ trợ tư vấn tự động.</li>
            <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành, nhật ký truy cập (Cookies) để tối ưu trải nghiệm duyệt web.</li>
          </ul>
        </section>

        {/* Section 3: Data Usage */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <span>3. Mục đích sử dụng thông tin (How We Use Information)</span>
          </h2>
          <p>Chúng tôi chỉ sử dụng dữ liệu thu thập được cho các mục đích hợp pháp bao gồm:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-300">
            <li>Xử lý và hoàn tất đơn hàng may mặc bán lẻ hoặc hợp đồng sỉ bán buôn.</li>
            <li>Phản hồi thắc mắc, tư vấn chọn size và hỗ trợ chăm sóc khách hàng qua Hotline/Zalo/Messenger.</li>
            <li>Gửi thông báo chương trình khuyến mãi, bộ sưu tập mẫu mới (khi có sự đồng ý của bạn).</li>
            <li>Phòng chống gian lận, bảo đảm an toàn hệ thống và tuân thủ các quy định pháp luật.</li>
          </ul>
        </section>

        {/* Section 4: Security & Retention */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-pink-400" />
            <span>4. Bảo mật & Lưu trữ dữ liệu (Data Security & Retention)</span>
          </h2>
          <p>
            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật hiện đại (bao gồm mã hóa SSL/TLS và phân quyền truy cập nghiêm ngặt) để bảo vệ dữ liệu khỏi truy cập trái phép hoặc rò rỉ. Dữ liệu chỉ được lưu trữ trong thời gian cần thiết để thực hiện mục đích phục vụ dịch vụ hoặc theo yêu cầu của pháp luật.
          </p>
        </section>

        {/* Section 5: Data Deletion Rights */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <span>5. Quyền của bạn & Yêu cầu xóa dữ liệu (User Rights & Data Deletion)</span>
          </h2>
          <p>
            Bạn có toàn quyền truy cập, chỉnh sửa hoặc yêu cầu xóa bỏ hoàn toàn dữ liệu cá nhân của mình khỏi hệ thống của chúng tôi bất kỳ lúc nào.
          </p>
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs space-y-2 text-gray-300">
            <p className="font-bold text-red-300">Hướng dẫn gửi Yêu cầu Xóa Dữ liệu (Data Deletion Request):</p>
            <p>• Gửi email yêu cầu xóa dữ liệu tới địa chỉ: <a href="mailto:contact@playnest.zone" className="text-white underline font-bold">contact@playnest.zone</a> với tiêu đề <em>"Yêu cầu xóa dữ liệu cá nhân - [Họ tên của bạn]"</em>.</p>
            <p>• Hoặc liên hệ trực tiếp Hotline: <strong className="text-white">0989987331</strong>.</p>
            <p>Yêu cầu xóa dữ liệu sẽ được bộ phận kỹ thuật tiếp nhận và hoàn tất xử lý trong vòng 48 giờ làm việc.</p>
          </div>
        </section>

        {/* Section 6: Third-Party Sharing */}
        <section className="space-y-3 pb-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>6. Chia sẻ thông tin với bên thứ ba (Third-Party Sharing)</span>
          </h2>
          <p>
            Chúng tôi <strong className="text-white">KHÔNG BAO GIỜ</strong> bán, trao đổi hoặc thương mại hóa dữ liệu cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ được chia sẻ giới hạn cho các đối tác vận chuyển (ví dụ: Viettel Post, GHTK) để phục vụ việc giao nhận hàng hóa.
          </p>
        </section>

        {/* Section 7: Contact */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-pink-400" />
            <span>7. Liên hệ giải đáp thắc mắc (Contact Information)</span>
          </h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi hoặc khiếu nại nào liên quan đến Chính sách quyền riêng tư này, xin vui lòng liên hệ với chúng tôi:
          </p>
          <div className="space-y-1 text-xs text-gray-300 font-medium">
            <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-pink-400" /> <span>HỘ KINH DOANH BẢO TRÂM KIDS</span></p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-pink-400" /> <span>Số LK18-09, Khu Dọc Bún 2, Phường Hà Đông, Thành phố Hà Nội, Việt Nam</span></p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-pink-400" /> <span>0989987331</span></p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-pink-400" /> <span>contact@playnest.zone</span></p>
          </div>
        </section>

      </div>
    </div>
  );
}
