import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users, Award, Heart, Shield } from "lucide-react";
import { FooterSection } from "@/components/layout/sections/footer";

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto py-12 md:py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            About Sahu Metals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in agricultural excellence since 1990. We&apos;re committed to empowering farmers with innovative equipment solutions and exceptional service.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-muted/50 dark:bg-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                To revolutionize Indian agriculture by providing farmers with cutting-edge equipment, comprehensive support, and sustainable solutions that enhance productivity and profitability.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 dark:bg-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground">
                To be India&apos;s leading agricultural equipment provider, known for innovation, reliability, and farmer-centric solutions that drive agricultural growth and sustainability.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-muted/50 dark:bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Customer First</h3>
                </div>
                <p className="text-muted-foreground">
                  We prioritize our customers&apos; needs, providing personalized solutions and exceptional service at every step.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 dark:bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Quality Excellence</h3>
                </div>
                <p className="text-muted-foreground">
                  We maintain the highest standards in our products and services, ensuring reliability and performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 dark:bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Sustainable Growth</h3>
                </div>
                <p className="text-muted-foreground">
                  We&apos;re committed to sustainable practices that benefit farmers, communities, and the environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Sahu Metals?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold mb-2">Trusted Quality</h3>
                <p className="text-muted-foreground">All our equipment meets ISI standards and comes with comprehensive warranties.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold mb-2">Expert Support</h3>
                <p className="text-muted-foreground">Our team of agricultural experts provides guidance and support 24/7.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold mb-2">Nationwide Network</h3>
                <p className="text-muted-foreground">Extensive dealer network ensuring easy access to equipment and service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
} 