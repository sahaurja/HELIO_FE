import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "./FAQ.css"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    /* Stripped away min-h-screen and justify-center; added safe padding block */
    <div className="w-full py-8 px-0">
      <h1 className="text-center text-3xl font-bold mb-6">FAQs</h1>
      
      {/* mx-auto handles horizontal centering perfectly without requiring flexbox */}
      <div className="w-full max-w-2xl mx-auto">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span">Question 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Answer 1</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span">Question 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Answer 2</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span">Question 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Answer 3</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="py-2">
  <p className="text-white">Hi</p>
</div>

<div className="w-full bg-[#FFEFB0] py-6 mt-6">
  <div className="faq-footer">
    <div className="subdivider">
      <p className="bold-text">Help</p>
      <p className="subtext">FAQ</p>
      <p className="subtext">Contact Us</p>
      <p className="subtext">How to Get Started</p>
      <p className="subtext">Features Explained</p>
    </div>

    <div className="subdivider">
      <p className="bold-text">Learn</p>
      <p className="subtext">About Us</p>
      <p className="subtext">Our Mission</p>
      <p className="subtext">Available Languages</p>
      <p className="subtext">Offered Themes</p>
    </div>
    <div className="subdivider">
      <p className="bold-text">Community</p>
      <p className="subtext">Refer a Friend</p>
      <p className="subtext">What's New</p>
      <p className="subtext">Support</p>
      <p className="subtext">Learn with a Friend</p>
    </div>
    <div className="subdivider">
      <p className="bold-text">Company</p>
      <p className="subtext">Safety</p>
      <p className="subtext">Terms of Service</p>
      <p className="subtext">Privacy</p>
      <p className="subtext">Learn with a Friend</p>
    </div>
  </div>
</div>
    </div>
  );
}
