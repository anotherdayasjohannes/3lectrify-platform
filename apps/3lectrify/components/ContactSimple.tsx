'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './Button';

// Validation schema
const contactSchema = z.object({
  firstname: z.string().min(2, 'Dieses Feld ist erforderlich.'),
  lastname: z.string().min(2, 'Dieses Feld ist erforderlich.'),
  company: z.string().optional(),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Dieses Feld ist erforderlich.'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Bitte akzeptieren Sie die Datenschutzerklärung.',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface AddressInfo {
  headline: string;
  companyName: string;
  addressLine2?: string;
  street: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  mapsLinkText: string;
}

interface ContactSimpleProps {
  headline?: string;
  subheadline?: string;
  formHeadline?: string;
  labels: {
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    button: string;
    privacy: string;
    privacyLink: string;
  };
  address: AddressInfo;
  successMessage?: string;
}

export function ContactSimple({
  headline,
  subheadline,
  formHeadline = 'Kontaktformular',
  labels,
  address,
  successMessage = 'Vielen Dank! Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.',
}: ContactSimpleProps) {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState('loading');

    try {
      // HubSpot Forms API Submission
      const portalId = '146248871';
      const formGuid = 'fd5fa1cf-b75e-4325-923a-41f7424f779f';
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

      // Map form data to HubSpot fields
      const hubspotPayload = {
        fields: [
          { name: 'firstname', value: data.firstname },
          { name: 'lastname', value: data.lastname },
          { name: 'email', value: data.email },
          { name: 'company', value: data.company || '' },
          { name: 'phone', value: data.phone || '' },
          { name: 'message', value: data.message },
        ],
        context: {
          pageUri: typeof window !== 'undefined' ? window.location.href : '',
          pageName: 'Kontakt',
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: labels.privacy,
            communications: [
              {
                value: true,
                subscriptionTypeId: 999,
                text: labels.privacy,
              },
            ],
          },
        },
      };

      const response = await fetch(hubspotUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotPayload),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setFormState('success');

      // Reset form after 5 seconds
      setTimeout(() => {
        reset();
        setFormState('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');

      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }
  };

  // Generate Google Maps URL
  const mapsQuery = `${address.street}, ${address.postalCode} ${address.city}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  return (
    <section className="w-full bg-[#293645] pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]">
      {/* Use content-wrapper for global margins */}
      <div className="content-wrapper">
        {/* Mobile: Stack vertically → md: Two columns side-by-side */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-[50px] items-start">
          {/* Left Column: Form */}
          <div className="flex-1 min-w-0 w-full">
            <h2 className="text-[24px] leading-[32px] tracking-[0.24px] md:text-[28px] md:leading-[38px] md:tracking-[0.28px] lg:text-[32px] lg:leading-[42px] lg:tracking-[0.32px] font-light text-white m-0 mb-6 md:mb-[25px]">
              {formHeadline}
            </h2>

            {formState === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-lg bg-[rgba(136,192,177,0.2)] border border-[#88c0b1] text-[#c5e0d7] text-[16px] leading-[24px]"
              >
                {successMessage}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[25px]"
                noValidate
              >
                {/* First Name */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="firstname"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.firstname} <span className="text-[#d04227] ml-0.5">*</span>
                  </label>
                  <input
                    {...register('firstname')}
                    type="text"
                    id="firstname"
                    className={`w-full px-4 py-3 min-h-[44px] text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 touch-manipulation ${
                      errors.firstname ? 'border-[#d04227]' : 'border-white/20'
                    }`}
                    aria-invalid={errors.firstname ? 'true' : 'false'}
                    aria-describedby={errors.firstname ? 'firstname-error' : undefined}
                  />
                  {errors.firstname && (
                    <span
                      id="firstname-error"
                      role="alert"
                      className="text-sm leading-5 text-[#d04227] mt-1"
                    >
                      {errors.firstname.message}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="lastname"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.lastname} <span className="text-[#d04227] ml-0.5">*</span>
                  </label>
                  <input
                    {...register('lastname')}
                    type="text"
                    id="lastname"
                    className={`w-full px-4 py-3 min-h-[44px] text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 touch-manipulation ${
                      errors.lastname ? 'border-[#d04227]' : 'border-white/20'
                    }`}
                    aria-invalid={errors.lastname ? 'true' : 'false'}
                    aria-describedby={errors.lastname ? 'lastname-error' : undefined}
                  />
                  {errors.lastname && (
                    <span
                      id="lastname-error"
                      role="alert"
                      className="text-sm leading-5 text-[#d04227] mt-1"
                    >
                      {errors.lastname.message}
                    </span>
                  )}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="company"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.company}
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 min-h-[44px] text-[16px] leading-[24px] text-[#333] bg-white border border-white/20 rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 touch-manipulation"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.email} <span className="text-[#d04227] ml-0.5">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 min-h-[44px] text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 touch-manipulation ${
                      errors.email ? 'border-[#d04227]' : 'border-white/20'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="text-sm leading-5 text-[#d04227] mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="phone"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.phone}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 min-h-[44px] text-[16px] leading-[24px] text-[#333] bg-white border border-white/20 rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 touch-manipulation"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="message"
                    className="text-[16px] leading-[24px] tracking-[0.16px] font-normal text-white"
                  >
                    {labels.message} <span className="text-[#d04227] ml-0.5">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 resize-vertical min-h-[120px] touch-manipulation ${
                      errors.message ? 'border-[#d04227]' : 'border-white/20'
                    }`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span
                      id="message-error"
                      role="alert"
                      className="text-sm leading-5 text-[#d04227] mt-1"
                    >
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div className="flex gap-3 items-start">
                  <input
                    {...register('privacy')}
                    type="checkbox"
                    id="privacy"
                    className="mt-1.5 w-4 h-4 accent-[#88c0b1] cursor-pointer"
                    aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                  />
                  <label htmlFor="privacy" className="flex-1 cursor-pointer select-none">
                    <span
                      className="text-sm leading-5 tracking-[0.14px] font-normal text-white"
                      dangerouslySetInnerHTML={{
                        __html: `${labels.privacy.replace(
                          'Datenschutzerklärung',
                          `<a href="${labels.privacyLink}" target="_blank" rel="noopener noreferrer" class="text-[#88c0b1] underline hover:text-[#c5e0d7] transition-colors focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2">Datenschutzerklärung</a>`
                        )} <span class="text-[#d04227]">*</span>`,
                      }}
                    />
                    {errors.privacy && (
                      <span
                        id="privacy-error"
                        role="alert"
                        className="block text-sm leading-5 text-[#d04227] mt-1"
                      >
                        {errors.privacy.message}
                      </span>
                    )}
                  </label>
                </div>

                {/* Submit Button - Full width on mobile, auto on desktop */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={formState === 'loading'}
                  className="w-full md:w-auto self-start focus:outline-none focus:ring-2 focus:ring-[#88c0b1] focus:ring-offset-2 focus:ring-offset-[#293645]"
                >
                  <span>
                    {formState === 'loading' ? 'Wird gesendet...' : labels.button}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="transition-transform duration-300"
                  >
                    <path
                      d="M7.5 5L12.5 10L7.5 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                {/* Error Message */}
                {formState === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-5 rounded-lg bg-[rgba(208,66,39,0.2)] border border-[#d04227] text-[#d04227] text-[16px] leading-[24px]"
                  >
                    Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Column: Address */}
          <aside className="flex-1 min-w-0 w-full">
            <h2 className="text-[24px] leading-[32px] tracking-[0.24px] md:text-[28px] md:leading-[38px] md:tracking-[0.28px] lg:text-[32px] lg:leading-[42px] lg:tracking-[0.32px] font-light text-white m-0 mb-6 md:mb-[25px]">
              {address.headline}
            </h2>
            <address className="not-italic text-white text-[16px] leading-[24px] tracking-[0.16px]">
              <p className="mb-0">{address.companyName}</p>
              {address.addressLine2 && <p className="mb-0">{address.addressLine2}</p>}
              <p className="mb-0">{address.street}</p>
              <p className="mb-4">
                {address.postalCode} {address.city}
              </p>

              <p className="mb-0">
                <a
                  href={`mailto:${address.email}`}
                  className="text-[#88c0b1] underline hover:text-[#c5e0d7] transition-colors focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2"
                >
                  {address.email}
                </a>
              </p>
              <p className="mb-4">
                <a
                  href={`tel:${address.phone.replace(/\s/g, '').replace(/-/g, '')}`}
                  className="text-[#88c0b1] underline hover:text-[#c5e0d7] transition-colors focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2"
                >
                  {address.phone}
                </a>
              </p>

              <p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#88c0b1] underline hover:text-[#c5e0d7] transition-colors inline-flex items-center gap-1 focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2"
                >
                  {address.mapsLinkText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2H14V6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.66667 9.33333L14 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </p>
            </address>
          </aside>
        </div>
      </div>
    </section>
  );
}
