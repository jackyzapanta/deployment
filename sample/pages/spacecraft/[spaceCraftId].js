import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

import NavBar from "@components/NavBar";
import SimpleDetailsCard from "@components/SimpleDetailsCard";
import LoadingCircle from "@components/LoadingCircle";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSpaceCraft } from "@utils/api/spaceCraft";

export default function SapceCraft() {
    const {spaceCraftDetails, setspaceCraftDetails} = useState()
    const router = useRouter()
    const { spaceCraftId } = router.query 

    useEffect(() => {
        if (!spaceCraftId)
        {
            return
        }
        getSpaceCraft(spaceCraftId).then((data)=> {
            setspaceCraftDetails(data)
        })
    })


    return <>
        <NavBar />
        { !spaceCraftDetails ?
            <LoadingCircle />
        :
        <Container sx={{paddingTop:2}} >
            <Grid container>
                <Grid xs="12" item>
                    <Typography variant="h3" gutterBottom>
                        {spaceCraftDetails.name}
                    </Typography> 
                </Grid>
            </Grid>
        </Container>
        }
        
    </>
}