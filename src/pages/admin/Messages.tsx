import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, is_read: !currentStatus } : msg
        )
      );
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold mb-2">
            Contact Messages
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages read"}
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading messages...</p>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`${
                  !message.is_read ? "border-accent bg-accent/5" : ""
                }`}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      {!message.is_read && (
                        <Badge className="bg-accent text-accent-foreground">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.subject || "No subject"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(message.created_at), "PP 'at' p")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        toggleReadStatus(message.id, message.is_read)
                      }
                      title={message.is_read ? "Mark as unread" : "Mark as read"}
                    >
                      {message.is_read ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 whitespace-pre-wrap">
                    {message.message}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${message.email}`}
                      className="flex items-center gap-1 hover:text-accent"
                    >
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </a>
                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="flex items-center gap-1 hover:text-accent"
                      >
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Messages;
