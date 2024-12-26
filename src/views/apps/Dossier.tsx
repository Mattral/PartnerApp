import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import styles
import { toast } from 'react-toastify'; // Import the toast library
import DossierCount from 'views/apps/DossierCount';
import { CheckCircle, Cancel } from '@mui/icons-material'; // Import MUI icons

type Dossier = {
  vd_code: string;
  vd_status: string;
};

type AuthData = {
  data?: {
    primaryData?: {
      authorization?: string;
    };
  };
};

const DossierPage: React.FC = () => {
  const [dossierData, setDossierData] = useState<{ count: number; dossiers: Dossier[] } | null>(null);
  const [bottomCards, setBottomCards] = useState<number[]>([]);
  const [authData, setAuthData] = useState<AuthData | null>(null); // Added typing for authData
  const [openPopup, setOpenPopup] = useState(false); // Track if popup is open
  const [selectedRole, setSelectedRole] = useState<string>(''); // Track the selected role
  const router = useRouter();

  // Retrieve auth data from localStorage
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthData(parsedData);
      } catch (error) {
        console.error("Failed to parse auth data:", error);
      }
    } else {
      console.error('No authentication data found in localStorage');
    }
  }, []);

  const addTopCard = async () => {
    let authorizationToken: string | undefined;

    // Check if authData and authData.data exist before accessing authorization
    if (authData?.data?.primaryData?.authorization) {
      authorizationToken = authData.data.primaryData.authorization; // Access token directly
    }

    if (!authorizationToken) {
      console.error("Authorization token not found.");
      return; // Prevent further execution if token is missing
    }

    try {
      const response = await fetch('https://lawonearth.co.uk/api/back-office/partner/manual-client-voi/dossiers/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authorizationToken}`,
          'COMPANY-CODE': 'MC-H3HBRZU6ZK5744S',
          'FRONTEND-KEY': 'XXX',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      // Check the status in the response data
      if (data.status === 'treatmentSuccess') {
        toast.success(`Dossier created with code: ${data.data.primaryData._dossier.vd_code}`, {
          autoClose: 5000, // 5 seconds
        });
      } else if (data.status === 'treatmentFailure') {
        const errorMessage = data.data.primaryData.msg || 'An error occurred';
        toast.error(`Error: ${errorMessage}`, {
          autoClose: 5000, // 5 seconds
        });
      } else {
        toast.error('Unexpected response from the server', {
          autoClose: 5000, // 5 seconds
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`An error occurred while creating the dossier: ${error.message}`, {
          autoClose: 5000, // 5 seconds
        });
      } else {
        toast.error('An unknown error occurred', {
          autoClose: 5000, // 5 seconds
        });
      }
    }
  };

  const addBottomCard = () => {
    setBottomCards(prevBottomCards => [...prevBottomCards, prevBottomCards.length + 1]);
  };

  const handleConfigure = (vd_code: string) => {
    router.push(`/forms/VOI/Client?vd_code=${vd_code}`);
  };

  // Open the popup for selecting a role
  const handleConfigure2 = () => {
    setOpenPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Handle the selection of a role and continue
  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/apps/profiles/Advisor`);
      setOpenPopup(false); // Close the popup after navigating
    } else {
      toast.error('Please select a role first');
    }
  };


  return (
    <div style={styles.container}>
      <ToastContainer />
      {/* Top Section */}
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.header}>
            {/* Left-aligned Title */}
            <div style={styles.textContainer}>
              <span style={styles.titleText}>Apply as a Client</span>
              <p style={styles.subtitleText}>
                Submit your identity verification documents
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
                    fontSize: '1.2rem',
                    padding: '16px 32px',
                    height: '45px',
                    width: '240px',
                  }}
                >
                  Start Application
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Card Container */}
          <div style={styles.cardContainer}>
            <DossierCount setDossierData={setDossierData} />
            {dossierData ? (
              <div style={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
                {dossierData.dossiers.map((dossier) => (
                  <DossierCard
                    key={dossier.vd_code}
                    title={`Application`}
                    status={dossier.vd_status}
                    onConfigure={() => handleConfigure(dossier.vd_code)}
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
          <div style={styles.textContainer}>
            <span style={styles.titleText}>Apply as an Advisor</span>
            <p style={styles.subtitleText}>
              Submit the documents that prove your professional status
            </p>
          </div>

          <div style={styles.buttonContainer}>
            <Tooltip title="Opening a dossier helps you submit professional credentials that will help us confirm your expertise" arrow>
              <Button
                onClick={addBottomCard}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 20,
                  fontSize: '1.2rem',
                  padding: '16px 32px',
                  height: '45px',
                  width: '240px',
                }}
              >
                Start Application
              </Button>
            </Tooltip>
          </div>
        </div>

        <div style={styles.cardContainer}>
          <DossierCard
            key="sth"
            title="Advisor Application"
            status="approved"
            onConfigure={() => handleConfigure2()}
          />
        </div>
      </div>


      <div style={styles.divider} />

      {/* Popup Dialog */}
      <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="sm" fullWidth sx={{ padding: '32px' }}>
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: '600' }}>Select Your Profession</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              label="Role"
              sx={{ fontSize: '1.1rem', height: '50px' }}
            >
              <MenuItem value="Legal Advisor">Legal Advisor</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Engineer">Engineer</MenuItem>
              <MenuItem value="Accountant">Accountant</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: '20px' }}>
          <Button
            onClick={handleClosePopup}
            color="secondary"
            sx={{ fontSize: '1rem', textTransform: 'none' }}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            color="primary"
            sx={{ fontSize: '1rem', textTransform: 'none' }}
            startIcon={<CheckCircle />}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};


const DossierCard = ({
  title,
  status, // Add a status prop to display the dossier's status
  onConfigure,
}: {
  title: string;
  status: string;  // Accept the status of the dossier
  onConfigure: any;
}) => {
  return (
    <div className="dossier-card">
      <div className="card-background">
        <div className="particle-field">
          {[...Array(50)].map((_, index) => (
            <div key={index} className="particle" />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dossierC.png')] bg-cover opacity-70" />
      </div>

      <div className="card-content">
        <h3 className="title majestic-text">
          `
          <span className="hover-text">{title}</span>
        </h3>
        <div className="button-group">
          <button className="majestic-button edit-btn">
            {status}
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
          text-shadow: 
            0 0 5px rgba(255, 255, 255, 0.7),    /* White Glow (soft halo) */
            0 0 10px rgba(192, 192, 192, 0.8),   /* Silver Glow (medium intensity) */
            0 0 20px rgba(192, 192, 192, 1);     /* Silver Glow (strong intensity) */
          color: #333;
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

      `}</style>
    </div>
  );
};

export default DossierPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "120vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
  },


  cardContainer: {
    display: "flex",
    flexDirection: "row",
    whiteSpace: "nowrap", // keeps the cards in a single row
    gap: "24px", // space between cards
    paddingTop: "20px",
    paddingBottom: "20px",
    scrollBehavior: "smooth",
    transition: "all 0.3s ease",
    //overflow: 'hidden', // Prevents overflow
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