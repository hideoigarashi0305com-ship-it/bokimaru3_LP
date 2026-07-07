"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Clock, Smartphone, Smile, Volume2, VolumeX, Globe } from "lucide-react";
import { Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // クライアントサイドでのみ Audio インスタンスを作成
    const audio = new Audio("/bgm/bgm4.aac");
    audio.loop = true;
    audioRef.current = audio;

    // コンポーネントのアンマウント時に停止
    return () => {
      audio.pause();
    };
  }, []);

  const toggleBGM = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <main className="min-h-screen text-slate-100 bg-[#060814] flex justify-center items-start md:py-10">
      
      {/* スマートフォン専用コンテナ */}
      <div className="w-full max-w-[430px] min-h-screen md:min-h-[880px] bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0F172A] relative overflow-hidden md:rounded-[48px] md:shadow-[0_0_60px_rgba(0,0,0,0.85)] md:border-[10px] md:border-slate-800/95 flex flex-col">
        
        {/* スマホ上部のノッチ風デザイン（PC表示時のみ） */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-800/95 rounded-b-2xl z-50"></div>

        {/* スクロール可能なコンテンツエリア */}
        <div className="flex-1 overflow-y-auto pt-8 pb-12">
          
          {/* 1. Hero Section */}
          <section className="relative pt-12 pb-14 px-6 flex flex-col items-center text-center gap-8">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="w-full flex flex-col items-center z-10"
            >
              <motion.div variants={fadeInUp} className="inline-block mb-2 px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs font-black uppercase tracking-wider border border-red-500/20">
                2026年試験対応
              </motion.div>
              <motion.div variants={fadeInUp} className="inline-block mb-6 px-4 py-1.5 rounded-full glass-panel text-sm font-bold text-blue-400 border border-blue-400/20">
                簿記3級を最短合格するための学習アプリ
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-[34px] font-black leading-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                簿記3級、スマホ1台で<br/>合格する時代へ。
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-base text-slate-300 mb-8 leading-relaxed max-w-sm">
                参考書も、電卓も、答案用紙も──<br/>ぜんぶ、このアプリの中にあります。<br/>現役税理士が完全監修した、<br/>AI搭載の次世代型簿記アプリ<br/>「ボキまる先生」。
              </motion.p>
              <motion.div variants={fadeInUp} className="w-full max-w-xs mb-8 flex flex-col gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.nexusaccounting.bokimaru&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="cta-button group flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-400 text-white py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 border border-orange-300/30">
                  <Download size={22} />
                  <span>Google Play で無料インストール</span>
                </a>
                <a href="https://bokimarusenseiboki3.com/" target="_blank" rel="noopener noreferrer" className="cta-button-web group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-blue-500 hover:via-teal-400 hover:to-emerald-400 text-white py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 border border-blue-400/20">
                  <Globe size={22} />
                  <span>Webで無料インストール</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[280px] relative z-10"
            >
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[280/400] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              >
                {/* 新規スプラッシュ画像に変更 */}
                <img src="/splash.jpg" alt="ボキまる先生 スプラッシュ" className="w-full h-full object-contain rounded-2xl" />
              </motion.div>
            </motion.div>
            
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-blue-600/15 rounded-full blur-[80px] -z-10 opacity-60"></div>
          </section>

          {/* 2. Problem Section */}
          <section className="py-14 px-6 relative border-t border-slate-900/50 bg-slate-950/20">
            <div className="w-full">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-bold text-white leading-snug">こんなお悩み、ありませんか？</h2>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                className="flex flex-col gap-4"
              >
                {[
                  { icon: "🔰", text: "簿記3級に挑戦したいけど、何から始めたらいいか分からない" },
                  { icon: "📚", text: "分厚い参考書を買ったものの、退屈で一度あきらめてしまった" },
                  { icon: "⏰", text: "忙しくて、机に向かってまとまった勉強時間が取れない" },
                  { icon: "📊", text: "過去問を解いても点数が安定せず、大問でいつも引っかかる" }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="glass-panel p-4 rounded-xl flex items-start gap-3 border border-white/5">
                    <span className="text-2xl leading-none">{item.icon}</span>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 3. Solution Section */}
          <section className="py-14 px-6 bg-slate-900/15 relative">
            <div className="w-full">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  「続かない」「解けない」のは、<br/>あなたのせいではありません。<br/>従来の勉強法の「限界」が原因です。<br/>その常識を覆すのが、<br/>現役税理士が企画・監修した<br/><strong className="text-blue-400 font-bold">「ボキまる先生」</strong>です。
                </p>
                <h2 className="text-xl font-bold text-white border-b border-blue-500/20 pb-4">📌 ボキまる先生が<br/>選ばれる4つの革新的理由</h2>
              </motion.div>

              <div className="flex flex-col gap-16">
                {/* Reason 1 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                      <BookOpen size={20} />
                      <span className="text-xs font-bold tracking-widest uppercase">Reason 01</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">全310問超。<br/>現役税理士監修の本格仕訳演習<br/>✕ AI苦手分析</h3>
                    <p className="text-slate-300 text-xs leading-relaxed px-2">現役税理士の目線で「なぜこの仕訳になるのか」を初学者向けに徹底解説。参考書はもう不要です。AIが解答パターンを分析し、あなただけの最短合格ルートを構築します。</p>
                  </div>
                  <div className="w-full max-w-[220px] relative mt-2">
                    <img src="/usapyon.png" alt="うさぴょん" className="w-full h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.div>

                {/* Reason 2 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                      <Clock size={20} />
                      <span className="text-xs font-bold tracking-widest uppercase">Reason 02</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">画面を閉じても学習が続く<br/>「耳学モード」</h3>
                    <p className="text-slate-300 text-xs leading-relaxed px-2">通勤中や家事の合間に。独自のバックグラウンド再生エンジンによる「耳学ラジオ」で、日常のすべての隙間時間が勉強時間に変わります。</p>
                  </div>
                  <div className="w-full max-w-[220px] relative mt-2">
                    <img src="/ponkichi.png" alt="ポン吉" className="w-full h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.div>

                {/* Reason 3 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                      <Smartphone size={20} />
                      <span className="text-xs font-bold tracking-widest uppercase">Reason 03</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">業界初レベル。<br/>スマホで解ける本格大問UI</h3>
                    <p className="text-slate-300 text-xs leading-relaxed px-2">「スマホで大問対策は無理」をテクノロジーで解決。独自開発の2カラム表示UIで、紙の過去問に書き込む感覚をスマホで完全再現しました。</p>
                  </div>
                  <div className="w-full max-w-[220px] relative mt-2">
                    <img src="/ho_sensei.png" alt="ホー先生" className="w-full h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.div>

                {/* Reason 4 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                      <Smile size={20} />
                      <span className="text-xs font-bold tracking-widest uppercase">Reason 04</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">挫折させない。<br/>科学的モチベーション設計</h3>
                    <p className="text-slate-300 text-xs leading-relaxed px-2">うさぴょん、ポン吉、ホー先生、ドルくん。4人のキャラクターが正解・不正解に応じた的確なリアクションで楽しくサポートします。</p>
                  </div>
                  <div className="w-full max-w-[220px] relative mt-2">
                    <img src="/doru_kun.png" alt="ドルくん" className="w-full h-auto drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 4. Testimony / Mock Exam Section */}
          <section className="py-14 px-6 relative overflow-hidden border-t border-slate-900/50">
            <div className="absolute inset-0 bg-blue-950/10 backdrop-blur-3xl -z-10"></div>
            <div className="w-full text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h2 className="text-xl font-bold text-white mb-6 leading-snug">本番フォーマットを<br/>忠実に再現した<br/>「模擬試験モード」</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  本試験と同じ60分タイマー、<br/>第1問〜第3問の完全通し演習を搭載。<br/>AI採点と弱点分析レポートで<br/>次の一手が明確になります。<br/>合格ライン70点を何度も超える<br/>自分を確認してください。
                </p>
              </motion.div>
            </div>
          </section>

          {/* 5. Offer Section */}
          <section className="py-10 px-6 relative">
            <div className="w-full">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-panel p-6 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <div className="inline-block bg-red-500 text-white font-bold px-3.5 py-1 rounded-full mb-6 shadow-md shadow-red-500/10 text-[11px] whitespace-nowrap">
                  🔥 リリース記念限定価格【2026年8月31日まで】
                </div>
                <h2 className="text-xl font-bold mb-3 text-white">今だけ、すべての機能が<br/>「一生使い放題」</h2>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  毎月お金がかかるサブスクではありません。<br/>一度の購入でずっと使える<br/>「買い切り」プランです。
                </p>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-3 drop-shadow-sm">
                  500<span className="text-lg text-slate-400 ml-1">円</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  ※この期間を過ぎると通常価格に戻ります。
                </p>
              </motion.div>
            </div>
          </section>

          {/* 6. Closing Section */}
          <section id="install" className="py-14 px-6 text-center">
            <div className="w-full">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p className="text-lg font-bold text-blue-400 mb-6 leading-snug">
                  「簿記の入口で止まって<br/>しまう人を、ゼロにしたい」
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-8">
                  現役税理士率いる<br/>ネクサス会計事務所のスタッフが、<br/>そんな想いから開発しました。<br/>ダウンロードした瞬間から、<br/>うさぴょんたちと一緒に<br/>合格への一歩を踏み出しましょう！
                </p>
                
                <div className="flex flex-col gap-4 items-center">
                  <a href="https://play.google.com/store/apps/details?id=com.nexusaccounting.bokimaru&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="cta-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-400 text-white w-full max-w-xs py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 border border-orange-300/30">
                    <Download size={22} />
                    <span>Google Play で無料インストール</span>
                  </a>
                  <a href="https://bokimarusenseiboki3.com/" target="_blank" rel="noopener noreferrer" className="cta-button-web inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-blue-500 hover:via-teal-400 hover:to-emerald-400 text-white w-full max-w-xs py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 border border-blue-400/20">
                    <Globe size={22} />
                    <span>Webで無料インストール</span>
                  </a>
                </div>

                <div className="mt-6 flex justify-center">
                  <a 
                    href="https://note.com/prime_snail8275/n/n1bf45b2f2eb3?sub_rt=share_sb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-950/25 hover:bg-emerald-950/45 text-emerald-400 hover:text-emerald-300 transition-all text-sm font-bold backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  >
                    <BookOpen size={16} />
                    <span>ボキまる制作記（note）</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/5 pt-8 pb-4 px-6 text-center text-[11px] text-slate-400 leading-relaxed">
            <p className="mb-1">運営元：ネクサス会計事務所</p>
            <p className="mb-4">お問い合わせ：nexusac0305@gmail.com</p>
            <p className="text-slate-500">&copy; 2026 Nexus Accounting Office. All rights reserved.</p>
          </footer>
        </div>

        {/* BGMコントロールボタン */}
        <div className="absolute top-6 right-6 z-50">
          <motion.button
            onClick={toggleBGM}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-md transition-all duration-300 ${
              isPlaying
                ? "bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-orange-500/10"
                : "bg-slate-900/60 border-slate-700/60 text-slate-400 shadow-black/40"
            }`}
            aria-label="BGMを切り替え"
          >
            {isPlaying ? (
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <Volume2 size={20} />
              </motion.div>
            ) : (
              <VolumeX size={20} />
            )}
          </motion.button>
        </div>

      </div>
    </main>
  );
}
