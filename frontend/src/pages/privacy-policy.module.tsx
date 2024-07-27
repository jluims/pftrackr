import styles from "../css/privacy-policy.module.css";
function PrivacyPolicyPage() {
  return (
    <div className={styles.content}>
      <h1>Privacy Policy</h1>
      <p>
        We may collect basic data such as application errors to improve our
        software. Also, some of the software responsible for running the site
        such as Nginx and Cloudflare may log data such as IP addresses, parts of
        the website accessed, and browser user agents. We may also store results
        from planet fitness for data or caching purposes in a way that is not
        linked to you. Your IP may be temporarily stored in memory to detect and
        prevent botting. No other data is collected/logged. Your ZIP code is
        only used to retrieve data from Planet Fitness. We do not sell any
        information.
      </p>
    </div>
  );
}

export { PrivacyPolicyPage };
