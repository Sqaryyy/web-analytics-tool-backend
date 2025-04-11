"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  LineChart,
  Activity,
  Zap,
  GanttChartSquare,
  Split,
  Users,
  Check,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInFromLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInFromRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

const cardHover = {
  y: -8,
  transition: { duration: 0.3 },
};

const cardTap = {
  scale: 0.95,
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <motion.main
        className="min-h-screen bg-black text-white"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center"
              variants={slideInFromLeft}
            >
              <div className="bg-[#1DCD9F] rounded-md p-1 mr-2">
                <BarChart3 className="h-6 w-6 text-black" />
              </div>
              <span className="font-bold text-2xl">
                Metrix<span className="text-[#1DCD9F]">.</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-10">
              <motion.a
                href="#features"
                className="text-gray-300 hover:text-[#1DCD9F] transition"
                whileHover={{ scale: 1.1, color: "#1DCD9F" }}
                transition={{ duration: 0.2 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#pricing"
                className="text-gray-300 hover:text-[#1DCD9F] transition"
                whileHover={{ scale: 1.1, color: "#1DCD9F" }}
                transition={{ duration: 0.2 }}
              >
                Pricing
              </motion.a>
              <motion.a
                href="#testimonials"
                className="text-gray-300 hover:text-[#1DCD9F] transition"
                whileHover={{ scale: 1.1, color: "#1DCD9F" }}
                transition={{ duration: 0.2 }}
              >
                Testimonials
              </motion.a>
              <motion.a
                href="#contact"
                className="text-gray-300 hover:text-[#1DCD9F] transition"
                whileHover={{ scale: 1.1, color: "#1DCD9F" }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </motion.a>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                className="bg-transparent border border-[#1DCD9F] text-[#1DCD9F] px-4 py-2 rounded-md hover:bg-[#1DCD9F]/10 transition"
                whileHover={buttonHover}
                whileTap={cardTap}
              >
                Login
              </motion.button>
              <motion.button
                className="bg-[#1DCD9F] text-black px-4 py-2 rounded-md hover:bg-[#169976] transition"
                whileHover={buttonHover}
                whileTap={cardTap}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-5xl font-bold mb-6"
                variants={slideInFromLeft}
                initial="initial"
                animate="animate"
              >
                Track, Analyze, <span className="text-[#1DCD9F]">Optimize</span>{" "}
                Your Web Experience
              </motion.h1>
              <motion.p
                className="text-gray-400 text-lg mb-8"
                variants={slideInFromLeft}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Complete analytics solution with real-time tracking, A/B
                testing, and visual user journey mapping to boost your
                conversion rates.
              </motion.p>
              <motion.div
                className="flex space-x-4"
                variants={slideInFromLeft}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  className="bg-[#1DCD9F] text-black px-6 py-3 rounded-md hover:bg-[#169976] transition font-medium"
                  whileHover={buttonHover}
                  whileTap={cardTap}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="bg-[#222222] text-white px-6 py-3 rounded-md hover:bg-[#333333] transition font-medium"
                  whileHover={buttonHover}
                  whileTap={cardTap}
                >
                  View Demo
                </motion.button>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              variants={slideInFromRight}
              initial="initial"
              animate="animate"
            >
              <div className="bg-[#222222] p-6 rounded-xl shadow-xl">
                <div className="relative w-full h-72 bg-[#000000] rounded-lg overflow-hidden">
                  <Image
                    src="/api/placeholder/800/500"
                    alt="Analytics Dashboard"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <motion.div
                    className="bg-black p-3 rounded-lg"
                    whileHover={cardHover}
                    whileTap={cardTap}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Visitors</h4>
                      <Activity className="h-4 w-4 text-[#1DCD9F]" />
                    </div>
                    <p className="text-2xl font-bold">14.2K</p>
                    <p className="text-xs text-green-500">↑ 12.5%</p>
                  </motion.div>
                  <motion.div
                    className="bg-black p-3 rounded-lg"
                    whileHover={cardHover}
                    whileTap={cardTap}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Conversion</h4>
                      <Zap className="h-4 w-4 text-[#1DCD9F]" />
                    </div>
                    <p className="text-2xl font-bold">4.3%</p>
                    <p className="text-xs text-green-500">↑ 3.2%</p>
                  </motion.div>
                  <motion.div
                    className="bg-black p-3 rounded-lg"
                    whileHover={cardHover}
                    whileTap={cardTap}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Bounce</h4>
                      <LineChart className="h-4 w-4 text-[#1DCD9F]" />
                    </div>
                    <p className="text-2xl font-bold">29%</p>
                    <p className="text-xs text-red-500">↓ 2.1%</p>
                  </motion.div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#1DCD9F]/20 rounded-full blur-xl z-0"></div>
              <div className="absolute -left-4 -top-4 w-32 h-32 bg-[#1DCD9F]/10 rounded-full blur-xl z-0"></div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-[#222222] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl font-bold mb-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                Powerful Analytics Toolkit
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-2xl mx-auto"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Everything you need to understand your users and optimize your
                web experience
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-black p-8 rounded-xl hover:translate-y-[-8px] transition-transform duration-300"
                whileHover={cardHover}
                whileTap={cardTap}
              >
                <div className="w-14 h-14 bg-[#1DCD9F]/10 rounded-lg flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7 text-[#1DCD9F]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time Analytics</h3>
                <p className="text-gray-400">
                  Monitor visitors, page views, conversions, and more with live
                  data updates and customizable dashboards.
                </p>
              </motion.div>

              <motion.div
                className="bg-black p-8 rounded-xl hover:translate-y-[-8px] transition-transform duration-300"
                whileHover={cardHover}
                whileTap={cardTap}
              >
                <div className="w-14 h-14 bg-[#1DCD9F]/10 rounded-lg flex items-center justify-center mb-6">
                  <Split className="w-7 h-7 text-[#1DCD9F]" />
                </div>
                <h3 className="text-xl font-bold mb-4">A/B Testing</h3>
                <p className="text-gray-400">
                  Create, run and analyze experiments to optimize your webpage
                  elements and improve conversion rates.
                </p>
              </motion.div>

              <motion.div
                className="bg-black p-8 rounded-xl hover:translate-y-[-8px] transition-transform duration-300"
                whileHover={cardHover}
                whileTap={cardTap}
              >
                <div className="w-14 h-14 bg-[#1DCD9F]/10 rounded-lg flex items-center justify-center mb-6">
                  <GanttChartSquare className="w-7 h-7 text-[#1DCD9F]" />
                </div>
                <h3 className="text-xl font-bold mb-4">User Journey Maps</h3>
                <p className="text-gray-400">
                  Visualize user flows and identify drop-off points to optimize
                  the path to conversion.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Feature 1 */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center mb-24"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div>
                <div className="inline-block px-3 py-1 bg-[#1DCD9F]/10 text-[#1DCD9F] rounded-full text-sm font-medium mb-4">
                  Real-time Analytics
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  Understand your visitors in real-time
                </h3>
                <p className="text-gray-400 mb-6">
                  Get instant insights into who's visiting your site, what
                  they're doing, and how they're engaging with your content.
                  Make data-driven decisions with our comprehensive real-time
                  analytics dashboard.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Live visitor tracking with geographic data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Real-time conversion monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Custom event tracking and goal setting</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-[#222222] p-6 rounded-xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="Real-time Analytics Dashboard"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#1DCD9F]/20 rounded-full blur-xl z-0"></div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center mb-24"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="order-2 md:order-1 relative">
                <div className="bg-[#222222] p-6 rounded-xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="A/B Testing Interface"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-[#1DCD9F]/20 rounded-full blur-xl z-0"></div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-3 py-1 bg-[#1DCD9F]/10 text-[#1DCD9F] rounded-full text-sm font-medium mb-4">
                  A/B Testing
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  Optimize with data-driven experiments
                </h3>
                <p className="text-gray-400 mb-6">
                  Create, run, and analyze experiments to test different
                  versions of your webpages. Optimize elements like headlines,
                  buttons, images, and layouts to maximize conversion rates.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Visual editor for creating test variants</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Statistical significance calculations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Automatic winner implementation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div>
                <div className="inline-block px-3 py-1 bg-[#1DCD9F]/10 text-[#1DCD9F] rounded-full text-sm font-medium mb-4">
                  User Journey Mapping
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  Visualize your user's path to conversion
                </h3>
                <p className="text-gray-400 mb-6">
                  Identify where users drop off in your conversion funnel with
                  our visual journey mapping tools. Understand the paths users
                  take through your site and optimize problematic touchpoints.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Visual funnel analysis and optimization</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>Page-by-page drop-off analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-5 h-5 bg-[#1DCD9F] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span>User session recordings and heatmaps</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-[#222222] p-6 rounded-xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="User Journey Map"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#1DCD9F]/20 rounded-full blur-xl z-0"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-[#222222] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl font-bold mb-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                Trusted by Growth Leaders
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-2xl mx-auto"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                See what our customers are saying about our analytics platform
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div className="bg-black p-8 rounded-xl" variants={fadeIn}>
                <div className="flex items-center text-[#1DCD9F] mb-4">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-6">
                  "Metrix helped us increase our conversion rate by 32% in just
                  three months. The A/B testing tools made it easy to optimize
                  our landing pages."
                </p>
                <div className="flex items-center">
                  <div className="bg-[#1DCD9F] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold mr-3">
                    JS
                  </div>
                  <div>
                    <p className="font-medium">Jamie Smith</p>
                    <p className="text-gray-500 text-sm">
                      Marketing Director, TechFlow
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="bg-black p-8 rounded-xl" variants={fadeIn}>
                <div className="flex items-center text-[#1DCD9F] mb-4">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-6">
                  "The user journey visualization tools have completely changed
                  how we think about our site structure. We fixed key drop-off
                  points and saw immediate improvements."
                </p>
                <div className="flex items-center">
                  <div className="bg-[#1DCD9F] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold mr-3">
                    AR
                  </div>
                  <div>
                    <p className="font-medium">Alex Rodriguez</p>
                    <p className="text-gray-500 text-sm">
                      UX Lead, Shopify Plus
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="bg-black p-8 rounded-xl" variants={fadeIn}>
                <div className="flex items-center text-[#1DCD9F] mb-4">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-6">
                  "Implementing Metrix was simple, and the insights we gained
                  were invaluable. Real-time data helped us make smarter
                  decisions faster."
                </p>
                <div className="flex items-center">
                  <div className="bg-[#1DCD9F] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold mr-3">
                    KL
                  </div>
                  <div>
                    <p className="font-medium">Kira Lee</p>
                    <p className="text-gray-500 text-sm">CEO, GrowthLabs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl font-bold mb-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                Simple, Transparent Pricing
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-2xl mx-auto"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Choose the plan that fits your needs
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-[#222222] p-8 rounded-xl border border-transparent hover:border-[#1DCD9F]/30 transition-all duration-300"
                whileHover={{ borderColor: "#1DCD9F", scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-gray-400 mb-6">Perfect for small websites</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Up to 10,000 monthly pageviews</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Basic A/B testing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Real-time analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>3 user seats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <motion.button
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-[#1DCD9F] hover:text-black transition font-medium"
                  whileHover={buttonHover}
                  whileTap={cardTap}
                >
                  Get Started
                </motion.button>
              </motion.div>

              <motion.div
                className="bg-[#222222] p-8 rounded-xl border-2 border-[#1DCD9F] transform scale-105 shadow-xl"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#1DCD9F] text-black px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <p className="text-gray-400 mb-6">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Up to 50,000 monthly pageviews</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Advanced A/B testing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>User journey mapping</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Heatmaps & session recordings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>10 user seats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <motion.button
                  className="w-full bg-[#1DCD9F] text-black py-3 rounded-md hover:bg-[#169976] transition font-medium"
                  whileHover={buttonHover}
                  whileTap={cardTap}
                >
                  Get Started
                </motion.button>
              </motion.div>

              <motion.div
                className="bg-[#222222] p-8 rounded-xl border border-transparent hover:border-[#1DCD9F]/30 transition-all duration-300"
                whileHover={{ borderColor: "#1DCD9F", scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-6">For large organizations</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Unlimited pageviews</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Enterprise A/B testing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Advanced user journey analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Unlimited user seats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>24/7 phone & email support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#1DCD9F] mt-1 mr-3 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <motion.button
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-[#1DCD9F] hover:text-black transition font-medium"
                  whileHover={buttonHover}
                  whileTap={cardTap}
                >
                  Contact Sales
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#222222] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-black p-12 rounded-2xl relative overflow-hidden"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1DCD9F]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#1DCD9F]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to optimize your web experience?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Start tracking, testing, and optimizing today. No credit card
                  required for your 14-day free trial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-[#1DCD9F] text-black px-8 py-3 rounded-md hover:bg-[#169976] transition font-medium"
                    whileHover={buttonHover}
                    whileTap={cardTap}
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    className="bg-transparent border border-[#1DCD9F] text-[#1DCD9F] px-8 py-3 rounded-md hover:bg-[#1DCD9F]/10 transition"
                    whileHover={buttonHover}
                    whileTap={cardTap}
                  >
                    Request Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 pb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-[#1DCD9F] rounded-md p-1 mr-2">
                    <BarChart3 className="h-5 w-5 text-black" />
                  </div>
                  <span className="font-bold text-xl">
                    Metrix<span className="text-[#1DCD9F]">.</span>
                  </span>
                </div>
                <p className="text-gray-400 mb-6">
                  Comprehensive analytics solution for optimizing your web
                  experience with real-time data.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-[#222222] rounded-full flex items-center justify-center hover:bg-[#1DCD9F] transition"
                    whileHover={{ scale: 1.1, backgroundColor: "#1DCD9F" }}
                    whileTap={cardTap}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-[#222222] rounded-full flex items-center justify-center hover:bg-[#1DCD9F] transition"
                    whileHover={{ scale: 1.1, backgroundColor: "#1DCD9F" }}
                    whileTap={cardTap}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.5 17.5h-3v-9h3v9zM7 7.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 7 7.5zM18.5 17.5h-3v-5.25c0-1.375-.375-2.25-1.875-2.25a2.19 2.19 0 0 0-2 1.375A2.85 2.85 0 0 0 11.5 12.5v5h-3v-9h3v1.5a3.56 3.56 0 0 1 3.25-1.875c2.375 0 3.75 1.5 3.75 4.625v4.75z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 bg-[#222222] rounded-full flex items-center justify-center hover:bg-[#1DCD9F] transition"
                    whileHover={{ scale: 1.1, backgroundColor: "#1DCD9F" }}
                    whileTap={cardTap}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-1.05-.01-1.9-2.51.46-3.16-.61-3.36-1.18-.11-.29-.6-1.18-1.02-1.42-.35-.18-.85-.63-.01-.64.79-.01 1.35.72 1.54 1.02.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.02-2.68-.1-.25-.44-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.54 1.37.2 2.39.1 2.64.63.69 1.02 1.58 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.67.91.67 1.85 0 1.34-.01 2.41-.01 2.75 0 .26.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </motion.a>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Features
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Pricing
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Integrations
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Changelog
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Documentation
                    </motion.a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Blog
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Case Studies
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Webinars
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Help Center
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Community
                    </motion.a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      About Us
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Careers
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Contact
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Privacy Policy
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-[#1DCD9F] transition"
                      whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Terms of Service
                    </motion.a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Metrix Analytics. All rights
                reserved.
              </p>
              <div className="flex space-x-6">
                <motion.a
                  href="#"
                  className="text-gray-500 hover:text-[#1DCD9F] text-sm"
                  whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Privacy
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-500 hover:text-[#1DCD9F] text-sm"
                  whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Terms
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-500 hover:text-[#1DCD9F] text-sm"
                  whileHover={{ color: "#1DCD9F", scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Cookies
                </motion.a>
              </div>
            </div>
          </div>
        </footer>
      </motion.main>
    </Suspense>
  );
}
