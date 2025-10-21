'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
    <section className="w-full bg-[#293645] py-[50px] lg:py-10 sm:py-[30px]">
      <div className="w-full max-w-[1440px] mx-auto px-[50px] lg:px-10 sm:px-5">
        {/* Optional Header */}
        {(headline || subheadline) && (
          <header className="mb-10 text-left">
            {headline && (
              <h1 className="text-[48px] leading-[58px] lg:text-[42px] lg:leading-[52px] sm:text-[36px] sm:leading-[46px] tracking-[0.48px] font-light text-white m-0 mb-[25px]">
                {headline}
              </h1>
            )}
            {subheadline && (
              <p className="text-[18px] leading-[26px] sm:text-[16px] sm:leading-[24px] tracking-[0.18px] font-normal text-white m-0">
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Two Column Layout */}
        <div className="flex gap-[50px] lg:gap-10 sm:flex-col sm:gap-[50px] items-start">
          {/* Left Column: Form */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[36px] leading-[46px] lg:text-[32px] lg:leading-[42px] sm:text-[28px] sm:leading-[38px] tracking-[0.36px] font-light text-white m-0 mb-[25px]">
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
                    className={`w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 ${
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
                    className={`w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 ${
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
                    className="w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border border-white/20 rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40"
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
                    className={`w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 ${
                      errors.email ? 'border-[#d04227]' : 'border-white/20'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      role="alert"
                      className="text-sm leading-5 text-[#d04227] mt-1"
                    >
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
                    className="w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border border-white/20 rounded transition-all duration-200 focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40"
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
                    className={`w-full px-4 py-3 text-[16px] leading-[24px] text-[#333] bg-white border rounded transition-all duration-200 resize-vertical min-h-[120px] focus:outline-none focus:border-[#88c0b1] focus:shadow-[0_0_0_3px_rgba(136,192,177,0.2)] hover:border-white/40 ${
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
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register('privacy')}
                      type="checkbox"
                      id="privacy"
                      className="w-5 h-5 min-w-[20px] mt-0.5 cursor-pointer accent-[#88c0b1]"
                      aria-invalid={errors.privacy ? 'true' : 'false'}
                      aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                    />
                    <span
                      className="text-sm leading-5 tracking-[0.14px] font-normal text-white"
                      dangerouslySetInnerHTML={{
                        __html: `${labels.privacy.replace(
                          'Datenschutzerklärung',
                          `<a href="${labels.privacyLink}" target="_blank" rel="noopener noreferrer" class="text-[#88c0b1] underline hover:text-[#c5e0d7] transition-colors focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2">Datenschutzerklärung</a>`
                        )} <span class="text-[#d04227]">*</span>`,
                      }}
                    />
                  </label>
                  {errors.privacy && (
                    <span
                      id="privacy-error"
                      role="alert"
                      className="text-sm leading-5 text-[#d04227] mt-1 ml-8"
                    >
                      {errors.privacy.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="h-9 px-[10px_15px] inline-flex items-center justify-center gap-2.5 bg-[#C5E0D7] text-[#333] border-none rounded-[5px] text-[16px] font-bold leading-[26px] tracking-[0.16px] whitespace-nowrap cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#b0d0c7] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(0,0,0,0.1)] focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2 disabled:bg-[rgba(194,194,194,0.5)] disabled:text-[rgba(51,51,51,0.5)] disabled:cursor-not-allowed disabled:transform-none sm:w-full sm:justify-center"
                >
                  {formState === 'loading' ? 'Wird gesendet...' : labels.button}
                  {formState !== 'loading' && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <g clipPath="url(#clip0_kontakt_button)">
                        <path
                          d="M7.5 10L3.75 13.75L7.5 17.5"
                          stroke="#333333"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 2.5V13.75H3.75"
                          stroke="#333333"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_kontakt_button">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </button>

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
          <aside className="flex-1 min-w-0">
            <h2 className="text-[36px] leading-[46px] lg:text-[32px] lg:leading-[42px] sm:text-[28px] sm:leading-[38px] tracking-[0.36px] font-light text-white m-0 mb-[25px]">
              {address.headline}
            </h2>

            <address className="not-italic text-[18px] leading-[26px] tracking-[0.18px] font-normal text-white">
              <p className="m-0 mb-1">{address.companyName}</p>
              {address.addressLine2 && <p className="m-0 mb-1">{address.addressLine2}</p>}
              <p className="m-0 mb-1">{address.street}</p>
              <p className="m-0 mb-1">
                {address.postalCode} {address.city}
              </p>
              <br />
              <p className="m-0 mb-1">
                <a
                  href={`mailto:${address.email}`}
                  className="text-white no-underline transition-all hover:underline focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2 focus:rounded-sm"
                >
                  {address.email}
                </a>
              </p>
              <p className="m-0 mb-1">
                <a
                  href={`tel:${address.phone.replace(/\s|-/g, '')}`}
                  className="text-white no-underline transition-all hover:underline focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2 focus:rounded-sm"
                >
                  {address.phone}
                </a>
              </p>
              <br />
              <p className="m-0 mb-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#88c0b1] no-underline transition-colors hover:text-[#c5e0d7] hover:underline focus:outline-2 focus:outline-[#88c0b1] focus:outline-offset-2 focus:rounded-sm"
                >
                  {address.mapsLinkText}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
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

