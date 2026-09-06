import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import HeadMeta from '@/src/components/HeadMeta';
import { Button } from '@/src/components/ui';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.invalid_email');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = language === 'fr' ? 'Le message doit contenir au moins 10 caractères' : language === 'en' ? 'Message must be at least 10 characters' : '메시지는 최소 10자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset le status après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [formData]);

  return (
    <>
      <HeadMeta
        title={t('contact.title')}
        description={t('contact.description')}
        path="/contact"
        keywords={['contact', 'email', 'collaboration', 'projet']}
      />
      
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="space-y-8">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="flex items-center gap-3 text-4xl font-bold">
              <Mail size={36} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
              <span style={{ color: 'var(--color-text)' }}>
                {t('contact.title')}
              </span>
            </h1>
            <p className="text-lg" style={{ color: 'var(--color-subtext0)' }}>
              {t('contact.description')}
            </p>
          </header>

          {/* Success Message */}
          {status === 'success' && (
            <div 
              className="flex items-center gap-3 rounded-lg border p-4"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-green) 10%, transparent)',
                borderColor: 'var(--color-green)',
                color: 'var(--color-green)'
              }}
            >
              <CheckCircle size={24} />
              <p className="font-medium">
                {t('contact.success')}
              </p>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <div 
              className="flex items-center gap-3 rounded-lg border p-4"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-red) 10%, transparent)',
                borderColor: 'var(--color-red)',
                color: 'var(--color-red)'
              }}
            >
              <AlertCircle size={24} />
              <p className="font-medium">
                {t('contact.error')}
              </p>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <label 
                  htmlFor="name" 
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--color-text)' }}
                >
                  <User size={16} />
                  {t('contact.name_label')}
                  <span style={{ color: 'var(--color-red)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--color-surface0)',
                    borderColor: errors.name ? 'var(--color-red)' : 'var(--color-surface1)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-accent)'
                  } as any}
                  placeholder={t('contact.name_placeholder')}
                />
                {errors.name && (
                  <p className="text-sm" style={{ color: 'var(--color-red)' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--color-text)' }}
                >
                  <Mail size={16} />
                  {t('contact.email_label')}
                  <span style={{ color: 'var(--color-red)' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--color-surface0)',
                    borderColor: errors.email ? 'var(--color-red)' : 'var(--color-surface1)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-accent)'
                  } as any}
                  placeholder={t('contact.email_placeholder')}
                />
                {errors.email && (
                  <p className="text-sm" style={{ color: 'var(--color-red)' }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label 
                htmlFor="subject" 
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                <MessageSquare size={16} />
                {t('contact.subject_label')}
                <span style={{ color: 'var(--color-red)' }}>*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-surface0)',
                  borderColor: errors.subject ? 'var(--color-red)' : 'var(--color-surface1)',
                  color: 'var(--color-text)',
                  '--tw-ring-color': 'var(--color-accent)'
                } as any}
                placeholder={t('contact.subject_placeholder')}
              />
              {errors.subject && (
                <p className="text-sm" style={{ color: 'var(--color-red)' }}>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label 
                htmlFor="message" 
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                <MessageSquare size={16} />
                {t('contact.message_label')}
                <span style={{ color: 'var(--color-red)' }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: 'var(--color-surface0)',
                  borderColor: errors.message ? 'var(--color-red)' : 'var(--color-surface1)',
                  color: 'var(--color-text)',
                  '--tw-ring-color': 'var(--color-accent)'
                } as any}
                placeholder={t('contact.message_placeholder')}
              />
              {errors.message && (
                <p className="text-sm" style={{ color: 'var(--color-red)' }}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
              icon={status === 'loading' ? undefined : <Send size={20} />}
            >
              {status === 'loading' ? t('contact.sending') : t('contact.send_button')}
            </Button>
          </form>

          {/* Alternative Contact Methods */}
          <div 
            className="mt-8 rounded-lg border p-6"
            style={{
              backgroundColor: 'var(--color-surface0)',
              borderColor: 'var(--color-surface1)'
            }}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              {t('contact.alternative_title')}
            </h2>
            <div className="space-y-3">
              <Link
                href="/socials"
                className="flex items-center gap-3 transition-colors group rounded"
                style={{ color: 'var(--color-subtext0)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext0)'}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span>{t('contact.my_socials')}</span>
                <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
