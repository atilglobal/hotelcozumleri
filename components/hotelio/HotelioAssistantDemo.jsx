"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import MockShell from "./mockups/MockShell";

export default function HotelioAssistantDemo() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatedText>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-4">
              Personelinizin Yanında
              <br />
              7/24 Dijital Bir Yardımcı.
            </h2>
            <p className="text-gray-light leading-relaxed">
              Hotelio içindeki canlı yapay zekâ yardımcısı, personele kullanım konusunda
              adım adım yönlendirme sağlar. Operasyonel sorulara hızlı yanıt verir.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <MockShell path="/ai-asistan">
              <div className="space-y-3">
                <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-sm">
                  <p className="text-[9px] text-white/50 mb-1">PERSONEL</p>
                  <p className="text-white/80 text-xs">Oda değişimini nasıl yaparım?</p>
                </div>
                <div className="p-3 bg-gold/10 border border-gold/20 rounded-sm">
                  <p className="text-[9px] text-gold mb-1">HOTELIO AI</p>
                  <p className="text-white/80 text-xs">
                    Rezervasyon kartını açın ve Oda Değişimi alanına ilerleyin.
                    Yeni oda seçimini onayladıktan sonra sistem güncellemeyi tamamlar.
                  </p>
                </div>
              </div>
            </MockShell>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
