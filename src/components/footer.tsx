"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-[#003D7A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#003D7A] font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold">Daikin</span>
            </div>
            <p className="text-blue-100 mb-6">
              {t('company')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/daikin"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/daikin"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/daikin"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/daikin"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="text-blue-100 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('products')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Air Conditioning
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Heat Pumps
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  VRV Systems
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Refrigeration
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Air Purifiers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-100">{t('salesSupport')}</p>
                  <p className="text-white font-medium">+1 (800) 432-4546</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-100">{t('techSupport')}</p>
                  <p className="text-white font-medium">+1 (855) 770-8973</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-100">{t('email')}</p>
                  <p className="text-white font-medium">info@daikin.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-100">{t('headquarters')}</p>
                  <p className="text-white font-medium">
                    5151 San Felipe St.<br />
                    Houston, TX 77056
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-100 text-sm mb-4 md:mb-0">
              {t('copyright')}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">
                {t('terms')}
              </Link>
              <Link href="/cookies" className="text-blue-100 hover:text-white transition-colors">
                {t('cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}