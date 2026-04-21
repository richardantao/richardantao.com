import Script from "next/script";

export const ThemeScript = () => {
	return (
		<Script
			id="theme-init"
			strategy="beforeInteractive"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Inline script avoids paint flicker by applying saved theme before hydration.
			dangerouslySetInnerHTML={{
				__html: `
          (function() {
            try {
              var stored = localStorage.getItem('theme');

              if (stored === 'light' || stored === 'dark') {
                document.documentElement.setAttribute('data-theme', stored);
              } else {
                document.documentElement.removeAttribute('data-theme');
              }
            } catch (e) {
              console.error(e);
            }
          })();
        `,
			}}
		/>
	);
};
