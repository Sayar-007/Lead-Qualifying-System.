export default function Footer() {
  return (
    <footer className="bg-primary-container dark:bg-on-primary-fixed w-full py-20 px-margin-desktop flex flex-col md:flex-row justify-between items-start transition-opacity duration-200" id="contact">
      <div className="mb-10 md:mb-0">
        <div className="font-display-lg text-headline-md text-secondary-fixed mb-4">
          Anders &amp; Vale
        </div>
        <p className="font-body-md text-body-md text-on-primary-container max-w-sm">
          © {new Date().getFullYear()} Anders &amp; Vale Real Estate. Austin, TX 30.2672° N, 97.7431° W
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0">
        <div className="flex flex-col space-y-4">
          <a className="font-label-caps text-label-caps text-on-primary-container hover:text-white hover:underline transition-all" href="#">Privacy Policy</a>
          <a className="font-label-caps text-label-caps text-on-primary-container hover:text-white hover:underline transition-all" href="#">Terms of Service</a>
          <a className="font-label-caps text-label-caps text-on-primary-container hover:text-white hover:underline transition-all" href="#">Fair Housing</a>
          <a className="font-label-caps text-label-caps text-on-primary-container hover:text-white hover:underline transition-all" href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
