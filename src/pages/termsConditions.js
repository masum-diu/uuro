import { Box, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,

} from '@mui/material/AccordionSummary';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import React from 'react'
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
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    // transform: 'rotate(90deg)',
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
function termsConditions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box sx={{ bgcolor: "#F0F0F0", height: { lg: "100vh", xs: 0 } }}>
      <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: { lg: 5, xs: 2 } }}>
        <Link href={"/"}>
          <IconButton aria-label="" >
            <img src="/assets/ButtonBack.png" alt="" width={50} />
          </IconButton></Link>
      </Stack>

      <Typography fontSize={40} fontWeight={"medium"} sx={{ textAlign: "center" }} >
        Terms & Conditions
      </Typography>
      <Stack direction={"column"} spacing={3} sx={{
        width: "90%",
        maxWidth: 800, mx: "auto",
      }}>

        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "center", pt: 5, color: "#676767" }} >
          Terms and conditions of sale of Mammut Sports Group inc.
        </Typography>
        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "justify", color: "#676767" }} >
          Thank you for visiting Mammut Sports Group Inc. (“Mammut”)’s online store. The following terms
          and conditions of sale (“Terms and Conditions”) apply to all orders placed through the website Conditions may be changed by Mammut (referred to as “us”, “we” or “our” as the context may
          require) at any time, without prior notice from us, at our sole discretion. The latest version of our
          online store Terms and Conditions will be posted on our website. By placing an order through our
          website, each customer (“you”) agrees to the Terms and Conditions posted on our website.
        </Typography>
        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "justify", color: "#676767" }} >
          These Terms and Conditions are subject at all times to the general Terms and Conditions of Use of
          our website and our Privacy Policy. The use of any customer information collected through the
          website shall be governed by our Privacy Policy.
        </Typography>
        <Stack py={4} >
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <Typography component="span" sx={{ flexGrow: 1 }}>
                1. Orders; Order Processing
              </Typography>
              {expanded === "panel1" ? <RemoveIcon /> : <AddIcon />}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}>
              <Typography component="span" sx={{ flexGrow: 1 }}>2. Delivery</Typography>
              {expanded === "panel2" ? <RemoveIcon /> : <AddIcon />}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}>
              <Typography component="span" sx={{ flexGrow: 1 }}>3. Shipping</Typography>
              {expanded === "panel3" ? <RemoveIcon /> : <AddIcon />}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Box>
  )
}

export default termsConditions
