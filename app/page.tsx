"use client"

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { 
  Sparkles, 
  Shield, 
  Users, 
  Zap, 
  Award, 
  CheckCircle2,
  Building2,
  Dumbbell,
  Layers,
  SprayCan,
  Home,
  ArrowRight,
  Phone,
  Mail,
  ChevronUp,
  ChevronDown,
  MessageCircle
} from "lucide-react"

// 3D Parallax slide variants - mais suave
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.95,
    rotateX: direction > 0 ? 5 : -5
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: (direction: number) => ({
    y: direction < 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.95,
    rotateX: direction < 0 ? 5 : -5,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// Animation variants - mais suaves
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const parallaxItem = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

// Slide Components
function CoverSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted relative overflow-hidden perspective-1000">
      {/* Decorative elements with parallax depth */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-10 right-10 md:top-20 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-40 md:w-80 h-40 md:h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Logo */}
          <motion.div 
            variants={parallaxItem} 
            className="mb-4 sm:mb-6 md:mb-10"
            style={{ transform: "translateZ(50px)" }}
          >
            <Image
              src="/images/logo.png"
              alt="Haja Clean Facilities Services"
              width={400}
              height={200}
              className="w-auto h-20 sm:h-28 md:h-36 lg:h-44 object-contain"
              priority
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={parallaxItem}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance"
            style={{ transform: "translateZ(30px)" }}
          >
            Excelencia em Limpeza e Facilities
            <span className="text-primary block mt-1 sm:mt-2">com Padrao Profissional</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={parallaxItem}
            className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed px-2"
            style={{ transform: "translateZ(20px)" }}
          >
            Transformamos ambientes em experiencias de excelencia, oferecendo solucoes premium 
            em limpeza profissional e facilities services.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

function AboutSlide() {
  return (
    <div className="h-full w-full flex items-center bg-background py-6 md:py-0 overflow-y-auto perspective-1000">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="relative order-2 lg:order-1"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/cleaning-worker.jpeg"
                alt="Profissional da Haja Clean em acao"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </motion.div>
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-4 bg-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-lg sm:text-xl font-bold">+500</p>
              <p className="text-[10px] sm:text-xs opacity-90">Ambientes transformados</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.span 
              variants={fadeInUp}
              className="text-secondary font-semibold uppercase tracking-widest text-[10px] sm:text-xs"
            >
              Sobre Nos
            </motion.span>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 sm:mt-2 leading-tight"
            >
              Compromisso com a
              <span className="text-primary"> Excelencia</span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed"
            >
              A Haja Clean Facilities Services nasceu com a missao de elevar o padrao de 
              limpeza e conservacao de ambientes. Combinamos profissionalismo, tecnologia 
              e dedicacao para entregar resultados que superam expectativas.
            </motion.p>

            <motion.div 
              variants={staggerContainer}
              className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-4"
            >
              {[
                { icon: Shield, text: "Seguranca garantida" },
                { icon: Award, text: "Padrao premium" },
                { icon: Users, text: "Equipe especializada" },
                { icon: Zap, text: "Agilidade operacional" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-[10px] sm:text-xs md:text-sm">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ServicesSlide() {
  const services = [
    { icon: Dumbbell, title: "Limpeza de Academias", description: "Higienizacao completa" },
    { icon: Layers, title: "Limpeza de Tatames", description: "Tratamento especializado" },
    { icon: Building2, title: "Limpeza Corporativa", description: "Solucoes empresariais" },
    { icon: SprayCan, title: "Higienizacao", description: "Sanitizacao avancada" },
    { icon: Home, title: "Conservacao", description: "Manutencao continua" },
    { icon: Sparkles, title: "Facilities", description: "Gestao integrada" }
  ]

  return (
    <div className="h-full w-full flex items-center bg-muted py-6 md:py-0 overflow-y-auto perspective-1000">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.span 
            variants={fadeInUp}
            className="text-secondary font-semibold uppercase tracking-widest text-[10px] sm:text-xs"
          >
            Nossos Servicos
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 sm:mt-2"
          >
            Solucoes <span className="text-primary">Premium</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={parallaxItem}
              whileHover={{ 
                scale: 1.03, 
                rotateY: 3,
                z: 20,
                transition: { duration: 0.3 }
              }}
              className="group bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border/50"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-2 sm:mb-3">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground mb-0.5 sm:mb-1 leading-tight">{service.title}</h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function GallerySlide() {
  const images = [
    { src: "/images/gym-floor-clean.jpeg", title: "Pisos Impecaveis" },
    { src: "/images/gym-equipment.jpeg", title: "Equipamentos Higienizados" },
    { src: "/images/gym-tatame.jpeg", title: "Areas Funcionais" }
  ]

  return (
    <div className="h-full w-full flex items-center bg-background py-6 md:py-0 overflow-y-auto perspective-1000">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.span 
            variants={fadeInUp}
            className="text-secondary font-semibold uppercase tracking-widest text-[10px] sm:text-xs"
          >
            Nosso Trabalho
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 sm:mt-2"
          >
            Resultados que <span className="text-primary">Impressionam</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-3 gap-2 sm:gap-4 max-w-5xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((image, i) => (
            <motion.div
              key={i}
              variants={parallaxItem}
              whileHover={{ 
                scale: 1.05, 
                rotateY: i === 1 ? 0 : (i === 0 ? 5 : -5),
                z: 30
              }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-lg group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                <span className="text-white/70 text-[8px] sm:text-xs font-medium uppercase tracking-widest">0{i + 1}</span>
                <h3 className="text-white text-xs sm:text-base md:text-lg font-bold mt-0.5">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function DifferentialsSlide() {
  const differentials = [
    { icon: Users, title: "Equipe Especializada" },
    { icon: SprayCan, title: "Produtos Profissionais" },
    { icon: CheckCircle2, title: "Atendimento Personalizado" },
    { icon: Zap, title: "Agilidade Operacional" },
    { icon: Shield, title: "Tecnologia e Eficiencia" },
    { icon: Award, title: "Alto Padrao de Qualidade" }
  ]

  return (
    <div className="h-full w-full flex items-center bg-primary py-6 md:py-0 overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.span 
            variants={fadeInUp}
            className="text-primary-foreground/80 font-semibold uppercase tracking-widest text-[10px] sm:text-xs"
          >
            Por que nos escolher
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mt-1 sm:mt-2"
          >
            Nossos Diferenciais
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto"
        >
          {differentials.map((item, i) => (
            <motion.div
              key={i}
              variants={parallaxItem}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-primary-foreground/20"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center mb-2 sm:mb-3">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-primary-foreground leading-tight">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function BeforeAfterSlide() {
  return (
    <div className="h-full w-full flex items-center bg-muted py-6 md:py-0 overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.span 
            variants={fadeInUp}
            className="text-secondary font-semibold uppercase tracking-widest text-[10px] sm:text-xs"
          >
            Transformacao Real
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 sm:mt-2"
          >
            Antes e <span className="text-primary">Depois</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="mt-2 text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto"
          >
            Veja a transformacao que realizamos na limpeza de tatames
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {/* Antes */}
          <motion.div variants={parallaxItem} className="relative">
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
              ANTES
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/tatame-antes.jpeg"
                alt="Tatame antes da limpeza"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Depois */}
          <motion.div variants={parallaxItem} className="relative">
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
              DEPOIS
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/tatame-depois.jpeg"
                alt="Tatame depois da limpeza"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Texto de impacto */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-4 sm:mt-6 text-center"
        >
          <p className="text-foreground font-medium text-sm sm:text-base md:text-lg">
            Higienizacao profunda que faz a diferenca
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Equipamentos e tecnicas especializadas para resultados impecaveis
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function ResultsSlide() {
  const results = [
    "Ambientes mais seguros e saudaveis",
    "Excelencia em higiene e sanitizacao",
    "Valorizacao do seu espaco",
    "Sensacao de bem-estar"
  ]

  return (
    <div className="h-full w-full flex items-center bg-background py-6 md:py-0 overflow-y-auto relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/cleaning-worker.jpeg" alt="Background" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-secondary font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
              Resultados e Impacto
            </motion.span>
            
            <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 sm:mt-2 leading-tight">
              O que voce pode<span className="text-primary"> esperar</span>
            </motion.h2>

            <motion.div variants={staggerContainer} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {results.map((result, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground font-medium">{result}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Grid - sem tatame */}
          <motion.div initial="hidden" animate="visible" variants={scaleIn} className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="space-y-2 sm:space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/gym-floor-clean.jpeg" alt="Resultado 1" fill className="object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/gym-equipment.jpeg" alt="Resultado 2" fill className="object-cover" />
              </motion.div>
            </div>
            <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
              <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/cleaning-worker.jpeg" alt="Resultado 3" fill className="object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/tatame-depois.jpeg" alt="Resultado 4" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ClosingSlide() {
  return (
    <div className="h-full w-full flex items-center bg-gradient-to-br from-foreground via-foreground to-foreground/95 py-6 md:py-0 overflow-y-auto relative perspective-1000">
      {/* Decorative elements */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-48 sm:w-80 h-48 sm:h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Logo - mais abaixo */}
          <motion.div variants={scaleIn} className="mb-6 sm:mb-8 md:mb-10 mt-8 sm:mt-10 md:mt-12">
            <Image
              src="/images/logo.png"
              alt="Haja Clean Facilities Services"
              width={300}
              height={150}
              className="w-auto h-16 sm:h-20 md:h-28 object-contain mx-auto"
            />
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-background leading-tight">
            Pronto para transformar
            <span className="text-primary block mt-1">seu ambiente?</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-3 sm:mt-4 text-background/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos elevar o padrao 
            de limpeza e conservacao do seu espaco.
          </motion.p>

          {/* Contact Info */}
          <motion.div variants={staggerContainer} className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            {/* WhatsApp Numbers */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <a 
                href="https://wa.me/5511964768536"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/90 hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <span className="font-medium text-xs sm:text-sm">(11) 96476-8536</span>
              </a>

              <a 
                href="https://wa.me/5511971864714"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/90 hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <span className="font-medium text-xs sm:text-sm">(11) 97186-4714</span>
              </a>
            </motion.div>

            {/* Phone and Email */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <a 
                href="tel:+551143061777"
                className="flex items-center gap-2 text-background/90 hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="font-medium text-xs sm:text-sm">(11) 4306-1777</span>
              </a>

              <a 
                href="mailto:comercial@hajaclean.com.br"
                className="flex items-center gap-2 text-background/90 hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="font-medium text-xs sm:text-sm">comercial@hajaclean.com.br</span>
              </a>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeInUp} className="mt-6 sm:mt-8">
            <a 
              href="https://wa.me/5511964768536"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all hover:scale-105 shadow-xl"
            >
              <span>Solicitar Orcamento</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Footer */}
          <motion.p variants={fadeInUp} className="mt-6 sm:mt-8 text-background/50 text-[10px] sm:text-xs">
            Haja Clean Facilities Services - Transformando ambientes com excelencia
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// Main Presentation Component
export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    { component: CoverSlide, name: "Capa" },
    { component: AboutSlide, name: "Sobre" },
    { component: ServicesSlide, name: "Servicos" },
    { component: GallerySlide, name: "Galeria" },
    { component: DifferentialsSlide, name: "Diferenciais" },
    { component: BeforeAfterSlide, name: "Antes/Depois" },
    { component: ResultsSlide, name: "Resultados" },
    { component: ClosingSlide, name: "Contato" }
  ]

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [currentSlide, isAnimating])

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, goToSlide, slides.length])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch/Swipe navigation
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const diffY = touchStartY - touchEndY
      const diffX = touchStartX - touchEndX

      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
        if (diffY > 0) nextSlide()
        else prevSlide()
      } else if (Math.abs(diffX) > 50) {
        if (diffX > 0) nextSlide()
        else prevSlide()
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <main className="h-screen w-screen overflow-hidden bg-background relative" style={{ perspective: "1200px" }}>
      {/* Slides Container with 3D Perspective */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Discrete Navigation - Right Side (Desktop) - Alinhado */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-50">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              currentSlide === i ? "" : "opacity-50 hover:opacity-90"
            }`}
            aria-label={`Ir para ${slide.name}`}
          >
            <span className={`text-xs font-medium transition-all duration-300 whitespace-nowrap ${
              currentSlide === i ? "opacity-100 text-foreground" : "opacity-0 group-hover:opacity-100 text-muted-foreground"
            }`}>
              {slide.name}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
              currentSlide === i 
                ? "bg-primary scale-110" 
                : "bg-muted-foreground/40 group-hover:bg-primary/60"
            }`} />
          </button>
        ))}
      </div>

      {/* Discrete Navigation Buttons - Bottom Corners */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center ${
            currentSlide === 0
              ? "opacity-0 pointer-events-none"
              : "bg-foreground/5 backdrop-blur-sm text-foreground/60 hover:bg-foreground/10 hover:text-foreground active:scale-95"
          }`}
          aria-label="Slide anterior"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center ${
            currentSlide === slides.length - 1
              ? "opacity-0 pointer-events-none"
              : "bg-primary/90 text-primary-foreground hover:bg-primary active:scale-95"
          }`}
          aria-label="Proximo slide"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Slide Dots - Top - Perfeitamente Alinhados */}
      <div className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center justify-center gap-1.5 bg-foreground/5 backdrop-blur-sm px-3 py-2 rounded-full">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="p-0.5"
              aria-label={`Ir para slide ${i + 1}`}
            >
              <div className={`rounded-full transition-all duration-300 ${
                currentSlide === i 
                  ? "bg-primary w-2 h-2" 
                  : "bg-foreground/30 w-2 h-2 hover:bg-foreground/50"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
