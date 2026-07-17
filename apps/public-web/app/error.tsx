"use client";

export default function ErrorPage({
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <main className="hero" id="main-content">
      <div className="hero-copy" role="alert">
        <h1>بازیابی صفحه ممکن نشد</h1>
        <p>اطلاعات حساس نمایش داده نشده است. چند لحظه دیگر دوباره تلاش کنید.</p>
        <button className="primary-action" type="button" onClick={reset}>
          تلاش دوباره
        </button>
      </div>
    </main>
  );
}
