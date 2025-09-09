import { useEffect } from 'react'

const SEOHead = ({ 
  title = "SALVE - Comunicação Sustentável | Marketing Consciente e Carbono Zero",
  description = "Empresa de comunicação comprometida com o futuro. Todo trabalho que realizamos é revertido em compensação de carbono, plantando árvores e contribuindo para um futuro mais verde.",
  keywords = "comunicação sustentável, marketing consciente, carbono zero, compensação carbono, árvores plantadas, responsabilidade social, branding verde",
  image = "/og-image.jpg",
  url = "https://salve-comunicacao.com/",
  section = "home"
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords)
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) {
      ogImage.setAttribute('content', image)
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', url)
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    }
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]')
    if (twitterImage) {
      twitterImage.setAttribute('content', image)
    }
    
    const twitterUrl = document.querySelector('meta[property="twitter:url"]')
    if (twitterUrl) {
      twitterUrl.setAttribute('content', url)
    }
    
    // Add section-specific structured data
    addSectionStructuredData(section)
    
  }, [title, description, keywords, image, url, section])
  
  const addSectionStructuredData = (section) => {
    // Remove existing section structured data
    const existingScript = document.querySelector('#section-structured-data')
    if (existingScript) {
      existingScript.remove()
    }
    
    let structuredData = null
    
    switch (section) {
      case 'services':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Serviços de Comunicação Sustentável",
          "provider": {
            "@type": "Organization",
            "name": "SALVE Comunicação Sustentável"
          },
          "serviceType": [
            "Marketing Consciente",
            "Comunicação Corporativa", 
            "Branding Verde"
          ],
          "description": "Estratégias de comunicação e marketing que respeitam o meio ambiente e promovem práticas responsáveis.",
          "areaServed": "Brasil"
        }
        break
        
      case 'sustainability':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "EnvironmentalActivity",
          "name": "Programa de Compensação de Carbono",
          "description": "Todo trabalho que realizamos é revertido em compensação de carbono, plantando árvores e contribuindo para um futuro mais verde.",
          "organizer": {
            "@type": "Organization",
            "name": "SALVE Comunicação Sustentável"
          },
          "result": {
            "@type": "QuantitativeValue",
            "value": "400+",
            "unitText": "árvores plantadas"
          }
        }
        break
        
      case 'contact':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contato - SALVE Comunicação Sustentável",
          "description": "Entre em contato conosco para transformar sua comunicação de forma sustentável.",
          "mainEntity": {
            "@type": "Organization",
            "name": "SALVE Comunicação Sustentável",
            "telephone": "+55-11-97975-7763",
            "email": "salvempresa@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "R Professor João Marinho, 95",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            }
          }
        }
        break
    }
    
    if (structuredData) {
      const script = document.createElement('script')
      script.id = 'section-structured-data'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }
  
  return null // This component doesn't render anything
}

export default SEOHead

