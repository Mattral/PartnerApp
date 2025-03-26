/*"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

const Videocall = dynamic<{ slug: string; JWT: string }>(
  () => import("../../../components/Videocall"),
  { ssr: false }
);

export default function Page() {
  const [slug, setSlug] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  // Fetching the slug and JWT from sessionStorage
  useEffect(() => {
    const storedSlug = sessionStorage.getItem('SLUG');
    const storedJwt = sessionStorage.getItem('JWT');
    
    if (storedSlug && storedJwt) {
      setSlug(storedSlug);
      setJwt(storedJwt);
      
    } else {
      console.log('SLUG or JWT not found in sessionStorage! API fetch error');
    }
  }, []);

  // If the data isn't available yet, you can show a loading state
  if (!slug || !jwt) {
    return <div>Loading... JWT not found......</div>;
  }

  return (
    <div>
      <Videocall slug={slug} JWT={jwt} />
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </div>
  );
}
*/

"use client"

import { getData } from "data/getToken";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useState } from "react";

const Videocall = dynamic<{ slug: string; JWT: string }>(
  () => import("../../../components/Videocall"),
  { ssr: false },
);

export default async function Page({ params }: { params: { slug: string } }) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const storedSlug = sessionStorage.getItem('SLUG');
    const storedJwt = sessionStorage.getItem('JWT');
    
    if (storedSlug && storedJwt) {
      setSlug(storedSlug);
      
    } else {
      console.log('SLUG or JWT not found in sessionStorage! API fetch error');
    }
  }, []);

  const jwt = await getData(params.slug);
  if (!slug ) {
    return <div>Loading... Session Code not found......</div>;
  }
  return (
    <div>
      
      <Videocall slug={slug} JWT={jwt} />
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </div>
  );
}
