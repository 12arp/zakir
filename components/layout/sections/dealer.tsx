"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, CheckCircle2, Handshake, Truck } from "lucide-react";

export const DealerSection = () => {
  return (
    <section id="become-dealer" className="container pt-0 pb-8 sm:pb-16 mb-16 sm:mb-24">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary mb-2 tracking-wider">Partnership</h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Dealer</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our network of trusted dealers and grow your business with Sahu Metals&apos; premium agricultural equipment.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Benefits Card */}
        <div className="space-y-6">
          <Card className="bg-muted/50 dark:bg-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Handshake className="text-primary" />
                Why Partner With Us?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Exclusive Territory Rights</h3>
                  <p className="text-muted-foreground">Get exclusive rights to sell our products in your designated area</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Comprehensive Training</h3>
                  <p className="text-muted-foreground">Receive thorough product and sales training from our experts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Marketing Support</h3>
                  <p className="text-muted-foreground">Access to marketing materials and co-branding opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Technical Support</h3>
                  <p className="text-muted-foreground">24/7 technical assistance and maintenance support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 dark:bg-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building2 className="text-primary" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Business Infrastructure</h3>
                  <p className="text-muted-foreground">Established business with proper showroom and service facility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Financial Stability</h3>
                  <p className="text-muted-foreground">Strong financial background and credit history</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Market Knowledge</h3>
                  <p className="text-muted-foreground">Understanding of local agricultural market and customer needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-muted/50 dark:bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Apply to Become a Dealer</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="4d9f7a62-4b12-487d-9ec3-199da11ea174" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company Name</label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email (Optional)</label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Business Address</label>
                <Textarea id="address" placeholder="Enter your business address" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Additional Information</label>
                <Textarea id="message" placeholder="Tell us about your business and why you want to become a dealer" />
              </div>
              <Button className="w-full !bg-green-600 !text-white" type="submit" name="submit">
                Submit Application
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 