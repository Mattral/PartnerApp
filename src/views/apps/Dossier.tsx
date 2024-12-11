import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import styles
import { toast } from 'react-toastify'; // Import the toast library
import DossierCount from 'views/apps/DossierCount';
type Dossier = {
  vd_code: string;
  vd_status: string;
};

// Keyframes for shimmer and gentle glow animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Majestic dialog styling with ethereal glow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
    backdropFilter: 'blur(15px)',
    borderRadius: '30px',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
    animation: `${pulse} 4s ease-in-out infinite`,
    position: 'relative',
    overflow: 'hidden',
  },
}));

// Title box with shimmering gradient and gold accent
const TitleBox = styled(DialogTitle)(({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'linear-gradient(90deg, #ffdd6b, #ffcf00, #ffe899)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: `${shimmer} 3s linear infinite`,
  backgroundSize: '400% 100%',
}));

// Golden ring for success indication
const GoldenRing = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '4px solid #ffd700',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

// Radiant warning icon for error
const RadiantWarning = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255, 85, 85, 0.8) 0%, rgba(255, 140, 0, 0.7) 70%)',
  boxShadow: '0 0 30px rgba(255, 85, 85, 0.5)',
  animation: `${pulse} 2s ease-in-out infinite`,
});

// Majestic animated button styling
const AnimatedButton = styled(Button)({
  transition: 'transform 0.4s ease, background 0.3s',
  backgroundColor: '#ffd700',
  borderRadius: '25px',
  color: '#fff',
  fontWeight: 'bold',
  padding: '12px 40px',
  fontSize: '1rem',
  animation: `${pulse} 2.5s ease-in-out infinite`,
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: '#ffcf33',
    boxShadow: '0px 6px 30px rgba(255, 215, 0, 0.5)',
  },
});

