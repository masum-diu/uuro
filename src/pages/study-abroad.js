import Layout from '@/components/Layout'
import React, { useState } from 'react'

function studyabroad() {
    const [hover, setHover] = useState();
    return (
        <div>
            <Layout setHover={setHover} />  
            study-abroad
        </div>
    )
}

export default studyabroad