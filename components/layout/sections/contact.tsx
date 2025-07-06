"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10).max(15),
  message: z.string(),
});

export const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, phone, message } = values;
    const mailToLink = `mailto:leomirandadev@gmail.com?subject=Contact from Website&body=Hello I am ${firstName} ${lastName}, my Email is ${email}, my Phone number is ${phone}. %0D%0A${message}`;
    window.location.href = mailToLink;
  }

  return (
    <section id="contact" className="container pt-2 pb-24 sm:pt-4 sm:pb-32 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-lg text-primary mb-1 tracking-wider">
          Contact
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Connect With Sahu Metals</h2>
        <p className="text-muted-foreground">
          Have questions about our equipment, services, or support? Reach out to Sahu Metals and our team will be happy to assist you.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        <div className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="font-bold text-lg mb-1">Find us</div>
                <div className="text-muted-foreground">G-510(1st),IPIA, Road no. 7, Anantpura, Kota, Rajasthan</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="font-bold text-lg mb-1">Call us</div>
                <div className="text-muted-foreground">
                  <div>+91 9829961487</div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="font-bold text-lg mb-1">Mail us</div>
                <div className="text-muted-foreground">sahumetalskota@gmail.com
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="font-bold text-lg mb-1">Visit us</div>
                <div className="text-muted-foreground">
                  <div>Monday - Friday</div>
                  <div>8AM - 4PM</div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 text-primary mt-1 flex items-center justify-center">
                <Facebook className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg mb-1">Follow us</div>
                <div className="flex gap-4">
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
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card h-full">
          <CardContent className="pt-6 h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                action="https://api.web3forms.com/submit"
                method="POST"
                className="grid w-full gap-4 h-full"
              >
                <input type="hidden" name="access_key" value="4d9f7a62-4b12-487d-9ec3-199da11ea174" />
                <div className="flex flex-col md:!flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Type your message here..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="mt-auto !bg-green-600 !text-white" type="submit" name="submit">Send message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      <div className="max-w-6xl mx-auto">
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=G-510(1st),IPIA,Road+no.+7,Anantpura,Kota,Rajasthan&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sahu Metals Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