const DossierPage: React.FC = () => {
  const [dossierData, setDossierData] = useState<{ count: number; dossiers: Dossier[] } | null>(null);

  const [topCards, setTopCards] = useState<number[]>([]);
  const [bottomCards, setBottomCards] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);
  const [deleteFromTop, setDeleteFromTop] = useState<boolean | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();

  const addTopCard = async () => {
    try {
      const response = await fetch('https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/dossiers/create', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 520|VmpluNvqeBkZeuskfZF5fAv4ddlsaOazSePhk1Vlb1dd7630', // Replace with actual token
          'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S', // Replace with the actual company code
          'FRONTEND-KEY': 'XXX', // Replace with the actual frontend key
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({}), // Add payload if necessary
      });

      // Parse the response JSON
      const data = await response.json();

      // Check the status in the response data
      if (data.status === 'treatmentSuccess') {
        // Success: Show a success toast with the vd_code
        toast.success(`Dossier created with code: ${data.data.primaryData._dossier.vd_code}`, {
          autoClose: 5000, // Duration in ms (5 seconds)
        });
      } else if (data.status === 'treatmentFailure') {
        // Failure: Show an error toast with the error message from the response
        const errorMessage = data.data.primaryData.msg || 'An error occurred';
        toast.error(`Error: ${errorMessage}`, {
          autoClose: 5000, // Duration in ms (5 seconds)
        });
      } else {
        // If the response status is unknown, show a generic error
        toast.error('Unexpected response from the server', {
          autoClose: 5000, // Duration in ms (5 seconds)
        });
      }

    } catch (error: unknown) {
      // TypeScript requires us to assert the error as an instance of Error
      if (error instanceof Error) {
        // Now TypeScript knows `error` is an instance of `Error` and we can access `message`
        toast.error(`An error occurred while creating the dossier: ${error.message}`, {
          autoClose: 5000, // Duration in ms (5 seconds)
        });
      } else {
        // If error is not an instance of Error, handle as a generic unknown error
        toast.error('An unknown error occurred', {
          autoClose: 5000, // Duration in ms (5 seconds)
        });
      }
    }
  };

  const addBottomCard = () => {
    setBottomCards(prevBottomCards => [...prevBottomCards, prevBottomCards.length + 1]);
  };

  const confirmDeleteCard = (index: number, isTop: boolean) => {
    setOpenDialog(true);
    setCardToDelete(index);
    setDeleteFromTop(isTop); // Track whether we're deleting from the top or bottom
  };

  const handleConfigure = () => {
    router.push("/forms/VOI/Client");
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      {/* Top Section */}
      <div style={styles.container}>
        {/* Top Section */}
        <div style={styles.section}>
          <div style={styles.header}>
            {/* Left-aligned Title */}
            <div style={styles.textContainer}>
              <span style={styles.titleText}>Verify your Civil Identity</span>

              {/* Left-aligned Subtitle */}
              <p style={styles.subtitleText}>
                Verify this in order to be allowed to be granted call with advisors and many other benefits
              </p>
            </div>

            {/* Right-aligned Button */}
            <div style={styles.buttonContainer}>
              <Tooltip title="Opening a dossier helps you submit ID files that will help us confirm your identity" arrow>
                <Button
                  onClick={addTopCard}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 20,
                    fontSize: '1.2rem', // Increase font size
                    padding: '16px 32px', // Increase padding to make the button larger
                    height: '45px', // Optionally increase height
                    width: '200px' // Optionally increase width
                  }}
                >
                  Open a Dossier
                </Button>


              </Tooltip>
            </div>
          </div>
          <DossierCount setDossierData={setDossierData} />

          {/* Card Container (still centered and scrollable) */}

          <div style={styles.cardContainer}>
            <DossierCount setDossierData={setDossierData} />
            {dossierData ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {dossierData.dossiers.map((dossier, index) => (
                  <DossierCard
                    key={dossier.vd_code} // Ensure the key is unique for each card
                    title={`Dossier ${dossier.vd_code}`} // Display vd_code or a more readable name
                    onDelete={() => confirmDeleteCard(index, false)}// Pass the index to the delete handler
                    onConfigure={handleConfigure} // You can customize this handler
                  />
                ))}
              </div>
            ) : (
              <div>Loading Dossier Data...</div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom Section */}
      <div style={styles.section}>
        <div style={styles.header}>


          {/* Left-aligned Title */}
          <div style={styles.textContainer}>
            <span style={styles.titleText}>Verify your Professional Identity</span>

            {/* Left-aligned Subtitle */}
            <p style={styles.subtitleText}>
              Verify this in order to be allowed to provide consulting services to people
            </p>
          </div>

          {/* Tooltip on the Open Dossier Button */}
          {/* Right-aligned Button */}
          <div style={styles.buttonContainer}>
            <Tooltip title="Opening a dossier helps you submit professional credentials that will help us confirm your expertise" arrow>


              <Button
                onClick={addBottomCard}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 20,
                  fontSize: '1.2rem', // Increase font size
                  padding: '16px 32px', // Increase padding to make the button larger
                  height: '45px', // Optionally increase height
                  width: '200px' // Optionally increase width
                }}
              >
                Open a Dossier
              </Button>
            </Tooltip>
          </div>
        </div>


        <div style={styles.cardContainer}>
          {bottomCards.map((_, index) => (
            <DossierCard
              key={index}
              title={`Dossier${index + 1}`}
              onDelete={() => confirmDeleteCard(index, false)}
              onConfigure={handleConfigure}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

const DossierCard = ({
  title,
  onDelete,
  onConfigure,
}: {
  title: string;
  onDelete: () => void;
  onConfigure: () => void;
}) => {
  return (
    <div className="dossier-card">

      {/* Nebula Background with floating particles */}
      <div className="card-background">
        <div className="particle-field">
          {[...Array(50)].map((_, index) => (
            <div key={index} className="particle" />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/nebula-background.png')] bg-cover opacity-70" />
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Majestic Title */}
        <h3 className="title majestic-text">{title}</h3>

        {/* Majestic Buttons */}
        <div className="button-group">
          <button className="majestic-button edit-btn" onClick={onDelete}>
            Status!
          </button>
          <button className="majestic-button configure-btn" onClick={onConfigure}>
            Configure
          </button>
        </div>
      </div>

      {/* Custom Styling */}
      <style jsx>{`
        .dossier-card {
          width: 300px;
          height: 200px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          margin-right: 20px;
          cursor: pointer;
          transition: transform 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          flex-shrink: 0; /* Prevent shrinking */
        }
        .dossier-card:hover {
          transform: scale(1.05);
        }
        .card-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #4c1d95, #000000);
          opacity: 0.9;
          overflow: hidden;
          z-index: 0;
        }
        .particle-field {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8);
          animation: floating 5s infinite ease-in-out, twinkle 3s infinite alternate;
          opacity: 0.7;
          width: 6px;
          height: 6px;
        }
        .particle:nth-child(odd) {
          animation-duration: 4s;
        }
        .particle:nth-child(even) {
          animation-duration: 6s;
        }

        .card-content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
        }

        /* Title with majestic glow */
        .title {
          font-size: 1.75rem;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 204, 0, 0.8), 0 0 20px rgba(255, 204, 0, 1);
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Majestic Buttons */
        .button-group {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        .majestic-button {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        .majestic-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.5);
        }
        .edit-btn:hover {
          color: #4a90e2;
        }
        .configure-btn:hover {
          color: #a64dff;
        }

        /* Animations for particles */
        @keyframes floating {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    padding: "40px 60px",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "20px",
    margin: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Space between title/subtitle and button
    alignItems: "flex-start", // Align to the top
    marginBottom: "20px",
    width: "100%",
  },
  titleText: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2c3e50",
    background: "linear-gradient(90deg, #f1c40f, #f39c12)",
    WebkitBackgroundClip: "text",
    letterSpacing: "2px",
    animation: "glow 4s ease-in-out infinite",
    //reomve textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7), 0px 0px 15px rgba(255, 204, 0, 0.9), 0px 0px 25px rgba(255, 204, 0, 1)",
  },

  subtitleText: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#7f8c8d",
    marginTop: "12px",
    lineHeight: "1.6",
    fontStyle: "italic",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end", // Align button to the right
    alignItems: "center", // Align the button vertically with the text
    marginLeft: "auto", // Push the button to the right
  },

  button: {
    padding: "12px 25px",
    backgroundColor: "#2B3BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "15px",
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    marginTop: "10px",
  },

  // Hover effect on the button
  buttonHover: {
    backgroundColor: "#e67e22",
    transform: "scale(1.05)",
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto", // allows horizontal scrolling
    whiteSpace: "nowrap", // keeps the cards in a single row
    gap: "24px", // space between cards
    paddingTop: "20px",
    paddingBottom: "20px",
    scrollBehavior: "smooth",
    transition: "all 0.3s ease",
  },

  card: {
    width: "300px",
    backgroundColor: "#f7f7f7",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },

  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 18px 36px rgba(0, 0, 0, 0.2)",
  },

  divider: {
    width: "90%",
    margin: "auto",
    borderTop: "1px solid #ddd",
    marginTop: "30px",
  },
};


export default DossierPage;

