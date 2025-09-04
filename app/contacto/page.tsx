'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactoPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!form.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call to contact endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful submission
      setIsSubmitted(true);
      toast.success('Message sent successfully', {
        description: 'We will get back to you within 24 hours.',
      });
      
      // Reset form
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Error sending message', {
        description: 'Please try again in a few minutes.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container-max section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F10] mb-4">
              <span className="text-gradient">Contact</span>
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed">
              Got questions about our products? We’re here to help you find the perfect electric scooter.
            </p>
          </div>
        </div>
      </section>

      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#00B347]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0F10] mb-4">Message sent!</h3>
                  <p className="text-[#667085] mb-6">
                    Thanks for contacting us. We’ll reply within the next 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0B0F10] mb-2">Send us a message</h2>
                    <p className="text-[#667085]">We’ll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#0B0F10] mb-2 block">
                          Full name *
                        </label>
                        <Input
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your name"
                          className="rounded-xl border-gray-300 focus:border-[#39FF14] focus:ring-[#39FF14]/20"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-[#0B0F10] mb-2 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className="rounded-xl border-gray-300 focus:border-[#39FF14] focus:ring-[#39FF14]/20"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-[#0B0F10] mb-2 block">
                        Phone (optional)
                      </label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="rounded-xl border-gray-300 focus:border-[#39FF14] focus:ring-[#39FF14]/20"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-[#0B0F10] mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="How can we help?"
                        rows={5}
                        className="rounded-xl border-gray-300 focus:border-[#39FF14] focus:ring-[#39FF14]/20 resize-none"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary text-lg py-4"
                    >
                      {isLoading ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#0B0F10] mb-6">Contact information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#00B347]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F10] mb-1">Phone</h4>
                      <p className="text-[#667085]">+1 (555) 123-4567</p>
                      <p className="text-sm text-[#667085]">Mon–Fri 9:00–18:00, Sat 10:00–16:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#00B347]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F10] mb-1">Email</h4>
                      <p className="text-[#667085]">info@ecoride.com</p>
                      <p className="text-sm text-[#667085]">Reply within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#00B347]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F10] mb-1">Head office</h4>
                      <p className="text-[#667085]">1234 Biscayne Blvd, Suite 100</p>
                      <p className="text-[#667085]">Miami, FL 33132</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-[#00B347]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F10] mb-1">WhatsApp</h4>
                      <p className="text-[#667085]">+1 (555) 987-6543</p>
                      <p className="text-sm text-[#667085]">Instant support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#0B0F10] mb-6">Frequently asked questions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl hover:bg-[#39FF14]/5 transition-colors duration-300 cursor-pointer">
                    <p className="font-medium text-[#0B0F10]">How long does delivery take?</p>
                    <p className="text-sm text-[#667085] mt-1">24–48 hours in the metro area</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl hover:bg-[#39FF14]/5 transition-colors duration-300 cursor-pointer">
                    <p className="font-medium text-[#0B0F10]">What does the warranty cover?</p>
                    <p className="text-sm text-[#667085] mt-1">Full coverage for motor, battery and electronics</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl hover:bg-[#39FF14]/5 transition-colors duration-300 cursor-pointer">
                    <p className="font-medium text-[#0B0F10]">Is financing available?</p>
                    <p className="text-sm text-[#667085] mt-1">Yes — with Affirm, up to 24 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
