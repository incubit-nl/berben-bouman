"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

interface Vacancy {
  title: string;
  description: any;
  isActive: boolean;
  hours: string;
}

export default function VacancyApplicationForm({ vacancy }: { vacancy: Vacancy }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    data.append("vacancy", vacancy.title);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to submit application");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", resume: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor={`name-${vacancy.title}`} className="block text-sm font-medium">
          Naam
        </label>
        <input
          id={`name-${vacancy.title}`}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor={`email-${vacancy.title}`} className="block text-sm font-medium">
          Email
        </label>
        <input
          id={`email-${vacancy.title}`}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor={`phone-${vacancy.title}`} className="block text-sm font-medium">
          Telefoon
        </label>
        <input
          id={`phone-${vacancy.title}`}
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor={`message-${vacancy.title}`} className="block text-sm font-medium">
          Bericht
        </label>
        <textarea
          id={`message-${vacancy.title}`}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor={`resume-${vacancy.title}`} className="block text-sm font-medium">
          CV Uploaden (PDF)
        </label>
        <input
          id={`resume-${vacancy.title}`}
          type="file"
          accept=".pdf"
          onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
          className="w-full p-2 border rounded"
        />
      </div>
      {success && <p className="text-green-600">Sollicitatie succesvol verzonden!</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting} className="text-white bg-primary hover:bg-primary/90">
        {submitting ? "Verzenden..." : "Solliciteren"}
      </Button>
    </form>
  );
}