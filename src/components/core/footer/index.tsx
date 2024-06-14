import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ isFixed }: { isFixed?: boolean }) {
  const generalList = [
    { id: 1, title: 'Register', slug: '/register' },
    { id: 2, title: 'Login', slug: '/login' },
    { id: 3, title: 'Privacy Policy', slug: '/privacy' },
    { id: 4, title: 'Terms & Conditions', slug: '/terms' },
  ];

  const helpSupport = [
    { id: 1, title: 'Help Center', slug: '/contact' },
    { id: 2, title: 'Contribution Guidelines', slug: '/contribute' },
  ];

  const socialIcons = [
    {
      href: 'https://facebook.com',
      src: 'https://img.icons8.com/fluency/48/000000/facebook-new.png',
      alt: 'Facebook',
      ariaLabel: 'Facebook',
    },
    {
      href: 'https://twitter.com',
      src: 'https://img.icons8.com/fluency/48/000000/twitter.png',
      alt: 'Twitter',
      ariaLabel: 'Twitter',
    },
    {
      href: 'https://instagram.com',
      src: 'https://img.icons8.com/fluency/48/000000/instagram-new.png',
      alt: 'Instagram',
      ariaLabel: 'Instagram',
    },
    {
      href: 'https://linkedin.com',
      src: 'https://img.icons8.com/fluency/48/000000/linkedin.png',
      alt: 'LinkedIn',
      ariaLabel: 'LinkedIn',
    },
  ];

  return (
    <section
      className={`max-w-screen-xl mx-auto mt-12 md:px-10 bg-white dark:bg-secondary clear-both z-0 text-secondary-light dark:text-primary-light ${
        isFixed ? 'bottom-0 fixed w-full' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center border-t border-slate-500 py-8">
        <div className="flex flex-1 items-center pt-2 pb-9">
          <Link href="/">
            <Image
              className="rounded-full mr-4 mb-12"
              src="/assets/logo.png"
              alt="settings"
              width={70}
              height={70}
            />
          </Link>
          <div className="text-left">
            <h2 className="text-secondary dark:text-white text-xl">Palettegram</h2>
            <p className="text-slate-500 text-sm pt-2">Social Media for Professionals</p>
            <span className="text-slate-500 text-sm block pt-2">
              A social media platform built exclusively for design professionals to share, discover, and discuss
              cutting-edge UI/UX designs and color palettes.
            </span>
          </div>
        </div>

        <div className="flex w-full md:w-auto justify-between md:justify-around flex-wrap">
          <div className="flex flex-col gap-2 text-left px-5 py-2 lg:w-60">
            <h3 className="text-secondary dark:text-white text-xl mb-2">General</h3>
            {generalList.map((item) => (
              <Link key={item.id} href={item.slug} className="transition-all duration-300 text-sm text-slate-400 hover:text-primary-light">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-left px-5 py-2 lg:w-60">
            <h3 className="text-secondary dark:text-white text-lg">Help & Support</h3>
            {helpSupport.map((item) => (
              <Link key={item.id} href={item.slug} className="transition-all duration-300 text-sm text-slate-400 hover:text-primary-light">
                {item.title}
              </Link>
            ))}
            <h3 className='text-secondary dark:text-white text-lg'>Social media Links</h3>
            <div className="flex gap-4 mt-4"> 
              {socialIcons.map((icon) => (
                <a key={icon.href} href={icon.href} target="_blank" aria-label={icon.ariaLabel} rel="noopener noreferrer">
                  <Image src={icon.src} alt={icon.alt} width={40} height={40} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 space-y-2 text-center">
        <p className="text-xs">
          Copyright &copy; {new Date().getFullYear()} Palettegram | MIT License <br />
        </p>
        <p className="text-xs">Developed by Sanchit Bajaj and The Open Source Community</p>
      </div>
    </section>
  );
}
