import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    if (error) toast.error("Failed to send message");
    else { toast.success("Message sent successfully!"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you</p>
          </div>
        </div>
        <div className="container py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4"><Phone className="text-accent mt-1" /><div><h3 className="font-medium">Phone</h3><p className="text-muted-foreground">+91 88307 64356</p><p className="text-muted-foreground">+91 74994 52407</p></div></div>
              <div className="flex items-start gap-4"><Mail className="text-accent mt-1" /><div><h3 className="font-medium">Email</h3><p className="text-muted-foreground">aaryan100m@gmail.com</p></div></div>
              <div className="flex items-start gap-4"><MapPin className="text-accent mt-1" /><div><h3 className="font-medium">Address</h3><p className="text-muted-foreground">Sky One, Pune, Maharashtra, India</p></div></div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4211.919922329808!2d73.8314606128188!3d18.535146902238196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf7bc08a37dd%3A0xfd3b26ac2d7644fb!2sSky%20One!5e0!3m2!1sen!2sin!4v1768408539766!5m2!1sen!2sin" width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" className="rounded-lg" title="Location" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              </div>
              <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <div><Label htmlFor="subject">Subject</Label><Input id="subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Contact;
