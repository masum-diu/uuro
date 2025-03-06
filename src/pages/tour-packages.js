import Layout from '@/components/Layout';
import React, { useState } from 'react'

function tourpackages() {
    const [hover, setHover] = useState();
    return (
        <div>  <Layout setHover={setHover} />  tour-packages</div>
    )
}

export default tourpackages