import { db } from '@/lib/db'
import Link from 'next/link'
import { RiAddLine } from '@remixicon/react'
import FAQActions from '@/components/admin/FAQActions'

// Force dynamic rendering - prevent static generation and caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function FAQListPage() {
  // Middleware handles authentication
  const faqs = await db.fAQ.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-gray-600">SSS'lerinizi yönetin</p>
        </div>
        <Link href="/admin/faq/new" className="btn-primary">
          <RiAddLine className="w-5 h-5" />
          <span>Yeni Soru</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Soru
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cevap
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    Henüz soru yok. İlk sorunuzu oluşturun!
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{faq.question}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 line-clamp-2 max-w-md" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <FAQActions faqId={faq.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
