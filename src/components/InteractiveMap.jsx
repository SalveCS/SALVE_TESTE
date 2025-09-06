import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import { Mail, Phone, Instagram, MapPin } from 'lucide-react'
import logoSalveBranco from '../assets/images/logo_salve_branco.png'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const InteractiveMap = () => {
  // Coordenadas aproximadas para R Professor João Marinho, 95 - São Paulo, SP
  const position = [-23.5505, -46.6333] // São Paulo, SP

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Company Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Logo and Company Description */}
            <div className="text-center lg:text-left">
              <motion.img 
                src={logoSalveBranco} 
                alt="SALVE" 
                className="h-16 w-auto mx-auto lg:mx-0 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Conectando surfistas ao oceano através de produtos inovadores que promovem a sustentabilidade e a consciência ambiental.
              </motion.p>
            </div>

            {/* Navigation Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">Navegação</h3>
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                {[
                  { name: 'Início', id: 'inicio' },
                  { name: 'Cascudo', id: 'sobre' },
                  { name: 'Energia Salgada', id: 'services' },
                  { name: 'Sobre', id: 'sustentabilidade' }
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.id}`}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm font-medium block py-2 px-3 rounded-lg hover:bg-white/10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">Contato</h3>
              <div className="space-y-3 max-w-sm mx-auto lg:mx-0">
                <motion.a
                  href="mailto:salvempresa@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">salvempresa@gmail.com</span>
                </motion.a>
                
                <motion.a
                  href="https://wa.me/5511979757763?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20SALVE."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">+55 (11) 97975-7763</span>
                </motion.a>
                
                <motion.a
                  href="https://instagram.com/salve_cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">@salve_cs</span>
                </motion.a>
                
                <motion.div
                  className="flex items-center space-x-3 text-gray-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">R Professor João Marinho, 95 - São Paulo, SP</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Map */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
              <div className="h-96 w-full">
                <MapContainer
                  center={position}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  className="z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-center p-2">
                        <img src={logoSalveBranco} alt="SALVE" className="h-8 w-auto mx-auto mb-2" />
                        <p className="font-semibold text-gray-800">SALVE</p>
                        <p className="text-sm text-gray-600">Comunicação Sustentável</p>
                        <p className="text-xs text-gray-500 mt-1">R Professor João Marinho, 95</p>
                        <p className="text-xs text-gray-500">São Paulo, SP</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              
              {/* Map Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap

