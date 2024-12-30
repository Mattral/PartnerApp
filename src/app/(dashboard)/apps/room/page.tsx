"use client"
import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("components/videocall2/VideocallContainer"), { ssr: false });

const ExportPage = () => {
  return <DynamicHome />;
};

export default ExportPage;
