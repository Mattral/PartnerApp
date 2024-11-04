import React from "react";

const TP = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="relative flex flex-col items-center justify-center gap-10 text-white h-screen">
      {/* Background Image with Adjusted Height */}
      <div
        className="h-[300px] w-[1000px] rounded-[20px] bg-hero bg-cover bg-center relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/assets/images/hero-background.png')",
          borderRadius: "20px",
          height: "300px",  // Ensure height is explicitly set in inline style
          width: "1000px",
          padding: "50px",  // Add padding to create space from borders
          boxSizing: "border-box",  // Ensure padding is included in the height
          position: "relative",  // Ensure positioning context for absolute positioning
          backgroundPosition: "center", // Center the background image
        }}
      >
        <div className="absolute top-0 left-0 p-4">
          {/* Text Overlay */}
          <h2
            className="bg-opacity-75 max-w-[270px] rounded py-2 text-left text-base font-normal"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "white",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maxWidth: "fit-content",
            }}
          >
            Upcoming Meeting at: <span style={{ color: "white" }}>{time}</span>
          </h2>
        </div>
        {/* Empty space */}
        <div className="absolute top-[50px]"> <p>_</p></div>
        <div className="absolute top-[120px] left-0 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl" style={{ color: "white" }}>
              {time}
            </h1>
            <p className="text-lg font-medium" style={{ color: "white" }}>
              {date}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold"> </h1>
    </section>
  );
};

export default TP;




