import {Fragment} from 'react'
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useEffect, useState } from 'react';
import NavBar from '@components/NavBar';
import { getAgency } from '@utils/api/agencies';
import LoadingCircle from '@components/LoadingCircle';
import SimpleDetailsCard from '@components/SimpleDetailsCard';



export default function Agency() {
    const [agencyDetails, setagencyDetails] = useState()
    const router = useRouter()
    const { id } = router.query 

    console.log(router.query)

    useEffect(() => {
        if (!id)
        {
            return
        }
        getAgency(id).then((data) => {
            setagencyDetails(data)
        })
    }, [id])


    return <>
        <NavBar />
        {
            !agencyDetails ?
                <LoadingCircle/>
            :
            <Container sx={{paddingTop: 2}}>
                <Grid container>
                    <Grid item xs={2}>
                        <img
                            alt={agencyDetails.name}
                            src={agencyDetails.logo_url}
                            style={{width: `120px`}}
                            />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h3">
                            Agency Page { `${agencyDetails.name} (${agencyDetails.abbrev})` }
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5">
                            Launch Details
                        </Typography>
                        <SimpleDetailsCard
                            title = "total launches"
                            description = {agencyDetails.total_launch_count}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5">
                            Agency Information
                        </Typography>
                        <SimpleDetailsCard
                            title = "administrator"
                            description = {agencyDetails.administrator}
                        />
                        <SimpleDetailsCard
                            title = "administrator"
                            description = {`Founded ${agencyDetails.founding_year}`}
                            subdescription = {agencyDetails.description}
                        />
                    </Grid>     
                    {/* <Grid item xs={4}>
                        <Typography variant="h5">
                            Agency Information
                        </Typography>
                        <SimpleDetailsCard
                            title = "administrator"
                            description = {`Founded ${agencyDetails.founding_year}`}
                            subdescription = {agencyDetails.description}
                        />
                    </Grid>    */}
                    {/* <Grid item xs={4}>
                        <Typography variant="h5">
                            {`SapceCrafts`}
                        </Typography>
                        { agencyDetails.spacecraft_list}
                        <SimpleDetailsCard
                            title = "administrator"
                            description = {`Founded ${agencyDetails.founding_year}`}
                            subdescription = {agencyDetails.description}
                        />
                    </Grid>      */}
                    <Grid item xs={4}>
                        <Typography variant="h5">
                            {`SpaceCrafts`}
                        </Typography>
                        { agencyDetails.spacecraft_list &&
                        agencyDetails.spacecraft_list.map((spaceCraft) => {
                            return <SimpleDetailsCard
                            key = {spaceCraft.id}
                            description = {spaceCraft.name}
                            buttonCallback = {()=>{
                                router.push(`/spacecraft/${spaceCraft.id}?id=${id}`)
                            }}
                            buttonName = "go to spacecraft"
                        />
                        })
                        }
                    </Grid>                                                                         
                </Grid>
            </Container>
        }
    </>
}