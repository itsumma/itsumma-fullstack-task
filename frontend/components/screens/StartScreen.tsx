import CustomIcon from "@/frontend/components/icons/CustomIcon";
import * as React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";

type Props = {
    toggleModal:()=> void
}

export default function StartScreen({toggleModal}:Props){
    return (
        <div className='start-screen'>
            <Image src='/tree.png' alt='tree' width={300} height={300}/>
            <hr/>
            <CustomIcon type={'create'} onClick={toggleModal}/>
            <Typography color={'primary'} variant="h5" component="h5">
                Create your family tree.
            </Typography>
        </div>
    )
}
