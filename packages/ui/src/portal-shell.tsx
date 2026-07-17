import type { ReactNode } from "react";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface PortalShellProps {
  readonly portalName: string;
  readonly navigation: readonly NavigationItem[];
  readonly serviceLabel: string;
  readonly children?: ReactNode;
}

function BrandMark() {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 48 48">
      <path d="M11 25c0-8 5-14 13-14 5 0 9 2 12 6" />
      <path d="M37 23c0 8-5 14-13 14-5 0-9-2-12-6" />
      <path d="m18 24 4 4 9-10" />
    </svg>
  );
}

export function PortalShell({
  portalName,
  navigation,
  serviceLabel,
  children,
}: PortalShellProps) {
  return (
    <div className="portal-frame">
      <a className="skip-link" href="#main-content">
        رفتن به محتوای اصلی
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="همراه سلامت، صفحه اصلی">
            <BrandMark />
            <span>همراه سلامت</span>
          </a>
          <p className="portal-name">{portalName}</p>
        </div>
        <nav className="primary-nav" aria-label={`ناوبری ${portalName}`}>
          <ul>
            {navigation.map((item, index) => (
              <li key={item.label}>
                <a
                  aria-current={index === 0 ? "page" : undefined}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="foundation-title">
          <div className="hero-copy">
            <h1 id="foundation-title">پایه‌ای امن برای خدمات خودمراقبتی</h1>
            <p>
              این بخش در حال آماده‌سازی است. خدمات مرحله‌به‌مرحله و پس از بررسی
              ایمنی فعال می‌شوند.
            </p>
            <a className="primary-action" href="#system-status">
              مشاهده وضعیت سامانه
            </a>
          </div>
          {children}
        </section>

        <section
          className="status-band"
          id="system-status"
          aria-labelledby="status-title"
        >
          <div className="status-inner">
            <div className="status-heading">
              <span className="status-check" aria-hidden="true">
                ✓
              </span>
              <div>
                <h2 id="status-title">سامانه در دسترس است</h2>
                <p className="sr-only">{serviceLabel}</p>
              </div>
            </div>
            <ul className="trust-list" aria-label="اصول پایه سامانه">
              <li>
                <strong>حریم خصوصی</strong>
              </li>
              <li>
                <strong>دسترس‌پذیری</strong>
              </li>
              <li>
                <strong>ردپای حسابرسی</strong>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <nav aria-label="پیوندهای پایانی">
          <a href="#privacy">حریم خصوصی</a>
          <a href="#accessibility">دسترس‌پذیری</a>
          <a href="#contact">تماس با ما</a>
        </nav>
        <p>نسخه پایه — بدون داده پزشکی</p>
      </footer>
    </div>
  );
}
