import { useEffect, useState } from "react";
import styles from "../styles/AnnouncementModal.module.scss";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    const form = e.target;
    if (!form.checkValidity()) return;

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      handleModalClose();
    }, 1000);
  };

  const handleModalClose = () => {
    setOpen(false);
    localStorage.setItem("modalClosed", "true");
  };

  // Don't load pop up on refresh
  useEffect(() => {
    if (localStorage.getItem("modalClosed")) {
      setOpen(false);
    }
  }, [open, setOpen]);

  if (open) {
    return (
      <div className={styles.ModalBg}>
        <div className={styles.Modal}>
          <button onClick={handleModalClose} className={styles.CloseBtn}>
            &#x2715;
          </button>
          <h1>We&apos;re Moving!</h1>
          <p>
            We are thrilled to announce that Pablo&apos;s Coffee House is
            expanding to a <strong>full-size unit</strong> inside the Shops at
            Don Mills mall!
          </p>
          <p>
            Our new location is situated at
            <strong> 32 Clock Tower Road, North York, M3C0G5</strong>.
            We&apos;re currently under construction, but we will resume
            operation shortly.
          </p>
          <p>
            <i>Thank you</i> for your continued support and loyalty. We are
            committed to providing you with the same quality coffee, pastries,
            food, and service that you have come to expect from us.
          </p>
          <p>
            We will keep you updated on our progress and look forward to
            welcoming you to our new location soon!
          </p>

          <h3>Join our newsletter to stay up to date!</h3>
          {!submitted ? (
            <form
              action='/'
              method='POST'
              data-netlify='true'
              name='newsletter-form-modal'
              onSubmit={handleFormSubmit}>
              <input
                name='email'
                type='email'
                required
                placeholder='Enter your email here'
              />
              <input name='submit' type='submit' />
            </form>
          ) : (
            <h2>We&apos;ll be in touch!</h2>
          )}
        </div>
      </div>
    );
  }
}
