import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Building2, Mail, Phone, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from 'next/image';

export const FooterSection = () => {
  return (
    <footer id="footer" className="container px-0 pt-0 pb-8 sm:pb-12 mt-8">
      <div className="w-full bg-gradient-to-tr from-green-100 via-white to-green-50 border border-secondary rounded-2xl p-6 md:p-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 justify-center md:justify-start">
              <Image src="/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png" alt="Sahu Metals Logo" className="w-12 h-12 rounded-lg" width={48} height={48} />
              <span className="font-bold text-xl">Sahu Metals</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in agricultural excellence since 1990. We&apos;re committed to empowering farmers with innovative equipment solutions and exceptional service.
            </p>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm">G -510(1st), IPIA, road no. 7, Anatpura, kota, Rajasthan, (Sahu metals)</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+91 9829961487</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">sahumetalskota@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 justify-center md:justify-start mt-2">
                <a href="https://www.facebook.com/share/1Cp6tU9rNe/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/sahu_metals?igsh=MXJtdGYxMXpvcmE2Zw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@sahumetals" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/sahumetals" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links and Contact Support side by side */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-lg text-primary">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm hover:text-primary transition">Home</Link>
                <Link href="/products" className="text-sm hover:text-primary transition">Products</Link>
                <Link href="/about" className="text-sm hover:text-primary transition">About Us</Link>
                <Link href="#contact" className="text-sm hover:text-primary transition">Contact</Link>
              </div>
            </div>

            {/* Contact & Support */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-lg text-primary">Contact & Support</h3>
              <div className="flex flex-col gap-2">
                <Link href="https://wa.me/919829961487" target="_blank" className="text-sm hover:text-primary transition">WhatsApp Support</Link>
                <Link href="tel:+919829961487" className="text-sm hover:text-primary transition">Call Us</Link>
                <Link href="mailto:info@sahumetals.com" className="text-sm hover:text-primary transition">Email Us</Link>
                <Link href="#faq" className="text-sm hover:text-primary transition">FAQ</Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-2" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>&copy; 2024 Sahu Metals. All rights reserved.</span>
          <span>Made with ❤️ for Indian Agriculture</span>
          <Link 
            href="https://codientlabs.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Developed by CodientLabs
          </Link>
        </div>
      </div>
    </footer>
  );
};
