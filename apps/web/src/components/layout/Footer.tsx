import Link from "next/link";
import { Mail, Youtube, Facebook, ExternalLink, Heart } from "lucide-react";
import { PLAYNEST_SOCIALS } from "@playnest/shared-types";

export function Footer() {
  return (
    <footer className="glass-panel border-t border-white/10 mt-20 bg-[#090d16]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center font-black text-white text-sm">
                PN
              </div>
              <span className="font-extrabold text-lg gradient-text">PlayNest Entertainment Hub</span>
            </div>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              Nền tảng giải trí đa phương tiện tổng hợp: Xem video TikTok, YouTube, Facebook, khám phá ứng dụng Google Play / App Store và chơi Web Games mượt mà không cần cài đặt.
            </p>
            <div className="flex flex-col space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Email: </span>
                <a href={`mailto:${PLAYNEST_SOCIALS.email}`} className="text-purple-300 hover:text-white underline">
                  {PLAYNEST_SOCIALS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Kênh Youtube Chính Thức</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href={PLAYNEST_SOCIALS.youtube.vi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube (Tiếng Việt)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={PLAYNEST_SOCIALS.youtube.en}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube (Global / EN)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Facebook Fanpage</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href={PLAYNEST_SOCIALS.facebook.trithuc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span>PlayNest Tri Thức</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={PLAYNEST_SOCIALS.facebook.knowledge}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span>PlayNest Knowledge</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 PlayNest Game Studio (`playnest.zone`). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> by PlayNest Team
          </p>
        </div>
      </div>
    </footer>
  );
}
