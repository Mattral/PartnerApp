"use client";

import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const TranslatePage = () => {
  // Language options for the picker (English, French, Japanese, German, Chinese)
  const languages = [
    { label: "English", value: "/auto/en" },
    { label: "Français", value: "/auto/fr" },
    { label: "日本語", value: "/auto/ja" },
    { label: "Deutsch", value: "/auto/de" },
    { label: "中文", value: "/auto/zh-CN" },
  ];

  // State to hold the selected language
  const [selected, setSelected] = useState<string | null>(null);

  // Load Google Translate script on page load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Initialize Google Translate when the script is loaded
    //@ts-expect-error
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Check if the language preference is saved in a cookie
    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans") as string);
    } else {
      setSelected("/auto/en"); // Default to English if no preference is set
    }
  }, []);

  // Initialize Google Translate with the selected options
  const googleTranslateElementInit = () => {
    //@ts-expect-error
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto", // Automatically detect the current language
        autoDisplay: false, // Disable automatic translation display
        includedLanguages: "en,fr,ja,de,zh-CN", // Supported languages (English, French, Japanese, German, Chinese)
        // @ts-expect-error
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  // Handle language selection from the dropdown
  const langChange = (e: string) => {
    // Store the selected language in a cookie
    setCookie("googtrans", decodeURI(e));
    setSelected(e);

    // Reload the page to apply the language change
    window.location.reload();
  };

  return (
    <div>
      {/* Hidden div for Google Translate widget */}
      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          visibility: "hidden", // hidden
          position: "absolute",
          left: "50%",
          zIndex: -9999, 
        }}
      ></div>

      {/* Language Picker */}
      <div>
        <select onChange={(e) => langChange(e.target.value)} value={selected || "/auto/en"}>
          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
      </div>

      {/* Header Section */}
      <header>
        <h1>Welcome to My Multilingual Page</h1>
        <p>Select a language from the dropdown to translate the page content.</p>
      </header>

      {/* Main Content */}
      <main>
        <p>This is some content that will be translated based on your language selection.</p>
        <p>Try selecting a different language from the dropdown above to see the page content in that language.</p>
      </main>

      {/* Footer Section */}
      <footer>
        <p>Made with ❤️ using Next.js and Google Translate</p>
      </footer>
    </div>
  );
};

export default TranslatePage;
