"use client";

import { useState } from "react";
import { ButtonLink } from "./ButtonLink";

type Status = "idle" | "submitting" | "success" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    // Front-end only: open a mail draft with the enquiry details.
    const subject = encodeURIComponent(`Meeting request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${data.get("phone") ?? ""}\n\n${message}`
    );
    window.location.href = `mailto:info@ambiencehomedesign.com?subject=${subject}&body=${body}`;
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="bg-surface px-6 py-10 md:px-10">
        <h2 className="font-display text-2xl tracking-tight">Thank you</h2>
        <p className="mt-3 max-w-measure text-muted">
          Your mail client should open with the meeting request. If it does not, email us
          directly and we will reply shortly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-brand bg-void px-5 py-2.5 text-sm text-on-void transition hover:bg-accent"
            onClick={() => setStatus("idle")}
          >
            Send another
          </button>
          <ButtonLink href="/projects" variant="outline">
            View projects
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-brand border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none"
          placeholder="Project type, location, and preferred meeting time"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700 dark:text-red-300" role="alert">
          Please complete name, email, and your message.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-brand bg-void px-5 py-2.5 text-sm text-on-void transition hover:bg-accent active:scale-[0.98] disabled:opacity-60"
      >
        {status === "submitting" ? "Preparing…" : "Request a meeting"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-brand border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}