'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface MovieFAQProps {
  movieTitle?: string
  className?: string
}

/**
 * FAQ组件 - 增加内容深度，提升SEO和用户停留时间
 * 对AdSense收入有积极影响
 */
export default function MovieFAQ({ movieTitle = "Mahavatar Narsimha", className }: MovieFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const faqs: FAQItem[] = [
    {
      question: `When will ${movieTitle} be available on OTT platforms?`,
      answer: `${movieTitle} is expected to release on major OTT platforms like Netflix, Amazon Prime, and Disney+ Hotstar approximately 45-60 days after its theatrical release. The exact date depends on the box office performance and distribution agreements. Premium members on these platforms will have immediate access once available.`
    },
    {
      question: `Is ${movieTitle} suitable for children?`,
      answer: `Yes, ${movieTitle} is a family-friendly animated film that celebrates Indian mythology. The movie has been designed to appeal to audiences of all ages, with valuable life lessons about devotion, courage, and righteousness. Parents can confidently watch this with their children as it contains no inappropriate content while delivering powerful moral messages.`
    },
    {
      question: `What languages is ${movieTitle} available in?`,
      answer: `${movieTitle} has been released in 5 major Indian languages: Hindi, Tamil, Telugu, Kannada, and Malayalam. Each version features professional voice actors from the respective film industries, ensuring authentic dialogue delivery and cultural nuances. Subtitles are also available in English for international audiences.`
    },
    {
      question: `How long is the ${movieTitle} movie?`,
      answer: `The total runtime of ${movieTitle} is 2 hours and 10 minutes (130 minutes). This includes the main feature film without any intermission in the OTT version. The theatrical version may have a 10-minute intermission depending on the cinema house. The pacing is well-balanced with action, emotion, and spiritual elements.`
    },
    {
      question: `Is ${movieTitle} part of a series?`,
      answer: `Yes! ${movieTitle} is the first film in the ambitious Mahavatar Cinematic Universe, which plans to chronicle all ten avatars of Lord Vishnu over the next decade. Six more films are already in various stages of production, with the next installment expected in 2026. This interconnected universe will be India's answer to global cinematic franchises.`
    },
    {
      question: `Can I download ${movieTitle} for offline viewing?`,
      answer: `Once available on OTT platforms, premium subscribers can download ${movieTitle} for offline viewing through the respective apps. The download quality options typically include HD (720p) and Full HD (1080p), depending on your subscription plan and device storage. Downloaded content usually remains available for 48 hours after you start watching.`
    },
    {
      question: `What is the budget of ${movieTitle}?`,
      answer: `${movieTitle} was produced with a budget of over ₹100 crores, making it one of India's most expensive animated productions. The film took 4.5 years to complete, with state-of-the-art animation technology and a team of over 500 artists. This investment shows in the stunning visual quality and attention to detail throughout the film.`
    },
    {
      question: `Who are the voice actors in ${movieTitle}?`,
      answer: `The film features renowned voice actors including Ashwin Kumar as Lord Narsimha, along with talented artists voicing Prahlada, Hiranyakashipu, and other characters. Each language version has its own set of popular voice actors from respective film industries, chosen specifically for their ability to bring depth and emotion to the animated characters.`
    },
    {
      question: `Is ${movieTitle} based on true mythology?`,
      answer: `Yes, ${movieTitle} is based on the ancient Hindu scripture stories from the Bhagavata Purana and other Puranic texts. The story of Lord Narasimha, the fourth avatar of Lord Vishnu, is one of the most celebrated tales in Hindu mythology. The film stays true to the core mythological narrative while presenting it with modern animation techniques.`
    },
    {
      question: `Will there be a sequel to ${movieTitle}?`,
      answer: `While ${movieTitle} is a complete story in itself, it's part of the larger Mahavatar Cinematic Universe. The next films will focus on other avatars of Lord Vishnu, with potential crossover elements. The producers have confirmed that characters and themes from ${movieTitle} may appear in future installments of the franchise.`
    }
  ]

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
      
      // 追踪用户互动（提升广告价值）
      if (window.gtag) {
        window.gtag('event', 'faq_interaction', {
          question_index: index,
          movie_title: movieTitle,
          action: 'expand'
        })
      }
    }
    setOpenItems(newOpenItems)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>
          Everything you need to know about {movieTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left flex justify-between items-start gap-4"
              aria-expanded={openItems.has(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-semibold text-lg pr-2">
                {faq.question}
              </h3>
              {openItems.has(index) ? (
                <ChevronUp className="w-5 h-5 flex-shrink-0 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-500" />
              )}
            </button>
            
            {openItems.has(index) && (
              <div
                id={`faq-answer-${index}`}
                className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        
        {/* Schema.org 结构化数据 for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </CardContent>
    </Card>
  )
}