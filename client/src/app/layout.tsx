'use client';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        {/*  Metadata Required by W3C */}
        {/* <meta charSet="UTF-8" /> */}
        <title>Wywiezione?</title>
        <meta name="description" content="Wywiezione?" />
        <meta name="keywords" content="wywoz, smieci" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Kacper<https://github.com/bos-8> & Nikolas<https://github.com/Nikovsky>" />
        <meta name="copyright" content="Kacper<https://github.com/bos-8> & Nikolas<https://github.com/Nikovsky>" />
        <meta name="owner" content="Kacper<https://github.com/bos-8> & Nikolas<https://github.com/Nikovsky>" />
        {/* <meta name="company" content="" /> */}
        {/* <meta name="organization" content="" /> */}
        {/* <meta name="contact" content="info@company.com" /> */}

        {/* BOTS */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />

        {/* Favicon */}
        {/* <link rel="icon" href="../img/favicon.png" /> */}

        {/* CSS */}
        {/* <link rel="stylesheet" href="../css/bootstrap.min.css"/> */}
      </head>
      <body>
        <Navbar />
        <div style={{ top: 0, height: '50px' }}>&nbsp;</div> {/* Navbar Spacer */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
//EOF