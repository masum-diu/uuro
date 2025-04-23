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
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import instance from './api/api_instance';
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
function refundPolicy() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = useState([]);
  console.log(data)
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/pages/21');
      setData(response.data.body);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <BeatLoader color="#191919" size={30} />
      </Box>
    );
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: { lg: 5, xs: 2 } }}>
        <Link href={"/"}>
          <IconButton aria-label="" >
            <img src="/assets/ButtonBack.png" alt="" width={50} />
          </IconButton></Link>
      </Stack>

      <Typography fontSize={40} className='bold' sx={{ textAlign: "center" }} >
        {data[0]?.data[0]?._mave?.title}
      </Typography>
      <Stack direction={"column"} spacing={3} sx={{
        width: "90%",
        maxWidth: 1500, mx: "auto",
      }}>

        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "center", pt: 5, color: "#676767" }} >
          {/* Terms and conditions of sale of Mammut Sports Group inc. */}
        </Typography>
        <Typography   className='Regular' py={2}
            dangerouslySetInnerHTML={{ __html: data[0]?.data[0]?._mave?.description }}
          />
        {/* <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "justify", color: "#676767" }} >
         
          {data[0]?.data[0]?._mave?.description?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
        </Typography>
        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "justify", color: "#676767" }} >
          {data[0]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
        </Typography>
        <Stack py={4}>
          {data[0]?.data[1]?._mave?.cards.map((card, index) => {
            const panelId = `panel${index}`;
            return (
              <Accordion
                key={card.id}
                expanded={expanded === panelId}
                onChange={handleChange(panelId)}
              >
                <AccordionSummary
                  aria-controls={`${panelId}-content`}
                  id={`${panelId}-header`}
                  sx={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography component="span" sx={{ flexGrow: 1 }}>
                    {card.title_en}
                  </Typography>
                  {expanded === panelId ? <RemoveIcon /> : <AddIcon />}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: card.description_en }}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack> */}
      </Stack>
    </Box>
  )
}

export default refundPolicy
