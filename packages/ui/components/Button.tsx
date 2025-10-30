'use client';

import React, { type PropsWithChildren } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary';

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends PropsWithChildren<BaseButtonProps> {
  href: string;
  openInNewTab?: boolean;
  onClick?: never;
  type?: never;
}

interface ActionButtonProps extends PropsWithChildren<BaseButtonProps> {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#c5e0d7] hover:bg-white hover:text-[#293645] text-[#333333]',
  secondary: 'bg-[#88c0b1] hover:bg-[#c5e0d7] text-[#333]',
};

const baseStyles =
  'inline-flex items-center justify-center gap-[10px] ' +
  'px-[20px] py-[10px] rounded-[5px] ' +
  'font-normal text-[18px] tracking-[0.18px] leading-[26px] ' +
  'transition-all duration-300 ' +
  'hover:-translate-y-0.5 ' +
  'cursor-pointer ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if ('href' in props && props.href) {
    const { openInNewTab } = props as LinkButtonProps;
    return (
      <Link
        href={props.href}
        className={combinedClassName}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as ActionButtonProps).type || 'button'}
      onClick={(props as ActionButtonProps).onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}

