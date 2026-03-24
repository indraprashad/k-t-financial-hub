import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Phone number is too short").max(20),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type FormValues = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["123 Financial District", "Business Avenue, Suite 500", "City, State 10001"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    lines: ["+1 (123) 456-7890", "+1 (123) 456-7891"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    lines: ["info@ktfinancial.com", "support@ktfinancial.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Saturday: 9:00 AM – 1:00 PM", "Sunday: Closed"],
  },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll respond within 24 hours.",
    });
    form.reset();
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-wide text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Get in Touch</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question or ready to start your financial journey? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-surface py-12">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="bg-card border rounded-xl p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-3">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-muted-foreground text-sm leading-relaxed">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Send a Message</span>
              <h2 className="text-3xl font-bold text-primary mt-2 mb-6">We'll Get Back to You</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
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
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message *</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Tell us how we can help you..."
                            rows={6}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    disabled={form.formState.isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

            {/* Map */}
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Find Us</span>
              <h2 className="text-3xl font-bold text-primary mt-2 mb-6">Our Location</h2>
              <div className="rounded-2xl overflow-hidden shadow-navy h-64 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1704000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="K & T Financial Consultancy Location"
                />
              </div>

              {/* Social */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-2">Connect With Us</h4>
                <p className="text-white/70 text-sm mb-4">Follow us for financial tips, tax updates, and business insights.</p>
                <div className="flex gap-3">
                  {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-xs bg-white/10 hover:bg-accent rounded-lg px-3 py-1.5 transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
