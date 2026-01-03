"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  RiSearchLine,
  RiFacebookFill,
  RiTwitterXLine,
  RiWhatsappLine,
  RiLink,
  RiHomeLine,
} from "@remixicon/react";
import { useState, use } from "react";

// Blog posts data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: "cam-temizliginde-en-sik-yapilan-5-hata",
    image: "/images/moving_cards_image_01.png",
    date: "20 Aralık 2025",
    title: "Cam Temizliğinde En Sık Yapılan 5 Hata",
    excerpt: "Cam temizliği yaparken dikkat edilmesi gereken önemli noktalar ve yaygın hatalar hakkında bilgiler.",
    featured: false,
  },
  {
    id: 2,
    slug: "kis-aylarinda-cam-bakimi-nasil-yapilir",
    image: "/images/moving_cards_image_02.png",
    date: "15 Aralık 2025",
    title: "Kış Aylarında Cam Bakımı Nasıl Yapılır?",
    excerpt: "Kış mevsiminde camlarınızın bakımı için önemli ipuçları ve profesyonel öneriler.",
    featured: true,
  },
  {
    id: 3,
    slug: "profesyonel-cam-temizligi-vs-evde-yapilan",
    image: "/images/moving_cards_image_03.png",
    date: "10 Aralık 2025",
    title: "Profesyonel Cam Temizliği vs. Evde Yapılan",
    excerpt: "Profesyonel cam temizliği hizmeti ile evde yapılan temizlik arasındaki farklar ve avantajlar.",
    featured: false,
  },
  {
    id: 4,
    slug: "yuksek-bina-cam-temizligi-icin-guvenlik-onlemleri",
    image: "/images/moving_cards_image_01.png",
    date: "5 Aralık 2025",
    title: "Yüksek Bina Cam Temizliği İçin Güvenlik Önlemleri",
    excerpt: "Yüksek binalarda güvenli cam temizliği için alınması gereken önlemler ve profesyonel yaklaşım.",
    featured: false,
  },
  {
    id: 5,
    slug: "cam-temizligi-icin-en-iyi-malzemeler",
    image: "/images/moving_cards_image_02.png",
    date: "1 Aralık 2025",
    title: "Cam Temizliği İçin En İyi Malzemeler",
    excerpt: "Cam temizliğinde kullanılabilecek en etkili ve güvenli malzemeler hakkında detaylı bilgiler.",
    featured: false,
  },
  {
    id: 6,
    slug: "ofis-camlarinin-duzenli-bakiminin-onemi",
    image: "/images/moving_cards_image_03.png",
    date: "25 Kasım 2025",
    title: "Ofis Camlarının Düzenli Bakımının Önemi",
    excerpt: "İş yerlerinde cam temizliğinin önemi ve düzenli bakım programlarının faydaları.",
    featured: false,
  },
];

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const [searchQuery, setSearchQuery] = useState("");

  // Function to get unique content for each blog post
  const getPostContent = (postSlug: string) => {
    const currentPost = blogPosts.find((p) => p.slug === postSlug) || blogPosts[0];
    
    switch (currentPost.id) {
      case 1:
        return {
          introduction: [
            "Cam temizliği, ev ve ofis bakımının önemli bir parçasıdır. Ancak birçok kişi cam temizliği yaparken farkında olmadan hatalar yapmakta ve bu da istenmeyen sonuçlara yol açmaktadır. Fethiye Cam Temizleme olarak, 10 yılı aşkın deneyimimizle cam temizliğinde en sık karşılaştığımız hataları ve bunların doğru çözümlerini sizlerle paylaşıyoruz.",
            "Bu rehber, cam temizliği konusunda bilinçli kararlar almanıza ve camlarınızın uzun süre pırıl pırıl kalmasına yardımcı olacaktır. Profesyonel ekibimizin deneyimlerinden yola çıkarak hazırladığımız bu içerik, hem evde kendi başınıza yapacağınız temizlikler hem de profesyonel hizmet alırken dikkat etmeniz gereken noktalar hakkında değerli bilgiler sunmaktadır.",
          ],
          quote: "Doğru malzeme ve teknik kullanılmadığında, cam temizliği camlarınıza zarar verebilir. Profesyonel bir yaklaşım, hem zaman hem de maliyet tasarrufu sağlar.",
          mainTitle: "Cam Temizliğinde En Sık Yapılan 5 Hata",
          sections: [
            {
              title: "1. Yanlış Temizlik Malzemesi Kullanımı",
              content: [
                "En yaygın hatalardan biri, cam temizliği için uygun olmayan temizlik malzemeleri kullanmaktır. Amonyak içeren temizleyiciler, ağır kimyasallar veya aşındırıcı maddeler cam yüzeyine kalıcı hasar verebilir. Özellikle güneş ışığına maruz kalan camlarda bu tür malzemeler lekeler ve çizikler oluşturabilir.",
                "Doğru Yaklaşım: Cam temizliği için özel olarak formüle edilmiş, amonyak içermeyen temizleyiciler kullanın. Su ve beyaz sirke karışımı gibi doğal çözümler de etkili olabilir, ancak profesyonel sonuçlar için özel cam temizleme spreyleri tercih edilmelidir.",
              ],
            },
            {
              title: "2. Yanlış Bez veya Sünger Seçimi",
              content: [
                "Kağıt havlu, eski tişört veya aşındırıcı süngerler cam yüzeyinde çiziklere neden olabilir. Özellikle kuru bezlerle cam silmek, cam yüzeyinde mikro çatlaklar oluşturabilir ve camın görünümünü bozabilir.",
                "Doğru Yaklaşım: Mikrofiber bezler cam temizliği için idealdir. Bu bezler suyu iyi emer, leke bırakmaz ve cam yüzeyine zarar vermez. Profesyonel cam temizlik ekipleri genellikle yüksek kaliteli mikrofiber bezler ve squeegee (cam sileceği) kullanırlar.",
              ],
            },
            {
              title: "3. Güneş Altında Cam Temizliği Yapmak",
              content: [
                "Güneş ışığı altında cam temizliği yapmak, temizlik solüsyonunun çok hızlı kurumasına neden olur. Bu da cam yüzeyinde lekeler ve izler bırakır. Ayrıca, sıcak cam yüzeyine soğuk su uygulamak camda termal şok yaratabilir.",
                "Doğru Yaklaşım: Cam temizliğini güneşin doğrudan gelmediği saatlerde, tercihen sabah erken veya akşam saatlerinde yapın. Bulutlu günler cam temizliği için idealdir. Eğer güneşli bir günde temizlik yapmanız gerekiyorsa, camın gölgede kalan kısımlarından başlayın.",
              ],
            },
            {
              title: "4. Çerçeve ve Pervaz Temizliğini Atlamak",
              content: [
                "Birçok kişi sadece cam yüzeyini temizleyip çerçeve ve pervazları göz ardı eder. Ancak kirli çerçeveler, yağmur suyu ile birlikte cam yüzeyine akarak yeni lekeler oluşturur. Ayrıca, çerçeve kenarlarındaki birikintiler camın görünümünü bozar.",
                "Doğru Yaklaşım: Önce çerçeve ve pervazları temizleyin, ardından cam yüzeyine geçin. Çerçeve temizliği için uygun fırçalar ve temizlik malzemeleri kullanın. Bu, hem camın daha uzun süre temiz kalmasını sağlar hem de genel görünümü iyileştirir.",
              ],
            },
            {
              title: "5. Düzenli Bakım Yapmamak",
              content: [
                "Camların sadece çok kirli olduğunda temizlenmesi, birikmiş kirlerin daha zor çıkmasına ve daha fazla zaman harcanmasına neden olur. Ayrıca, düzensiz temizlik cam yüzeyinde kalıcı lekeler oluşturabilir.",
                "Doğru Yaklaşım: Camlarınızı düzenli olarak, ayda en az bir kez temizleyin. Deniz kenarı veya yoğun trafikli bölgelerde daha sık temizlik gerekebilir. Profesyonel cam temizlik hizmeti alarak, düzenli bakım programı oluşturabilir ve camlarınızın her zaman pırıl pırıl kalmasını sağlayabilirsiniz.",
              ],
            },
          ],
          conclusion: {
            title: "Profesyonel Yardım Ne Zaman Gerekli?",
            content: [
              "Yüksek binalar, zor erişilebilir camlar veya kalıcı lekeler için profesyonel cam temizlik hizmeti almak en güvenli ve etkili çözümdür. Fethiye Cam Temizleme olarak, sigortalı ekibimiz ve profesyonel ekipmanlarımızla tüm cam temizlik ihtiyaçlarınızı karşılıyoruz.",
              "Düzenli bakım programlarımız sayesinde camlarınız her zaman temiz kalır ve uzun vadede maliyet tasarrufu sağlarsınız. Ücretsiz keşif ve teklif için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Temizlik, Cam Temizliği, İpuçları",
        };
      case 2:
        return {
          introduction: [
            "Kış ayları, camlarınız için özel bakım gerektiren bir dönemdir. Soğuk hava, nem, yağmur ve kar camlarınızın görünümünü ve dayanıklılığını etkileyebilir. Fethiye Cam Temizleme olarak, kış mevsiminde camlarınızın optimal durumda kalması için profesyonel önerilerimizi paylaşıyoruz.",
            "Bu rehber, kış aylarında cam bakımı konusunda bilmeniz gereken tüm önemli noktaları kapsamaktadır. Deneyimli ekibimizin yıllar içinde edindiği bilgi birikiminden yararlanarak, camlarınızın kış mevsimini sorunsuz geçirmesi için gerekli tüm bilgileri sunuyoruz.",
          ],
          quote: "Kış bakımı, camlarınızın uzun ömürlü olması ve görsel kalitesini koruması için kritik öneme sahiptir. Düzenli bakım, mevsimsel sorunları önler ve maliyet tasarrufu sağlar.",
          mainTitle: "Kış Aylarında Cam Bakımı Nasıl Yapılır?",
          sections: [
            {
              title: "1. Kış Öncesi Hazırlık",
              content: [
                "Kış mevsimi gelmeden önce camlarınızı kapsamlı bir şekilde temizlemek önemlidir. Birikmiş kirler, kış aylarında donma ve çözülme döngüleri ile cam yüzeyine yapışabilir ve kalıcı hasarlara neden olabilir.",
                "Öneriler: Sonbahar sonunda profesyonel bir cam temizliği yaptırın. Çerçeve ve pervazları kontrol edin, gerekirse onarım yaptırın. Cam yüzeyindeki çatlak veya hasarları tespit edin ve gerekli önlemleri alın.",
              ],
            },
            {
              title: "2. Donma ve Buzlanma ile Mücadele",
              content: [
                "Kış aylarında camlarınızda donma ve buzlanma oluşabilir. Bu durum cam yüzeyine zarar verebilir ve görüşü engelleyebilir. Doğru yaklaşım, buzlanmayı önlemek ve güvenli bir şekilde temizlemektir.",
                "Öneriler: Buzlanmayı önlemek için cam yüzeyine özel koruyucu spreyler kullanabilirsiniz. Buzlanmış camları sıcak su ile temizlemekten kaçının, bu camda çatlaklara neden olabilir. Bunun yerine, oda sıcaklığındaki su veya özel buz çözücü spreyler kullanın.",
              ],
            },
            {
              title: "3. Nem ve Yoğuşma Kontrolü",
              content: [
                "Kış aylarında iç mekanlarda nem seviyesi artar ve bu da camlarda yoğuşmaya neden olur. Yoğuşma, cam yüzeyinde lekeler oluşturabilir ve uzun vadede hasara yol açabilir.",
                "Öneriler: İç mekanlarda nem seviyesini kontrol altında tutun. Hava nemlendiricileri kullanıyorsanız, camlardan uzak tutun. Düzenli havalandırma yaparak nem birikimini önleyin. Cam yüzeyindeki yoğuşmayı düzenli olarak temizleyin.",
              ],
            },
            {
              title: "4. Dış Cam Bakımı",
              content: [
                "Kış aylarında dış camlar, yağmur, kar ve rüzgar nedeniyle daha hızlı kirlenir. Ayrıca, soğuk hava koşulları temizlik işlemini zorlaştırabilir.",
                "Öneriler: Dış camları temizlemek için uygun hava koşullarını bekleyin. Donma noktasının üzerindeki günlerde temizlik yapın. Profesyonel ekipmanlar ve güvenlik önlemleri ile yüksek camları temizleyin. Düzenli bakım programı oluşturun.",
              ],
            },
            {
              title: "5. Çerçeve ve Pervaz Bakımı",
              content: [
                "Kış aylarında çerçeve ve pervazlar da özel bakım gerektirir. Nem, soğuk ve donma çerçevelerde hasara neden olabilir ve bu da camların performansını etkiler.",
                "Öneriler: Çerçeve ve pervazları düzenli olarak temizleyin ve kontrol edin. Gerekirse yalıtım malzemelerini yenileyin. Çatlak veya hasarlı bölgeleri onarın. Profesyonel bakım hizmeti alarak uzun vadeli sorunları önleyin.",
              ],
            },
          ],
          conclusion: {
            title: "Kış Bakımı İçin Profesyonel Destek",
            content: [
              "Kış aylarında cam bakımı, özel bilgi ve ekipman gerektirir. Fethiye Cam Temizleme olarak, kış mevsimine özel bakım programlarımızla camlarınızın optimal durumda kalmasını sağlıyoruz.",
              "Düzenli kış bakımı, camlarınızın ömrünü uzatır ve görsel kalitesini korur. Ücretsiz keşif ve kış bakım paketlerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Kış Bakımı, Cam Temizliği, Mevsimsel Bakım",
        };
      case 3:
        return {
          introduction: [
            "Cam temizliği yaparken, evde kendi başınıza mı yoksa profesyonel hizmet mi almalısınız? Bu soru, birçok ev ve işletme sahibinin karşılaştığı önemli bir karardır. Fethiye Cam Temizleme olarak, her iki seçeneğin avantaj ve dezavantajlarını değerlendirerek size en uygun çözümü bulmanıza yardımcı oluyoruz.",
            "Bu karşılaştırma rehberi, profesyonel cam temizliği ile evde yapılan temizlik arasındaki farkları, maliyet analizlerini ve hangi durumlarda hangi seçeneğin daha uygun olduğunu detaylı bir şekilde açıklamaktadır.",
          ],
          quote: "Profesyonel cam temizliği, sadece temizlik değil, aynı zamanda güvenlik, kalite ve zaman tasarrufu demektir. Doğru seçim, ihtiyaçlarınıza ve bütçenize bağlıdır.",
          mainTitle: "Profesyonel Cam Temizliği vs. Evde Yapılan",
          sections: [
            {
              title: "1. Kalite ve Sonuç Farkı",
              content: [
                "Profesyonel cam temizlik ekipleri, özel ekipmanlar ve teknikler kullanarak evde ulaşılması zor sonuçlar elde ederler. Profesyonel ekipmanlar, özel temizlik solüsyonları ve deneyimli teknikler, camların pırıl pırıl görünmesini sağlar.",
                "Evde Yapılan: Temel temizlik yapılabilir ancak profesyonel sonuçlar elde etmek zordur. Yüksek camlar ve zor erişilebilir alanlar için yetersiz kalabilir.",
              ],
            },
            {
              title: "2. Güvenlik ve Risk Yönetimi",
              content: [
                "Yüksek binalar ve zor erişilebilir camlar için profesyonel hizmet almak güvenlik açısından kritik öneme sahiptir. Profesyonel ekipler, güvenlik ekipmanları ve sigorta ile çalışırlar.",
                "Evde Yapılan: Düşük camlar için uygun olabilir ancak yüksek camlar için ciddi güvenlik riskleri taşır. Kaza durumunda sigorta kapsamı olmayabilir.",
              ],
            },
            {
              title: "3. Zaman ve Enerji Tasarrufu",
              content: [
                "Profesyonel cam temizliği, sizin zamanınızı ve enerjinizi başka işlere ayırmanızı sağlar. Özellikle büyük evler veya ofisler için zaman tasarrufu önemlidir.",
                "Evde Yapılan: Kendi zamanınızı ve enerjinizi harcarsınız. Büyük alanlar için saatler sürebilir ve yorucu olabilir.",
              ],
            },
            {
              title: "4. Maliyet Analizi",
              content: [
                "Profesyonel hizmet, başlangıçta daha yüksek maliyetli görünebilir ancak uzun vadede ekipman maliyetleri, zaman kaybı ve potansiyel hatalar düşünüldüğünde ekonomik olabilir.",
                "Evde Yapılan: Başlangıçta daha düşük maliyetli görünür ancak ekipman, malzeme ve zaman maliyetleri toplandığında fark azalabilir.",
              ],
            },
            {
              title: "5. Düzenli Bakım Programları",
              content: [
                "Profesyonel hizmet sağlayıcıları, düzenli bakım programları sunarak camlarınızın her zaman temiz kalmasını sağlar. Bu programlar, özel indirimler ve garantili hizmet içerir.",
                "Evde Yapılan: Düzenli bakım yapmak kişisel sorumluluğunuzdadır. Zaman kısıtlamaları nedeniyle düzenli bakım yapmak zor olabilir.",
              ],
            },
          ],
          conclusion: {
            title: "Hangi Durumda Hangi Seçenek?",
            content: [
              "Düşük camlar ve küçük alanlar için evde temizlik yapılabilir. Ancak yüksek binalar, büyük ofisler, düzenli bakım ihtiyacı ve profesyonel sonuçlar için profesyonel hizmet almak daha uygun olacaktır.",
              "Fethiye Cam Temizleme olarak, ihtiyaçlarınıza uygun çözümler sunuyoruz. Ücretsiz keşif ve teklif ile size en uygun seçeneği belirleyebiliriz.",
            ],
          },
          categories: "Profesyonel Hizmet, Cam Temizliği, Karşılaştırma",
        };
      case 4:
        return {
          introduction: [
            "Yüksek bina cam temizliği, özel güvenlik önlemleri ve profesyonel ekipman gerektiren kritik bir hizmettir. Fethiye Cam Temizleme olarak, yüksek binalarda güvenli ve etkili cam temizliği için uyguladığımız güvenlik protokollerini ve önlemlerini paylaşıyoruz.",
            "Bu rehber, yüksek bina cam temizliğinde güvenlik önlemlerinin önemini, gerekli ekipmanları ve profesyonel yaklaşımı detaylı bir şekilde açıklamaktadır.",
          ],
          quote: "Yüksek bina cam temizliğinde güvenlik, her şeyden önce gelir. Doğru ekipman, eğitimli personel ve güvenlik protokolleri olmadan bu iş yapılmamalıdır.",
          mainTitle: "Yüksek Bina Cam Temizliği İçin Güvenlik Önlemleri",
          sections: [
            {
              title: "1. Güvenlik Ekipmanları ve Standartları",
              content: [
                "Yüksek bina cam temizliği için özel güvenlik ekipmanları kullanılmalıdır. Rope access sistemleri, güvenlik halatları, karabinalar ve diğer güvenlik ekipmanları mutlaka standartlara uygun olmalıdır.",
                "Öneriler: Tüm güvenlik ekipmanları düzenli olarak kontrol edilmeli ve sertifikalı olmalıdır. Her kullanımdan önce ekipmanların durumu kontrol edilmelidir. Güvenlik standartlarına uygun ekipmanlar kullanılmalıdır.",
              ],
            },
            {
              title: "2. Eğitimli ve Sertifikalı Personel",
              content: [
                "Yüksek bina cam temizliği, özel eğitim ve sertifikasyon gerektirir. Personel, rope access teknikleri, güvenlik protokolleri ve acil durum prosedürleri konusunda eğitimli olmalıdır.",
                "Öneriler: Tüm personel, uluslararası standartlara uygun eğitim almış ve sertifikalı olmalıdır. Düzenli güvenlik eğitimleri ve yeniden sertifikasyon yapılmalıdır. Acil durum prosedürleri düzenli olarak gözden geçirilmelidir.",
              ],
            },
            {
              title: "3. Hava Koşulları ve Risk Değerlendirmesi",
              content: [
                "Yüksek bina cam temizliği, hava koşullarına bağlı olarak yapılmalıdır. Rüzgar, yağmur, kar ve diğer olumsuz hava koşulları güvenlik riski oluşturur.",
                "Öneriler: Her iş öncesi hava durumu kontrol edilmelidir. Rüzgar hızı limitleri belirlenmeli ve aşılmamalıdır. Olumsuz hava koşullarında çalışma yapılmamalıdır. Risk değerlendirmesi her iş için yapılmalıdır.",
              ],
            },
            {
              title: "4. Acil Durum Planları",
              content: [
                "Yüksek bina cam temizliğinde acil durum planları kritik öneme sahiptir. Kaza veya acil durumlarda hızlı ve etkili müdahale için hazırlıklı olunmalıdır.",
                "Öneriler: Her iş için acil durum planı hazırlanmalıdır. Acil durum ekipmanları hazır bulundurulmalıdır. İlk yardım eğitimi almış personel bulunmalıdır. Acil durum iletişim protokolleri belirlenmelidir.",
              ],
            },
            {
              title: "5. Sigorta ve Yasal Yükümlülükler",
              content: [
                "Yüksek bina cam temizliği, yüksek risk taşıdığı için kapsamlı sigorta ve yasal yükümlülükler gerektirir. İşveren ve hizmet sağlayıcı, tüm yasal sorumlulukları yerine getirmelidir.",
                "Öneriler: Kapsamlı sigorta poliçeleri alınmalıdır. Tüm yasal gereklilikler yerine getirilmelidir. İş güvenliği mevzuatına uyulmalıdır. Düzenli denetimler yapılmalıdır.",
              ],
            },
          ],
          conclusion: {
            title: "Profesyonel Yüksek Bina Cam Temizliği",
            content: [
              "Yüksek bina cam temizliği, profesyonel ekip, eğitim ve güvenlik önlemleri gerektirir. Fethiye Cam Temizleme olarak, sertifikalı ekibimiz ve güvenlik protokollerimizle yüksek bina cam temizliği hizmeti sunuyoruz.",
              "Güvenli ve etkili yüksek bina cam temizliği için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Yüksek Bina, Güvenlik, Cam Temizliği",
        };
      case 5:
        return {
          introduction: [
            "Cam temizliğinde kullanılan malzemeler, temizlik sonucunun kalitesini doğrudan etkiler. Doğru malzeme seçimi, camların pırıl pırıl görünmesini sağlar ve cam yüzeyine zarar vermez. Fethiye Cam Temizleme olarak, yılların deneyimiyle test ettiğimiz en iyi cam temizlik malzemelerini sizlerle paylaşıyoruz.",
            "Bu rehber, cam temizliği için en etkili ve güvenli malzemeleri, kullanım alanlarını ve profesyonel önerileri içermektedir.",
          ],
          quote: "Doğru malzeme seçimi, cam temizliğinin başarısının yarısıdır. Kaliteli malzemeler, hem sonuç kalitesini artırır hem de cam yüzeyine zarar vermez.",
          mainTitle: "Cam Temizliği İçin En İyi Malzemeler",
          sections: [
            {
              title: "1. Cam Temizleme Solüsyonları",
              content: [
                "Profesyonel cam temizleme solüsyonları, amonyak içermeyen özel formüllerle üretilir. Bu solüsyonlar, cam yüzeyindeki kirleri etkili bir şekilde çıkarır ve leke bırakmaz.",
                "Öneriler: Amonyak içermeyen profesyonel cam temizleme spreyleri kullanın. Doğal alternatifler için su ve beyaz sirke karışımı kullanılabilir. Konsantre solüsyonlar, su ile seyreltilerek kullanılmalıdır.",
              ],
            },
            {
              title: "2. Mikrofiber Bezler",
              content: [
                "Mikrofiber bezler, cam temizliği için en ideal temizlik aracıdır. Suyu iyi emer, leke bırakmaz ve cam yüzeyine zarar vermez.",
                "Öneriler: Yüksek kaliteli mikrofiber bezler tercih edin. Bezleri düzenli olarak temizleyin ve değiştirin. Farklı bezler farklı amaçlar için kullanılabilir (ıslatma, kurulama, cilalama).",
              ],
            },
            {
              title: "3. Squeegee (Cam Sileceği)",
              content: [
                "Squeegee, profesyonel cam temizliğinde kullanılan en etkili araçlardan biridir. Cam yüzeyindeki suyu ve temizlik solüsyonunu etkili bir şekilde temizler.",
                "Öneriler: Farklı boyutlarda squeegee kullanın. Kısa camlar için küçük, büyük camlar için büyük squeegee tercih edin. Squeegee bıçağını düzenli olarak temizleyin ve değiştirin.",
              ],
            },
            {
              title: "4. Çerçeve ve Pervaz Temizlik Malzemeleri",
              content: [
                "Çerçeve ve pervaz temizliği için özel fırçalar ve temizlik malzemeleri kullanılmalıdır. Bu malzemeler, çerçeve kenarlarındaki kirleri etkili bir şekilde temizler.",
                "Öneriler: Yumuşak fırçalar çerçeve temizliği için idealdir. Çerçeve tipine uygun temizlik malzemeleri kullanın. Metal çerçeveler için pas önleyici temizleyiciler kullanılabilir.",
              ],
            },
            {
              title: "5. Yüksek Bina İçin Özel Ekipmanlar",
              content: [
                "Yüksek bina cam temizliği için özel ekipmanlar gereklidir. Uzun saplı squeegee, özel temizlik solüsyonları ve güvenlik ekipmanları kullanılmalıdır.",
                "Öneriler: Uzun saplı ekipmanlar yüksek camlar için kullanılmalıdır. Özel temizlik solüsyonları, rüzgarlı havalarda daha etkilidir. Güvenlik ekipmanları mutlaka kullanılmalıdır.",
              ],
            },
          ],
          conclusion: {
            title: "Profesyonel Malzeme Kullanımı",
            content: [
              "Doğru malzeme seçimi ve kullanımı, cam temizliğinin kalitesini belirler. Fethiye Cam Temizleme olarak, en kaliteli malzemeleri kullanarak profesyonel sonuçlar elde ediyoruz.",
              "Cam temizlik malzemeleri ve kullanımı hakkında daha fazla bilgi için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Malzemeler, Cam Temizliği, Ekipman",
        };
      case 6:
        return {
          introduction: [
            "Ofis camlarının düzenli bakımı, iş yerinin görsel kalitesini ve çalışanların motivasyonunu doğrudan etkiler. Temiz camlar, daha iyi doğal ışık sağlar ve profesyonel bir görünüm oluşturur. Fethiye Cam Temizleme olarak, ofis camlarının düzenli bakımının önemini ve faydalarını paylaşıyoruz.",
            "Bu rehber, ofis camlarının düzenli bakımının iş yerinize sağlayacağı faydaları ve profesyonel bakım programlarını detaylı bir şekilde açıklamaktadır.",
          ],
          quote: "Düzenli cam bakımı, ofis ortamının kalitesini artırır ve uzun vadede maliyet tasarrufu sağlar. Profesyonel bakım programları, iş yerinizin görsel kalitesini korur.",
          mainTitle: "Ofis Camlarının Düzenli Bakımının Önemi",
          sections: [
            {
              title: "1. Profesyonel Görünüm ve İlk İzlenim",
              content: [
                "Temiz camlar, iş yerinizin profesyonel görünümünü artırır ve müşterilerinize olumlu ilk izlenim verir. Kirli camlar, iş yerinizin bakımsız görünmesine neden olur.",
                "Öneriler: Düzenli cam temizliği, iş yerinizin görsel kalitesini korur. Müşteri ziyaretleri öncesi özel temizlik yapılabilir. Düzenli bakım programı oluşturarak sürekli temiz görünüm sağlanabilir.",
              ],
            },
            {
              title: "2. Doğal Işık ve Enerji Tasarrufu",
              content: [
                "Temiz camlar, daha fazla doğal ışık geçirir ve bu da enerji tasarrufu sağlar. Kirli camlar, doğal ışığı engeller ve yapay aydınlatma ihtiyacını artırır.",
                "Öneriler: Düzenli cam temizliği, doğal ışık geçirgenliğini artırır. Enerji maliyetlerinde tasarruf sağlar. Çalışanların daha iyi bir ortamda çalışmasını sağlar.",
              ],
            },
            {
              title: "3. Çalışan Motivasyonu ve Verimlilik",
              content: [
                "Temiz ve bakımlı bir ofis ortamı, çalışanların motivasyonunu ve verimliliğini artırır. Doğal ışık ve temiz görünüm, çalışma ortamının kalitesini yükseltir.",
                "Öneriler: Düzenli cam bakımı, çalışan memnuniyetini artırır. Daha iyi bir çalışma ortamı sağlar. Uzun vadede verimlilik artışı sağlar.",
              ],
            },
            {
              title: "4. Uzun Vadeli Maliyet Tasarrufu",
              content: [
                "Düzenli cam bakımı, uzun vadede maliyet tasarrufu sağlar. Kalıcı lekeler ve hasarlar, daha pahalı onarım ve değiştirme maliyetlerine neden olur.",
                "Öneriler: Düzenli bakım programları, özel indirimler içerir. Kalıcı hasarları önler. Uzun vadede toplam maliyeti düşürür.",
              ],
            },
            {
              title: "5. Özel Bakım Programları",
              content: [
                "Profesyonel cam temizlik hizmet sağlayıcıları, ofisler için özel bakım programları sunar. Bu programlar, düzenli temizlik, özel indirimler ve garantili hizmet içerir.",
                "Öneriler: Aylık veya üç aylık bakım programları oluşturun. Özel indirimlerden yararlanın. Garantili ve sigortalı hizmet alın.",
              ],
            },
          ],
          conclusion: {
            title: "Ofis Cam Bakımı İçin Profesyonel Destek",
            content: [
              "Ofis camlarının düzenli bakımı, iş yerinizin kalitesini ve çalışanların verimliliğini artırır. Fethiye Cam Temizleme olarak, ofisler için özel bakım programlarımızla hizmet veriyoruz.",
              "Ofis cam bakım programları ve özel teklifler hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Ofis Temizliği, Düzenli Bakım, İş Yeri",
        };
      default:
        return {
          introduction: [
            "Cam temizliği, ev ve ofis bakımının önemli bir parçasıdır. Fethiye Cam Temizleme olarak, profesyonel hizmetlerimiz ve uzman ekibimizle camlarınızın her zaman pırıl pırıl kalmasını sağlıyoruz.",
          ],
          quote: "Profesyonel cam temizliği, kalite ve güvenlik demektir.",
          mainTitle: post.title,
          sections: [],
          conclusion: {
            title: "Profesyonel Destek",
            content: [
              "Cam temizlik ihtiyaçlarınız için bizimle iletişime geçebilirsiniz.",
            ],
          },
          categories: "Cam Temizliği, Temizlik",
        };
    }
  };

  const content = getPostContent(slug);

  // Recent posts (excluding current post)
  const recentPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  // Share functionality
  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = post.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link kopyalandı!");
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content - 2/3 width */}
                <div className="lg:w-2/3">
                  {/* Article Content */}
                  <article className="prose prose-lg max-w-none">
                    {/* Introduction */}
                    <div className="mb-8">
                      {content.introduction.map((para, index) => (
                        <p
                          key={index}
                          className="text-gray-700 text-lg leading-relaxed mb-4"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Quote Section */}
                    {content.quote && (
                      <div className="my-12 p-8 bg-cream rounded-2xl border-l-4 border-[#FF7F00]">
                        <div className="flex items-start gap-4">
                          <span
                            className="text-6xl text-[#FF7F00] leading-none"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            "
                          </span>
                          <div>
                            <p
                              className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-relaxed"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {content.quote}
                            </p>
                            <p className="text-gray-600 italic">
                              - Fethiye Cam Temizleme Uzman Ekibi
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Content */}
                    {content.sections.length > 0 && (
                      <div className="mb-8">
                        <h2
                          className="text-3xl md:text-4xl text-gray-900 mb-6"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                        >
                          {content.mainTitle}
                        </h2>

                        {content.sections.map((section, index) => (
                          <div key={index} className="mb-10">
                            <h3
                              className="text-2xl md:text-3xl text-gray-900 mb-4"
                              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                            >
                              {section.title}
                            </h3>
                            {section.content.map((para, paraIndex) => (
                              <p
                                key={paraIndex}
                                className="text-gray-700 text-lg leading-relaxed mb-4"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        ))}

                        {/* Conclusion */}
                        {content.conclusion && (
                          <div className="mb-8 p-6 bg-[#3D8C40]/10 rounded-xl border-l-4 border-[#3D8C40]">
                            <h3
                              className="text-2xl text-gray-900 mb-4"
                              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                            >
                              {content.conclusion.title}
                            </h3>
                            {content.conclusion.content.map((para, index) => (
                              <p
                                key={index}
                                className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Separator */}
                    <div className="border-t border-gray-200 my-8"></div>

                    {/* Categories and Share */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Categories */}
                      <div className="flex items-center gap-2">
                        <RiHomeLine className="w-5 h-5 text-[#FF7F00]" />
                        <span className="text-gray-700">
                          {content.categories}
                        </span>
                      </div>

                      {/* Share Buttons */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 font-medium">Paylaş:</span>
                        <button
                          onClick={() => handleShare("copy")}
                          className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                          aria-label="Linki kopyala"
                        >
                          <RiLink className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("facebook")}
                          className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                          aria-label="Facebook'ta paylaş"
                        >
                          <RiFacebookFill className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                          aria-label="Twitter'da paylaş"
                        >
                          <RiTwitterXLine className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("whatsapp")}
                          className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white hover:bg-[#E67000] transition-colors"
                          aria-label="WhatsApp'ta paylaş"
                        >
                          <RiWhatsappLine className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Sidebar - 1/3 width */}
                <div className="lg:w-1/3">
                  <div className="sticky top-24 space-y-8">
                    {/* Search Bar */}
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Ara..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF7F00] transition-colors"
                        />
                        <RiSearchLine className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Recent Posts */}
                    <div>
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-6"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        Son Yazılar
                      </h3>
                      <div className="space-y-6">
                        {recentPosts.map((recentPost) => (
                          <Link
                            key={recentPost.id}
                            href={`/blog/${recentPost.slug}`}
                            className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 hover:opacity-80 transition-opacity"
                          >
                            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                              <Image
                                src={recentPost.image}
                                alt={recentPost.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-[#FF7F00] text-sm mb-1"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {recentPost.date}
                              </p>
                              <h4
                                className="text-base text-gray-900 line-clamp-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {recentPost.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

